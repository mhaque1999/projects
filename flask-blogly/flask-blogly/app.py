"""Blogly application."""

from flask import *
from models import *
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

@app.route('/users/<int:user_id>/posts/new')
def posts_new_form(user_id):
    """Show form to add a post for that user"""

    user = User.query.get_or_404(user_id)
    return render_template('post_form.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def posts_new(user_id):
    """Handle add form; add post and redirect to the user detail page"""

    user = User.query.get_or_404(user_id)
    title = request.form['title']
    content = request.form['content']

    new_post = Post(title = title, content = content, user = user)

    db.session.add(new_post)
    db.session.commit()

    return redirect(f"/users/{user_id}")


@app.route('/posts/<int:post_id>')
def posts_show(post_id):
    """Show a post. Show buttons to edit and delete the post"""

    post = Post.query.get_or_404(post_id)
    return render_template('show_post.html', post = post)


@app.route('/posts/<int:post_id>/edit')
def posts_edit(post_id):
    """Show form to edit a post, and to cancel (back to user page)"""

    post = Post.query.get_or_404(post_id)
    return render_template('edit_post.html', post = post)


@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def posts_update(post_id):
    """Handle editing of a post. Redirect back to the post view"""

    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']

    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{post.user_id}")


@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def posts_destroy(post_id):
    """Delete the post"""

    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()
    print("Post was deleted")
    return redirect(f"/users/{post.user_id}")