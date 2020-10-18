<template>
    <scroller>
        <div>
            <input type="text" placeholder="请输入">
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
