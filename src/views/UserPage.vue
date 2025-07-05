<template>
    <div class="flex-none w-full p-5">
        <div class="flex">
            <div class="flex w-2/3 justify-start items-center">
                <input v-model="search" placeholder="Search" type="text" class="input w-1/2 mb-0" />
                <button @click="fetchUsers" class="btn">Search</button>
                <button @click="clearSearch" class="btn bg-yellow-500">Clear</button>
                <router-link to="/users/create" class="btn bg-green-500 ">Add User</router-link>
            </div>
            <div class="flex justify-end w-1/3">
                <button @click="logout" class="btn bg-gray-500">Logout</button>
            </div>
        </div>
        <div class="min-h-[500px] overflow-auto">
            <table class="w-full table-auto text-2xl border-separate border-spacing-y-1 mt-6">
                <thead>
                    <tr class="">
                        <th class="col-th" @click="sort('id')">
                            ID
                            <span v-if="sortBy === 'id'">
                                {{ sortDir === 'asc' ? '▲' : '▼' }}
                            </span>
                        </th>
                        <th class="col-th" @click="sort('name')">
                            Name
                            <span v-if="sortBy === 'name'">
                                {{ sortDir === 'asc' ? '▲' : '▼' }}
                            </span>
                        </th>
                        <th class="col-th" @click="sort('email')">
                            Email
                            <span v-if="sortBy === 'email'">
                                {{ sortDir === 'asc' ? '▲' : '▼' }}
                            </span>
                        </th>
                        <th class="col-th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="u in store.userList.data" :key="u.id" class="odd:bg-blue-100 even:bg-emerald-100">
                        <td class="col-td text-center">{{ u.id }}</td>
                        <td class="col-td">{{ u.name }}</td>
                        <td class="col-td">{{ u.email }}</td>
                        <td class="col-td flex justify-end">
                            <router-link :to="`/users/${u.id}/edit`" class="btn">Edit</router-link>
                            <button class="btn bg-red-500" @click="deleteUser(u.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4 flex gap-2 justify-between">
            <div>
                <select v-model.number="size" @change="changePageSize" class="input w-24">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <div>
                <button @click="goToPage(1)" :disabled="page === 1" class="btn">First</button>
                <button @click="goToPage(page - 1)" :disabled="page === 1" class="btn">Prev</button>
                <template v-for="p in pageToShow()" :key="p">
                    <button @click="goToPage(p)" :class="['btn', page === p ? 'bg-blue-700' : 'bg-blue-500']">
                        {{ p }}
                    </button>
                </template>
                <button @click="goToPage(page + 1)" :disabled="page === lastPage" class="btn">Next</button>
                <button @click="goToPage(lastPage)" :disabled="page === lastPage" class="btn">Last</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
export default {
    data() {
        return {
            store: useUserStore(),
            search: "",
            sortBy: "",
            sortDir: "",
            page: 1,
            size: 5,
            lastPage: 1,
        }
    },
    mounted() {
        this.fetchUsers()
    },
    computed: {
        paginationLinks() {
            const links = [];
            for (let i = 1; i <= this.lastPage; i++) {
                links.push({ page: i, active: i === this.page });
            }
            return links;
        }
    },
    methods: {
        async fetchUsers() {
            await this.store.fetchUsers(this.search, this.page, this.size, this.sortBy, this.sortDir)
            console.log(this.store.userList)
            this.lastPage = this.store.userList.last_page || 1;
        },
        sort(key) {
            if (this.sortBy === key) {
                this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
            }
            else {
                this.sortBy = key
                this.sortDir = 'asc'
            }
            this.fetchUsers()
        },
        goToPage(n) {
            if (n < 1 || n > this.lastPage)
                return
            this.page = n
            this.fetchUsers()
        },
        pageToShow() {
            const total = this.lastPage

            const current = this.page
            const max = 5
            const half = Math.floor(max / 2)

            let start = Math.max(1, current - half)
            let end = Math.min(total, current + half)

            console.log(total)

            if (end - start + 1 < max) {
                if (start === 1) {
                    end = Math.min(total, start + max - 1);
                } else if (end === total) {
                    start = Math.max(1, end - max + 1);
                }
            }

            const pages = [];
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;

        },
        changePageSize() {
            this.page = 1
            this.fetchUsers()
        },
        logout() {
            this.store.logout()
            this.$router.push('/login')
        },
        clearSearch() {
            this.search = ''
            this.page = 1
            this.sortBy = ''
            this.sortDir = ''
            this.fetchUsers()
        },
        async deleteUser(id) {
            await this.store.deleteUser(id);
            this.page = 1
            this.search = ''
            this.sortBy = ''
            this.sortDir = ''
            this.fetchUsers();
        },
    }
}
</script>