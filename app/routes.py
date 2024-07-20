import os
from app import app
from flask import render_template, request, flash, redirect, url_for
from .models import Event, db
from werkzeug.utils import secure_filename
from markupsafe import escape

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
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if image.filename == '':
            flash("No selected file")
            return redirect(request.url)

        #making new lines actually work (for description)
        description = description.replace('\n', '<br>')

        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
            new_event = Event(title=title, description=description, image=image_path)
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

@app.route("/db_entries")
def db_entries():
    events = db.session.query(Event)
    return render_template("events/db_entries.html", events=events)

### helper functions ###
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in {"png", "jpg", "jpeg"}