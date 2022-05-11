from crypt import methods
from hashlib import algorithms_available
import os
from re import A
from flask import Flask, jsonify, make_response, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import uuid
import jwt
import datetime
from flask_cors import CORS, cross_origin

from user import User
from userPool import UserPool

app = Flask(__name__)
CORS(app)
_user_pool = UserPool()


@app.route('/users/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = data['password']  # need to be hashed
    login_id = data['loginId']
    ownid_data = data['ownIDData']
    new_user = User(login_id=login_id, password=hashed_password, ownid_data=ownid_data)
    if _user_pool.register(new_user):
        return jsonify({'created': True})
    return jsonify({'created': False})


@app.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()
    login_id = data['loginId']
    password = data['password']
    if UserPool().login(login_id, password):
        return jsonify({"logged": True})
    return jsonify({"logged": False})


@app.route('/users/getOwnIDDataByLoginId', methods=['POST', 'GET'])
def get_ownid_data_by_login_id():
    data = request.get_json()
    login_id = data['loginId']
    user = _user_pool.get(login_id)
    if not user:
        return jsonify({'errorCode': 404})
    return jsonify({'ownidData': user.ownid_data})


@app.route('/users/setOwnIDDataByLoginId', methods=['POST', 'GET'])
def set_ownid_data_by_login_id():
    data = request.get_json()
    login_id = data['loginId']
    ownid_data = data['ownIdData']
    user = _user_pool.get(login_id)
    if not user:
        return jsonify({'errorCode': 404})
    user.ownid_data  = ownid_data
    _user_pool.update(user)
    return ('', 204)


@app.route('/users/getSessionByLoginId', methods=['POST', 'GET'])
def get_session_by_login_id():
    data = request.get_json()
    login_id = data['loginId']
    user = _user_pool.get(login_id)
    if not user:
        return jsonify({'errorCode': 404})
    token = jwt.encode({
        'userId': str(user.login_id), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=3)},'secret',
        "HS256")
    return jsonify({'token': token})


if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')
