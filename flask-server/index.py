from itertools import combinations_with_replacement, combinations
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import sympy as sy
from sympy import sqrt
import json
import pickle

import os
from dotenv import load_dotenv
load_dotenv()

FIREBASE_CONFIG = os.environ.get("FIREBASE_CONFIG")

import firebase_admin
from firebase_admin import credentials, db

if not firebase_admin._apps:
    cred = credentials.Certificate(json.loads(FIREBASE_CONFIG))
    my_app = firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://quantum-app-4b8ae-default-rtdb.europe-west1.firebasedatabase.app'
})


import constant_gen
import Recurrence_Relations as RR


from dict_gen import dict_gen, dict_dipole_x_gen, dict_dipole_y_gen, dict_dipole_z_gen


app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

def getVector(ket, ind):

    print('here Vector')

    if(db.reference("/").get()==None):
        return None

    ref = db.reference("/Vector")

    vector = ref.get()

    if(vector==None):
        return None

    if(vector==''):
        return None

    for key, value in vector.items():
        if('ket' in value and 'ind' in value and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            return pickle.loads(eval(value['v']))

    return None

def insertVector(ket, ind, v):

    if(db.reference("/").get()==None):
        db.reference("/").update({'Vector':''})

    if(db.reference("/Vector").get()==None):
        db.reference("/").update({'Vector':''})

    ref = db.reference("/Vector")

    vector = ref.get()

    if(vector==None):
        return None

    if(vector==''):
        ref.push().update({'ket':''.join(str(x) for x in ket), 'ind': ind, 'v': str(pickle.dumps(v))})
        return

    for key, value in vector.items():
        if('ket' in value and 'ind' in value and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            break
    else:
        ref.push().update({'ket':''.join(str(x) for x in ket), 'ind': ind, 'v': str(pickle.dumps(v))})

    return

def getEnergy(bra, ket, ind):

    print('here Energy')

    if(db.reference("/").get()==None):
        return None

    ref = db.reference("/Energy")

    energy = ref.get()

    if(energy==None):
        return None

    if(energy==''):
        return None

    #(key==f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}" альтернативный поиск

    for key, value in energy.items():
        if('bra' in value and 'ket' in value and 'ind' in value and 
            value["bra"] == ''.join(str(x) for x in bra) and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            return pickle.loads(eval(value['e']))

    return None

def insertEnergy(bra, ket, ind, e):

    if(db.reference("/").get()==None):
        db.reference("/").update({'Energy':''})

    if(db.reference("/Energy").get()==None):
        db.reference("/").update({'Energy':''})

    ref = db.reference("/Energy")

    energy = ref.get()

    if(energy==''):
        ref.push().set({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))})
        return

    for key, value in energy.items():
        if('bra' in value and 'ket' in value and 'ind' in value and 
            value["bra"] == ''.join(str(x) for x in bra) and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            break
    else:
        ref.push().update({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))})
        #ref.update({f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}":{'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))}})

    return

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

    energy = sum([RR.AE(n_list2, n_list2, i, n_dict, complete_dict_keys) for i in range(request_data['order'] + 1)])
    energy -= sum([RR.AE(n_list1, n_list1, i, n_dict, complete_dict_keys) for i in range(request_data['order'] + 1)])

    #energy1 = sum([RR.AE(n_list2, n_list2, i, n_dict, complete_dict_keys) for i in range(request_data['order'] + 1)])
    #energy2 = sum([RR.AE(n_list1, n_list1, i, n_dict, complete_dict_keys) for i in range(request_data['order'] + 1)])

    print(energy.subs(complete_dict))

    #dipole = RR.MEDMF(n_list1, n_list2, 2, n_dict, complete_dict_keys)

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

    resonans = RR.Resonance([n_list1, n_list2], complete_dict, request_data['order'], n_dict, complete_dict_keys)

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

    constant_gen.constant_gen(request_data['numbers2'], request_data['omegas'], request_data['consts'], request_data['dipoleX'], request_data['dipoleY'], request_data['dipoleZ'], request_data['constsType'], request_data['order'])

    return send_file('/tmp/const.py',)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
