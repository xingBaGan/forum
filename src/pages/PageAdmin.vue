<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
<div class="container">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <table class="table">
          <thead class="">
            <tr>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Title
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Role
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="(user,index) in userList" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="base-info">
                  <div class="icon-box">
                    <img class="user-icon" :src="user.avatar" alt="">
                  </div>
                  <div class="info">
                    <div class="name">
                      {{user.name}}
                    </div>
                    <div class="email">
                      {{user.email}}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                <div class="text-sm text-gray-500">Optimization</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="active-status">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
               {{user.is_admin?"Admin":"User"}}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <a href="#" class="edit-btn">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import asyncDataStatus from "@/mixins/asyncDataStatus";
import $api from '../api/index.js'
  export default {
      mixins: [asyncDataStatus],
      data() {
        return {
          userList: []
        }
      },
      created(){
         $api.users.getUserList().then(snapshot=>{
            this.userList = snapshot.val()
             this.asyncDataStatus_fetched();
          })
      }
  }
</script>

<style scoped>
.base-info{
  @apply flex items-center;
}
.name{
  @apply text-sm font-medium text-gray-900;
}
.info{
  @apply ml-4;
}
.email{
  @apply text-sm text-gray-500;
}
.icon-box{
  @apply flex-shrink-0 w-10 h-10;
}
.container {
  @apply flex flex-col mt-8;
}
.table{
    @apply min-w-full divide-y divide-gray-200;
}
thead{
  @apply bg-gray-50;
}
tbody{
    @apply bg-white divide-y divide-gray-200;
}
th{
  @apply px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase;
}
.user-icon{
  @apply w-10 h-10 rounded-full;
}
tbody>tr>td:nth-child(n-2){
  @apply px-6 py-4 whitespace-nowrap;
}
tbody>tr>td:nth-child(4){
  @apply px-6 py-4 text-sm text-gray-500 whitespace-nowrap;
}
tbody>tr>td:nth-child(5){
  @apply px-6 py-4 text-sm font-medium text-right whitespace-nowrap;
}
.active-status{
  @apply inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full;
}
.edit-btn{
  @apply text-indigo-600 hover:text-indigo-900;
}
</style>
