<template>
    <div class="detail-container">

        <div class="sp-sky">
            <div class="sp-content flex" style="padding-top:20px">
                <clock></clock>
            </div>
            <div class="col-container flex">

                <div class="sp-col-3">
                    <detail-view icon="wb_sunny"
                                 text="Solar">

                    </detail-view>

                </div>
                <div class="sp-col-3">
                    <detail-view icon="home"
                                 text="Load" ></detail-view>

                </div>
                <div class="sp-col-3">
                    <detail-view icon="power"
                                 text="Grid"
                    ></detail-view>

                </div>
                <div class="sp-col-3">
                    <detail-view icon="battery_full" text="Battery"></detail-view>

                </div>

            </div>


        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import Gauge from "../components/Gauge";
    import UnitValue from "../components/unitValue";
    import Battery from "../components/Battery";
    import LogIcon from "../components/LogIcon";
    import DetailView from "../components/DetailView";
    import GaugePercent from "../components/GaugePercent";
    import Clock from "../components/Clock";

    export default {
        name: "Detail",
        components: {Clock, DetailView, Battery, UnitValue, Gauge, LogIcon, GaugePercent,moment},
        date() {
            return {

            }
        },

        computed: {},

    }
</script>

<style lang="stylus" scoped>
    .detail-container
        margin 0 auto
    .current-date
        font-size 14px
        color #7e7e7e
        font-weight 600
    .current-time
        font-size 26px
        font-weight 600
        color #403938
    .col-container
        width 1280px
        margin 0 auto
        justify-content space-between
        margin-top 15px
    .sp-sky
        background-color #f7fcff
        height calc(100vh - 71px)




</style>