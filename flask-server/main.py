from itertools import combinations_with_replacement
from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/api/v1/', methods=['GET'])
def hello():
    return "Hello world!"


@app.route("/api/v1/json", methods=['GET'])
def json_response():
    value = request.args.get('value')
    response = jsonify(value=value)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/test')
def get_test():
    """GET in server"""
    response = jsonify(message="Simple server is running")

    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/api/v1/config", methods=['GET'])
def config_response():
    numbers = request.args.get('numbers')
    order = request.args.get('order')
    index_list = [str(i+1) for i in range(int(numbers))]
    #frequency_list = {'omega__'+str(k+1):'' for k in range(int(numbers))}
    frequency_list = [{'index':i+1, 'value':''} for i in range(int(numbers))]
    #const_list = {'A__'+''.join(i):'' for i in combinations_with_replacement('ijk', int(numbers))}
    const_list = sum([[{'index': ''.join(i), 'value':''} for i in combinations_with_replacement(''.join(index_list), j+3)] for j in range(int(order))],[])
    data = {
        'frequency_list': frequency_list,
        'const_list' : const_list
    }

    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
