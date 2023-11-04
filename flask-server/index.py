from itertools import combinations_with_replacement, combinations, product
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import sympy as sy
import json

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

    n_list_sy = []
    for i in range(len(n_list)):
        n_list_sy.append(sy.symbols(n_list[i]))

    n_dict, omega_dict, const_dict, dipole_dict = dict_gen(n_list_sy, omegas, consts, constsType, dipoleX)

    complete_dict = {**n_dict, **omega_dict, **const_dict, **dipole_dict}

    dict_dipole_X = dict_dipole_x_gen(dipoleX)
    dict_dipole_Y = dict_dipole_y_gen(dipoleY)
    dict_dipole_Z = dict_dipole_z_gen(dipoleZ)

    complete_dict_keys = dict([(i.name,i) for i in complete_dict])

    resonans = RR.Resonance(states, complete_dict, order, n_list_sy, complete_dict_keys)

    print(resonans)

    def dipole(a,b):
        dipole = RR.MEDMF_BD(a, b, order, n_list_sy, complete_dict_keys)

        dipole_n = dipole.subs(n_dict)
        dipole_c = dipole_n.subs({**omega_dict, **const_dict,})

        X = dipole_c.subs(dict_dipole_X)
        Y = dipole_c.subs(dict_dipole_Y)
        Z = dipole_c.subs(dict_dipole_Z)

        return (((X**2+Y**2+Z**2)**(1/2))*1000)

    result = [{'transition': f"000 > {''.join([str(value) for value in key])}",
               'energy': eval(str(values)),
               'matrix': str(dipole([0,0,0], list(key)))} for key, values in resonans.items()]

    k = [key for key in resonans.keys()]

    for i in range(len(list(combinations(k,2)))):
        result.append({'transition':f'{"".join([str(value) for value in list(combinations(k,2))[i][0]])} > {"".join([str(value) for value in list(combinations(k,2))[i][1]])}',
                'energy': eval(str(resonans[list(combinations(k,2))[i][0]]))-eval(str(resonans[list(combinations(k,2))[i][1]])),
                'matrix': str(dipole(list(list(combinations(k,2))[i][0]), list(list(combinations(k,2))[i][1])))})


    response = make_response(json.dumps(result))
    response.headers.add("Access-Control-Allow-Origin", "*")

    constant_gen.constant_gen(n_list, omegas, consts, dipoleX, dipoleY, dipoleZ, constsType, order)

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
