"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
IMAGE = "https://tinyurl.com/demo-cupcake"


class Cupcake(db.Model):
    """Cupcake."""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    flavor = db.Column(db.Text, nullable = False)
    size = db.Column(db.Text, nullable = False)
    rating = db.Column(db.Float, nullable = False)
    image = db.Column(db.Text, nullable = False, default = IMAGE)

    def to_JSON(self):
        return {"id": self.id, "flavor": self.flavor, "rating": self.rating, "size": self.size, "image": self.image}


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)