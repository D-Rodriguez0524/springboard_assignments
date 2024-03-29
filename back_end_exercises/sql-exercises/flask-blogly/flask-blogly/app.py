"""Blogly application."""

from flask import Flask, request, render_template,  redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "SO_SECRET"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)


connect_db(app)
db.create_all()


@app.route('/')
def root():
    """HomePage Redirect to list of users"""
    return redirect("/users")


@app.route('/users')
def users():
    """Show page with all the users"""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('index.html', users=users)


@app.route('/users/new', methods=["GET"])
def users_new_form():
    """show a form to create a new users"""
    return render_template('new.html')


@app.route("/users/new", methods=["POST"])
def users_new():
    """handle submission of the creating new user form"""
    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        image_url=request.form['image_url'] or None
    )
    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")


@app.route('/users/<int:user_id>')
def users_show(user_id):
    """show the specific users info"""
    user = User.query.get_or_404(user_id)
    return render_template('show_users.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def users_update(user_id):
    """Handle form submission for updating an existing user"""

    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()

    return redirect("/users")


@app.route('/users/<int:user_id>/delete')
def users_delete(user_id):
    """Handle submission for deleting an exsisting user"""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")
