from flask import Flask
from .models import db, Event

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = r"app\static\uploads"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 megabytes for file upload
app.config['SECRET_KEY'] = "hDau9417nd90lkkanH4c"

from . import routes
