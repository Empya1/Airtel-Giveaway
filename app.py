import os
from flask import Flask

app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

@app.route("/")
def index(): 
   return """
<html>
<head>
<meta name="monetag" content="15979f5775dc4b7c41da037cbc3f7bc1">
</head>
<body>
<h1>Loading....</h1>
</body>
</html
"""