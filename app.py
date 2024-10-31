import os
from flask import Flask

app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

@app.route("/")
def index(): 
   return "<h1>Loading....</h1>"