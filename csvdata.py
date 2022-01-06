import csv

filename = '../data/Avocado_v5.csv'

with open(filename, 'r') as csvfile:
    datareader = csv.DictReader(csvfile, delimiter=';')
    #Datensatz mit "delimiter" aufteilen nach ";"
    data = list(datareader)
    print(data)
    #alle Daten in eine grosse Liste laden