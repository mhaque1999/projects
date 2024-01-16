from flask import *
from flask_debugtoolbar import DebugToolbarExtension
from surveys import *

app = Flask(__name__)
app.debug = True

app.config["SECRET_KEY"] = "secret"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

toolbar = DebugToolbarExtension(app)

responses = []

survey = surveys["satisfaction"]

@app.route("/", methods = ["GET","POST"])
def home_page():
    """Renders the home page with the survey title and instructions"""
    # responses.clear()
    response_list = session["responses"]

    if len( response_list ) == len( survey.questions ):
        flash("You have completed the survey")
        return redirect("/complete")

    return render_template("home.html", survey_title = survey.title, instruction = survey.instructions )

@app.route("/start", methods=["GET","POST"])
def go_to_question_page():
    """Initializes the session with a empty response list and redirects to the first question"""
    session["responses"] = []
    return redirect("/question/0")

@app.route("/question/<question_number>",methods = ["GET","POST"])

def question_page(question_number):
    """Checks whether the user is on the right question and renders the page with appropriate question"""
    response_list = session["responses"]

    if len( response_list ) == len( survey.questions ):
        flash("You have completed the survey")
        return redirect("/complete")

    if not( int(question_number) == len( response_list )):
        flash("Please complete the current question.")
        return redirect(f"/question/{len( response_list )}")

    return render_template("question.html", survey_questions = survey.questions[int(question_number)].question, choices = survey.questions[int(question_number)].choices)

@app.route("/answer", methods = ["GET","POST"])
def redirect_page():
    """Gets the response from the user and saves it to the session"""
    choice = request.form["choice"]
    response_list = session["responses"]
    response_list.append(choice)
    session["responses"] = response_list
    #(session["responses"]).append(choice)

    if len( response_list ) == len(survey.questions):
        flash("You have completed the survey")
        return redirect("/complete")
    
    return redirect(f"/question/{len( response_list )}")

@app.route("/complete")
def end_page():
    """Renders the end of the survey page"""
    return render_template("complete.html")