from flask import Flask, request

app = Flask(__name__)

@app.route("/welcome")
def welcome_msg():
    "returns a welcome msg on the page"

    return "Welcome"

@app.route("/welcome/home")
def welcome_home_msg():
    "returns a welcome home on the page"

    return "Welcome Home"

@app.route("/welcome/back")
def welcome_back_msg():
    "returns a welcome home on the page"

    return "Welcome Back"

