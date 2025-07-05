<template>
    <div class="self-center w-xl p-3 mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-emerald-200 to-emerald-400">
        <div class="flex justify-center m-4">
            <h1 class="text-3xl font-bold text-blue-500 tracking-wider">Login Form</h1>
        </div>
        <div class="flex m-4">
            <input class="w-full p-4 bg-white rounded-2xl" type="text" placeholder="username" v-model="username"
                autocomplete="new-username" />
        </div>
        <div class="flex m-4">
            <input class="w-full p-4 bg-white rounded-2xl" type="password" placeholder="password" v-model="password"
                autocomplete="new-password" />
        </div>
        <div class="flex justify-end m-4">
            <button @click="handleLogin"
                class="w-full p-3 rounded-2xl bg-blue-500 hover:bg-blue-800 text-white mx-0 text-2xl self-center shadow-lg hover:shadow-2xl tracking-wider">Login</button>
        </div>
        <div v-if="errorMessage" class="flex justify-start">
            <p class="text-red-500">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        async handleLogin() {
            try {
                const store = useUserStore();
                await store.login(this.username, this.password)
                console.log("masuk")
                this.$router.push('/users')
            } catch (err) {
                this.errorMessage = err.message;
            }
        }
    }
}
</script>