import { defineStore } from 'pinia';
import api from '../api';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        loading: false,
        userList: [],
    }),
    actions: {
        async login(username, password) {
            try {
                console.log("fired")
                console.log(username + ' ' + password)
                const res = await api.post('/login', { username, password })
                console.log(username + ' ' + password)
                this.token = res.data.token
                localStorage.setItem('token', this.token)
                localStorage.setItem('token_exp', res.data.exp)
            } catch (error) {
                throw new Error('Login failed: ' + error.response?.data?.message || 'Unknown error')
            }
        },
        logout() {
            console.log('logout')
            this.token = '';
            localStorage.removeItem('token')
            localStorage.removeItem('token_exp')
        },
        async fetchUsers(search = '', page = 1, size = 10, sort_by = '', sort_dir = '') {
            this.loading = true
            const res = await api.get('/users',{
                params: {search, page, size, sort_by, sort_dir}
            })
            this.userList = res.data
            this.loading = false
        }, 
        async getUser(id){
            const res = await api.get(`/users/${id}`)
            return res.data
        },
        async createUser(data){
            await api.post('/users', data)
        },
        async updateUser(id, data){
            await api.put(`/users/${id}`, data)
        },
        async deleteUser(id){
            await api.delete(`/users/${id}`)
        }
    }
})

