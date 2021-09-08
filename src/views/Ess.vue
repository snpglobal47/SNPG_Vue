<template>
    <div class="ess-container">
        <!-- 화살표 -->
        <div class="arrow-bg">
            <img :src="`/image/${arrow.solar}.png`" style="position: absolute;top: 156px;width: 148px;height:336px;left: 32%;">
            <img :src="`/image/${arrow.grid}.png`" style="position: absolute;top: 516px;width: 148px;left: 31.7%;">
            <img :src="`/image/${arrow.load}.png`" style="position: absolute;top: 516px;width: 148px;left: 61.3%;">
        </div>

        <div class="sp-sky">
            <div class="sp-content flex">
                <!-- 시계, 날씨 -->
                <div class="sp-col-4" style="text-align:left;padding-top:20px">
                    <clock></clock>
                    <!-- 날씨 -->
                    <div class="sp-wrapper-weather">
                        <div class="sp-weather" v-for="(weather,idx) in weathers" :key="'weather-'+idx">
                            <div class="sp-icon-weather">
                                <img style="width:32px;height:32px"
                                    :src="weatherIcon(weather.weather)">
                            </div>
                            <div class="sp-date-weather">{{ weather.date }}</div>
                        </div>
                    </div>
                    <div style="padding: 28px 0 0 132px">
                        <img src="/image/ic_elec.png" style="height:193px">
                    </div>
                </div>
                <div class="sp-col-4">
                    <div class="flex" style="justify-content: center;position:relative">
                        <!-- solar -->
                        <gauge  @clickGauge="clickGauge('wb_sunny', 'Solar')" icon="wb_sunny" text="Solar"
                               :max="site_info.MAX_Solar" :value="value_solar_current"></gauge>
                        <div style="width:162px;position:absolute;top:55px;left:70%">
                            <unit-value unit="D" :value="value_solar_day"></unit-value>
                            <unit-value unit="M" :value="value_solar_month"></unit-value>
                        </div>
                    </div>
                    <img src="/image/ic_house.png" style="height:164px;padding-top:42px">
                </div>
                <div class="sp-col-4">
                    <img src="/image/ic_co2.png" style="height:112px">
                    <div style="width:108px;margin:-24px auto 0 auto;text-align:right">
                        <div style="font-weight:600;font-size:36px">{{ value_co2 }}</div>
                        <div style="font-weight:100;font-size:14px;color:#403938">tCo2</div>
                    </div>
                    <div style="margin-top:52px">
                        <img src="/image/ic_money.png" style="height:68px">
                    </div>
                    <div style="width:108px;margin:0 auto;text-align:right">
                        <div style="font-weight:600;font-size:36px">
                            {{ value_co2_won|currency }}</div>
                        <div style="font-weight:100;font-size:14px;color:#403938">Won</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sp-content flex">
            <div class="sp-col-4">
                <div style="display:flex;justify-content: center">
                    <gauge  @clickGauge="clickGauge('power', 'Grid')" icon="power" text="Grid"
                             :max="site_info.MAX_Grid" :value="value_grid_current"></gauge>
                </div>
                <div style="width:180px;margin:0 auto">
                    <unit-value unit="D" :value="value_grid_day"></unit-value>
                    <unit-value unit="M" :value="value_grid_month"></unit-value>
                    <unit-value unit="S" :value="value_grid_won"></unit-value>
                </div>
            </div>
            <div class="sp-col-4">
                <div style="display:flex;justify-content: center">
                    <gauge @clickGauge="clickGauge('home','Load')" icon="home" text="Load"
                           :max="site_info.MAX_Load" :value="value_load_current"></gauge>
                </div>
                <div style="width:180px;margin:0 auto">
                    <unit-value unit="D" :value="value_load_day"></unit-value>
                    <unit-value unit="M" :value="value_load_month"></unit-value>
                    <unit-value unit="S" :value="value_load_won"></unit-value>
                </div>
            </div>
            <div class="sp-col-4">
                <div style="display:flex;justify-content: center">
                    <gauge @clickGauge="clickGauge('battery_full','Battery')" icon="battery_full" text="Battery"
                           :max="site_info.MAX_Batt" :value="value_batt_current"></gauge>
                </div>
                <div style="width:150px;margin:0 auto;display:flex">
                    <battery :value="value_batt_percent"></battery>
                    <div style="text-align:left;margin-left: 20px;font-weight:900;line-height:24px;font-size:18px">
                        <div>{{ value_batt_percent }}<span style="font-weight:100">%</span></div>
                        <div>{{ value_batt_day }}<span style="font-weight:100"> / </span>{{ site_info.MAX_Batt }}</div>
                        <div>{{ value_batt_temperature }} <span style="font-weight:100">℃</span></div>
                    </div>
                </div>
            </div>
        </div>



        <!-- 상세 팝업 -->
        <transition name="fade">
        <div class="popup-bg" v-if="vPopup" @click="vPopup=false">
            <div class="popup" @click.stop.prevent="">
                <detail-view :icon="detail.icon" :text="detail.text"></detail-view>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import moment from 'moment'
    import Gauge from "../components/Gauge";
    import UnitValue from "../components/unitValue";
    import Battery from "../components/Battery";
    import Clock from "../components/Clock";
    import DetailView from "../components/DetailView";

    export default {
        name: "ess",
        components: {Clock, Battery, UnitValue, Gauge, DetailView},
        data() {
            return {
                iconColor:'',
                weatherUrl: 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=457735ccc45462b15ceba8a9eace1909',
                itvTimer: null,
                site_info: {},
                weathers: [
                    {
                        weather: 'wb_sunny',
                        date: '02/02'
                    },
                    {
                        weather: 'cloud',
                        date: '02/03'
                    }
                ],
                detail: {
                    icon: '',
                    text: ''
                },
                vPopup: false,

                arrow: {
                  solar: 'ic_arrow_l',
                  grid: 'ic_arrow_s',
                  load: 'ic_arrow_s',
                },


                value_solar_current: 0,
                value_solar_day: 0,
                value_solar_month: 0,

                value_co2: 0,
                value_co2_won: 0,

                value_grid_current: 0,
                value_grid_day: 0,
                value_grid_month: 0,
                value_grid_won: 0,

                value_load_current: 0,
                value_load_day: 0,
                value_load_month: 0,
                value_load_won: 0,

                value_batt_percent: 0,
                value_batt_current: 0,
                value_batt_day: 0,
                value_batt_temperature: 0
            }
        },
        created() {
            this.getSiteInfo();
            this.setTimer();
            this.setTimer2();
            this.getMonthly();
        },
        destroyed() {
            clearInterval(this.itvTimer);
            clearInterval(this.itvTimer2);
        },
        computed: {

        },
        methods: {
            getSiteInfo() {
                this.axios.get(this.backendUrl + '/site_info').then( res => {
                    this.site_info = res.data;
                    this.site_info.MAX_Solar /= 1000;
                    this.site_info.MAX_Grid /= 1000;
                    this.site_info.MAX_Load /= 1000;
                    this.site_info.MAX_Batt /= 1000;

                    this.setCurrentDate();
                });
            },
            getSum(total, num) {
                return total + num;
            },
            //현재시각 설정
            setCurrentDate() {
                // 날씨 설정
                this.axios.get(this.weatherUrl.replace('{lat}', this.site_info.Location_Lati).replace('{lon}', this.site_info.Location_Longi)).then( res => {

                    let today = moment().format('MM/DD');
                    let tomorrow = moment().add(1, 'day').format('MM/DD');
                    this.weathers = [];
                    for(let i=0; i<res.data.list.length; i++) {
                        let item = res.data.list[i];
                        let date = moment(item.dt_txt).format('MM/DD');

                        if((date === today && this.weathers.length === 0) ||
                            (date === tomorrow && this.weathers.length === 1)) {
                            this.weathers.push({
                                weather: item.weather[0].description.replace(' ','_'),
                                date: moment(item.dt_txt).format('MM/DD')
                            });
                        }
                    }
                });
            },
            //타이머1
            setTimer() {
                this.currentEss();
                this.itvTimer = setInterval(this.currentEss, 1000);
            },
            currentEss() {
                this.axios.get(this.backendUrl + '/current_ess').then( res => {
                    let total = res.data;

                    //Event
                    if(total.event !== '' && this.$store.getters.alert === false)
                        this.$store.commit('setAlert', total.event);

                    //Solar
                    this.value_solar_current = ((total.Solar_input_power1 + total.Solar_input_power2)/1000).toFixed(1);


                    //Grid
                    this.value_grid_day = (total.pm_import_active_energy - total.grid_daily_import_active_energy).toFixed(1);
                    this.value_grid_month = (total.pm_import_active_energy - total.grid_month_import_active_energy).toFixed(1);
                    this.value_grid_won = this.calc_money(this.value_grid_month);

                    this.value_grid_current = (total.pm_active_pwr/1000).toFixed(1);
                    // this.value_grid_current = pm_import_active_energy - grid_daily_import_active_energy;

                    //Load
                    this.value_load_current = (total.ld_active_pwr / 1000).toFixed(1);
                    this.value_load_day = (total.ld_import_active_energy - total.load_daily_import_active_energy).toFixed(1);
                    this.value_load_month = (total.ld_import_active_energy - total.load_month_import_active_energy).toFixed(1);
                    this.value_load_won = this.calc_money(this.value_load_month );

                    //Battery
                    this.value_batt_current = (total.Battery_power / 1000).toFixed(1);
                    this.value_batt_percent = ((total.Battery_capacity / (this.site_info.MAX_Batt*1000))*100).toFixed(1);
                    this.value_batt_temperature = total.Inner_temperature;
                    this.value_batt_day = (total.Battery_capacity /= 1000).toFixed(1);

                    //부하월간금액-한전월간금액
                    this.value_co2_won = this.value_load_won-this.value_grid_won;

                    //화살표
                    switch(total.Solar_input_1_work_status) {
                        case 'work':
                            this.arrow.solar = 'ic_arrow_l';
                            break;
                        case 'idle':
                            this.arrow.solar = 'ic_arrow_l_not';
                            break;
                    }

                    switch(total.power_direction_line) {
                        case 'input':
                            this.arrow.grid = 'ic_arrow_s';
                            break;
                        case 'output':
                            this.arrow.grid = 'ic_arrow_s_back';
                            break;
                        case 'donothing':
                            this.arrow.grid = 'ic_arrow_not';
                            break;
                    }
                    switch(total.Battery_power_direction) {
                        case 'charge':
                            this.arrow.load = 'ic_arrow_s';
                            break;
                        case 'discharge':
                            this.arrow.load = 'ic_arrow_s_back';
                            break;
                        case 'donothing':
                            this.arrow.load = 'ic_arrow_not';
                            break;
                    }
                });
            },
            //타이머2
            setTimer2() {
                this.currentKwhq();
                this.itvTimer2 = setInterval(this.currentKwhq, 5001);
            },
            currentKwhq() {
                this.axios.get(this.backendUrl + '/current_kwhq').then( res => {
                    if(res.data.Solar_input_power1.length < 1) return;
                    let total = res.data;
                    this.value_solar_day = ((total.Solar_input_power1.reduce(this.getSum)+
                        total.Solar_input_power2.reduce(this.getSum)) / 1000).toFixed(1);
                    this.value_solar_month = total.solar_month_energy;

                    this.value_co2 = (this.value_solar_month * 0.5027802).toFixed(1);

                    // this.value_grid_day = (total.pm_active_pwr.reduce(this.getSum) / 4000).toFixed(1);
                    // this.value_load_day = (total.AC_output_total_active_power.reduce(this.getSum) / 4000).toFixed(1);
                    // this.value_batt_day = (total.Battery_power.reduce(this.getSum) / 4000).toFixed(1);

                });
            },
            //월간
            getMonthly() {
              this.axios.get(this.backendUrl + '/log_month?date=' + moment().format('MM_YYYY')).then (res => {
                  let total = res.data;

                  this.value_solar_month = (total.Solar_input_power1.reduce(this.getSum) * 0.024).toFixed(1);
                  // this.value_grid_month = (total.pm_active_pwr.reduce(this.getSum) * 0.024).toFixed(1);
                  // this.value_load_month = (total.AC_output_total_active_power.reduce(this.getSum) * 0.024).toFixed(1);
              });
            },
            weatherIcon(weather) {
                if(weather.indexOf('cloud')>-1 &&
                    weather !== 'overcast_clouds' &&
                    weather !== 'few_clouds')
                    weather = 'overcast_clouds';

                return `/image/${weather}.png`;
            },
            clickGauge(icon, text) {
                this.detail.icon = icon;
                this.detail.text = text;
                this.vPopup = true;
            }
        }
    }
</script>

<style scoped lang="stylus">
.ess-container
    margin 0 auto

.sp-sky
    background-color #f7fcff

.sp-wrapper-weather
    display flex
    margin-top 24px
.sp-weather
    width 40px
    margin-right 12px
.sp-icon-weather
    border-radius 8px
    background-color #ffffff
    box-shadow 0 0 16px 4px rgba(0, 112, 255, 0.06)
    width 40px
    height 40px
    align-items center
    justify-content center
    display flex
    color yellow
    i
        font-size 28px
        text-shadow 2px 4px 6px #0000001c

.sp-date-weather
    color #7e7e7e
    font-size 13px
    font-weight 600
    text-align center
    margin-top 4px

.sp-gauge-set
    display flex
    justify-content center

.popup-bg
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    background-color rgba(0,0,0,0.6)
    z-index 10

.popup
    position fixed
    left 50%
    top 50%
    transform translate(-50%,-50%)


.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.arrow-bg
    position absolute
    top 71px
    width 1280px
    height calc(100vh - 71px)
    transform translateX(-50%)
    left 50%
</style>