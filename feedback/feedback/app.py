from model import *
from form import *
from flask import *
from flask_debugtoolbar import DebugToolbarExtension
from flask_bcrypt import Bcrypt


bcrypt = Bcrypt()
app = Flask(__name__)

app.config['SECRET_KEY'] = "asd"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///feedback"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)

@app.route("/")
def home_page():

    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def register():

    form = RegisterUserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        hased_password = bcrypt.generate_password_hash(password)
        hased_password_utf8 = hased_password.decode("utf8")

        user = User(username = username, password = hased_password_utf8, email = email, first_name = first_name, last_name = last_name)
        
        db.session.add(user)
        db.session.commit()
        session['username'] = username
        return redirect("/secret")

    return render_template("register.html", form = form)

@app.route("/login", methods=["GET", "POST"])
def login():

    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        
        user = User.query.filter_by(username = username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            print("The user {username} has logged in")
            session['username'] = username
            return redirect(f"/users/{username}")
        else:
            form.username.errors = ["Invalid username/password."]
            return render_template("login.html", form = form)

    return render_template("login.html", form=form)

@app.route("/logout")
def logout():

    session.pop("username")
    return redirect("/")

@app.route("/users/<username>")
def get_user_info(username):

    if "username" not in session or session["username"] != username:
        return redirect("/")
    user = User.query.get(username)

    return render_template("user.html", user = user)

@app.route("/users/<username>/delete", methods=["POST"])
def delete_user(username):

    if "username" not in session or session["username"] != username:
        flash("You must be logged in to view!")
        return redirect("/")

    user = User.query.get_or_404(username)
    for feedback in user.feedback:
        db.session.delete(feedback)
        db.session.commit()
    db.session.delete(user)
    db.session.commit()

    session.pop("username")
    return redirect("/")

@app.route("/users/<username>/feedback/add", methods=["GET", "POST"])
def add_feedback(username):

    if "username" not in session or session["username"] != username:
        flash("You must be logged in to view!")
        return redirect("/")

    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title = title, content = content, username=username)
        db.session.add(feedback)
        db.session.commit()
        
        return redirect(f"/users/{username}")

    return render_template("feedback_form.html", form = form)

@app.route("/feedback/<feedback_id>/update", methods=["GET", "POST"])
def edit_feedback(feedback_id):
    print(f"Feedback id is {feedback_id}")
    feedback = Feedback.query.get_or_404(feedback_id)

    if "username" not in session or session["username"] != feedback.username:
        flash("You must be logged in to view!")
        return redirect("/")

    form = EditFeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f"/users/{feedback.username}")

    return render_template("edit_feedback_form.html", form = form)

@app.route("/feedback/<feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):

    feedback = Feedback.query.get_or_404(feedback_id)
    db.session.delete(feedback)
    db.session.commit()
    return redirect(f"/users/{feedback.username}")

@app.route("/secret", methods=["GET"])
def secret():
    if "username" not in session:
        flash("You must be logged in to view!")
        return redirect("/")
    return "You made it!"
