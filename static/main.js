


// Static 1: PREISENTWICKLUNG VON AVOCADOS

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
        data: [43934, 52503, 57177, 69658]
    }, {
        name: 'Organic',
        data: [24916, 24064, 29742, 29851]
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

// Static 2: VERKAUF PRO REGION IN DEN USA

$.get('data', function(result) {
    const resultSliced = result.slice(0,5);
    let stueck = 0
    resultSliced.forEach((e) => {
        //console.log(e);
        if (e['region'] == 'Albany', e['year'] == '2015') {
            stueck = stueck += parseInt(e['Total Volume']);
        }
        //console.log(stueck)
        console.log(e['region'] + ' '+ parseInt(e['Total Volume']) + ' '+ parseInt(e['year']));
    });
    console.log(parseInt(stueck))
});

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
                [0.67, '#7ef17e'],
                [1, '#006400']
            ]
        },
        series: [{
            data: [{
                "value": 438,
                "code": "NJ"
            },
            {
                "value": 387.35,
                "code": "RI"
            },
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

/*Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-population-density.json', function (data) {

    // Make codes uppercase to match the map data
    data.forEach(function (p) {
        p.code = p.code.toUpperCase();
    });

    // Instantiate the map
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

        legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.8)',
            floating: true,
            verticalAlign: 'top',
            y: 25
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
                [0.67, '#7ef17e'],
                [1, '#006400']
            ]
        },

        series: [{
            animation: {
                duration: 1000
            },
            data: data,
            joinBy: ['postal-code', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.code}'
            },
            name: 'Menge der verkauften Avocados',
            tooltip: {
                pointFormat: '{point.code}: {point.value}/km²'
            }
        }]
    });
});*/

// Static 3: MENGE DER VERKAUFTEN AVOCADOS IM VERLAUF DER ZEIT

$.get('data', function(result) {
    const resultSliced = result.slice();
    let conventional15 = 0
    let organic15 = 0
    let conventional16 = 0
    let organic16 = 0
    let conventional17 = 0
    let organic17 = 0
    let conventional18 = 0
    let organic18 = 0
    resultSliced.forEach((e) => {
        //console.log(e);
        if (e['type'] == 'organic' && e['year'] == '2015') {
            organic15 = organic15 += parseInt(e['Total Volume']);
        } else if (e['type'] == 'conventional' && e['year'] == '2015'){
            conventional15 = conventional15 += parseInt(e['Total Volume']);
        } else if (e['type'] == 'conventional' && e['year'] == '2016'){
            conventional16 = conventional16 += parseInt(e['Total Volume']);
        } else if (e['type'] == 'organic' && e['year'] == '2016') {
            organic16 = organic16 += parseInt(e['Total Volume']);
        } else if (e['type'] == 'conventional' && e['year'] == '2017'){
            conventional17 = conventional17 += parseInt(e['Total Volume']);
        } else if (e['type'] == 'organic' && e['year'] == '2017') {
            organic17 = organic17 += parseInt(e['Total Volume']);
        } else if (e['type'] == 'conventional' && e['year'] == '2018'){
            conventional18 = conventional18 += parseInt(e['Total Volume']);
        } else if (e['type'] == 'organic' && e['year'] == '2018') {
            organic18 = organic18 += parseInt(e['Total Volume']);
        }
        //console.log(e['type'] + ' '+ parseInt(e['Total Volume']) + ' '+ parseInt(e['year']));
    });
    console.log('Conventional 2015: ' + conventional15)
    console.log('Organic 2015: ' + organic15)
    console.log('Conventional 2016: ' + conventional16)
    console.log('Organic 2016: ' + organic16)
    console.log('Conventional 2017: ' + conventional17)
    console.log('Organic 2017: ' + organic17)
    console.log('Conventional 2018: ' + conventional18)
    console.log('Organic 2018: ' + organic18)


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
        data: [organic15, organic16, organic17, organic18]
    }]
});
});