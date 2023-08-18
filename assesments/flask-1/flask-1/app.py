from flask import Flask, request, render_template, redirect, flash
import requests
from flask_debugtoolbar import DebugToolbarExtension

from forex_python.converter import CurrencyCodes

url_get = 'https://api.exchangerate.host/latest'

symbols = requests.get(url_get, params="symbols")

app = Flask(__name__)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config["SECRET_KEY"] = "SOOOOOO_SECRET"
toolbar = DebugToolbarExtension(app)


@app.route('/')
def homepage():
    """redirect user to form"""
    return redirect('/conversion')


@app.route('/conversion', methods=["GET"])
def convert_form():
    """pompt user with conversion form and get data from form"""

    return render_template('index.html')


@app.route('/converted', methods=["POST"])
def converted_amt():
    """show user converted amount"""

    CF = request.form["c-from"]
    CT = request.form["c-to"]
    amt = request.form["c-amt"]

    if CT != CT.upper() or CF != CF.upper():
        flash("Please make sure you capitalize the abbreviations")
        return redirect('/conversion')
    
    response = requests.get(
        'https://api.exchangerate.host/convert?',
        params={"from": CF, "to": CT, "amount": amt, "places": 2})
    data = response.json()

    result = data.get("result")
    symbols = CurrencyCodes().get_symbol(CT)

    flash("Thank you for using my converter!")

    return render_template('index.html', result=result, symbols=symbols)
