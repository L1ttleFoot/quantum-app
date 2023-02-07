from itertools import combinations_with_replacement
from flask import Flask, request, jsonify
from flask_cors import CORS
import sympy as sy
from numpy import sqrt

# from const_new import *
import constant_gen
import Recurrence_Relations

from dict_gen import dict_gen, dict_dipole_x_gen, dict_dipole_y_gen, dict_dipole_z_gen


app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = False
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def home():
    return "It's quantum app home page"


@app.route('/api/v1/calculation', methods=['GET', 'POST'])
def get_calculation():
    request_data = request.get_json(force=True)

    complete_dict = dict_gen(request_data['numbers2'], request_data['omegas'], request_data['consts'], request_data['constsType'], request_data['dipoleX'])

    dict_dipole_X = dict_dipole_x_gen(request_data['dipoleX'])
    dict_dipole_Y = dict_dipole_y_gen(request_data['dipoleY'])
    dict_dipole_Z = dict_dipole_z_gen(request_data['dipoleZ'])

    complete_dict_keys = dict([(i.name,i) for i in complete_dict])
    dict_dipole_keys = dict([(i.name,i) for i in dict_dipole_X])

    n_dict = {}
    for i in range(len(request_data['numbers2'])):
        n_dict[sy.symbols('n_' + str(request_data['numbers2'][i]['letIndex']))] = 0

    n_list1 = [int(item['value']) for item in request_data['numbers1']]
    n_list2 = [int(item['value']) for item in request_data['numbers2']]

    n_str1 = ''.join([item['value'] for item in request_data['numbers1']])
    n_str2 = ''.join([item['value'] for item in request_data['numbers2']])

    # energy = Recurrence_Relations.AE_BD(n_list, n_list, 2)
    energy = sum([Recurrence_Relations.AE_BD(n_list2, n_list2, i, n_dict, complete_dict_keys) for i in range(request_data['order'] + 1)])
    energy -= sum([Recurrence_Relations.AE_BD(n_list1, n_list1, i, n_dict, complete_dict_keys) for i in range(request_data['order'] + 1)])

    #dipole = Recurrence_Relations.MEDMF(n_list2, n_list2, 2, n_dict, complete_dict_keys)
   
    #dipole = Recurrence_Relations.MEDMF(n_list1, n_list2, 2, n_dict, complete_dict_keys)
    
    #X = dipole.subs({**complete_dict,**dict_dipole_X})
    #Y = dipole.subs({**complete_dict,**dict_dipole_Y})
    #Z = dipole.subs({**complete_dict,**dict_dipole_Z})

    X=0.01
    Y=0
    Z=0

    response = jsonify(transition='%s > %s' % (n_str1, n_str2), energy='%s' % (energy.subs(complete_dict)), matrix='%s' % (((X**2+Y**2+Z**2)**(1/2))*1000))
    response.headers.add("Access-Control-Allow-Origin", "*")

    constant_gen.constant_gen(request_data['numbers2'], request_data['omegas'], request_data['consts'], request_data['dipoleX'], request_data['dipoleY'], request_data['dipoleZ'], request_data['constsType'], request_data['order'])

    return response

@app.route('/api/v1/calculation_resonans', methods=['GET', 'POST'])
def get_resonans():
    request_data = request.get_json(force=True)

    complete_dict = dict_gen(request_data['numbers2'], request_data['omegas'], request_data['consts'], request_data['constsType'], request_data['dipoleX'])

    complete_dict_keys = dict([(i.name,i) for i in complete_dict])

    n_dict = {}
    for i in range(len(request_data['numbers2'])):
        n_dict[sy.symbols('n_' + str(request_data['numbers2'][i]['letIndex']))] = 0

    n_list1 = [int(item['value']) for item in request_data['numbers1']]
    n_list2 = [int(item['value']) for item in request_data['numbers2']]

    n_str1 = ''.join([item['value'] for item in request_data['numbers1']])
    n_str2 = ''.join([item['value'] for item in request_data['numbers2']])

    resonans = Recurrence_Relations.Resonance([n_list1, n_list2], complete_dict, request_data['order'], n_dict, complete_dict_keys)

    X=0.01
    Y=0
    Z=0

    response = jsonify(transition='%s > %s' % (n_str1, n_str2), energy='%s' % (sum([eval(str(i)) for i in resonans.values()])), matrix='%s' % (((X**2+Y**2+Z**2)**(1/2))*1000))
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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
