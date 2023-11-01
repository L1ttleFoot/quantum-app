from itertools import combinations_with_replacement, combinations
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import sympy as sy
import json
import pickle

import firebase_admin
from firebase_admin import credentials, db

import os
from dotenv import load_dotenv


import constant_gen
import Recurrence_Relations as RR

from dict_gen import dict_gen, dict_dipole_x_gen, dict_dipole_y_gen, dict_dipole_z_gen

load_dotenv()
FIREBASE_CONFIG = os.environ.get("FIREBASE_CONFIG")


if not firebase_admin._apps:
    cred = credentials.Certificate(json.loads(FIREBASE_CONFIG))
    my_app = firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://quantum-app-4b8ae-default-rtdb.europe-west1.firebasedatabase.app'
    })


print(firebase_admin._apps)
print('start')

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def home():
    return "It's quantum app home page"


@app.route('/api/v1/calculation', methods=['GET', 'POST'])
def get_calculation():

    request_data = request.get_json(force=True)

    n_list = request_data["nList"]
    states = request_data["states"]
    order = request_data["order"]
    freedomDegrees = request_data["freedomDegrees"]
    omegas = request_data['omegas']
    consts = request_data['consts']
    constsType = request_data['constsType']
    dipoleX = request_data['dipoleX']
    dipoleY = request_data['dipoleY']
    dipoleZ = request_data['dipoleZ']

    n_l = []
    for i in range(len(n_list)):
        n_l.append(sy.symbols(n_list[i]))

    complete_dict = dict_gen(n_l, omegas, consts, constsType, dipoleX, False)

    dict_dipole_X = dict_dipole_x_gen(dipoleX)
    dict_dipole_Y = dict_dipole_y_gen(dipoleY)
    dict_dipole_Z = dict_dipole_z_gen(dipoleZ)

    complete_dict_keys = dict([(i.name,i) for i in complete_dict])
    dict_dipole_keys = dict([(i.name,i) for i in dict_dipole_X])

    resonans = RR.Resonance(states, complete_dict, order, n_l, complete_dict_keys)

    result = [{'transition': f"000 > {''.join([str(value) for value in key])}",
               'energy': eval(str(values)),
               'matrix': 10} for key, values in resonans.items()]

    k = [key for key in resonans.keys()]

    for i in range(len(list(combinations(k,2)))):
        result.append({'transition':f'{"".join([str(value) for value in list(combinations(k,2))[i][0]])} > {"".join([str(value) for value in list(combinations(k,2))[i][1]])}',
                'energy': eval(str(resonans[list(combinations(k,2))[i][0]]))-eval(str(resonans[list(combinations(k,2))[i][1]])),
                'matrix':10})

    X=0.01
    Y=0
    Z=0

    response = make_response(json.dumps(result))
    response.headers.add("Access-Control-Allow-Origin", "*")

    constant_gen.constant_gen(n_list, omegas, consts, dipoleX, dipoleY, dipoleZ, constsType, order)

    return response

@app.route('/api/v1/calculation_resonans', methods=['GET', 'POST'])
def get_resonans():
    request_data = request.get_json(force=True)

    complete_dict = dict_gen(request_data['numbers2'], request_data['omegas'], request_data['consts'], request_data['constsType'], request_data['dipoleX'], False)

    complete_dict_keys = dict([(i.name,i) for i in complete_dict])

    n_dict = {}
    for i in range(len(request_data['numbers2'])):
        n_dict[sy.symbols('n_' + str(request_data['numbers2'][i]['letIndex']))] = 0

    #n_list1 = [int(item['value']) for item in request_data['numbers1']]
    #n_list2 = [int(item['value']) for item in request_data['numbers2']]

    #n_str1 = ''.join([item['value'] for item in request_data['numbers1']])
    #n_str2 = ''.join([item['value'] for item in request_data['numbers2']])

    resonans = RR.Resonance([[0,1,0], [1,0,0], [0,0,1]], complete_dict, request_data['order'], n_dict, complete_dict_keys)

    result = [{'transition': f"000 > {''.join([str(value) for value in key])}",
               'energy': eval(str(values)),
               'matrix': 10} for key, values in resonans.items()]

    k = [key for key in resonans.keys()]

    for i in range(len(list(combinations(k,2)))):
        result.append({'transition':f'{"".join([str(value) for value in list(combinations(k,2))[i][0]])} > {"".join([str(value) for value in list(combinations(k,2))[i][1]])}',
                'energy': eval(str(resonans[list(combinations(k,2))[i][0]]))-eval(str(resonans[list(combinations(k,2))[i][1]])),
                'matrix':10})

    X=0.01
    Y=0
    Z=0

    print(result)

    #response = jsonify(transition='%s > %s' % (n_str1, n_str2), energy='%s' % (sum([eval(str(i)) for i in resonans.values()])), matrix='%s' % (((X**2+Y**2+Z**2)**(1/2))*1000))
    response = make_response(json.dumps(result))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/api/v1/config", methods=['GET'])
def config_response():

    freedomDegrees = request.args.get('freedomDegrees')
    order = request.args.get('order')

    index_list = [str(i + 1) for i in range(int(freedomDegrees))]
    omegas_list = [{'index': i + 1, 'value': ''} for i in range(int(freedomDegrees))]
    consts_list = sum([[{'index': ''.join(i), 'value': '', 'var': 'const'} for i in
                        combinations_with_replacement(''.join(index_list), j + 3)] for j in range(int(order))], [])
    dipole_list_x = sum([[{'index': ''.join(i), 'value': '0', 'var': 'dipoleX'} for i in
                        combinations_with_replacement(''.join(index_list), j + 1)] for j in range(int(order)+1)], [])

    dipole_list_y = sum([[{'index': ''.join(i), 'value': '0', 'var': 'dipoleY'} for i in
                        combinations_with_replacement(''.join(index_list), j + 1)] for j in range(int(order)+1)], [])

    dipole_list_z = sum([[{'index': ''.join(i), 'value': '0', 'var': 'dipoleZ'} for i in
                        combinations_with_replacement(''.join(index_list), j + 1)] for j in range(int(order)+1)], [])

    data = {
        'omegas_list': omegas_list,
        'consts_list': consts_list,
        'dipole_list_x': dipole_list_x,
        'dipole_list_y': dipole_list_y,
        'dipole_list_z': dipole_list_z
    }

    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/v1/get_file', methods=['GET', 'POST'])
def get_file():
    request_data = request.get_json(force=True)

    constant_gen.constant_gen(request_data['nList'], request_data['omegas'], request_data['consts'], request_data['dipoleX'], request_data['dipoleY'], request_data['dipoleZ'], request_data['constsType'], request_data['order'])

    return send_file('/tmp/const.py',)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
