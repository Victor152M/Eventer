from app import app
from flask import render_template
from .models import Event

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<int:event_id>", methods=["GET"])
def getEvent(event_id):
    event = Event.query.get(event_id)
    return render_template("single_event.html", event=event)
