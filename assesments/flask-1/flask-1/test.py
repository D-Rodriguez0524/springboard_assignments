from unittest import TestCase
from app import app
import json


class TestConverterApp(TestCase):
    """Unit tests for converter app"""

    # def setUp(self):
    #     self.app = app.test_client()

    def test_hompage_redirect(self):
        """testing redirect"""
        with app.test_client() as client:
            resp = client.get("/")

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, "/conversion")

    def test_hompage_redirect_followed(self):
        """testing to see if redirect is followed correctly"""
        with app.test_client() as client:
            resp = client.get("/", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Welcome to my currencey converter!</h1>', html)

    def test_conversion_form(self):
        """Testing to see if form is presented to the user"""
        with app.test_client() as client:
            resp = client.get("/conversion")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Welcome to my currencey converter!</h1>', html)

    def test_conversion_submit(self):
        """testing api endpoint """
        with app.test_client() as client:

            resp = client.post(
                '/converted', data={'c-from': 'USD', 'c-to': 'USD', 'c-amt': '1'})

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Converted Amount: $ 1", html)
