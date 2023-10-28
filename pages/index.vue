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
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ user?.name }}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">สถานะ</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Agents and Partners</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">เบอร์โทรศัพท์</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ user?.customer?.tel }}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li v-for="({ shortUrl, clicks }) in user?.customer?.urls" @click="copySign(shortUrl)"
                  class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div class="flex w-0 flex-1 items-center">
                    <CursorArrowRaysIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span class="px-2 flex-shrink-0 text-gray-400">{{ clicks }} clicks</span>
                    <LinkIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <a :href="shortUrl" target="_blank" class="truncate font-medium">{{ shortUrl }}</a>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0 cursor-pointer">
                    <ClipboardDocumentListIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LinkIcon, ClipboardDocumentListIcon, CursorArrowRaysIcon } from '@heroicons/vue/20/solid'

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
const snackbar = useSnackbar();

const router = useRouter();

const { logUserOut } = useAuthStore();
const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive

const logout = () => {
  logUserOut();
  router.push('/login');
};
const copySign = (text) => {
  navigator.clipboard.writeText(text)
  snackbar.add({
    type: 'success',
    text: 'copy to clipboard success'
  })
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