<template>
    <div class="sp-gauge" :style="gaugeStyle" @click="$emit('clickGauge')">
        <!-- 게이지 -->
        <div class="gauge">
            <vue-circle
                ref="circle"
                :progress="progress"
                :size="132"
                :reverse="false"
                line-cap="square"
                :fill="fill"
                :empty-fill="emptyColor"
                :start-angle="startAngle"
                insert-mode="append"
                :thickness="10"
                :show-percent="true"
            ></vue-circle>
        </div>
        <!-- 텍스트 내용 -->
        <div :style="gaugeTextBoxStyle">
            <div style="color:#403938;font-size:36px;font-weight:600">{{ value }}<span style="font-weight:100">K</span></div>
            <i v-if="icon" class="material-icons" style="font-size:18px;margin-top:4px">{{ icon }}</i>
            <div v-if="icon" style="color:#7e7e7e;font-size:14px;margin-top:-2px;font-weight:600">{{ text }}</div>
        </div>
    </div>
</template>

<script>
    import VueCircle from 'vue2-circle-progress/src/index'

    export default {
        name: "Gauge",
        components: {
          VueCircle
        },
        props: [ 'icon', 'text', 'value', 'max','animation'],

        data() {
            return{
                fill: {color: '#ffffff'},
                emptyColor: '',
                startAngle: 1.6
            }
        },
        watch: {
          progress(n) {
              this.$refs.circle.updateProgress(n);
          }
        },

        computed: {
            progress() {
                if(this.max === undefined)
                    return 0;
                else
                    return Math.abs(parseInt(this.value / this.max * 100));
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
                    color: color,
                    padding: '0'
                };
            },
            gaugeTextBoxStyle() {
                let style = {
                textAlign: 'center'
                };

                if(this.icon)
                    style.marginTop = '24px';

                return style;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.sp-gauge
    border-radius 100%
    width 150px
    height 150px
    margin 8px
    display flex
    justify-content center
    align-items center
    position relative
    cursor pointer

.gauge
    position absolute
    top 10px
    left 10px

</style>

<style lang="stylus">
.percent-text
    display none
</style>