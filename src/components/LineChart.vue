<script>
    import { Line } from 'vue-chartjs'
    export default {
        props: [
          'array',
          'index',
          'max'
        ],
        extends:Line,
        name:"LineChart",
        mounted(){
            this.setChart();
        },
        watch: {
            array(n) {
                this.setChart();
            }
        },
        methods: {
          setChart() {
              this.dataCollection.labels = this.index;
              this.dataCollection.datasets[0].data = this.array.solar;
              this.dataCollection.datasets[1].data = this.array.load;
              this.dataCollection.datasets[2].data = this.array.grid;
              this.dataCollection.datasets[3].data = this.array.batteryDischarge;
              this.dataCollection.datasets[4].data = this.array.batteryCharge;
              this.dataCollection.datasets[5].data = this.array.batteryVoltage;

              if(this.max){
                  this.options.scales.yAxes[0].ticks.max = this.max;
                  this.options.scales.yAxes[0].ticks.stepSize = this.max/4;
              }

              this.renderChart(this.dataCollection, this.options);
          }
        },
        data() {
            return {
                dataCollection:{
                    labels: ["00:00","01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00",
                             "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
                             "18:00","19:00", "20:00","21:00","22:00","23:00","24:00"],
                    datasets:[
                        {
                            label: "Solar",
                            yAxisID: 'y-axis-1',
                            backgroundColor: '#ffc400',
                            borderColor: '#ffc400', //window.chartColors.blue,
                            // data: solar_array,
                            borderWidth: 2,
                            tension: 0,
                            pointBorderWidth: 0.5,
                            pointRadius: 1.3,
                            fill: false,
                        },
                        {
                            label: "Load",
                            // yAxisID: 'y-axis-1',
                            backgroundColor: '#ff5f60',
                            borderColor: '#ff5f60',
                            // data: load_array,
                            borderWidth: 2,
                            tension: 0,
                            pointBorderWidth: 0.5,
                            pointRadius: 1.3,
                            fill: false,
                        },
                        {
                            label: "Grid Use",
                            // yAxisID: 'y-axis-1',
                            backgroundColor: '#81e8fb',
                            borderColor: '#81e8fb',
                            borderWidth: 2,
                            tension: 0,
                            pointBorderWidth: 0.5,
                            pointRadius: 1.3,
                            fill: false,
                        },
                        {
                            label: "Battery DisCharge",
                            yAxisID: 'y-axis-1',
                            backgroundColor: "#798fd2",
                            borderColor: "#798fd2",
                            borderWidth: 2,
                            tension: 0,
                            pointBorderWidth: 0.5,
                            pointRadius: 1.3,
                            fill: false,
                        },
                        {
                            label: "Battery Charge",
                            yAxisID: 'y-axis-1',
                            backgroundColor: "#da9672",
                            borderColor: "#da9672",
                            borderWidth: 2,
                            tension: 0,
                            pointBorderWidth: 0.5,
                            pointRadius: 1.3,
                            fill: false,
                        },
                        {
                            label: "Battery Voltage",
                            yAxisID: 'y-axis-2',
                            backgroundColor: "#439672",
                            borderColor: "#439672",
                            borderWidth: 2,
                            tension: 0,
                            pointBorderWidth: 0.5,
                            pointRadius: 1.3,
                            fill: false,
                        }
                    ]
                },
                options: {
                    tooltips: {
                        mode: 'x'
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: false //,
                        //text: chart_title,
                        // fontSize: 18
                    },
                    scales: {
                        yAxes: [{
                            id: 'y-axis-1',
                            gridLines: {
                                drawBorder: false,
                                color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
                            },
                            position: 'left',
                            ticks: {
                                min: 0,
                                max: 40,
                                stepSize: 10
                            }
                        }, {
                            gridLines: {
                                drawBorder: true,
                                color: ['#1b5e20', '#2e7d32', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
                                // borderDash :[5,15],
                                // color: '#a5d6a7 '
                            },
                            id: 'y-axis-2',
                            position: 'right',
                            ticks: {
                                min: 46,
                                max: 58,
                                //stepSize: 2
                            }
                        }]
                    },
                    legend:{
                        display:true
                    },
                }
            }
        },
    }
</script>
