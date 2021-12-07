from flask import Flask, jsonify, render_template
from csvdata import *

app = Flask(__name__)

data = datareader

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