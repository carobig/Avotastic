
//PREISENTWICKLUNG VON AVOCADOS

// BERECHNUNG

$.get("data", function (result) {
  const getAllPrices = (year, type) =>
    result
      .filter((e) => parseInt(e.year) === parseInt(year) && e.type === type)
      .map((e) => parseFloat(e["AveragePrice"]))
      .reduce((sum, newValue, e) => sum + parseFloat(newValue), 0)//.then();

  const PRconventional15 = (getAllPrices(2015, "conventional"))/2756;
  const PRorganic15 = (getAllPrices(2015, "organic"))/2755;
  const PRconventional16 = (getAllPrices(2016, "conventional"))/2756;
  const PRorganic16 = (getAllPrices(2016, "organic"))/2756;
  const PRconventional17 = (getAllPrices(2017, "conventional"))/2809;
  const PRorganic17 = (getAllPrices(2017, "organic"))/2807;
  const PRconventional18 = (getAllPrices(2018, "conventional"))/636;
  const PRorganic18 = (getAllPrices(2018, "organic"))/636;

  Highcharts.chart('preisentwicklung-chart', {

    title: {
        text: ' '
    },

    yAxis: {
        title: {
            text: 'Druchschn. Verkaufspreis'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2015 to 2018',
            categories: ['2015', '2016', '2017', '2018']
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2015
        }
    },

    series: [{
        name: 'Convetional',
        data: [PRconventional15, PRconventional16, PRconventional17, PRconventional18]
    }, {
        name: 'Organic',
        data: [PRorganic15, PRorganic16, PRorganic17, PRorganic18]
    }],

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


// VERKAUFSMENGE

//Berechnungen

$.get("data", function (result) {
  const getAllVolumes = (year, type) =>
    result
      .filter((e) => parseInt(e.year) === parseInt(year) && e.type === type)
      .map((e) => e["Total Volume"])
      .reduce((sum, newValue) => sum + parseInt(newValue), 0);

  const conventional15 = getAllVolumes(2015, "conventional");
  const organic15 = getAllVolumes(2015, "organic");
  const conventional16 = getAllVolumes(2016, "conventional");
  const organic16 = getAllVolumes(2016, "organic");
  const conventional17 = getAllVolumes(2017, "conventional");
  const organic17 = getAllVolumes(2017, "organic");
  const conventional18 = getAllVolumes(2018, "conventional");
  const organic18 = getAllVolumes(2018, "organic");

  //Chart-Template
  Highcharts.chart('menge', {
    chart: {
        type: 'column'
    },
    title: {
        text: ' '
    },
    xAxis: {
        categories: ['2015', '2016', '2017', '2018']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Totale Menge verkaufter Avocados'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Conventional',
        data: [conventional15, conventional16, conventional17, conventional18]
    }, {
        name: 'Organic',
        data: [organic15, organic16, organic17, organic18],
    },
    ],
  });
});


//VERKAUF PRO US-BUNDESSTAAT

//Eventhandler für Slider
$("#yearslider").on("change", function(){
    // Jahreszahl von Slider holen
    let year = $(this).val()

    //Daten für ein bestimmtes Jahr holen - Daten sind dann in result
    $.get("dataperyear?year=" + year, function(result){
        //mit den Daten die Map darstellen - result bei Data
        Highcharts.mapChart('region', {

            chart: {
                map: 'countries/us/us-all',
                borderWidth: 1
            },
            title: {
                text: 'Menge der verkauften Avocados (in Tausend)'
            },
            exporting: {
                sourceWidth: 600,
                sourceHeight: 500
            },
            mapNavigation: {
                enabled: true
            },
            colorAxis: {
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
            series: [{
                //hier werden die Daten eingetragen
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


    //console.log(year)
});