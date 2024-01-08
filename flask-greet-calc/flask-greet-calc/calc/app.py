from flask import Flask, request
from operations import *

app = Flask(__name__)

@app.route("/add")
def add_params():
    "returns adds two numbers based on the parameter on the page."
    
    a = request.args["a"]
    b = request.args["b"]
    return f"{add(int(a), int(b))}"

@app.route("/sub")
def sub_params():
    "returns difference two numbers based on the parameter on the page"
    
    a = request.args["a"]
    b = request.args["b"]
    return f"{sub(int(a), int(b))}"

@app.route("/mult")
def mult_params():
    "returns product two numbers based on the parameter on the page"
    
    a = request.args["a"]
    b = request.args["b"]
    return f"{mult(int(a), int(b))}"

@app.route("/div")
def div_params():
    "returns division two numbers based on the parameter on the page"
    
    a = request.args["a"]
    b = request.args["b"]
    return f"{div(int(a), int(b))}"

operator = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route("/math/<operation>")
def operate_params(operation):
    " returns the operation between two parameters on the page"

    a = request.args["a"]
    b = request.args["b"]
    return f"{operator[operation](int(a), int(b))}"


