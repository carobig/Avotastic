


// Static 1: PREISENTWICKLUNG VON AVOCADOS

$.get("data", function (result) {
  const getAllPrices = (year, type) =>
    result
      .filter((e) => parseInt(e.year) === parseInt(year) && e.type === type)
      .map((e) => e["AveragePrice"])
      //.reduce((sum, newValue, e) => sum + parseFloat(newValue)/e.length, 0);

  const PRconventional15 = getAllPrices(2015, "conventional");
  const PRorganic15 = getAllPrices(2015, "organic");
  const PRconventional16 = getAllPrices(2016, "conventional");
  const PRorganic16 = getAllPrices(2016, "organic");
  const PRconventional17 = getAllPrices(2017, "conventional");
  const PRorganic17 = getAllPrices(2017, "organic");
  const PRconventional18 = getAllPrices(2018, "conventional");
  const PRorganic18 = getAllPrices(2018, "organic");

console.log(PRconventional15)
console.log(PRorganic15.length)
console.log(PRconventional16.length)
console.log(PRorganic16.length)
console.log(PRconventional17.length)
console.log(PRorganic17.length)
console.log(PRconventional18.length)
console.log(PRorganic18.length)

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
            rangeDescription: 'Range: 2015 to 2018'
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

// Static 2: VERKAUF PRO REGION IN DEN USA

$.get("data", function (result) {
  const getAllVolumesByState = (Kuerzel) =>
    result
      .filter((e) => e.Kuerzel === Kuerzel)
      .map((e) => e["Total Volume"])
      .reduce((sum, newValue) => sum + parseInt(newValue), 0);

  const AK = (getAllVolumesByState("AK"))/1000;
  const AL = (getAllVolumesByState("AL"))/1000;
  const AZ = (getAllVolumesByState("AZ"))/1000;
  const CA = (getAllVolumesByState("CA"))/1000;
  const CO = (getAllVolumesByState("CO"))/1000;
  const CT = (getAllVolumesByState("CT"))/1000;
  const FL = (getAllVolumesByState("FL"))/1000;
  const GA = (getAllVolumesByState("GA"))/1000;
  const ID = (getAllVolumesByState("ID"))/1000;
  const IL = (getAllVolumesByState("IL"))/1000;
  const IN = (getAllVolumesByState("IN"))/1000;
  const KY = (getAllVolumesByState("KY"))/1000;
  const LA = (getAllVolumesByState("LA"))/1000;
  const MA = (getAllVolumesByState("MA"))/1000;
  const MD = (getAllVolumesByState("MD"))/1000;
  const ME = (getAllVolumesByState("ME"))/1000;
  const MI = (getAllVolumesByState("MI"))/1000;
  const MO = (getAllVolumesByState("MO"))/1000;
  const MS = (getAllVolumesByState("MS"))/1000;
  const NC = (getAllVolumesByState("NC"))/1000;
  const NM = (getAllVolumesByState("NM"))/1000;
  const NV = (getAllVolumesByState("NV"))/1000;
  const NY = (getAllVolumesByState("NY"))/1000;
  const OH = (getAllVolumesByState("OH"))/1000;
  const OR = (getAllVolumesByState("OR"))/1000;
  const PA = (getAllVolumesByState("PA"))/1000;
  const SC = (getAllVolumesByState("SC"))/1000;
  const TN = (getAllVolumesByState("TN"))/1000;
  const TX = (getAllVolumesByState("TX"))/1000;
  const VA = (getAllVolumesByState("VA"))/1000;
  const WA = (getAllVolumesByState("WA"))/1000;

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
            min: 1,
            type: 'logarithmic',
            minColor: '#edfded',
            maxColor: '#006400',
            stops: [
                [0, '#edfded'],
                [5000000, '#7ef17e'],
                [10000000, '#006400']
            ]
        },
        series: [{
            data: [{
                "value": FL,"code": "FL"},{
                "value": NY,"code": "NY"},{
                "value": AK,"code": "AK"},{
                "value": AL,"code": "AL"},{
                "value": AZ,"code": "AZ"},{
                "value": CA,"code": "CA"},{
                "value": CO,"code": "CO"},{
                "value": CT,"code": "CT"},{
                "value": FL,"code": "FL"},{
                "value": GA,"code": "GA"},
            ],
            joinBy: ['postal-code', 'code'],
            tooltip: {
                pointFormat: '{point.code}: {point.value}/km²'
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


// Static 3: MENGE DER VERKAUFTEN AVOCADOS IM VERLAUF DER ZEIT

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