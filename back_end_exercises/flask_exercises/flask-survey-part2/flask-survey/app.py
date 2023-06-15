from flask import Flask, render_template, request, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

"""Making a responses key to hold the survey session"""
RESPONSES_KEY = "responses"

app = Flask(__name__)
app.config['SECRET_KEY'] = "so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def survey_start():
    """select a servey"""
    return render_template("survey_start.html", survey=survey)


@app.route("/begin", methods=["POST"])
def start_survey():
    """Clear the session of responses."""
    session[RESPONSES_KEY] = []

    return redirect("/questions/0")


@app.route("/questions/<int:qid>")
def show_question(qid):
    """displaying current question"""
    responses = session.get(RESPONSES_KEY)
    
    if (responses is None):
        # accesing question too early
        return redirect("/")
    if (len(responses) == len(survey.questions)):
        # Thank them for answering all the questions
        return redirect("/complete")
    if (len(responses) != qid):
        flash(f"Invalid question id: {qid}")
        return redirect(f"/questions/{len(responses)}")
    question = survey.questions[qid]
    return render_template("questions.html", question_num=qid, question=question)


@app.route("/answer", methods=["POST"])
def handle_question():
    """saving response and redirecting to next question"""
    choice = request.form['answer']

    # adding response to the session
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(survey.questions)):
        # Thank them for answering all the questions
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")


@app.route("/complete")
def complete():
    """Survey complete. Show completion page."""

    return render_template("completion.html")
