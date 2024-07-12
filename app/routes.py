from app import app
from flask import render_template, request, flash, redirect, url_for
from .models import Event
from werkzeug.utils import secure_filename

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/events/event1")
def event1():
    return render_template("events/event1.html")

@app.route("/post_event", methods=["GET", "POST"])
def post_event():
    if request.method == "POST":
        # check if the post request has the file part
        print("POST")
        if "file" not in request.files:
            flash("No file part")
            return redirect(request.url)
        title = request.form["title"]
        description = request.form["description"]
        image = request.files["image"]
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash("No selected file")
            return redirect(request.url)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)

            new_event = Event(title, description, filename).saveToDB()

            flash("The event was added successfully ;)")
            return redirect(url_for("index.html"))
        else:
            flash('Invalid file type. Please upload an image.')
    return render_template("post_event.html")

@app.route("/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = Event.query.get(event_id)
    return render_template("single_event.html", event=event)

### helper functions ###
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in {"png", "jpg", "jpeg"}