<script>
    import { Line } from 'vue-chartjs'
    export default {
        extends:Line,
        name:"DetailChart",
        props: [
            'label',
            'color',
            'array',
            'index',
            'max'
        ],
        mounted(){
            this.dataCollection.datasets[0].backgroundColor = this.color;
            this.dataCollection.datasets[0].borderColor = this.color;
            this.dataCollection.datasets[0].data = this.array;
            if(this.max){
                this.options.scales.yAxes[0].ticks.max = this.max;
                this.options.scales.yAxes[0].ticks.stepSize = this.max/4;
            }

            this.renderChart(this.dataCollection, this.options)
        },
        watch: {
          color(n) {
                this.dataCollection.datasets[0].backgroundColor = n;
                this.dataCollection.datasets[0].borderColor = n;
          },
          array(n) {
                this.dataCollection.labels = this.index;
                this.dataCollection.datasets[0].data = this.array;
                this.$data._chart.update();
          },
          max(n) {
              if(this.max){
                  this.options.scales.yAxes[0].ticks.max = this.max;
                  this.options.scales.yAxes[0].ticks.stepSize = this.max/4;
                  this.renderChart(this.dataCollection, this.options);
              }
          }
        },
        data(){
            return{
                dataCollection:{
                    labels: this.index,
                    datasets:[
                        {
                            label: this.label,
                            yAxisID: 'y-axis-1',
                            backgroundColor: this.color,
                            borderColor: this.color, //window.chartColors.blue,
                            data: this.array,
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
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            id: 'y-axis-1',
                            gridLines: {
                                drawBorder: false,
                                color: ['#dddddd']
                            },
                            position: 'left',
                            ticks: {
                                min: 0,
                                max: 4,
                                stepSize: 2
                            }
                        }]
                    },
                    legend:{
                        display:true
                    },
                }
            }
        }
    }
</script>

<style lang="stylus">
#line-chart
    height 140px !important

.total
    #line-chart
        height 240px !important

.chart-container
    height unset !important
</style>