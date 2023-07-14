from flask_wtf import FlaskForm
from wtforms import StringField, SelectField,IntegerField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Email, Optional, URL, NumberRange

class AddPetForm(FlaskForm):
    """Add Pet form"""
    name = StringField(
        "Pet Name",
          validators=[InputRequired()],
          )
    species = SelectField(
        "Species",
        choices=[("cat", "Cat"), ("dog", "Dog"), ("porcupine" , "Porcupine")], 
        )
    photo_url = StringField(
        "Photo Url", 
        validators=[Optional(), URL()],
        )
    age = IntegerField(
        "Age",
        validators=[Optional(), NumberRange(min=0, max=30)],
    )
    notes = TextAreaField(
        "Comments",
        validators= [Optional()],
    )

class EditPetForm(FlaskForm):
    """edit pet form """

    photo_url = StringField(
        "Photo Url",
        validators=[Optional(), URL()],
    )

    notes = TextAreaField(
        "Comments",
        validators=[Optional()],
    )

    available = BooleanField("Avaliable?")