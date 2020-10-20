<template>
    <scroller>
        <div class="c-side-bar">
            <div class="c-side-bar-search">
                <input class="c-nav-search" type="text" placeholder="请输入">
            </div>
        </div>
    </scroller>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Scroller from '@/components/Scroller/Index.vue'
export default defineComponent({
    name: 'CHeader',
    components: {
        Scroller
    }
})
</script>
<style scoped lang="less">
    .c-side-bar{
        .c-side-bar-search{
            padding: 10px;
            .c-nav-search{
                appearance: none;
                height: 32px;
                border: 1px solid #eee;
                width: 100%;
                box-sizing: border-box;
                text-indent: 10px;
                &:focus{
                    border:1px solid coral;
                    outline: none;
                }
            }
        }
    }

</style>
