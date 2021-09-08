<template>
    <!--시계-->
    <div style="text-align:left">
        <div class="current-time">{{current_time}}</div>
        <div class="current-date">{{current_date}}</div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "Clock",
        data() {
            return {
                current_date: '',
                current_time: '',
                itvDate: null
            }
        },
        created(){
            this.setCurrentDate();

        },
        destroyed(){
            clearInterval(this.itvDate);
        },
        methods: {
            setCurrentDate() {
                this.current_date = moment().format('YYYY-MM-DD (ddd)');
                this.current_time = moment().format('HH:mm');
                this.itvDate = setInterval(() => {
                    this.current_date = moment().format('YYYY-MM-DD (ddd)');
                    this.current_time = moment().format('HH:mm');
                }, 1000);
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .current-date
        font-size 14px
        color #7e7e7e
        font-weight 600
    .current-time
        font-size 26px
        font-weight 600
        color #403938
</style>