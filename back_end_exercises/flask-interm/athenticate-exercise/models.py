from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


def connect_db(app):
    """connect to database"""
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User Model"""
    __tablename__ = "users"

    username = db.Column(db.String(20), primary_key=True,
                         unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    feedback = db.relationship(
        "Feedback", backref="user", cascade="all,delete")

    @classmethod
    def register(cls, username, password, first_name, last_name, email):
        """Register user w/hashed password & return user."""

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")
        user = cls(
            username=username,
            password=hashed_utf8,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            # return user instance
            return user
        else:
            return False


class Feedback(db.Model):
    """feedback model"""
    __tablename__ = "feedback"

    id = db.Column(db.Integer, unique=True,
                   primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String, nullable=False)
    username = db.Column(
        db.String(20), db.ForeignKey("users.username"), nullable=False)
