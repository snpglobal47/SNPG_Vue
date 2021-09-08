<template>
    <div class="detail-container" :style="containerStyle">
        <i class="material-icons icon"
        :class="{
        'solar': text==='Solar',
        'load': text==='Load',
        'grid': text==='Grid',
        'battery': text==='Battery'
        }">{{ icon }}</i>
        <div class="title">{{ text }}</div>

        <!-- graph -->
        <detail-chart
                :label="text" :color="iconColor"
                :array="chartArray" :index="chartIndex"></detail-chart>


        <div v-if="text==='Solar'" class="unit-container">
            <unit-value unit="D" :value="value_solar_day"></unit-value>
            <unit-value unit="M" :value="value_solar_month"></unit-value>
            <div style="display:flex;justify-content: center;margin-top:32px">
                <gauge :max="site_info.MAX_Solar" :value="value_solar_current" text="Solar"></gauge>
            </div>

            <!-- graph -->
            <detail-chart
                    :label="text" :color="iconColor"
                    :array="chartArray2" :index="chartIndex2"></detail-chart>

            <div class="value">
                <span style="margin-right:20px">{{value_solar_v}}<span class="unit">V</span></span>
                <span>{{value_solar_a}}<span class="unit">A</span></span>
            </div>

        </div>
        <div v-if="text==='Load'" class="unit-container">
            <unit-value unit="D" :value="value_load_day"></unit-value>
            <unit-value unit="M" :value="value_load_month"></unit-value>
            <unit-value unit="S" :value="value_load_won"></unit-value>
            <div style="display:flex;justify-content: center">
                <gauge :max="site_info.MAX_Load" :value="value_load_current" text="Load"></gauge>
            </div>

            <!-- graph -->
            <detail-chart
                    :label="text" :color="iconColor"
                    :array="chartArray2" :index="chartIndex2"></detail-chart>

            <div class="value">
                <span style="margin-right:16px">{{ld_volt}}<span class="unit">V</span></span>
                <span style="margin-right:16px">{{ld_current}}<span class="unit">A</span></span>
                <span><span class="unit" style="margin-right:4px">PF</span>{{ld_pf}}<span class="unit">%</span></span>
            </div>

        </div>

        <div v-if="text==='Grid'" class="unit-container">
            <unit-value unit="D" :value="value_grid_day"></unit-value>
            <unit-value unit="M" :value="value_grid_month"></unit-value>
            <unit-value unit="S" :value="value_grid_won"></unit-value>
            <div style="display:flex;justify-content: center">
                <gauge :max="site_info.MAX_Grid" :value="value_grid_current" text="Grid"></gauge>
            </div>

            <!-- graph -->
            <detail-chart
                    :label="text" :color="iconColor"
                    :array="chartArray2" :index="chartIndex2"></detail-chart>

            <div class="value">
                <span style="margin-right:16px">{{pm_volt}}<span class="unit">V</span></span>
                <span style="margin-right:16px">{{pm_current}}<span class="unit">A</span></span>
                <span><span class="unit" style="margin-right:4px">PF</span>{{pm_pf}}<span class="unit">%</span></span>
            </div>

        </div>
        <div style="margin:20px auto 0 auto;" v-if="text==='Battery'">
            <div style="width:150px;margin:auto">
                <div class="flex">
                    <battery :value="value_batt_percent"></battery>
                    <div style="text-align:left;margin-left: 20px;font-weight:900;line-height:24px;font-size:18px">
                        <div>{{ value_batt_percent }}<span style="font-weight:100">%</span></div>
                        <div>{{ value_batt_day }}<span style="font-weight:100"> / </span>{{ site_info.MAX_Batt }}</div>
                        <div>{{ value_batt_temperature }} <span style="font-weight:100">℃</span></div>
                    </div>
                </div>
                <gauge :max="site_info.MAX_Batt"
                       :value="value_batt_current" text="Battery"></gauge>
            </div>

            <!-- graph -->
            <detail-chart
                    :label="text" :color="iconColor"
                    :array="chartArray2" :index="chartIndex2"></detail-chart>

            <div class="value">
                <span style="margin-right:20px">{{Battery_voltage}}<span class="unit">V</span></span>
                <span>{{Battery_current}}<span class="unit">A</span></span>
            </div>
        </div>
    </div>

</template>

<script>
    import moment from 'moment'
    import UnitValue from "./unitValue";
    import Battery from "./Battery"
    import GaugePercent from "./GaugePercent"
    import Gauge from "./Gauge"
    import DetailChart from "./DetailChart";

    export default {
        name: "DetailView",
        components: {
            DetailChart,
            UnitValue,
            Battery,
            GaugePercent,
            Gauge,
            moment
        },
        props: ['icon', 'text', 'value','percentage'],
        data() {
            return {
                iconColor: '',
                itvTimer:null,
                emptyColor:'',
                fill:'',

                value_solar_current: 0,
                value_solar_day: 0,
                value_solar_month: 0,
                value_solar_v: 0,
                value_solar_a: 0,

                value_co2: 160.9,
                value_co2_won: 36000,

                value_grid_current: 0,
                value_grid_day: 0,
                value_grid_month: 0,
                value_grid_won: 3000,

                value_load_current: 0,
                value_load_day: 0,
                value_load_month: 0,
                value_load_won: 39000,

                value_batt_percent: 70,
                value_batt_current: 0,
                value_batt_day: 0,
                value_batt_temperature: 21,
                site_info:{},

                ld_volt: 0,
                ld_current: 0,
                ld_pf: 0,

                pm_volt:0,
                pm_current: 0,
                pm_pf : 0,

                Battery_voltage: 0,
                Battery_current: 0,

                chartIndex: [],
                chartArray: [],

                chartIndex2: [],
                chartArray2: [],

            }
        },
        created() {
            this.getSiteInfo();
            this.setTimer();
            this.setTimer2();
            this.calc_money();

        },

        destroyed() {
            clearInterval(this.itvTimer);
            clearInterval(this.itvTimer2);
        },

        computed: {
            containerStyle() {
                let color = '';
                switch (this.text) {
                    case 'Solar':
                        this.iconColor = '#ffc001';
                        break;
                    case 'Grid':
                        this.iconColor = '#80e7fa';
                        break;
                    case 'Load':
                        this.iconColor = '#ff5f5f';
                        break;
                    case 'Battery':
                        this.iconColor = '#7cf28e';
                        break;
                }

                return {
                    backgroundColor: 'white'
                };
            },
            iconStyle() {
                return {
                    color: this.iconColor
                }
            },
            gaugeStyle() {
                let color = '';
                switch(this.text) {
                    case 'Solar':
                        color = '#ffc400';
                        this.emptyColor = '#faebb1';
                        this.fill = {color: '#ffc400'};
                        break;
                    case 'Grid':
                        color = '#81e8fb';
                        this.emptyColor = '#d9f8fe';
                        this.fill = {color: '#81e8fb'};
                        break;
                    case 'Load':
                        color = '#ff5f60';
                        this.emptyColor = '#ffcfcf';
                        this.fill = {color: '#ff5f60'};
                        break;
                    case 'Battery':
                        color = '#7ef38d';
                        this.emptyColor = '#d8fcdc';
                        this.fill = {color: '#7ef38d'};
                        break;
                }

                return {
                    color: color
                };
            }

        },
        methods:{
            getSiteInfo() {
                this.axios.get(this.backendUrl + '/site_info').then( res => {
                    this.site_info = res.data;
                    this.site_info.MAX_Solar /= 1000;
                    this.site_info.MAX_Grid /= 1000;
                    this.site_info.MAX_Load /= 1000;
                    this.site_info.MAX_Batt /= 1000;


                });
            },

            //타이머1
            setTimer() {
                this.itvTimer = setInterval(this.currentEss, 1000);
            },
            currentEss() {
                this.axios.get(this.backendUrl + '/current_ess').then( res => {
                    let total = res.data;

                    //Event
                    if(total.event !== '' && this.$store.getters.alert === false)
                        this.$store.commit('setAlert', total.event);

                    this.value_solar_current = ((total.Solar_input_power1 + total.Solar_input_power2)/1000).toFixed(1);

                    this.value_solar_v = (total.Solar_input_voltage_1+ total.Solar_input_voltage_2).toFixed(1);
                    this.value_solar_a = (total.Solar_input_current_1+ total.Solar_input_current_2).toFixed(1);

                    //Grid
                    this.value_grid_day = (total.pm_import_active_energy - total.grid_daily_import_active_energy).toFixed(1);
                    this.value_grid_month = (total.pm_import_active_energy - total.grid_month_import_active_energy).toFixed(1);
                    this.value_grid_won = this.calc_money(total.pm_import_active_energy - total.grid_month_import_active_energy).toFixed(1);

                    this.value_grid_current = (total.pm_active_pwr/1000).toFixed(1);
                    // this.value_grid_current = pm_import_active_energy - grid_daily_import_active_energy;

                    this.pm_volt = (total.pm_volt).toFixed(1);
                    this.pm_current = (total.pm_current).toFixed(1);
                    this.pm_pf = (total.pm_pf*100).toFixed(1);

                    //Load
                    this.value_load_current = (total.ld_active_pwr / 1000).toFixed(1);
                    this.value_load_day = (total.ld_import_active_energy - total.load_daily_import_active_energy).toFixed(1);
                    this.value_load_month = (total.ld_import_active_energy - total.load_month_import_active_energy).toFixed(1);
                    this.value_load_won = this.calc_money(total.ld_import_active_energy - total.load_month_import_active_energy).toFixed(1);
                    this.ld_volt = (total.ld_volt).toFixed(1);
                    this.ld_current = (total.ld_current).toFixed(1);
                    this.ld_pf = (total.ld_pf*100).toFixed(1);

                    //Battery
                    this.value_batt_current =  (total.Battery_power / 1000).toFixed(1);
                    this.value_batt_percent = ((total.Battery_capacity / (this.site_info.MAX_Batt*1000))*100).toFixed(1);
                    this.value_batt_temperature = total.Inner_temperature;
                    this.value_batt_day = (total.Battery_capacity /= 1000).toFixed(1);

                    this.Battery_voltage = (total.Battery_voltage).toFixed(1);
                    this.Battery_current = (total.Battery_current).toFixed(1);

                    //부하월간금액-한전월간금액
                    this.value_co2_won = this.value_load_won-this.value_grid_won;


                    // chart
                    if(this.text === 'Solar') {
                        this.chartArray2.push(
                            (total.Solar_input_power1 + total.Solar_input_power2)/1000
                        );
                    }
                    else if(this.text === 'Load') {
                        this.chartArray2.push(total.ld_active_pwr/1000);
                    }
                    else if(this.text === 'Grid') {
                        this.chartArray2.push(total.pm_active_pwr/1000);
                    }
                    else if(this.text === 'Battery') {
                        this.chartArray2.push(total.Battery_power/1000);
                    }

                    this.chartIndex2.push(moment().format('mm:ss'));
                    if(this.chartIndex2.length>60)
                        this.chartIndex2.splice(0,1);

                    if(this.chartArray2.length>60)
                        this.chartArray2.splice(0,1);
                });
            },
            //타이머2
            setTimer2() {
                this.currentKwhq();
                this.itvTimer2 = setInterval(this.currentKwhq, 5001, true);
            },
            currentKwhq() {
                this.axios.get(this.backendUrl + '/current_kwhq').then( res => {
                    if(res.data.Solar_input_power1.length < 1) return;
                    let total = res.data;

                    this.value_solar_day = ((total.Solar_input_power1.reduce(this.getSum)+
                        total.Solar_input_power2.reduce(this.getSum)) / 1000).toFixed(1);
                    this.value_solar_month = total.solar_month_energy;



                    // chart관련
                    this.chartIndex = [];
                    total.Time.forEach(item => {
                        this.chartIndex.push(item.split(' ')[1].substring(0,5))
                    });

                    this.chartArray = [];
                    if(this.text === 'Solar') {
                        for(let i=0; i<total.Solar_input_power1.length; i++) {
                            this.chartArray.push(
                                (total.Solar_input_power1[i] + total.Solar_input_power2[i])/1000
                            );
                        }
                    }
                    else if(this.text === 'Load') {
                        total.ld_active_pwr.forEach( val => {
                            this.chartArray.push(val/1000);
                        });
                    }
                    else if(this.text === 'Grid') {
                        total.pm_active_pwr.forEach( val => {
                            this.chartArray.push(val/1000);
                        });
                    }
                    else if(this.text === 'Battery') {
                        total.Battery_power.forEach( val => {
                            this.chartArray.push(val/1000);
                        });

                    }
                });
            }
        }

    }
</script>

<style lang="stylus" scoped>
.detail-container
    border-radius 24px
    width 240px
    padding 12px 16px

.detail-header
    position relative
    margin-bottom 16px
    .title
        text-align center
        color #7e7e7e
        font-size 22px
        font-weight 200
.icon
    font-size 28px
    margin-top 4px

.title
    color #555555
    font-size 24px
    margin-top -2px
    margin-bottom 20px

.solar
    color #ffc400

.grid
    color #81e8fb

.load
    color #ff5f60

.battery
    color #7ef38d

.value
    font-weight 600
    font-size 18px
    margin-top 8px
.unit
    font-weight 200
    margin-left 2px

.unit-container
    margin-top 8px
</style>