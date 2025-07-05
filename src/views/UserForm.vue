<template>
    <div class="self-center w-5xl p-3 mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-emerald-200 to-emerald-400">
        <div class="flex justify-center m-4">
            <h1 class="text-3xl font-bold text-blue-500 tracking-wider">{{ isEdit ? 'Edit' : 'Create' }} User</h1>
        </div>
        <div class="flex m-4">
            <input class="w-full p-4 bg-white rounded-2xl" type="text" placeholder="Name" v-model="form.name" />
        </div>
        <div class="flex m-4">
            <input class="w-full p-4 bg-white rounded-2xl" type="text" placeholder="Email" v-model="form.email" />
        </div>
        <div class="flex m-4">
            <input class="w-full p-4 bg-white rounded-2xl" type="password" placeholder="password" v-model="form.password"
                autocomplete="new-password" />
        </div>
        <div class="flex justify-end m-4 gap-2">
            <button @click="submit"
                class="p-3 rounded-2xl bg-blue-500 hover:bg-blue-800 text-white mx-0 text-2xl self-center shadow-lg hover:shadow-2xl tracking-wider">Save</button>
            <router-link to="/users" class="p-3 rounded-2xl bg-blue-500 hover:bg-blue-800 text-white mx-0 text-2xl self-center shadow-lg hover:shadow-2xl tracking-wider" >Cancel</router-link>
        </div>
    </div>
</template>

<script>
    import { useUserStore } from '@/stores/user'

    export default {
        data(){
            return{
                store: useUserStore(),
                form: {
                    name: "",
                    email: "",
                    password: ""
                },
                isEdit: false
            }
        },
        async mounted(){
            const id = this.$route.params.id
            if(id){
                this.isEdit = true
                const user = await this.store.getUser(id)
                this.form.name = user.data.name
                this.form.email = user.data.email
            }
        },
        methods:{
            async submit(){
                if(this.isEdit){
                    await this.store.updateUser(this.$route.params.id, this.form)
                }else{
                    await this.store.createUser(this.form)
                }
                this.$router.push('/users')
            }
        }
    }
</script>