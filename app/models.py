from flask_sqlalchemy import SQLAlchemy

#The db is initialized in __init__.py
db = SQLAlchemy()

class Event(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    title = db.Column("title", db.String(80), unique=False, nullable=False)
    description = db.Column("description", db.String(1000), unique=False, nullable=False)
    image_filename = db.Column("filename", db.String(255), unique=False, nullable=False)

    def __init__(self, title, description, image):
        self.title = title
        self.description = description
        self.image_filename = image

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()
        
    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()
    
    

