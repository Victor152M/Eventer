from flask import Flask
from .models import db, Event

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['UPLOAD_FOLDER'] = r"app\static\uploads"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 megabytes for file upload
app.config['SECRET_KEY'] = "hDau9417nd90lkkanHc"
db.init_app(app)

from . import routes
from . import models

with app.app_context():
    db.create_all()

