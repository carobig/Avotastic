# Hier werden die Daten der Avocados importiert.
import csv

# Benennung der CSV-Datei.
filename = '../data/Avocado_v6.csv'

# Daten werden als read-only geöffnet.
with open(filename, 'r') as csvfile:
    # Datensatz wird von einem CSV-File in ein Dictionary-Reader umgewandelt und mit der Funktion "delimiter" werden die Daten nach ";" unterteilt.
    datareader = csv.DictReader(csvfile, delimiter=';')
    # Alle Daten werden in eine Liste geladen.
    data = list(datareader)
    # Daten werden ausgegeben.
    print(data)
