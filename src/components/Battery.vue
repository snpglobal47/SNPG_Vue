<template>
    <div>
        <div class="battery-plus"></div>
        <div class="battery-container" :style="containerStyle">
            <div :style="battery">
                <div :style="remain"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Battery",
        props:['value'],
        data() {
          return {
              height: 64
          }
        },
        computed: {
            containerStyle() {
              return {
                height: this.height + 'px'
              };
            },
            battery() {
                let deco = {
                    width: '100%',
                    height: '100%',
                };
                return deco;
            },
            remain() {
                let deco = {
                    height: '100%',
                    backgroundColor: '#7cf28e',
                    position: 'absolute',
                    width: '24px',
                    bottom: '3px',
                    left: '4px'
                };
                let height = (this.height * this.value / 100);
                if(height >= this.height)
                    height = 57;
                deco.height = height + 'px';
                return deco;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.battery-container
    width 32px
    border 2px solid #403938
    position relative
    border-radius 2px
.battery-plus
    width 24px
    height 4px
    border 2px solid #403938
    margin-bottom 2px
    margin-left 4px

.value
    position absolute
    top 6px
    left 50%
    transform translateX(-50%)
    color white
</style>