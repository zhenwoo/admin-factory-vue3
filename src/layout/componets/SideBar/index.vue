<template>
    <scroller>
        <div class="c-side">
            <div class="c-side-search">
                <input class="c-nav-search" type="text" placeholder="请输入">
            </div>
            <div class="c-side-content">
                <ul>
                    <li v-for="i of arr" :key="i">{{i}}</li>
                </ul>
            </div>
        </div>
    </scroller>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import Scroller from '@/components/Scroller/Index.vue'
export default defineComponent({
    name: 'CHeader',
    components: {
        Scroller
    },
    setup () {
        const arr: Ref<number[]> = ref([])
        for (let i = 0; i < 1000; i++) {
            arr.value.push(i)
        }
        return {
            arr
        }
    }
})
</script>
<style scoped lang="less">
    .c-side{
        position: relative;
        .c-side-search{
            padding: 10px;
            position: absolute;
            height: 52px;
            width: 100%;
            background: red;
            box-sizing: border-box;
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
        .c-side-content{
            padding: 33px 10px 10px 10px;
        }
    }

</style>
