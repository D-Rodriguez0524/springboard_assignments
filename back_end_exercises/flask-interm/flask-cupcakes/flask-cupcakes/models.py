"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = "https://tinyurl.com/demo-cupcake"


class Cupcake(db.Model):
    """cupcake model"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, autoincrement=True,
                   primary_key=True, unique=True)
    flavor = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.String, nullable=False, default=DEFAULT_IMAGE)

    def serialize_cupcake(self):
        """serialize cupcake to a dict of cupcake info so it can be jsonified"""
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image,
        }


def connect_db(app):
    """connect to the database"""
    db.app = app
    db.init_app(app)
