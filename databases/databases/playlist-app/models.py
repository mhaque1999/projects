"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""
    __tablename__ = "playlist"

    # ADD THE NECESSARY CODE HERE
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(60), nullable = False)
    description = db.Column(db.Text, nullable = False)

    song = db.relationship("Song", secondary = "playlistsong" )

class Song(db.Model):
    """Song."""

    __tablename__ = "song"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column(db.Text, nullable = False)
    artist = db.Column(db.String(60), nullable = False)

    playlist = db.relationship("Playlist", secondary = "playlistsong" )

    # ADD THE NECESSARY CODE HERE


class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    __tablename__ = "playlistsong"
    # ADD THE NECESSARY CODE HERE
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlist.id"), nullable = False)
    song_id = db.Column(db.Integer, db.ForeignKey("song.id"), nullable = False)

# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
