<template>
    <div class="sp-unit-container" :style="containerStyle">
        <div v-if="unit!==''"
            :style="unitStyle">{{ unit === 'S' ? '￦' : unit }}</div>
        <div style="text-align:right;">
            <span v-if="unit === 'S'">{{ value|currency }}</span>
            <span v-else>{{ value }}</span>
            <span v-if="max" style="margin-left:4px">{{ `/ ${max}` }}</span>
            <span style="font-weight:100;margin-left:4px">{{ valueUnit }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "unit-value",
        props: ['unit', 'value', 'max'],
        data() {
            return {
                valueUnit: 'Kwh'
            }
        },
        computed: {
            containerStyle() {
              let deco = {
                justifyContent: 'space-between'
              };
              if(this.unit === '')
                  deco.justifyContent = 'flex-end';
              return deco;
            },
            unitStyle() {
                let color = '';
                switch(this.unit) {
                    case 'D':
                        color = '#8522ff';
                        this.valueUnit = 'Kwh';
                        break;
                    case 'M':
                        color = '#87c900';
                        this.valueUnit = 'Kwh';
                        break;
                    case 'S':
                        color = '#ffc400';
                        this.valueUnit = 'Won';
                        break;
                }

                return {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: color
                }
            }
        },
    }
</script>

<style lang="stylus" scoped>
.sp-unit-container
    display flex
    justify-content space-between
    align-items center
    margin 0 12px 4px 12px
    color #403938
    font-weight 900
    font-size 18px
</style>