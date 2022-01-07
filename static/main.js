// Hier werden alle Funktionen für die verschiedenen Ansichten definiert.

// Funktionen für Ansicht 1: Preisentwicklung, Funktionsname: Result.
$.get("data", function (result) {
  // der Ablauf der Funktion wird in eine Variabel mittels Const gespeichert.
  const getAllPrices = (year, type) =>
    // Funktion durchläuft die einzelnen Strings des Datensatz.
    result
      // Durchsucht den String ob die mitgegeben Werte beim Datensatz stimmen.
      .filter((e) => parseInt(e.year) === parseInt(year) && e.type === type)
      // wenn ja, wählt sie den gwünschten Wert des Datensatz aus.
      .map((e) => parseFloat(e["AveragePrice"]))
      // Wert wird zur Summe der bisherigen Zeilen hinzugerechnet.
      .reduce((sum, newValue, e) => sum + parseFloat(newValue), 0)

  // Für jedes Jahr und Typ wird der entsprechende Wert aus dem Datensatz berechnet. Zudem wird durch die Anzahl datensätze gerechnet um Durchschnitt zu erhalten.
  const PRconventional15 = (getAllPrices(2015, "conventional"))/2756;
  const PRorganic15 = (getAllPrices(2015, "organic"))/2755;
  const PRconventional16 = (getAllPrices(2016, "conventional"))/2756;
  const PRorganic16 = (getAllPrices(2016, "organic"))/2756;
  const PRconventional17 = (getAllPrices(2017, "conventional"))/2809;
  const PRorganic17 = (getAllPrices(2017, "organic"))/2807;
  const PRconventional18 = (getAllPrices(2018, "conventional"))/636;
  const PRorganic18 = (getAllPrices(2018, "organic"))/636;

// Definition des Highcharts-Templates für Grafik.
  Highcharts.chart('preisentwicklung-chart', {

    // Titel = Grafik ohne Titel
    title:
    {
        text: ' '
    },
    // Y-Achse = Durchschnittlicher Verkaufspreis
    yAxis:
    {
        title: {
            text: 'Durchschn. Verkaufspreis'
        }
    },
    // X-Achse = Zeitspanne von 2015 bis 2018
    xAxis:
    {
        accessibility: {
            rangeDescription: 'Range: 2015 to 2018',
            categories: ['2015', '2016', '2017', '2018']
        }
    },

    // Definition der Legende der Grafik.
    legend:
    {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    // Die erste Jahreszahl der Legende lautet: 2015.
    plotOptions:
    {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2015
        }
    },
    // Daten werden hier nach Typ eingegeben.
    series: [
    {
        name: 'Convetional',
        data: [PRconventional15, PRconventional16, PRconventional17, PRconventional18]
    },
    {
        name: 'Organic',
        data: [PRorganic15, PRorganic16, PRorganic17, PRorganic18]
    }],
    // Responsive Design wird definiert.
    responsive: {
        rules: [{
            condition: {
                maxWidth: 600
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

  });
}); 


// Funktionen für Ansicht 2: Verkaufsmenge, Funktionsname: Result.
$.get("data", function (result) {
  // der Ablauf der Funktion wird in eine Variabel mittels Const gespeichert.
  const getAllVolumes = (year, type) =>
    // Funktion durchläuft die einzelnen Strings des Datensatz.
    result
      // Durchsucht den String ob die mitgegeben Werte beim Datensatz stimmen.
      .filter((e) => parseInt(e.year) === parseInt(year) && e.type === type)
      // wenn ja, wählt sie den gwünschten Wert des Datensatz aus.
      .map((e) => e["Total Volume"])
      // Wert wird zur Summe der bisherigen Zeilen hinzugerechnet.
      .reduce((sum, newValue) => sum + parseInt(newValue), 0);

  // Für jedes Jahr und Typ wird der entsprechende Wert aus dem Datensatz berechnet.
  const conventional15 = getAllVolumes(2015, "conventional");
  const organic15 = getAllVolumes(2015, "organic");
  const conventional16 = getAllVolumes(2016, "conventional");
  const organic16 = getAllVolumes(2016, "organic");
  const conventional17 = getAllVolumes(2017, "conventional");
  const organic17 = getAllVolumes(2017, "organic");
  const conventional18 = getAllVolumes(2018, "conventional");
  const organic18 = getAllVolumes(2018, "organic");

  // Definition des Highcharts-Templates für Grafik.
  Highcharts.chart('menge',
    {
    chart:
    {
        type: 'column'
    },
    // Titel = Grafik ohne Titel
    title:
    {
        text: ' '
    },
    // X-Achse = Jahreszahlen von 2015 bis 2018
    xAxis:
    {
        categories: ['2015', '2016', '2017', '2018']
    },
    // Y-Achse = Totale Menge verkaufter Avocados
    yAxis:
    {
        min: 0,
        title:
        {
            text: 'Totale Menge verkaufter Avocados'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend:
    {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip:
    {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions:
    {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    // Hier werden die Daten eingelesen.
    series: [
    {
        name: 'Conventional',
        data: [conventional15, conventional16, conventional17, conventional18]
    }, {
        name: 'Organic',
        data: [organic15, organic16, organic17, organic18],
    },
    ],
  });
});


// Funktionen für Ansicht 3: Verkauf pro US-Bundesstaat
// Eventhandler für Slider.
$("#yearslider").on("change", function(){
    // Jahreszahl von Slider wird geholt.
    let year = $(this).val()
    // Daten werden für ein bestimmtes Jahr geholt und werden in result geladen.
    $.get("dataperyear?year=" + year, function(result)
    {
        // Mit den Daten wird die Länderkarte dargestellt.
        Highcharts.mapChart('region',
        {
            chart:
            {
                map: 'countries/us/us-all',
                borderWidth: 1
            },
            title:
            {
                text: 'Menge der verkauften Avocados (in Tausend)'
            },
            exporting:
            {
                sourceWidth: 600,
                sourceHeight: 500
            },
            mapNavigation:
            {
                enabled: true
            },
            colorAxis:
            {
                min: 1000,
                type: 'logarithmic',
                minColor: '#edfded',
                maxColor: '#006400',
                stops: [
                    [0, '#edfded'],
                    [0.6, '#7ef17e'],
                    [1, '#006400']
                ]
            },
            // Hier werden die Daten eingetragen.
            series: [{
                data: result,
                joinBy: ['postal-code', 'code'],
                tooltip: {
                    pointFormat: '{point.code}: {point.value}'
                },
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.code}'
                },
                name: 'Menge der verkauften Avocados',
            }]
        })
    });
});