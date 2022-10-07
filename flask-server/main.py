from itertools import combinations_with_replacement
from flask import Flask, request, jsonify
import constant_gen
import constant_gen_new
import Recurrence_Relations
from const_new import ZAMENA

app = Flask(__name__)
app.config["DEBUG"] = False


@app.route('/api/v1/calculation', methods=['POST'])
def get_test():
    request_data = request.get_json(force = True)
    constant_gen_new.constant_gen(request_data['n'], request_data['omega'], request_data['const'], request_data['constType'])

    n_list = [int(d['value']) for d in request_data['n']]

    energy = Recurrence_Relations.AE_BD(n_list, n_list, 2)
    #energy =sum([Recurrence_Relations.AE_BD(n_list, n_list, i) for i in range(3)])
    #energy-=sum([Recurrence_Relations.AE_BD([0,0,0], [0,0,0], i) for i in range(3)])
    #print('zamena = ', ZAMENA)
    #print('energy = ', energy)
    #print('energy_subs = ', energy.subs(ZAMENA))

    response = jsonify(message="Simple server is ", value='%s'%(energy.subs(ZAMENA)))
    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/api/v1/config", methods=['GET'])
def config_response():
    numbers = request.args.get('numbers')
    order = request.args.get('order')
    constant_gen.constant_gen(int(numbers), int(order))
    index_list = [str(i+1) for i in range(int(numbers))]
    #frequency_list = {'omega__'+str(k+1):'' for k in range(int(numbers))}
    frequency_list = [{'index':i+1, 'value':''} for i in range(int(numbers))]
    #const_list = {'A__'+''.join(i):'' for i in combinations_with_replacement('ijk', int(numbers))}
    const_list = sum([[{'index': ''.join(i), 'value':'', 'var': 'const'} for i in combinations_with_replacement(''.join(index_list), j+3)] for j in range(int(order))],[])
    data = {
        'frequency_list': frequency_list,
        'const_list' : const_list
    }

    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
