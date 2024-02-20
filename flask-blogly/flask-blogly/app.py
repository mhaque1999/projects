"""Blogly application."""

from flask import *
from models import *
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///blogly"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "asd"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

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

    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    """empty url?"""
    image_url = request.form["image_url"] or None 

    new_user = User( first_name = first_name, last_name = last_name, image_url = image_url)

    db.session.add(new_user)
    db.session.commit()
    return redirect("/users")

@app.route("/users/<int:user_id>")
def show_user_profile(user_id):

    user = User.query.get_or_404(user_id)
    return render_template("show_user.html", user=user)


@app.route("/users/<int:user_id>/edit")
def edit_user_profile(user_id):

    user = User.query.get_or_404(user_id)
    return render_template("edit_user.html", user=user)


@app.route("/users/<int:user_id>/edit", methods=["POST"])
def update_user_profile(user_id):

    user = User.query.get_or_404(user_id)
    user.first_name = request.form["first_name"]
    user.last_name = request.form["last_name"]
    user.image_url = request.form["image_url"]

    db.session.add(user)
    db.session.commit()

    return redirect("/users")


@app.route("/users/<int:user_id>/delete", methods=["POST"])
def delete_user(user_id):

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")

@app.route("/users/<int:user_id>/posts/new")
def posts_new_form(user_id):
    """Show form to add a post for that user"""

    user = User.query.get_or_404(user_id)
    tag_list = Tag.query.all()
    return render_template("post_form.html", user = user, tags = tag_list)


@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def posts_new(user_id):
    """Handle add form; add post and redirect to the user detail page"""

    user = User.query.get_or_404(user_id)
    title = request.form["title"]
    content = request.form["content"]

    tag_id_list = []
    for tag_id in request.form.getlist("tags"):
        tag_id_list.append(int(tag_id))

    tag_list = Tag.query.filter(Tag.id.in_(tag_id_list)).all()

    new_post = Post(title = title, content = content, user = user, tags = tag_list)

    db.session.add(new_post)
    db.session.commit()

    return redirect(f"/users/{user_id}")


@app.route("/posts/<int:post_id>")
def posts_show(post_id):
    """Show a post. Show buttons to edit and delete the post"""

    post = Post.query.get_or_404(post_id)
    print(post.tags)
    return render_template("show_post.html", post = post, tags = post.tags)


@app.route("/posts/<int:post_id>/edit")
def posts_edit(post_id):
    """Show form to edit a post, and to cancel (back to user page)"""

    post = Post.query.get_or_404(post_id)
    tag_list = Tag.query.all()
    return render_template("edit_post.html", post = post, tags = tag_list)


@app.route("/posts/<int:post_id>/edit", methods=["POST"])
def posts_update(post_id):
    """Handle editing of a post. Redirect back to the post view"""

    post = Post.query.get_or_404(post_id)
    post.title = request.form["title"]
    post.content = request.form["content"]

    tag_id_list = []
    for tag_id in request.form.getlist("tags"):
        tag_id_list.append(int(tag_id))

    post.tags = Tag.query.filter(Tag.id.in_(tag_id_list)).all()

    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{post.user_id}")


@app.route("/posts/<int:post_id>/delete", methods=["POST"])
def posts_destroy(post_id):
    """Delete the post"""

    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()
    print("Post was deleted")
    return redirect(f"/users/{post.user_id}")

"TAGS"
@app.route("/tags")
def tags_list():
    """Lists all tags, with links to the tag detail page"""

    tags = Tag.query.all()
    return render_template("tags.html", tags = tags)

@app.route("/tags/<int:tag_id>")
def tags_show(tag_id):
    """Show detail about a tag. Have links to edit form and to delete."""

    tag = Tag.query.get_or_404(tag_id)
    return render_template("tag_detail.html", tag = tag)

@app.route("/tags/new")
def tag_form():
    """Shows a form to add a new tag"""

    posts = Post.query.all()
    return render_template("tag_form.html", posts = posts)

@app.route("/tags/new", methods = ["POST"])
def add_tag():
    """ Process add form, adds tag, and redirect to tag list"""

    post_ids = []
    for post_id in request.form.getlist("posts"):
        post_ids.append(int(post_id))

    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    new_tag = Tag(name = request.form["name"], posts = posts)

    db.session.add(new_tag)
    db.session.commit()
    return redirect("/tags")


@app.route("/tags/<int:tag_id>/edit")
def edit_tag_form(tag_id):
    """Show a form to edit an existing tag"""

    tag = Tag.query.get_or_404(tag_id)
    posts = Post.query.all()
    return render_template("edit_tag.html", tag = tag, posts = posts)


@app.route("/tags/<int:tag_id>/edit", methods=["POST"])
def update_tag(tag_id):
    """Process edit form, edit tag, and redirects to the tags list"""

    post_ids = []
    for post_id in request.form.getlist("posts"):
        post_ids.append(int(post_id))

    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form["name"]
    tag.posts = Post.query.filter(Post.id.in_(post_ids)).all()

    db.session.add(tag)
    db.session.commit()
    return redirect("/tags")


@app.route("/tags/<int:tag_id>/delete", methods=["POST"])
def tags_destroy(tag_id):
    """Delete a tag"""

    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()

    return redirect("/tags")