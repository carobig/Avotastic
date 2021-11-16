from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

data = [
    {"id": 0, "name":"Chur","temperatur": 11},
    {"id": 1,"name":"Zürich","temperatur": 9},
    {"id": 2, "name": "Genf","temperatur": 5}
]

@app. route('/', methods=['GET'])
def index() :
    global data

    return render_template('index.html', data=data)



@app. route('/data', methods=['GET'])
def data() :
    global data

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)