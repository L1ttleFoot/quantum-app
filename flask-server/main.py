from itertools import combinations_with_replacement
from flask import Flask, request, jsonify
from functions import constant_gen
from functions import constant_gen_new
import Recurrence_Relations

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/api/v1/calculation', methods=['POST'])
def get_test():
    request_data = request.get_json(force = True)
    #eng = Recurrence_Relations.AE_BD([0, 0, 0], [0, 0, 0], 2)
    #print('zamena = ',Recurrence_Relations.ZAMENA)
    #print(eng)
    #print(eng.subs(Recurrence_Relations.ZAMENA))
    constant_gen_new.constant_gen(request_data['n'], request_data['omega'], request_data['const'])
    print('data',request_data['const'])

    response = jsonify(message="Simple server is running")
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
