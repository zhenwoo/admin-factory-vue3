<template>
    <div class="c-scroller-wrapper"  @wheel="handleWheel" ref="wrapper">
        <div class="c-scroller-body">
            <div class="c-scroller-header" v-if="header">
                <slot name="header"></slot>
            </div>
            <div class="c-scroller-content" :style="{top: contentTop + 'px'}" ref="content" >
                <slot></slot>
            </div>
            <div class="c-scroller-footer" v-if="footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="c-scroller-bars" @click.self="handleBarsClick">
            <div class="c-scroller-bar" :class="showBar ? '' :'c-scroller-opacity'" ref="scrollerY" :style="top" @mousedown="handleMousedown"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, computed, Ref, ref, onMounted, nextTick, PropType } from 'vue'
export default defineComponent({
    name: 'CScroller',
    props: {
        clickAble: {
            type: Boolean as PropType<boolean>,
            default: true
        },
        showBar: {
            type: Boolean as PropType<boolean>,
            default: true
        }
    },
    setup (props, { slots }) {
        const header = ref(slots.header)
        const footer = ref(slots.footer)
        const y: Ref<number> = ref(0)
        const wrapper = ref(null)
        const content = ref(null)
        const scrollerY = ref(null)
        const contentTop: Ref<number> = ref(0)
        const wrapperHeight: Ref<number> = ref(0)
        const scrollerYH: Ref<number> = ref(0)
        const contentHeight: ComputedRef<number> = computed(() => {
            if (content.value) {
                return (content.value as unknown as HTMLElement).offsetHeight
            }
            return 0
        })
        const barHeight: ComputedRef<string> = computed(() => {
            if (wrapper.value) {
                const h = (wrapper.value as unknown as HTMLElement).offsetHeight
                return `height: ${h / contentHeight.value * h}px`
            }
            return 'height:0px'
        })
        const scale: ComputedRef<number> = computed(() => {
            return y.value / (wrapperHeight.value - scrollerYH.value)
        })
        let disY = 0
        let start = 0
        let end = 0
        const top: ComputedRef<string> = computed(() => {
            return `top:${y.value}px;${barHeight.value}`
        })
        const dis: ComputedRef<number> = computed(() => {
            return wrapperHeight.value - scrollerYH.value
        })
        const handleMove = (e: MouseEvent) => {
            end = e.y
            const flag: number = end - start // 判断是否左右或者上下滑动方向
            if (flag <= 0) {
                y.value = y.value <= 0 ? 0 : e.clientY - disY
            } else {
                y.value = y.value >= dis.value ? dis.value : e.clientY - disY
            }
            contentTop.value = -(contentHeight.value - (wrapper.value as unknown as HTMLElement).offsetHeight) * scale.value
        }
        const handleUp = () => {
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleUp)
        }
        const handleMousedown = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            start = e.y
            disY = e.clientY - (e.target as HTMLElement).offsetTop
            document.addEventListener('mousemove', handleMove, false)
            document.addEventListener('mouseup', handleUp, false)
        }
        const handleBarsClick = (e: MouseEvent) => {
            if (!props.clickAble) return
            const top = (e.target as HTMLElement).getClientRects()
            y.value = e.y - top[0].top
            contentTop.value = -(contentHeight.value - (wrapper.value as unknown as HTMLElement).offsetHeight) * scale.value
        }
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY < 0) {
                y.value = y.value <= 1 ? 0 : y.value + 1 * e.deltaY
            } else {
                y.value = y.value >= dis.value ? dis.value : y.value + 1 * e.deltaY
            }
            contentTop.value = -(contentHeight.value - (wrapper.value as unknown as HTMLElement).offsetHeight) * scale.value
        }
        onMounted(() => {
            nextTick(() => {
                wrapperHeight.value = (wrapper.value as unknown as HTMLElement).offsetHeight
                scrollerYH.value = (scrollerY.value as unknown as HTMLElement).offsetHeight
            })
        })
        return {
            wrapper,
            scrollerY,
            content,
            top,
            barHeight,
            contentHeight,
            header,
            footer,
            contentTop,
            handleWheel,
            handleMousedown,
            handleBarsClick
        }
    }
})
</script>
<style scoped lang="less">
    .c-scroller-wrapper{
        position: relative;
        height: 100%;
        .c-scroller-body{
            height: 100%;
            background: #cccccc;
            position: relative;
            overflow: hidden;
            .c-scroller-header{
                width: 100%;
                z-index: 2;
                position: relative;
            }
            .c-scroller-content{
                position: absolute;
                width: 100%;
                padding-bottom: 50px;
            }
            .c-scroller-footer{
                position: absolute;
                bottom: 0;
                height: 50px;
                z-index: 9;
                background: red;
                width: 100%;
            }
        }
        .c-scroller-bars{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 6px;
            overflow: hidden;
            z-index: 999;
            .c-scroller-bar{
                position: absolute;
                height: 400px;
                width: 6px;
                background: rgba(0,0,0,1);
                cursor: pointer;
            }
            .c-scroller-opacity{
                opacity: 0;
            }
        }
    }
</style>
