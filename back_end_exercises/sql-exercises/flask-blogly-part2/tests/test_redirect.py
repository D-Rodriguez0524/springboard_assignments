from app import app
from unittest import TestCase

class RootTest(TestCase):
    """testing homepage redirect"""
    def test_root(self):
        with app.test_client() as client:
            resp = client.get('/')

            self.assertEqual(resp.status_code, 302)
    
    def test_redirection_followed(self):
        """testing if the redirect is followed"""
        with app.test_client() as client:
            resp = client.get('/', follow_redirects = True)

            self.assertEqual(resp.status_code, 200)
            