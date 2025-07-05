import { createRouter, createWebHistory } from "vue-router"
import LoginForm from "../views/LoginForm.vue"
import UserPage from "@/views/UserPage.vue"
import { useUserStore } from "../stores/user"
import UserForm from "@/views/UserForm.vue"

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: LoginForm },
    { path: '/users', name: 'Users', component: UserPage, meta: { requiresAuth: true } },
    { path: '/users/create', name: 'UserCreate', component: UserForm, meta: { requiresAuth: true } },
    { path: '/users/:id/edit', name: 'UserEdit', component: UserForm, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/login' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const store = useUserStore();
    const now = Math.floor(Date.now() / 1000);
    const exp = parseInt(localStorage.getItem('token_exp'));
    console.log(now + ' ' + exp)
    if(to.meta.requiresAuth && (!store.token || now > exp)){
        store.logout()
        next('/login')
    }else{
        next()
    }
})

export default router;