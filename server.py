# Import von Flask.
from flask import Flask, jsonify, render_template, request
from collections import defaultdict
# Import CSV-Datei mit Daten.
import csv

# Benennung der CSV-Datei.
filename = 'data/Avocado_v6.csv'

# Daten der Avocados werden eingelesen.
with open(filename, 'r') as csvfile:
    # Daten aus 'data/Avocado_v6.csv' werden in ein Dictionary konvertiert und einzelne Datenfelder werden durch ';' getrennt,
    datareader = csv.DictReader(csvfile, delimiter=';')
    # Daten werden als Liste abgespeichert.
    data = list(datareader)


app = Flask(__name__)

# Funktionen der Startseite.
@app. route('/', methods=['GET'])
def index():
    return render_template('index_avotastic.html')

# Funktion jsonify wandelt Daten in JSON-Daten um, Route besteht um Korrektes Datenauslesen zu überprüfen
@app. route('/data', methods=['GET'])
def dataview():
    return jsonify(data)

# Funktionen für das Volumen der Daten für ein Jahr.
@app. route('/dataperyear', methods=['GET'])
def dataperyear():
    # Hier wird das Jahr aus dem Request geholt.
    year = request.args.get("year")

    # Alle Zeilen für das Jahr werden geholt.
    filtereddata = [row for row in data if row["year"] == year]

    # Hier wird ein Dictionary erzeugt und das Volumen für jeden Bundesstaat berechnet. Der Wert ist 0.
    d = defaultdict(lambda: 0)
    for row in filtereddata:
        # Kuerzel steht für Abkürzung des Bundesstaates. Diesen wird jeweils das Volumen der verkaufen Avocados zugeordnet.
        # Volumen wird durch 1000 geteilt, damit die Kommastellen der Zahl sich verkleinern für mehr Übersichtlichkeit.
        d[row["Kuerzel"]] += (float(row["Total Volume"])/1000)

    # Hier wird die Liste erstellt, die im main.js in den Graphen geladen werden kann.
    liste = []
    for code, value in d.items():
        # Der Wert und Code wird der Liste angehängt.
        liste.append({"value":value, "code":code})

    # Funktion jsonify wandelt Daten in JSON-Daten um und gibt sie wieder als Liste zurück.
    return jsonify(liste)

if __name__ == '__main__':
    app.run(debug=True, port=5000)