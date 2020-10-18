<template>
    <div class="app-frame" :class="`app-frame-${theme}`">
        <div class="app-frame-header" :style="{height: headerHeight}" v-if="showHeader">
            <c-header></c-header>
        </div>
        <split style="height: 900px">
            <template v-slot:split1>
                <side-bar></side-bar>
            </template>
            <div class="app-frame-content">
                <slot></slot>
            </div>
        </split>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext, ComputedRef } from 'vue'
import { Store, useStore } from 'vuex'
import config from '@/config/Index'
import SideBar from '@/layout/componets/SideBar.vue'
import CHeader from '@/layout/componets/Header.vue'
import Split from '@/components/Split/index.vue'
interface Props {
    showHeader: boolean;
}
export default defineComponent(
    {
        name: 'Layout',
        props: {
            showHeader: {
                type: Boolean,
                default: true
            }
        },
        components: {
            Split,
            CHeader,
            SideBar
        },
        setup (props: Readonly<Props>, context: SetupContext) {
            console.log(context)
            const store: Store<any> = useStore()
            const headerHeight: ComputedRef<string> = computed(() => {
                return props.showHeader ? config.headerHeight + 'px' : '0px'
            })
            const theme: ComputedRef<string> = computed(() => {
                return store.state.theme
            })
            return {
                headerHeight,
                theme
            }
        }
    }
)
</script>

<style scoped lang="less">
    @import url(../assets/style/var.less);
    .app-frame{
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .app-frame-header{
            background: @theme-light;
            border-bottom: 1px solid #ccc;
        }
        .app-frame-content{
            padding: 20px;
        }
    }
</style>