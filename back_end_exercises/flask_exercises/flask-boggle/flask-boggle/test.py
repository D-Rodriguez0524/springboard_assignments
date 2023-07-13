from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    # todo -- write tests for every view function / feature!
    def setUp(self):
        """Stuff to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """make sure info is stored in the session and HTML is displayed"""
        with self.client:
            response = self.client.get("/")
            self.assertIn('board', session )
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('numplays'))
            self.assertIn(b'High Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds left:', response.data)
            
        
    def test_valid_word(self):
          """testing if word is valid by modifying the board in the session"""
          with self.client as client:
            with client.session_transaction() as sess:
              sess['board'] = [["C", "A", "T", "T", "T"],
                               ["C", "A", "T", "T", "T"],
                               ["C", "A", "T", "T", "T"],
                               ["C", "A", "T", "T", "T"],
                               ["C", "A", "T", "T", "T"]]
            response = self.client.get("/check-word?word=cat")
            self.assertEqual(response.json['result'], 'ok')

    def test_invalid_word(self):
          """Test if word input is in the dictionary"""
          self.client.get('/')
          response = self.client.get(
              '/check-word?word=impossible')
          self.assertEqual(response.json['result'], 'not-on-board')

    def test_english_word(self):
          """testing if the word input is on the board"""
          self.client.get('/')
          response = self.client.get('/check-word?word=bdhbwaldbabdlbdawbd')
          self.assertEqual(response.json['result'], 'not-word')

    def test_handle_submit(self):
        response = self.client.get('/')

        self.assertEqual(response.status_code, 200)
        