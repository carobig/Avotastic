const ctx = document.getElementById('LineChart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2015', '2016', '2017', '2018'],
        datasets: [{
            label: 'Organic Avocados',
            lineTension:0.1,
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [],
            borderColor: 'green',
            borderDash:[],
            borderWidth: 2
        },{
            label: 'Conventional Avocados',
            lineTension:0.1,
            data: [6, 14, 2, 3, 4, 8],
            backgroundColor: [],
            borderColor: 'red',
            borderDash:[],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});