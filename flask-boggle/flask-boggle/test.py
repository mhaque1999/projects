from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def setUp(self):
        """Setup before every test."""

        self.client = app.test_client()
        app.config["TESTING"] = True

    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""

        with self.client:
            response = self.client.get("/")
            self.assertIsNone(session.get("high_score"))
            self.assertIsNone(session.get("num_of_plays"))
            self.assertIn("board",session)

    
    def test_not_on_board_word(self):
        """Test for words in the dictionary"""

        self.client.get("/")
        response = self.client.get("/check_guess?word=pan")
        self.assertEqual(response.json['result'], "not-on-board")

    def test_not_word(self):
        """Test for words not in the dictionary"""

        self.client.get('/')
        response = self.client.get('/check_guess?word=asd')
        self.assertEqual(response.json['result'], 'not-word')

    def test_word_on_board(self):
        """Test if words can be found on the board"""

        with self.client as client:
            with client.session_transaction() as test_session:
                test_session['board'] = [["Z", "Z", "Z", "Z", "Z"], 
                                 ["Z", "P", "Z", "Z", "Z"], 
                                 ["Z", "A", "Z", "Z", "Z"], 
                                 ["Z", "N", "Z", "Z", "Z"], 
                                 ["Z", "Z", "Z", "Z", "Z"]]
                                 
        response = self.client.get('/check_guess?word=pan')
        self.assertEqual(response.json['result'], 'ok')
        response = self.client.get('/check_guess?word=nza')
        self.assertEqual(response.json['result'], 'not-word')
        response = self.client.get("/check_guess?word=car")
        self.assertEqual(response.json['result'], "not-on-board")

