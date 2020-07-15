from flask import Flask,render_template,Response,request,redirect,session,jsonify
from jinja2 import Template

import json
from flask_session import Session

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True

app.config['SESSION_TYPE'] = "filesystem"
app.config["SESSION_FILE_DIR"] = "sess"
app.config["SESSION_PERMANENT"] = True
app.secret_key = "secretkey"

# Session(app)

# Make sure no response is cached
@app.after_request
def after_request(response):

	response.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate'
	response.headers['Expires'] = 0
	response.headers['Pragma'] = 'no-cache'
	response.headers["Set-Cookie"] = "HttpOnly;Secure;SameSite=Strict"


	return response


@app.route('/')
def home():
	return render_template('index.html')










