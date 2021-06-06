import {createRouter,createWebHistory} from 'vue-router'

import LoginScreen from '../components/main_components/LoginScreen.vue'
import Container from '../components/main_components/Container.vue'

var routes = [
    {path:'/' , component:LoginScreen },
    {path:'/home', component:Container, props:true}
]

var router = createRouter({
    history: createWebHistory(),
    routes
})


export default router