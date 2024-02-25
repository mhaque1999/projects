"""Flask app for Cupcakes"""
from flask import *
from models import *
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "asd"

connect_db(app)

db.create_all()

toolbar = DebugToolbarExtension(app)

@app.route("/")
def get_homepage():
    return render_template("home.html")

@app.route("/api/cupcakes")
def get_cupcakes():

    cupcakes = Cupcake.query.all()
    cupcakesJSON = [cupcake.to_JSON() for cupcake in cupcakes]
    return ( jsonify(cupcakes = cupcakesJSON), 200 )

@app.route("/api/cupcakes/<int:cupcake_id>")
def get_cupcake(cupcake_id):

    try:
        cupcake = Cupcake.query.get_or_404(cupcake_id)
        return jsonify(cupcake = cupcake.to_JSON())
    except:
        abort(404)


@app.route("/api/cupcakes", methods = ["POST"])
def post_cupcake():

    flavor = request.json["flavor"]
    rating = request.json["rating"]
    size = request.json["size"]
    image = request.json["image"] or None

    cupcake = Cupcake(flavor = flavor, rating = rating, size = size, image = image)
    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake = cupcake.to_JSON()), 201)

@app.route("/api/cupcakes/<int:cupcake_id>", methods = ["PATCH"])
def update_cupcake(cupcake_id):

    try:
        cupcake = Cupcake.query.get_or_404(cupcake_id)
        cupcake.flavor = request.json["flavor"]
        cupcake.rating = request.json["rating"]
        cupcake.size = request.json["size"]
        cupcake.image = request.json["image"] or IMAGE
        db.session.add(cupcake)
        db.session.commit()
        print("got cupcake details")
        return (jsonify(cupcake = cupcake.to_JSON()), 201)
    except:
        print("didn't update cupcake")
        abort(404)

@app.route("/api/cupcakes/<int:cupcake_id>", methods = ["DELETE"])
def delete_cupcake(cupcake_id):

    try:
        cupcake = Cupcake.query.get_or_404(cupcake_id)
        db.session.delete(cupcake)
        db.session.commit()

        return (jsonify(message = "Deleted"), 202)
    except:
        abort(404)
    


