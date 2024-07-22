from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

#The db is initialized in __init__.py
db = SQLAlchemy()

class Event(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    title = db.Column("title", db.String(80), unique=False, nullable=False)
    description = db.Column("description", db.String(10000), unique=False, nullable=False)
    image_filepath = db.Column("filename", db.String(255), unique=False, nullable=False)
    date = db.Column("date", db.Date(), unique=False)
    location = db.Column("location", db.String(80), unique=False)
    #should date or location be nullable?

    def __init__(self, title, description, image, date, location):
        self.title = title
        self.description = description
        self.image_filepath = image
        self.date = date
        self.location = location

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()
        
    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()
    
class User(db.Model, UserMixin):
    id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column("username", db.String(40), nullable=False, unique=True)
    password_hash = db.Column("password_hash", db.String(120), nullable=False)

    def __init__(self, username):
        self.username = username

    def set_password(self, password):
        self.password_hash = password

    #def check_password(self, password):
    #    return check_password_hash(self.password_hash, password)

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()
        
    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()
    

