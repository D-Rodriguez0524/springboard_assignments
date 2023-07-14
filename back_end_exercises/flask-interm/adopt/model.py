from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_PICTURE = "https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif"

class Pet(db.Model):
    """adoption pet model"""

    __tablename__ = "pets"

    id = db.Column(db.Integer, autoincrement=True, primary_key = True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String)
    age = db.Column(db.Integer)
    notes = db.Column(db.String)
    avaliable = db.Column(db.Boolean, nullable=False, default=True)

    def image_url(self):
        return self.photo_url or DEFAULT_PICTURE


def connect_db(app):
    """Connect this database to provided Flask app"""

    db.app = app
    db.init_app(app)