from unittest import TestCase

from flask import *
from models import *
from app import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.drop_all()
db.create_all()


class test_app(TestCase):
    """testing main routes in the app"""

    def setUp(self):
        Post.query.delete()
        User.query.delete()

    def tearDown(self):
        """clears db session"""
        db.session.rollback()

#########################################################
# TESTING USERS ROUTES
#########################################################

    def test_show_users(self):
        """testing to see if users are added ot user page"""
        with app.test_client() as client:
            tony = User(first_name="tony", last_name="h")
            emily = User(first_name="emily", last_name="h")
            johnny = User(first_name="johnny", last_name="h")

            db.session.add(tony)
            db.session.add(emily)
            db.session.add(johnny)
            db.session.commit()

            res = client.get('/', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn("tony h", html)
            self.assertIn("emily h", html)
            self.assertIn("johnny h", html)

    def test_user_page(self):
        """Testing to see if right user is shown on the page"""
        with app.test_client() as client:
            tony = User(first_name="tony", last_name="h")

            db.session.add(tony)
            db.session.commit()

            res = client.get(f'/users/{tony.id}')
            html = res.get_data(as_text=True)

            self.assertIn("tony h", html)

    def test_delete_user(self):
        """Testing if user will be sucessfuly deleted"""
        with app.test_client() as client:
            tony = User(first_name="tony", last_name="h")

            db.session.add(tony)
            db.session.commit()

            res = client.get(f'/users/{tony.id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertNotIn("tony h", html)

#############################################
# TESTING POST ROUTES
#############################################
    def test_post_page(self):
        """Testing that the right post is shown"""
        with app.test_client() as client:
            tony = User(first_name="tony", last_name="h")

            db.session.add(tony)
            db.session.commit()

            post = Post(title="testing",
                        content="testing post", user_id=tony.id)

            db.session.add(post)
            db.session.commit()

            res = client.get(f'/posts/{post.id}')
            html = res.get_data(as_text=True)

            self.assertIn("testing", html)
            self.assertIn("testing post", html)
            # self.assertIn(post.user.full_name(), html)
            self.assertIn("Delete", html)

    def test_add_post(self):
        """Testing if post adds to database"""
        with app.test_client() as client:
            tony = User(first_name="tony", last_name="h")

            db.session.add(tony)
            db.session.commit()

            res = client.post(f'/users/{tony.id}/posts/new',
                              data={"title": "testing more",
                                    "content": "testing some more"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn("testing more", html)

    def test_delete_post(self):
        with app.test_client() as client:
            tony = User(first_name="tony", last_name="h")

            db.session.add(tony)
            db.session.commit()

            post = Post(title="testing delete", content="something here")

            res = client.get(f'/posts/{post.id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertNotIn("testing delete", html)
