from flask import Flask, request, jsonify, render_template
from models import Cupcake, db, connect_db
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)


"""Flask app for Cupcakes"""


@app.route('/')
def cupcake_homepage():
    """render homepage"""

    return render_template('homepage.html')


@app.route('/api/cupcakes/<int:c_id>')
def show_cupcakes(c_id):
    """list all cupcakes in database"""
    cupcake = Cupcake.query.get_or_404(c_id)
    return render_template('show_cupcake.html', cupcake=cupcake)


@app.route('/api/cupcakes')
def get_cupcake():
    """get data about a specific cupcake"""
    cupcake = Cupcake.query.all()
    serialized = [c.serialize_cupcake() for c in cupcake]
    return jsonify(cupcake=serialized)


@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    """create a new cupcake """
    data = request.json

    cupcake = Cupcake(
        flavor=data["flavor"],
        size=data["size"],
        rating=data["rating"],
        image=data["image"] or None
    )

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=cupcake.serialize_cupcake()), 201)


@app.route('/api/cupcakes/<int:c_id>', methods=["PATCH"])
def update_cupcake(c_id):
    """update a cupcake"""
    data = request.json

    cupcake = Cupcake.query.get_or_404(c_id)

    cupcake.flavor = data["flavor"]
    cupcake.size = data["size"]
    cupcake.rating = data["rating"]
    cupcake.image = data["image"]
    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.serialize_cupcake())


@app.route('/api/cupcakes/<int:c_id>', methods=["DELETE"])
def delete_cupcake(c_id):
    """delete a cupcake"""
    cupcake = Cupcake.query.get_or_404(c_id)
    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="deleted")
