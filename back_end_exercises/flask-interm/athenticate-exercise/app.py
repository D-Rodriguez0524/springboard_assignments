from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.exceptions import Unauthorized
from models import connect_db, db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, DeleteForm

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config["SECRET_KEY"] = "SO_SECRET"

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)


@app.route('/')
def homepage():
    """redirect to register page"""
    return redirect('/register')


@app.route('/register', methods=["GET", "POST"])
def register():
    """Promt user with a register or login page"""

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        user = User.register(username=username, email=email,
                             password=password, last_name=last_name, first_name=first_name)

        db.session.commit()
        session["username"] = user.username

        return redirect(f"/users/{user.username}")

    return render_template("users/register_form.html", form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    """handle login information"""

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session["username"] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ["BAD NAME/PASSWORD"]
            return render_template('users/login_form.html', form=form)

    return render_template("users/login_form.html", form=form)


@app.route('/logout')
def logout():
    """logout route"""
    session.pop('username')
    return redirect("/login")


@app.route('/users/<username>')
def show_user(username):
    """show the user a example page"""
    if "username" not in session or username != session["username"]:
        raise Unauthorized()

    user = User.query.get(username)
    form = DeleteForm()

    return render_template('users/show.html', user=user, form=form)


@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    """propmpt user to delete user and feedback"""
    if "username" not in session or username != session["username"]:
        raise Unauthorized()

    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop("username")

    flash(f"you have deleted user {user.username}")
    return redirect('/login')


@app.route('/users/<username>/feedback/add', methods=["GET", "POST"])
def add_feedback(username):
    """display form to add feedback and then redirect to /users/<username>"""
    if "username" not in session or username != session["username"]:
        raise Unauthorized()

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(
            title=title,
            content=content,
            username=username
        )

        db.session.add(feedback)
        db.session.commit()

        flash("You have added feedback")
        return redirect(f'/users/{feedback.username}')

    return render_template("feedback/new.html", form=form)


@app.route('/feedback/<int:feedback_id>/update', methods=["GET", "POST"])
def update_feedback(feedback_id):
    """handle update feedback form submission"""

    feedback = Feedback.query.get_or_404(feedback_id)

    if "username" not in session or feedback.username != session["username"]:
        raise Unauthorized()

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        flash(f"feedback is now updated")
        return redirect(f'/users/{feedback.username}')

    return render_template('/feedback/edit.html', form=form, feedback=feedback)


@app.route('/feedback/<int:feedback_id>/delete', methods=["POST"])
def delete_feedback(feedback_id):
    """delete users feedback"""

    feedback = Feedback.query.get_or_404(feedback_id)
    if "username" not in session or feedback.username != session["username"]:
        raise Unauthorized()

    form = DeleteForm()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(f"/users/{feedback.username}")
