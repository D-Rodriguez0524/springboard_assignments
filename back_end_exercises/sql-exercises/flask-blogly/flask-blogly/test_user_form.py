from app import app
from unittest import TestCase

class UsersFormTest(TestCase):
    """testing if form submission is handled correctly"""
    def test_user_form(self):
        with app.test_client() as client:
            resp = client.get('users/new')

            self.assertEqual(resp.status_code, 200)