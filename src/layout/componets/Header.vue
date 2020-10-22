<template>
    <div class="c-herder-warpper">
        <slot>
            <div class="c-header-logo" :style="{height:headerHeight + `px`}">
                <div class="c-header-logo-image"><img src="@/assets/images/logo.png" alt=""></div>
                <div class="c-header-logo-text">北京智同体体</div>
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import config from '@/config/Index'
export default defineComponent({
    name: 'CHeader',
    setup () {
        const headerHeight: Ref<number> = ref(config.headerHeight)
        console.log(headerHeight.value)
        return {
            headerHeight
        }
    }
})
</script>
<style scoped lang="less">
    .c-header-logo{
        .c-header-logo-image{
            height: 100%;
            display: inline-block;
            vertical-align: middle;
            img {
                height: 100%;
                box-sizing: border-box;
                padding: 5px;
            }
        }
        .c-header-logo-text{
            display: inline-block;
            vertical-align: middle;
            font-size: 24px;
        }
    }
</style>
