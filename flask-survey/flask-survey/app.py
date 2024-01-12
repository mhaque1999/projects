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

@app.route("/")
def home_page():
    responses.clear()
    return render_template("home.html", survey_title = survey.title, instruction = survey.instructions )

@app.route("/", methods = ["POST"])
def go_to_question_page():
    return

@app.route("/question/<question_number>",methods = ["GET","POST"])
def question_page(question_number):
    print(len(responses))
    if len(responses) == len(survey.questions):
        flash("You have completed the survey")
        return redirect("/complete")
    if not(int(question_number) == len(responses)):
        flash("Please complete the current question.")
        return redirect(f"/question/{len(responses)}")
    return render_template("question.html", survey_questions = survey.questions[int(question_number)].question, choices = survey.questions[int(question_number)].choices)

@app.route("/answer", methods = ["GET","POST"])
def redirect_page():
    choice = request.form["choice"]
    responses.append(choice)

    if len(responses) == len(survey.questions):
        flash("You have completed the survey")
        return redirect("/complete")
    
    return redirect(f"/question/{len(responses)}")

@app.route("/complete")
def end_page():
    return render_template("complete.html")