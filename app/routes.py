import datetime, os, gc, uuid
from app import app
from .database_functions import db_operation
from .helper_functions import login_required, allowed_file
from flask import render_template, request, flash, redirect, url_for, jsonify, session
from werkzeug.utils import secure_filename
from passlib.hash import sha256_crypt


@app.route("/")
def index():
    links = []
    dates = []
    months = {
        "01": "ianuarie", "02": "februarie", "03": "martie", \
        "04": "aprilie", "05": "mai", "06": "iunie", "07": "iulie", \
        "08": "august", "09": "septembrie", "10": "octombrie", \
        "11": "noiembrie", "12": "decembrie"}

    events = db_operation("SELECT * FROM events;", fetch=True)
    for event in events:
        links.append("/events/event" + str(event[0]))
    for event in events:
        month = months[str(event[4]).split('-')[1]]
        date = str(str(event[4]).split('-')[2]) + "-" + month \
            + "-" + str(str(event[4]).split('-')[0])
        dates.append(date)
    if events:
        return render_template("index.html", events=events, links=links, dates=dates)
    return render_template("index.html")

@app.route("/post_event", methods=["GET", "POST"])
@login_required
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
        date = f"{date[2]}-{date[1]}-{date[0]}"

        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            filename = str(uuid.uuid4()) + filename
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
            #new_event = Event(title=title, description=description, image=image_path, date=date, location=location)
            #new_event.saveToDB()

            sql = f"""
            INSERT INTO events (title, description, image_filepath, date, location)
            VALUES (%s, %s, %s, %s, %s);
            """

            parameters = (title, description, image_path, date, location)

            db_operation(sql=sql, params=parameters)

            print("Event added successguly")
            flash("The event was added successfully")
            return redirect(url_for("index"))
        else:
            flash('Invalid file type. Please upload an image.')
    return render_template("post_event.html")

@app.route("/events/event<int:event_id>", methods=["GET"])
def get_event(event_id):
    sql = f"SELECT * FROM events WHERE id = %s;"
    parameters = str(event_id)
    event = db_operation(sql=sql, params=parameters, fetch=True)
    return render_template("events/event.html", event=event)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_nameh")
        email = request.form.get("email")
        password_hash = sha256_crypt.encrypt(request.form.get("password"))

        sql = f"SELECT * FROM users WHERE email = %s"
        parameters = (email)

        if db_operation(sql=sql, params=parameters, fetch=True):
            return jsonify({"success": False, "message": "Email already exists"})

        sql = f"""
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ('{first_name}', '{last_name}', '{email}', '{password_hash}');
            """

        parameters = (first_name, last_name, email, password_hash)

        db_operation(sql=sql, params=parameters)

        return jsonify({"success": True, "message": "Registration successful", "redirect": url_for("login")})

    return render_template("register.html")

@app.route("/account", methods=["GET"])
@login_required
def account():
    username = session['username']
    email = session['email'] 
    user_id = db_operation("SELECT id FROM users WHERE email = %s;", params=[email], fetch=True)[0][0]
    events = db_operation("SELECT * FROM events WHERE user_id = %s;", params=[user_id], fetch=True)
    links = []
    for event in events:
        links.append("/events/event" + str(event[0]))

    if events:
        return render_template("account.html", username=username[0][0], email=email, events = events, links=links)

    return render_template("account.html", username=username[0][0])

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        if not db_operation("SELECT * FROM users WHERE email = %s;", params=[email], fetch=True):
            return jsonify({"success": False, "message": "Wrong password or user does not exist!"})

        password_hash_as_list = db_operation("SELECT password_hash FROM users WHERE email = %s;", params=[email], fetch=True)
        password_hash = password_hash_as_list[0][0]

        if sha256_crypt.verify(password, password_hash):
            session['logged_in'] = True
            first_name = db_operation("SELECT first_name FROM users WHERE email = %s;", params=[email], fetch=True)
            session['username'] = first_name
            session['email'] = email

            return jsonify({"success": True, "message": "Login successful", "redirect": url_for("account")})
        
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    session.clear()
    flash("You have been logged out")
    gc.collect()
    return redirect(url_for("index"))

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")

@app.route("/db_entries")
def db_entries():
    events = db_operation("SELECT * FROM events;")
    users = db_operation("SELECT * FROM users;")
    return render_template("events/db_entries.html", events=events, users=users)
