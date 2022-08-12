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

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
