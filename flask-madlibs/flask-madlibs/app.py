from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import *

app = Flask(__name__)
app.debug = True
app.config["SECRET_KEY"] = "secret"

debug = DebugToolbarExtension(app)

@app.route("/")
def word_form():
    "Renders the word form to put into the story"
    return render_template("questions.html", prompts = story.prompts)

@app.route("/story")
def generated_story():
    "Generates a story based on the users choices and renders the story on the page"
    new_story = story.generate(request.args)
    return render_template("story.html", story = new_story)

"Todo Let user choose from multiple story templates"