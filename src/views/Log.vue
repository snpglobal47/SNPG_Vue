<template>

    <div class="log-container">
        <div class="sp-sky">
            <div class="sp-content">
                <div class="log-wrapper-content" style="padding-top: 28px;">
                    <div class="flex">
                        <div class="date-title unselect"
                             :class="{'selected-date-title': dt === dateType}"
                             :key="dt"
                             @click="dateType = dt"
                             v-for="dt in dateTypes">{{ dt }}</div>
                    </div>
                </div>
                <div class="date-container flex" style="width: 156px; margin-top: 15px">
                    <div class="input-date" style="margin-right: 10px;">
                        <datepicker v-if="dateType === 'Daily'"
                                    :format="dailyFormat"
                                    placeholder="Select Day"
                                    name="daily"
                                    v-model="date"
                                    id="date-picker"
                                    :disabledDates="disabledDates"
                                    :minimumView="'day'"
                                    :maximumView="'day'">

                        </datepicker>
                        <datepicker v-if="dateType === 'Monthly'"
                                    :format="monthlyFormat"
                                    placeholder="Select Month"
                                    name="monthly"
                                    id="date-picker"
                                    v-model="date"
                                    :disabledDates="disabledDates"
                                    :minimumView="'month'"
                                    :maximumView="'month'">

                        </datepicker>
                        <datepicker v-if="dateType === 'Annual'"
                                    :format="annualFormat"
                                    placeholder="Select Year"
                                    name="annuly"
                                    id="date-picker"
                                    v-model="date"
                                    :disabledDates="disabledDates"
                                    :minimumView="'year'"
                                    :maximumView="'year'">

                        </datepicker>
                    </div>
                    <div class="input-submit">
                        <button type="submit" value="submit" @click="getLog">Submit</button>
                    </div>
                </div>
                <div class="col-container flex" style="margin-top: 32px;">
                    <div class="sp-col-3" style="position:relative;background-color: #ffffff;">
                        <div style="display: flex;justify-content: center">
                            <log-icon icon="wb_sunny" text="Solar" ></log-icon>
                        </div>
                        <detail-chart
                                label="Solar" :color="typeColor.solar" :max="chartMax"
                                :array="solar.chartArray" :index="chartIndex"></detail-chart>

                        <div class="log-value">
                            <span >{{solar.value}}<span class="unit">Kwh</span></span>
                        </div>
                        <div class="log-value">
                            <span >{{solar.co2}}<span class="unit">tCo2</span></span>
                        </div>

                        <img src="/image/ic_co2.png" class="img-co2">
                    </div>

                    <div class="sp-col-3" style="background-color: #ffffff;">
                        <div style="display: flex;justify-content: center">
                            <log-icon icon="home" text="Load"></log-icon>
                        </div>
                        <detail-chart
                                label="Load" :color="typeColor.load" :max="chartMax"
                                :array="load.chartArray" :index="chartIndex"></detail-chart>

                        <div class="log-value">
                            <span >{{load.value}}<span class="unit">Kwh</span></span>
                        </div>
                        <div class="log-value">
                            <span >{{load.price|currency}}<span class="unit">Won</span></span>
                        </div>
                    </div>

                    <div class="sp-col-3" style="background-color: #ffffff;">
                        <div style="display: flex;justify-content: center">
                            <log-icon  icon="power" text="Grid"></log-icon>
                        </div>
                        <detail-chart
                                label="Grid" :color="typeColor.grid" :max="chartMax"
                                :array="grid.chartArray" :index="chartIndex"></detail-chart>

                        <div class="log-value">
                            <span >{{grid.value}}<span class="unit">Kwh</span></span>
                        </div>
                        <div class="log-value">
                            <span >{{grid.price|currency}}<span class="unit">Won</span></span>
                        </div>

                    </div>


                    <div class="sp-col-3" style="position:relative;background-color: #ffffff;">
                        <div style="display:flex;justify-content: center">
                            <log-icon icon="battery_full" text="Battery"></log-icon>
                        </div>

                        <detail-chart
                                label="Battery" :color="typeColor.battery" :max="chartMax"
                                :array="battery.chartArray" :index="chartIndex"></detail-chart>


                        <div class="log-value">
                            <span >{{grid.price|currency}}<span class="unit">Won</span></span>
                        </div>
                        <img src="/image/ic_money.png" class="img-money">
                    </div>
                </div>
                <div class="chart-container" style="height: 500px;background-color: white;margin-top: 15px;">
                    <div class="total">
                        <line-chart :index="chartIndex" :array="totalArray" :max="chartMax" v-if="vTotal"></line-chart>
                    </div>


                </div>
            </div>
        </div>


    </div>
</template>
<script>

    import moment from 'moment'
    import Gauge from "../components/Gauge";
    import LogIcon from "../components/LogIcon"
    import UnitValue from "../components/unitValue";
    import Battery from "../components/Battery";
    import DetailView from "../components/DetailView";
    import Datepicker from 'vuejs-datepicker';
    import DateInput from "vuejs-datepicker/src/components/DateInput";
    import LineChart from '../components/LineChart'
    import DetailChart from "../components/DetailChart";


    export default {
        name: "log",
        props: {
            year: String,
        },
        components: {
            DetailChart, DateInput, LogIcon, DetailView,
                    Battery, UnitValue, Gauge, Datepicker,LineChart},
        data() {
            return {
                dateTypes: [
                    'Daily',
                    'Monthly',
                    //'Annual'
                ],
                dateType: 'Daily',
                date: null,
                disabledDates: {
                    from: new Date()
                },
                chartIndex: [],
                solar: {
                    chartArray: [],
                    value: 0,
                    co2: 0
                },
                grid: {
                    chartArray: [],
                    value: 0,
                    price: 0
                },
                load: {
                    chartArray: [],
                    value: 0,
                    price: 0
                },
                battery: {
                    chartArray: [],
                    value: 0,
                    price: 0
                },
                vTotal: false,
                totalArray: {
                    solar: [],
                    load: [],
                    grid: [],
                    batteryDischarge: [],
                    batteryCharge: [],
                    batteryVoltage: []
                }
            }
        },
        created() {
            this.disabledDates.from = moment().toDate();
        },
        computed: {
            chartMax() {
                if(this.dateType === 'Daily')
                    return 4;
                else
                    return 40;
            }
        },
        watch: {
          dateType(n) {
              this.solar = {
                  chartArray: [],
                      value: 0,
                      co2: 0
              };
              this.grid = {
                  chartArray: [],
                      value: 0,
                      price: 0
              };
              this.load = {
                  chartArray: [],
                      value: 0,
                      price: 0
              };
              this.battery = {
                  chartArray: [],
                      value: 0,
                      price: 0
              };
              this.chartIndex = [];
              this.vTotal = false;
          }
        },
        methods: {
            dailyFormat(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            monthlyFormat(date) {
                return moment(date).format('YYYY-MM');
            },
            annualFormat(date) {
                return moment(date).format('YYYY');
            },
            getLog() {
                if(this.date === null) return;
                let url = '';
                if(this.dateType === 'Daily') {
                    url = this.backendUrl + '/log_day2?date=' + moment(this.date).format('YYYY-MM-DD');
                } else if (this.dateType === 'Monthly') {
                    url = this.backendUrl + '/log_month?date=' + moment(this.date).format('MM_YYYY');
                }

                this.vTotal = false;

                this.axios.get(url).then( res => {
                   let total = res.data;

                    if(this.dateType === 'Daily') {
                        this.solar.value = ((total.Solar_input_power1.reduce(this.getSum)+
                            total.Solar_input_power2.reduce(this.getSum)) / 1000).toFixed(1);

                        this.solar.co2 = (this.solar.value * 0.5027802).toFixed(1);

                        this.load.value = ((total.ld_import_active_energy.pop() - total.load_daily_import_active_energy)/1000).toFixed(1);
                        this.load.price = this.calc_money(this.load.value);

                        this.grid.value = ((total.pm_import_active_energy.pop() - total.grid_daily_import_active_energy)/1000).toFixed(1);
                        this.grid.price = this.calc_money(this.grid.value);

                        this.battery.price = this.load.price - this.grid.price;

                        //chart
                        this.chartIndex = [];
                        total.Time.forEach(item => {
                            this.chartIndex.push(item.split(' ')[1].substring(0,5))
                        });

                        this.solar.chartArray = [];
                        for(let i=0; i<total.Solar_input_power1.length; i++) {
                            this.solar.chartArray.push(
                                (total.Solar_input_power1[i] + total.Solar_input_power2[i])/1000
                            );
                        }

                        this.load.chartArray = [];
                        total.ld_active_pwr.forEach( val => {
                            this.load.chartArray.push(val/1000);
                        });

                        this.grid.chartArray = [];
                        total.pm_active_pwr.forEach( val => {
                            this.grid.chartArray.push(val/1000);
                        });

                        this.battery.chartArray = [];
                        this.totalArray.batteryCharge = [];
                        this.totalArray.batteryDischarge = [];

                        total.Battery_power.forEach( val => {
                            val /= 1000;
                            this.battery.chartArray.push(val);
                            if(val > 0){
                                this.totalArray.batteryCharge.push(val);
                                this.totalArray.batteryDischarge.push(0);
                            }

                            else {
                                this.totalArray.batteryDischarge.push(val*-1);
                                this.totalArray.batteryCharge.push(0);
                            }
                        });

                        this.totalArray.solar = this.solar.chartArray;
                        this.totalArray.grid = this.grid.chartArray;
                        this.totalArray.load = this.load.chartArray;
                        this.totalArray.batteryVoltage = total.Battery_voltage;
                    }
                    else if(this.dateType === 'Monthly') {
                        this.solar.value = ((total.Solar_input_power1.reduce(this.getSum)+
                            total.Solar_input_power2.reduce(this.getSum)) * 0.024).toFixed(1);

                        this.solar.co2 = (this.solar.value * 0.5027802).toFixed(1);

                        this.load.value = ((total.ld_import_active_energy.pop() - total.load_daily_import_active_energy)*0.024).toFixed(1);
                        this.load.price = this.calc_money(this.load.value);

                        this.grid.value = ((total.pm_import_active_energy.pop() - total.grid_daily_import_active_energy)*0.024).toFixed(1);
                        this.grid.price = this.calc_money(this.grid.value);

                        this.battery.price = this.load.price - this.grid.price;

                        //chart
                        this.chartIndex = [];
                        total.datetime.forEach(item => {
                            this.chartIndex.push(moment(item.replace('T',' ').split('.')[0]).format('MM-DD'));
                        });

                        this.solar.chartArray = [];
                        for(let i=0; i<total.Solar_input_power1.length; i++) {
                            this.solar.chartArray.push(
                                (total.Solar_input_power1[i] + total.Solar_input_power2[i])*0.024
                            );
                        }

                        this.load.chartArray = [];
                        total.ld_active_pwr.forEach( val => {
                            this.load.chartArray.push(val*0.024);
                        });

                        this.grid.chartArray = [];
                        total.pm_active_pwr.forEach( val => {
                            this.grid.chartArray.push(val*0.024);
                        });

                        this.battery.chartArray = [];
                        this.totalArray.batteryCharge = [];
                        this.totalArray.batteryDischarge = [];

                        total.Battery_power.forEach( val => {
                            val *= 0.024;
                            this.battery.chartArray.push(val);
                            if(val > 0){
                                this.totalArray.batteryCharge.push(val);
                                this.totalArray.batteryDischarge.push(0);
                            }

                            else {
                                this.totalArray.batteryDischarge.push(val*-1);
                                this.totalArray.batteryCharge.push(0);
                            }
                        });

                        this.totalArray.solar = this.solar.chartArray;
                        this.totalArray.grid = this.grid.chartArray;
                        this.totalArray.load = this.load.chartArray;
                        this.totalArray.batteryVoltage = total.Battery_voltage;

                    }
                    this.vTotal = true;
                });
            }
        }
    }

</script>


<style lang="stylus" scoped>
    .log-container
        margin 0 auto

    .sp-sky
        background-color #f7fcff
        height calc(100vh - 71px)
    .date-menu
         width 1280px
         margin 0 auto
         position relative
    .date-title:nth-child(n+2)
        padding-left 20px
        margin-bottom 10px

    .sp-col-3:nth-child(n+2)
        margin-left 10px
    .sp-col-3
        width calc(25% - 40px)
        padding 20px

    .date-title
        color #7e7e7e
        cursor pointer

    .selected-date-title
        color #1555a7
        font-weight 600

    .graph-content
        margin 0 auto
        width 1280px
        height 279px
    button
        width 64px
        height 46px
        background-color #1555a7
        outline none
        border 1px solid #1555a7
        border-radius 12px;
        color #ffffff

    .log-value
        text-align right
        margin-top 16px
        font-size 20px
        font-weight 600
    .unit
        font-weight 200
        margin-left 2px

    .img-co2
        position absolute
        left 0px
        width 138px
        top 260px

    .img-money
        position absolute
        top 249px
        left 40px
        width 40px
</style>
<style lang="stylus">
#date-picker
    border 0
    outline none
    height 46px
    line-height 46px
    padding 0 16px
    border-radius 12px


</style>