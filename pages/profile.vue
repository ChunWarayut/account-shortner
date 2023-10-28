<template>
  <div>

    <div class="container mx-auto">

      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">ชื่อ - นามสกุล</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form @submit.prevent="handleSubmit" class="w-full max-w-sm">
                <div class="flex items-center border-b border-teal-500 py-2">
                  <input v-model="name"
                    class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text" aria-label="Full name">
                  <button
                    class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit">
                    บันทึก
                  </button>
                </div>
              </form>
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">สถานะ</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Agents and Partners</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">เบอร์โทรศัพท์</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ user?.customer?.tel }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const snackbar = useSnackbar();

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive

const name = ref(user?.value?.name || '');

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await useFetch(
      "/api/profile/" + user?.value?.id,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: { name }
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