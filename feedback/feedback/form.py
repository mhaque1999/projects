from flask_wtf import FlaskForm
from wtforms import *
from wtforms.validators import *

class RegisterUserForm(FlaskForm):

    username = StringField("Username", validators=[InputRequired(), length(max=20)])
    password = PasswordField("Password", validators=[InputRequired()])
    email = StringField("Email",validators=[InputRequired(), length(max=50)])
    first_name = StringField("First Name", validators=[InputRequired(), length(max=30)])
    last_name = StringField("Last Name", validators=[InputRequired(), length(max=30)])

class LoginForm(FlaskForm):

    username = StringField("Username", validators=[InputRequired(), length(max=20)])
    password = PasswordField("Password", validators=[InputRequired()])

class FeedbackForm(FlaskForm):

    title = StringField("Title", validators=[InputRequired(), length(max=100)])
    content = TextAreaField("Content", validators=[InputRequired()])

class EditFeedbackForm(FlaskForm):

    title = StringField("Title", validators=[InputRequired(), length(max=100)])
    content = TextAreaField("Content", validators=[InputRequired()])