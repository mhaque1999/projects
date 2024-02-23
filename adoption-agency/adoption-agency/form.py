from flask_wtf import FlaskForm
from wtforms import *
from wtforms.validators import *


class AddPetForm(FlaskForm):

    name = StringField("Pet Name", validators=[InputRequired()])
    species = SelectField("Species", choices=[("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine")])
    photo_url = StringField("URL", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes", validators=[Optional()],)


class EditPetForm(FlaskForm):

    photo_url = StringField("URL",validators=[Optional(), URL()])
    notes = TextAreaField("Notes",validators=[Optional()])
    available = BooleanField("Available")