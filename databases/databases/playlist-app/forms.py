"""Forms for playlist app."""

from wtforms import SelectField, StringField, TextField
from flask_wtf import FlaskForm
from wtforms.validators import *

class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    # Add the necessary code to use this form
    name = StringField("Name", validators = [InputRequired(), length(max = 60)])
    description = TextField("Description",validators = [InputRequired()])

class SongForm(FlaskForm):
    """Form for adding songs."""

    # Add the necessary code to use this form
    title = TextField("Title",validators = [InputRequired()])
    artist = StringField("Artist", validators = [InputRequired(), length(max = 60)])

# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
