import os
import datetime
from app import app
from flask import render_template, request, flash, redirect, url_for
from .models import Event, db
from werkzeug.utils import secure_filename
from markupsafe import escape
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

class RegisterForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw = {"placehloder": "Username"})

    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw = {"placehloder": "Password"})

    submit = SubmitField("Register")

    def validate_username(self, username):
        existing_username = User.query.filter_by(username=username.data).first()
        if existing_username:
            raise ValidationError(
                "The username already exists. Please chose a different one.")


@app.route("/")
def index():
    events = db.session.query(Event)
    return render_template("index.html", events=events)

@app.route("/post_event", methods=["GET", "POST"])
def post_event():
    if request.method == "POST":
        # check if the post request has the file part
        if "image" not in request.files:
            #do flashes actually work?
            #do they do anything?
            flash("No file part")
            return redirect(request.url)
        title = request.form["title"]
        description = request.form["description"]
        image = request.files["image"]
        date = request.form["date"]

        #gettting location data
        country = request.form.get("country")
        city = request.form.get("city")
        venue = request.form.get("venue")

        location = country + ", " + city + ", " + venue 

        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if image.filename == '':
            flash("No selected file")
            return redirect(request.url)

        #making new lines actually work (for description)
        description = description.replace('\n', '<br>')

        #preprocessing the date for uploading to the database
        date = [int(x) for x in date.split("-")]
        date = datetime.date(date[0], date[1], date[2])

        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
            new_event = Event(title=title, description=description, image=image_path, date=date, location=location)
            new_event.saveToDB()
            print("Event added successguly")
            flash("The event was added successfully ;)")
            return redirect(url_for("index"))
        else:
            flash('Invalid file type. Please upload an image.')
    return render_template("post_event.html")

@app.route("/events/event<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = Event.query.get(event_id)
    return render_template("events/event.html", event=event)

@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    return render_template("register.html", form=form)

@app.route("/db_entries")
def db_entries():
    events = db.session.query(Event)
    return render_template("events/db_entries.html", events=events)

### helper functions ###
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in {"png", "jpg", "jpeg"}