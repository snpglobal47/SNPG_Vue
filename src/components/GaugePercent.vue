<template>
    <div class="container">
        <div class="gauge-bg"></div>
        <div class="gauge-middle"></div>
        <div class="gauge-overlay" :style="{ transform: rotate }"></div>
        <div class="gauge-data">
            <span style="color:#ffc400; ">{{ percentage }}%</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:"GaugePercent",
        props:['percentage'],
        data(){
            return{
            }
        },
        computed: {
            rotate() {
                const v = this.percentage * 180 / 100;
                return 'rotate(' + v + 'deg)';
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .container
        width: 400px
        height: 200px
        position: absolute
        top: 0
        overflow: hidden

    .gauge-bg
        z-index: 1
        width: 400px
        height: 200px
        position: absolute
        background-color: #f0ff06
        border-radius: 250px 250px 0 0

    .gauge-middle
        z-index: 3
        position: absolute
        background-color: #f7fcff
        width: 250px
        height: calc(250px / 2)
        top: 75px
        margin-left: 75px
        margin-right: auto
        border-radius: 250px 250px 0 0

    .gauge-overlay
        z-index: 2
        position: absolute
        background-color: #ffc400
        width: 400px
        height: 200px
        top: 200px
        border-radius: 0 0 200px 200px
        transform-origin: center top

    .gauge-data
        z-index: 4
        color: #5df086
        position: absolute
        width: 400px
        bottom: 0
        text-align: center
        font-size: 24px

</style>