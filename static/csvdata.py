import csv

filename = '../data/Avocado_v4.csv'

with open(filename, 'r') as csvfile:
    datareader = csv.reader(csvfile)
    x = set()
    for row in datareader:
        print(row)
