<template>
    <div class="sp-log" :style="gaugeStyle">
        <!-- 텍스트 내용 -->
        <div class="logicon-body">
            <i class="material-icons" style="font-size:28px;margin-top:4px">{{ icon }}</i>
            <div style="color:#7e7e7e;font-size:22px;margin-top:-2px;font-weight:100">{{ text }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LogIcon",
        props: [ 'icon', 'text'],
        data(){
            return{
                fill : '',
                emptyColor: '',
                startAngle: 1.6
            }
        },
        computed: {
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
        }

    }

</script>

<style lang="stylus" scoped>
    .sp-log
        border-radius 100%
        width 150px
        margin-bottom 20px
        display flex
        justify-content center
        align-items center
        position relative
        cursor pointer


    .sp-gauge-textbox
        margin-top 20px
        text-align center
</style>

<style lang="stylus">
    .percent-text
        display none
</style>