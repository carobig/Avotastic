import csv

filename = '../data/Avocado_v5.csv'

with open(filename, 'r') as csvfile:
    datareader = csv.DictReader(csvfile, delimiter=';')
    data = list(datareader)
    print(data)
