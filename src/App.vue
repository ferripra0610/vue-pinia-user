<template>
  <div class="flex flex-col min-h-screen">
    <div class="container flex justify-center items-center h-16 mx-auto p-5 bg-gradient-to-r from-blue-100 to-blue-600">
      <h1 class="text-4xl text-emerald-100 font-extrabold">User Management</h1>
    </div>
    <div class="container mx-auto flex-1 content-center">
      <router-view></router-view>
    </div>
    <div class="container flex justify-center items-center h-16 mx-auto p-5 bg-gradient-to-r from-blue-100 to-blue-600">
      <h1 class="text-emerald-100 font-extrabold">&copy; 2025</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "App"
}
</script>
<style scoped></style>
