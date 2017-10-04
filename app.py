from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import db_handler
import json


# app initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisissupposedtobesecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/elahav109995/PycharmProjects/flask_proj/db/database.db'
app.config['SQLALCHEMY_BINDS'] = {'stocks_db':'sqlite:////Users/elahav109995/PycharmProjects/flask_proj/db/stocks_db.db'}
app.config['SECRET_KEY'] = 'super-secret'
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_HASH'] = 'plaintext'
app.debug = True
Bootstrap(app)
db = SQLAlchemy(app)
SOURCES = ['https://seekingalpha.com/', 'https://finance.yahoo.com/', 'http://www.cnbc.com/' , 'https://www.bloomberg.com/']

# stocks DB init
# DB_NAME = 'c:/Users/elahav109995/PycharmProjects/flask_proj/db/stocks_db.db'
# DB = db_handler.DB_Handler()
# DB.create_db(DB_NAME)

# login manager initialization
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# user class
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(80))

# user logging in
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# forms = login and register
class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
    remember = BooleanField('remember me')

class RegisterForm(FlaskForm):
    email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])


# methods
# index
@app.route('/')
def index():
    return render_template('index.html')

# login
@app.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user, remember=form.remember.data)
                return redirect(url_for('dashboard'))
        return '<h1>' + 'Invalid username of password' + '</h1>'
    return render_template('login.html', form=form)

# register new user
@app.route('/signup', methods=['GET','POST'])
def signup():
    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data, method='sha256')
        new_user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return '<h1>' + 'new user has been created' + '</h1>'
    return render_template('signup.html', form=form)

# profile page
@app.route('/dashboard', methods=['GET','POST'])
@login_required
def dashboard():
    # read table from DB

    DB_NAME = 'c:/Users/elahav109995/PycharmProjects/flask_proj/db/stocks_db.db'
    DB = db_handler.DB_Handler()
    DB.create_db(DB_NAME)
    items = DB.read_all_as_dict()
    counter = dict(AMAT=0, BBRY=0, BOFI=0, C=0)


    for item in items:
        # add source logo item
        if item['origin'] == 'https://seekingalpha.com/':
            item['logo'] = '/static/img/source_logo/seeking_alpha.png'
        elif item['origin'] == 'https://finance.yahoo.com/':
            item['logo'] = '/static/img/source_logo/Yahoo-Finance.jpg'
        elif item['origin'] == 'http://www.cnbc.com/':
            item['logo'] = '/static/img/source_logo/cnbc.png'
        elif item['origin'] == 'https://www.bloomberg.com/':
            item['logo'] = '/static/img/source_logo/bloomberg.png'
        else:
            item['logo'] = ''

        # add default printing
        a = item['stock']
        if a == 'AMAT':
            counter['AMAT'] += 1
            if counter['AMAT'] < 5:
                item['default'] = True
            else:
                item['default'] = False
        elif a == 'BOFI':
            counter['BOFI'] += 1
            if counter['BOFI'] < 5:
                item['default'] = True
            else:
                item['default'] = False
        elif a == 'C':
            counter['C'] += 1
            if counter['C'] < 5:
                item['default'] = True
            else:
                item['default'] = False
        elif a == 'BBRY':
            counter['BBRY'] += 1
            if counter['BBRY'] < 5:
                item['default'] = True
            else:
                item['default'] = False

    return render_template('dashboard.html',name=current_user.username, items=items, sources=SOURCES)


# profile page
@app.route('/dashboard/expand', methods=['GET','POST'])
@login_required
def expand():
    # read table from DB

    DB_NAME = 'c:/Users/elahav109995/PycharmProjects/flask_proj/db/stocks_db.db'
    DB = db_handler.DB_Handler()
    DB.create_db(DB_NAME)
    items = DB.read_all_as_dict()
    counter = dict(AMAT=0, BBRY=0, BOFI=0, C=0)

    button_text = request.json['buttonText']


    for item in items:
        # add source logo item
        if item['origin'] == 'https://seekingalpha.com/':
            item['logo'] = "<img src = '/static/img/source_logo/seeking_alpha.png'/>"
        elif item['origin'] == 'https://finance.yahoo.com/':
            item['logo'] = "<img src = '/static/img/source_logo/Yahoo-Finance.jpg'/>"
        elif item['origin'] == 'http://www.cnbc.com/':
            item['logo'] = "<img src = '/static/img/source_logo/cnbc.png'/>"
        elif item['origin'] == 'https://www.bloomberg.com/':
            item['logo'] = "<img src = '/static/img/source_logo/bloomberg.png'/>"
        else:
            item['logo'] = ''

        if button_text == 'More':
            # add show flag to all elements
            item['show'] = True
        elif button_text == 'Less':
            # add show flag only for the first 5 elements of each symbol
            a = item['stock']
            if a == 'AMAT':
                counter['AMAT'] += 1
                if counter['AMAT'] < 5:
                    item['show'] = True
                else:
                    item['show'] = False
            elif a == 'BOFI':
                counter['BOFI'] += 1
                if counter['BOFI'] < 5:
                    item['show'] = True
                else:
                    item['show'] = False
            elif a == 'C':
                counter['C'] += 1
                if counter['C'] < 5:
                    item['show'] = True
                else:
                    item['show'] = False
            elif a == 'BBRY':
                counter['BBRY'] += 1
                if counter['BBRY'] < 5:
                    item['show'] = True
                else:
                    item['show'] = False

    saveToJson(items)

    return jsonify({'name':current_user.username, 'items':items, 'sources':SOURCES})



def saveToJson(items):
    for item in items:
        if item['stock'] == 'AMAT':
            item['name'] = 'Applied Materials'
        elif item['stock'] == 'BOFI':
            item['name'] = 'BOFI Holding Inc'
        elif item['stock'] == 'BBRY':
            item['name'] = 'Blackberry'
        elif item['stock'] == 'C':
            item['name'] = 'Citigroup'

        if item['origin'] == 'https://seekingalpha.com/':
            item['origin'] = 'Seekingalpha'
            item['image'] = 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAPAAAAAJDIzZjdhZDQ4LTU3N2MtNDM1MS1hNmZhLTY2OTAyMzdkMDAzYw.png'
        elif item['origin'] == 'https://finance.yahoo.com/':
            item['origin'] = 'Yahoo'
            item['image'] = 'http://allenmeyerdesign.com/wp-content/uploads/2013/09/new-yahoo-logo.jpg'
        elif item['origin'] == 'http://www.cnbc.com/':
            item['origin'] = 'CNBC'
            item['image'] = 'https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0002/1670/brand.gif?itok=fzU4ESs0'
        elif item['origin'] == 'https://www.bloomberg.com/':
            item['origin'] = 'Bloomberg'
            item['image'] = 'http://www.vault.com/media/9734065/bloomberg-logo.png'

    with open('C:/Users/elahav109995/PycharmProjects/React_Projects/React-Boilerplate-self/dev/js/data/data.json', 'w') as fp:
        json.dump(items, fp)




@app.route('/call_modal', methods=['GET', 'POST'])
def call_modal():
    DB_NAME = 'c:/Users/elahav109995/PycharmProjects/flask_proj/db/stocks_db.db'
    DB = db_handler.DB_Handler()
    DB.create_db(DB_NAME)
    items = DB.read_all_as_dict()

    origin = items['origin']
    return redirect(url_for('dashboard') + '#sourcesModal',origin=origin)


# @app.route('/dashboard/sources', methods=['GET','POST'])
# def sources():
#     return render_template('sources_selection.html')



@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect((url_for('index')))

if __name__ == "__main__":
    app.run(host = '0.0.0.0')
