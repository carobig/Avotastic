from flask import Flask, jsonify, render_template, request
from collections import defaultdict
import csv

# SERVER: Zugriff auf Daten von Avocados.
filename = 'data/Avocado_v6.csv'

# Daten der Avocados werden eingelesen.
with open(filename, 'r') as csvfile:
    # Daten aus 'data/Avocado_v6.csv' werden in ein Dictionary konvertiert und Datenfelder werden durch ';' getrennt,
    datareader = csv.DictReader(csvfile, delimiter=';')
    # Daten werden als Liste abgespeichert.
    data = list(datareader)


app = Flask(__name__)

# HTML wird in server.py eingelesen.
@app. route('/', methods=['GET'])
def index():
    return render_template('index_avotastic.html')

# Funktion jsonify wandelt Daten in JSON Daten um.
@app. route('/data', methods=['GET'])
def dataview():
    return jsonify(data)

# Kommentar ergänzen. ***
@app. route('/dataperyear', methods=['GET'])
def dataperyear():
    # Jahr aus dem Request holen.
    year = request.args.get("year")

    # Alle Zeilen für das Jahr holen.
    filtereddata = [row for row in data if row["year"] == year]

    # Hier wird ein Dictionary erzeugt und das Volumen für jeden Bundesstaat berechnet.
    d = defaultdict(lambda: 0)
    for row in filtereddata:
        # Kuerzel steht für Abkürzung des Bundesstaates. Diesen wird jeweils das Volumen der verkaufen Avocados zugeordnet.
        # Volumen wird durch 1000 geteilt, damit die Kommastellen der Zahl sich verkleinern.
        d[row["Kuerzel"]] += (float(row["Total Volume"])/1000)

    # Daten aus Dictionary werden in richtiges Format umgewandelt.
    liste = []
    for code, value in d.items():
        # Der Wert und Code wird der Liste angehängt.
        liste.append({"value":value, "code":code})

    # Funktion jsonify wandelt Daten in JSON Daten um und gibt sie als Liste zurück.
    return jsonify(liste)

if __name__ == '__main__':
    app.run(debug=True, port=5000)