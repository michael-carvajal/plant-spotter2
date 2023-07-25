from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..mongoDB import users_collection

class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])

    def validate_email(self, field):
        # Checking if user exists
        email = field.data
        user = users_collection.find_one({'email': email})
        if user is None:
            raise ValidationError('Email provided not found.')
        print('email is working')

    def validate_password(self, field):
        # Checking if password matches
        password = field.data
        email = self.email.data
        user = users_collection.find_one({'email': email})
        print('checking password', user)
        if user is None:
            raise ValidationError('No such user exists.')
        print(password, '======', user['password'])
        print(password == user['password'])
        if user['password'] != password:
            print('passoword is nooo goood')
            raise ValidationError('Password was incorrect.')
