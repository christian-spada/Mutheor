from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignUpForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), username_exists])
    email = StringField("email", validators=[DataRequired(), user_exists])
    profile_pic = FileField(
        "profile_pic",
        validators=[
            FileRequired(),
            FileAllowed(list(ALLOWED_EXTENSIONS)),
        ],
    )
    password = StringField("password", validators=[DataRequired()])
