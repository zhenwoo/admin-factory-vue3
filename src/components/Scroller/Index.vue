<template>
    <div class="c-scroller-wrapper"  @wheel="handleWheel" ref="wrapper">
        <div class="c-scroller-body">
            <div class="c-scroller-header" v-if="$slots.header">
                <slot name="header"></slot>
            </div>
            <div class="c-scroller-content" :style="{top: contentTop + 'px'}" ref="content" >
                <slot></slot>
            </div>
            <div class="c-scroller-footer" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="c-scroller-bars" @click.self="handleBarsClick">
            <div class="c-scroller-bar" :class="showBar ? '' :'c-scroller-opacity'" ref="scrollerY" :style="barStyle" @mousedown="handleMousedown"></div>
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
        // 滚动组件头部位置，主要用途比如在使用滚动组件做菜单的时候留有一个搜索框
        const header = ref(slots.header)
        // 滚动组件脚部位置
        const footer = ref(slots.footer)
        // 纵向滚动条的top位置
        const barTop: Ref<number> = ref(0)
        // 滚动组件容器
        const wrapper = ref(null)
        // 滚动组件容器的高度
        const wrapperHeight: Ref<number> = ref(0)
        // 滚动内容的容器
        const content = ref(null)
        // 滚动内容容器的top位置
        const contentTop: Ref<number> = ref(0)
        // 纵向滚动条
        const scrollerY = ref(null)
        // 纵向滚动条高度
        const scrollerYH: Ref<number> = ref(0)
        let disY = 0
        let start = 0
        let end = 0
        // 内容容器高度
        const contentHeight: ComputedRef<number> = computed(() => {
            if (content.value) {
                return (content.value as unknown as HTMLElement).offsetHeight
            }
            return 0
        })
        // 滚动条高度
        const barHeight: ComputedRef<number> = computed(() => {
            return wrapperHeight.value / contentHeight.value * wrapperHeight.value
        })
        // 滚动条样式设置
        const barStyle: ComputedRef<string> = computed(() => {
            return `top:${barTop.value}px;height:${barHeight.value}px`
        })
        // 滚动内容容器和滚动条容器高度比例，用于计算滚动容器的位置
        const scale: ComputedRef<number> = computed(() => {
            return barTop.value / (wrapperHeight.value - scrollerYH.value)
        })
        const dis: ComputedRef<number> = computed(() => {
            return wrapperHeight.value - scrollerYH.value
        })
        // const setContentTop = () => -(contentHeight.value - wrapperHeight.value * scale.value)
        const handleMove = (e: MouseEvent) => {
            end = e.y
            const flag: number = end - start // 判断是否左右或者上下滑动方向
            if (flag <= 0) {
                barTop.value = barTop.value <= 0 ? 0 : e.clientY - disY
            } else {
                barTop.value = barTop.value >= dis.value ? dis.value : e.clientY - disY
            }
            contentTop.value = -(contentHeight.value - wrapperHeight.value * scale.value)
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
            barTop.value = e.y - top[0].top
            contentTop.value = -(contentHeight.value - wrapperHeight.value * scale.value)
        }
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY < 0) {
                barTop.value = barTop.value <= 1 ? 0 : barTop.value + 1 * e.deltaY
            } else {
                barTop.value = barTop.value >= dis.value ? dis.value : barTop.value + 1 * e.deltaY
            }
            contentTop.value = -(contentHeight.value - wrapperHeight.value * scale.value)
        }
        const reSetSize = () => {
            nextTick(() => {
                if (wrapper.value) {
                    wrapperHeight.value = (wrapper.value as unknown as HTMLElement).offsetHeight
                    scrollerYH.value = (scrollerY.value as unknown as HTMLElement).offsetHeight
                }
            })
        }
        onMounted(() => {
            reSetSize()
        })
        return {
            barStyle,
            contentHeight,
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
            background: orangered;
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
