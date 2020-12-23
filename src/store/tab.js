export default {
    state: {
        menu: [],//全部菜单
        currentMenu: null//当前点击菜单
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
            } else {
                state.currentMenu = null
            }

        }
    },
    actions: {

    }
}