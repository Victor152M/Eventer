from flask_sqlalchemy import SQLAlchemy

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
    
    

