<template>
  <div>

    <div class="container mx-auto px-5">

      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <form @submit.prevent="handleSubmit" class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">รหัสผ่านใหม่</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input v-model="password"
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password" placeholder="******************">
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">ยืนยันรหัสผ่านใหม่</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input v-model="confirmPassword"
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password" placeholder="******************">
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900"></dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                เปลี่ยนรหัสผ่าน
              </button>
            </dd>
          </div>
        </dl>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const snackbar = useSnackbar();

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive

const password = ref('');
const confirmPassword = ref('');

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!password.value || !confirmPassword.value) {

    snackbar.add({
      type: 'error',
      text: 'ต้องระบุรหัสผ่าน'
    })

    return
  }

  if (password.value.length < 6) {

    snackbar.add({
      type: 'error',
      text: 'รหัสผ่านต้องมี 6 ตัวขื้นไป'
    })

    return
  }


  if (password.value !== confirmPassword.value) {

    snackbar.add({
      type: 'error',
      text: 'รหัสผ่านไม่ตรงกัน'
    })

    return
  }

  try {
    await useFetch(
      "/api/password/" + user?.value?.id,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: { password }
      },
    );

    snackbar.add({
      type: 'success',
      text: 'แก้ไขข้อมูลสำเร็จ'
    })
  } catch (error) {

    snackbar.add({
      type: 'error',
      text: 'แก้ไขข้อมูลไม่สำเร็จ'
    })
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

header {
  position: fixed;
  top: 0;
  width: 100%;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  li {
    float: left;
    border-right: 1px solid #bbb;
  }

  li:last-child {
    border-right: none;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    cursor: pointer;
  }

  li a:hover:not(.loginBtn) {
    background-color: #111;
  }

  .loginBtn {
    background-color: #04aa6d;
  }
}

.mainContent {
  padding: 16px;
  margin: 3rem auto;
}
</style>