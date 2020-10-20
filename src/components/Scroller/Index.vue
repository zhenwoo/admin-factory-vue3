<template>
    <div class="c-scroller-wrapper"  @wheel="handleWheel" ref="wrapper">
        <slot>
            <div class="c-scroller-body">
                <slot></slot>
            </div>
        </slot>
        <div class="c-scroller-bars" @click.self="handleBarsClick">
            <div class="c-scroller-bar" ref="scrollerY" :style="top" @mousedown="handleMousedown"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, computed, Ref, ref, onMounted } from 'vue'
export default defineComponent({
    name: 'CScroller',
    props: {
        clickAble: {
            type: Boolean,
            default: true
        }
    },
    setup (props) {
        const y: Ref<number> = ref(0)
        const wrapper = ref(null)
        const scrollerY = ref(null)
        const wrapperHeight: Ref<number> = ref(0)
        const scrollerYH: Ref<number> = ref(0)
        let disY = 0
        let start = 0
        let end = 0
        const top: ComputedRef<string> = computed(() => {
            return `top:${y.value}px`
        })
        const dis: ComputedRef<number> = computed(() => {
            return wrapperHeight.value - scrollerYH.value
        })
        const handleMove = (e: MouseEvent) => {
            end = e.y
            const flag: number = end - start // 判断是否左右或者上下滑动方向
            console.log(flag)
            if (flag <= 0) {
                y.value = y.value <= 0 ? 0 : e.clientY - disY
            } else {
                y.value = y.value >= dis.value ? dis.value : e.clientY - disY
            }
        }
        const handleUp = (e: MouseEvent) => {
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
        }
        const handleWheel = (e: WheelEvent) => {
            const opr = e.deltaY
            if (opr < 0) {
                y.value = y.value <= 1 ? 0 : y.value + 2 * opr
            } else {
                y.value = y.value >= dis.value - 1 ? dis.value : y.value + 2 * opr
            }
        }
        onMounted(() => {
            wrapperHeight.value = (wrapper.value as unknown as HTMLElement).offsetHeight
            scrollerYH.value = (scrollerY.value as unknown as HTMLElement).offsetHeight
        })
        return {
            wrapper,
            scrollerY,
            top,
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
        }
        .c-scroller-bars{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 6px;
            overflow: hidden;
            background:rgba(0,0,0,.1);
            .c-scroller-bar{
                position: absolute;
                height: 400px;
                width: 6px;
                background: rgba(0,0,0,1);
                cursor: pointer;
            }
        }
    }
</style>
