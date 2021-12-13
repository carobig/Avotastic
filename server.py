from flask import Flask, jsonify, render_template
import csv

#SERVER
filename = 'data/Avocado_v6.csv'

with open(filename, 'r') as csvfile:
    datareader = csv.DictReader(csvfile, delimiter=';')
    data = list(datareader)
    #print(data)


app = Flask(__name__)

@app. route('/', methods=['GET'])
def index():

    return render_template('index_avotastic.html')

@app. route('/data', methods=['GET'])
def dataview():
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, port=5000)