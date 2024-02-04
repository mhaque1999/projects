"""SQLAlchemy models for blogly."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"


class User(db.Model):
    """Site user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE)

    @property
    def full_name(self):
        """Return full name of user."""

        return f"{self.first_name} {self.last_name}"


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)
