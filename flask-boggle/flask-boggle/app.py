from boggle import Boggle
from flask import *
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.debug = True

app.config["SECRET_KEY"] = "asd"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/", methods=["GET","POST"])
def create_board():
    """Creates the boggle board"""
    board = boggle_game.make_board()
    session["board"] = board
    hi_score = session.get("hi-score", 0)
    num_of_plays = session.get("num_of_plays", 0)
    return render_template("index.html", boggle_board = board, hi_score = hi_score, num_of_plays = num_of_plays)

""" @app.route("/", methods=["POST"])
def get_guess():
    return """

# @app.route("/check_guess", methods=["POST"])
# def post_guess():
#     console.log("posted word")

@app.route("/check_guess")
def check_guess():
    """route to check whether the guess is on the board or not and returns a JSON to the server"""
    #word = request.get_json(force = True)
    #word = request.get_json()
    #print(word)
    word = request.args["word"]
    board = session["board"]
    print(word)
    result = boggle_game.check_valid_word( board, word)
    #data = jsonify({"result": result})
    return jsonify({"result": result})
    #return "false"

@app.route("/post_score",methods=["GET","POST"])
def post_score():
    """Gets the num of plays, hi score, and current score and returns a JSON of the data to the server"""
    #score = request.args["score"]
    score = request.json["score"]
    #hi_score = session["hi-score"]
    #num_of_plays = session["num_of_plays"]
    if ( not session.get("hi-score") ):
        session["hi-score"] = score
    elif (score > session.get("hi-score")):
        hi_score = session["hi-score"]
        hi_score = score
        session["hi-score"] = hi_score
    else:
        print("Didn't beat your hi score")

    if ( not session.get("num_of_plays") ):
        session["num_of_plays"] = 1
    else:
        num_of_plays = session["num_of_plays"]
        num_of_plays += 1
        session["num_of_plays"] = num_of_plays

    hi_score = session["hi-score"]
    num_of_plays = session["num_of_plays"]
    print(score)
    print(hi_score)
    print(num_of_plays)
    return jsonify({"score": score, "hi_score": hi_score, "num_of_plays": num_of_plays})

