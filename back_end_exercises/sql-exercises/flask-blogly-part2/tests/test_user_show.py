from app import app
from unittest import TestCase
from models import User

class ShowUserTest(TestCase):
    """testing if users are shown properly"""
    def test_show_users(self):
        with app.test_client() as client:
            resp = client.get('/users')

            self.assertEqual(resp.status_code,200)
            
            


