from flask import Flask, jsonify, render_template, request
from collections import defaultdict
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
    #jsonify wandelt Daten in JSON Daten um

@app. route('/dataperyear', methods=['GET'])
def dataperyear():
    #Jahr aus dem Request holen
    year = request.args.get("year")

    #Alle Zeilen für das Jahr holen
    filtereddata = [row for row in data if row["year"] == year]

    #dictonary erzeugen, volume für jeden Bundesstaat berechnen
    d = defaultdict(lambda: 0)
    for row in filtereddata:
        d[row["Kuerzel"]] += (float(row["Total Volume"])/1000)

    #Daten aus dictonary in richtiges Format bringen
    liste = []
    for code, value in d.items():
        liste.append({"value":value, "code":code})

    #versenden der Daten
    return jsonify(liste)

if __name__ == '__main__':
    app.run(debug=True, port=5000)