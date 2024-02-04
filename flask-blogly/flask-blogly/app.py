"""Blogly application."""

from flask import *
from models import db, connect_db, User
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "asd"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route("/")
def homepage():

    return redirect("/users")

@app.route("/users")
def get_users():
    
    users = User.query.all()
    return render_template("users.html", users = users)

@app.route("/users/new")
def new_user_form():
    return render_template("new_user.html")

@app.route("/users/new", methods = ["POST"])
def add_new_user():

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    """empty url?"""
    image_url = request.form['image_url'] or None 

    new_user = User( first_name = first_name, last_name = last_name, image_url = image_url)

    db.session.add(new_user)
    db.session.commit()
    return redirect("/users")

@app.route('/users/<int:user_id>')
def show_user_profile(user_id):

    user = User.query.get_or_404(user_id)
    return render_template('show_user.html', user=user)


@app.route('/users/<int:user_id>/edit')
def edit_user_profile(user_id):

    user = User.query.get_or_404(user_id)
    return render_template('edit_user.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def update_user_profile(user_id):

    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()

    return redirect("/users")


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")