
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
Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-population-density.json', function (data) {

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
});

// Static 3: MENGE DER VERKAUFTEN AVOCADOS IM VERLAUF DER ZEIT
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
        data: [5, 3, 4, 7]
    }, {
        name: 'Organic',
        data: [2, 2, 3, 2]
    }]
});