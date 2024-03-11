"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        print("setup")
        db.drop_all()
        print("drop")
        db.create_all()
        print("create")

        user1 = User.signup("test1","test1@test123.com","asdasd1",None)
        user2 = User.signup("test2","test1@test123.com","asdasd2",None)
        """
        user1 = User(
            email="test1@test123.com",
            username="test1",
            password="asdasd1"
        )

        user2 = User(
            email="test2@test123.com",
            username="test2",
            password="asdasd2"
        )

        db.session.add(user1)
        db.session.commit()
        print("first commit")
        db.session.add(user2)
        db.session.commit()
        """
        db.session.commit()
        print("session commit")
        user1 = User.query.get(user1.id)
        user2 = User.query.get(user2.id)

        self.user1 = user1
        self.user2 = user2
        #User.query.delete()
        #Message.query.delete()
        #Follows.query.delete()

        self.client = app.test_client()

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

    def test_user_follows(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertEqual(len(self.user1.followers), 0)
        self.assertEqual(len(self.user1.following), 1)

        self.assertEqual(self.user1.following[0].id, self.user2.id)

    def test_is_following(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        #user 1 follows user 2
        self.assertTrue(self.user1.is_following(self.user2))
        #user 2 doesnt follow user 1
        self.assertFalse(self.user2.is_following(self.user1))

    def test_is_followed_by(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertTrue(self.user2.is_followed_by(self.user1))
        self.assertFalse(self.user1.is_followed_by(self.user2))

    def test_signup(self):
        test_username = "user1"
        test_password = "asdasd"
        test_email = "test@signup.com"
        test_id = 99999
        user_test = User.signup(test_username, test_email, test_password, None)
        user_test.id = test_id
        db.session.commit()

        u_test = User.query.get(test_id)
        self.assertIsNotNone(user_test)
        self.assertEqual(user_test.username, test_username)
        self.assertEqual(user_test.email, test_email)
        self.assertNotEqual(user_test.password, test_password)

        user_test = User.signup(None, test_email, test_password, None)
        print("test invalid username")
        with self.assertRaises(IntegrityError):
            db.session.commit()

        user_test = User.signup(test_username, "user", test_password, None)
        with self.assertRaises(IntegrityError):
            db.session.commit()

        user_test = User.signup(test_username, test_email, "asd", None)
        with self.assertRaises(ValueError):
            db.session.commit()

    def test_authentication(self):
        user = User.authenticate(self.user1.username, "asdasd1")
        self.assertIsNotNone(user)
        #Not a valid username
        self.assertFalse(User.authenticate("qazwsxedc", "asdasd"))
        #Not a valid password
        self.assertFalse(User.authenticate(self.user1.username, "asd"))
    