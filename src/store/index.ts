import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
    state: {
        theme: 'light'
    },
    mutations: {
        setThemeMutation (state, data) {
            state.theme = data
        }
    },
    actions: {
        setThemeAction ({ commit }, data) {
            commit('setThemeMutation', data)
        }
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ],
    modules: {
    }
})
