<template>
    <div id="app">
        <layout>
            <router-view />
        </layout>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Store, useStore } from 'vuex'
import Layout from '@/layout/Index.vue'
export default defineComponent({
    name: 'App',
    components: {
        Layout
    },
    setup () {
        const store: Store<object> = useStore()
        const themeData: string|null = window.localStorage.getItem('theme')
        const theme: string = themeData || 'light'
        store.dispatch('setThemeAction', theme)
    }
})
</script>
<style lang="less">
    html,body,#app{
        height: 100%;
        margin: 0;
        overflow: hidden;
        color: gray;
        background: #f9f9f9;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
    }
</style>
