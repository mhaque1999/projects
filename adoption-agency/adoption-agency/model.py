from flask_sqlalchemy import SQLAlchemy

IMAGE = "https://upload.wikimedia.org/wikipedia/commons/5/5a/Black_question_mark.png"

db = SQLAlchemy()


class Pet(db.Model):
    """Pet Model"""

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Text, nullable = False)
    species = db.Column(db.Text, nullable = False)
    photo_url = db.Column(db.Text, nullable = False, default = IMAGE)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable = False, default = True)

def connect_db(app):

    db.app = app
    db.init_app(app)