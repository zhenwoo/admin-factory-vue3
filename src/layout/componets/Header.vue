<template>
    <div class="c-herder-warpper">
        <slot>
            <div class="c-header-logo">对对对</div>
        </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'CHeader'
})
</script>
