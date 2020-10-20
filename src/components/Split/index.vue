<template>
    <div class="c-split-wrapper" :class="`c-split-wrapper-${mode}`">
        <div class="c-split1" :style="moveDistance">
            <slot name="split1"></slot>
            <div class="c-split" :class="`c-split-${mode}`" :style="splitPosition" @mousedown="handleSplitMousedown"></div>
        </div>
        <div class="c-split2" :style="width">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType, computed, ComputedRef } from 'vue'
import { throttle } from 'lodash'
type Mode = 'h'|'v'
export default defineComponent({
    name: 'Split',
    props: {
        mode: {
            type: String as PropType<Mode>,
            default: 'h'
        },
        min: {
            type: Number,
            default: 250
        }
    },
    setup (props) {
        const x: Ref<number> = ref(props.min)
        const y: Ref<number> = ref(props.min)
        let disX = 0
        let disY = 0
        let start = 0
        let end = 0
        const splitPosition: ComputedRef<string> = computed(() => {
            return props.mode === 'v' ? `top:${y.value}px;left:0` : `left:${x.value}px;top:0`
        })
        const moveDistance: ComputedRef<string> = computed(() => {
            return props.mode === 'v' ? `height: ${y.value}px` : `width: ${x.value}px`
        })
        const width: ComputedRef<string> = computed(() => {
            return props.mode === 'v' ? `height:calc(100% - ${moveDistance.value.replace('height:', '')})` : `width:calc(100% - ${moveDistance.value.replace('width:', '')})`
        })
        const handleMove = throttle((e: MouseEvent) => {
            end = props.mode === 'h' ? e.x : e.y
            const flag = end - start // 判断是否左右或者上下滑动方向
            console.log(flag)
            if (props.mode === 'v') {
                if (flag <= 0 && y.value <= props.min) {
                    y.value = props.min
                    return
                }
                y.value = e.clientY - disY
            } else {
                if (flag <= 0 && x.value <= props.min) {
                    x.value = props.min
                    return
                }
                x.value = e.clientX - disX
            }
        })
        const handleUp = () => {
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleUp)
        }
        const handleSplitMousedown = (e: MouseEvent) => {
            start = props.mode === 'h' ? e.x : e.y
            e.preventDefault()
            e.stopPropagation()
            if (props.mode === 'v') {
                disY = e.clientY - (e.target as HTMLElement).offsetTop
            } else {
                disX = e.clientX - (e.target as HTMLElement).offsetLeft
            }
            document.addEventListener('mousemove', handleMove, false)
            document.addEventListener('mouseup', handleUp, false)
        }
        return {
            width,
            splitPosition,
            moveDistance,
            handleSplitMousedown
        }
    }
})
</script>
<style lang="less">
    .c-split-wrapper{
        height: 100%;
        position: relative;
        display: flex;
        align-items: stretch;
        width: 100%;
        box-sizing: border-box;
        .c-split{
            position: absolute;
            background: rgba(0,0,0,.01);
            &:hover{
                background: rgba(0,0,0,.02);
            }
        };
        .c-split2{
            background: #fff;
        }
    }
    .c-split-wrapper-v{
        flex-direction: column;
        width: 100%;
        .c-split-v{
            height: 2px;
            width: 100%;
            cursor: row-resize;
        }
    }
    .c-split-wrapper-h{
        flex-direction: row;
        .c-split-h{
            height: 100%;
            width: 2px;
            cursor: col-resize;
        }
    }
</style>
