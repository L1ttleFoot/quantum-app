from itertools import combinations_with_replacement
from flask import Flask, request, jsonify

import constant_gen_new
import Recurrence_Relations

from dict_gen import dict_gen

app = Flask(__name__)
app.config["DEBUG"] = False

# @app.route('/api/v1/calculation', methods=['POST'])
# def get_test():
#     request_data = request.get_json(force = True)
#
#     constant_gen_new.constant_gen(request_data['numbers2'], request_data['omegas'], request_data['consts'], request_data['constsType'])
#
#     complete_dict = dict_gen(request_data['numbers2'], request_data['omegas'], request_data['consts'], request_data['constsType'])
#
#     n_list1 = [int(item['value']) for item in request_data['numbers1']]
#     n_list2 = [int(item['value']) for item in request_data['numbers2']]
#
#     n_str1 = ''.join([item['value'] for item in request_data['numbers1']])
#     n_str2 = ''.join([item['value'] for item in request_data['numbers2']])
#
#     constType = request_data['constsType']
#
#     #energy = Recurrence_Relations.AE_BD(n_list, n_list, 2)
#     energy = sum([Recurrence_Relations.AE_BD(n_list2, n_list2, i) for i in range(3)])
#     energy -= sum([Recurrence_Relations.AE_BD(n_list1, n_list1, i) for i in range(3)])
#
#     response = jsonify(transition='%s > %s'%(n_str1, n_str2) , energy='%s'%(energy.subs(complete_dict)))
#     # Enable Access-Control-Allow-Origin
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response


@app.route("/api/v1/config", methods=['GET'])
def config_response():
    freedomDegrees = request.args.get('freedomDegrees')
    order = request.args.get('order')
    # constant_gen.constant_gen(int(freedomDegrees), int(order))
    index_list = [str(i+1) for i in range(int(freedomDegrees))]
    omegas_list = [{'index':i+1, 'value':''} for i in range(int(freedomDegrees))]
    consts_list = sum([[{'index': ''.join(i), 'value':'', 'var': 'const'} for i in combinations_with_replacement(''.join(index_list), j+3)] for j in range(int(order))],[])
    data = {
        'omegas_list': omegas_list,
        'consts_list': consts_list
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
