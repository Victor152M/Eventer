from app import app
from flask import render_template
from .models import Event

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/events/event1")
def event1():
    return render_template("events/event1.html")

@app.route("/post_event", methods=["GET", "POST"])
def post_event():
    return render_template("post_event.html")

@app.route("/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = Event.query.get(event_id)
    return render_template("single_event.html", event=event)
