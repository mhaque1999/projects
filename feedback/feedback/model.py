from flask_sqlalchemy import SQLAlchemy
""" from flask_bcrypt import Bcrypt

bcrypt = Bcrypt() """
db = SQLAlchemy()


class User(db.Model):
    """Site user."""

    __tablename__ = "users"

    username = db.Column(db.String(20), nullable = False, unique = True, primary_key = True)
    password = db.Column(db.Text, nullable = False)
    email = db.Column(db.String(50), unique = True, nullable = False)
    first_name = db.Column(db.String(30), nullable = False)
    last_name = db.Column(db.String(30), nullable = False)

    feedback = db.relationship("Feedback", backref="user")

    # start of convenience class methods

class Feedback(db.Model):

    __tablename__ = "feedback"

    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    username = db.Column(db.String(20), db.ForeignKey('users.username'), nullable=False) 

def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)
