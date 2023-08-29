from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, NumberRange, Email, Optional


class LoginForm(FlaskForm):
    """login Form """
    username = StringField(
        "Username", validators=[
            InputRequired(), Length(min=1, max=20)
        ]
    )
    password = PasswordField(
        "Password", validators=[
            InputRequired(), Length(min=6, max=30)
        ]
    )


class RegisterForm(FlaskForm):
    """register form"""
    username = StringField(
        "Username", validators=[
            InputRequired(), Length(min=1, max=20)
        ]
    )
    email = StringField(
        "Email", validators=[
            InputRequired(), Email(), Length(max=50)
        ]
    )
    password = PasswordField(
        "Password", validators=[
            InputRequired(), Length(min=6, max=30)
        ]
    )
    first_name = StringField(
        "First Name", validators=[
            InputRequired(), Length(max=30)
        ]
    )
    last_name = StringField(
        "Last Name", validators=[
            InputRequired(), Length(max=30)
        ]
    )


class FeedbackForm(FlaskForm):
    """feedback form"""
    title = StringField(
        "Title", validators=[
            InputRequired(), Length(max=100)
        ]
    )
    content = StringField(
        "Content", validators=[
            InputRequired()
        ]
    )


class DeleteForm(FlaskForm):
    """meant to be empty"""
