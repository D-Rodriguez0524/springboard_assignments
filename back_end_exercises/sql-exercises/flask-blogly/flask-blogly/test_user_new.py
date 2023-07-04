from app import app
from unittest import TestCase

class UsersNewTest(TestCase):
    """Testing route to make new user"""

    def test_users_new(self):
        with app.test_client() as client:
            resp = client.get('/users/new',
                              data = {'first_name': 'noname', 
                                      'last_name': 'me', 
                                      'image_url': None})

            self.assertEqual(resp.status_code, 200)
            