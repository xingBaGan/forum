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
                Record
              </th>
               <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Complaints
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
            <tr v-for="(user,index) in userList" :key="index"  :data-editing="false">
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
              <td class="px-6 py-4 whitespace-nowrap" >
                <div class="answer">回答了{{user.posts|countObjectProperties}}问题</div>
                <div class="thread">发起{{user.threads|countObjectProperties}}讨论</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap" >
               <div class="complaint" :data-index="index" @click="user.complaints?getData($event):''" :class="{'complaint-safe':!user.complaints}">受到{{user.complaints|countObjectProperties}}举报</div>
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
   <modal name="complaints-dialog"  width="800" height="450" :adaptive="true">
     <ul>
       <li v-for="(item,index) in complaintsCash" :key="item.id">
         <div v-if="cashedPost[index]">{{cashedPost[index].text}}</div>
         <div>被举报原因： {{item.reason}}</div>
         <div>举报状态: {{item.status|complaintStatus}}</div>
         <div>举报时间 {{item.timestamp}}</div>
         <div>审核人 {{item.comfirmed_by}}</div>
         <span class="complaint-accepted" @click="dealWithComplaint(index,1)">举报通过</span>
         <span class="complaint-denied" @click="dealWithComplaint(index,2)">举报失败</span>
       </li>
     </ul>
   </modal>
</div>
</template>

<script>
import asyncDataStatus from "@/mixins/asyncDataStatus";
import $api from '../api/index.js'
import {countObjectProperties} from '../utils/index.js'
import complaint from '../api/complaint.js';
  export default {
      mixins: [asyncDataStatus],
      data() {
        return {
          userList: [],
          complaintsCash:[],
          cashedPost:[]
        }
      },
      created(){
         $api.users.getUserList().then(snapshot=>{
            this.userList = snapshot.val()
             this.asyncDataStatus_fetched();
          })
      },
      filters: {
        "countObjectProperties": countObjectProperties,
         complaintStatus(status) {
          if(status == 0 ) return "初始化"
          return status == 1?"举报成功":"举报失败"
        }
      },
      methods: {
        getData($event) {
          let user = this.userList[$event.target.dataset.index];
          let complaints = user.complaints;
          // if(Object.prototype.toString.call(complaints) == "[object Array]") return;
          let ids= Object.keys(complaints).map((id)=>{
            return id;
          })
          $api.complaints.getComplaintByIds(ids).then(res=>{
            let data =res.map(item=>item.data)
            this.complaintsCash = data;
            let postIds = data.map(complaint=>{
              return complaint.postId;
            })

            this.getPosts(postIds)
            this.showDialog()
          })
        },
        showDialog(){
           this.$modal.show('complaints-dialog');
        },
        getPosts(ids){
          $api.posts.getRepliesByReplyIds({ids}).then(res=>{//得到
            let post = res.map(snapshot=>{
              return snapshot.val()
            })
            this.cashedPost =  post
          })
        },
        dealWithComplaint(index,status){
          let complaint = this.complaintsCash[index];
          complaint.status = status;
          complaint.comfirmed_at =  Math.floor(Date.now()/1000)
          complaint.comfirmed_By =  this.$store.state.auth.authId;
          $api.complaints.dealWithComplaint(this.complaintsCash[index]).then(()=>{
             this.$modal.hide('complaints-dialog');
          })
        }
      },
  }
</script>

<style scoped>
.complaint-accepted{
  @apply my-1 mx-2 bg-red-600 text-white ;
}
.complaint-denied{
   @apply my-1 mx-2 bg-gray-600 text-white ;
}
.show{
  @apply block h-40;
}
.complaint{
  @apply text-sm text-red-600;
}
.complaint-safe{
  @apply text-sm text-green-600;
}
.answer{
  @apply text-sm text-gray-900;
}
.thread{
  @apply text-sm text-gray-500;
}
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
tbody>tr>td:nth-child(n-3){
  @apply px-6 py-4 whitespace-nowrap;
}
tbody>tr>td:nth-child(5){
  @apply px-6 py-4 text-sm text-gray-500 whitespace-nowrap;
}
tbody>tr>td:nth-child(6){
  @apply px-6 py-4 text-sm font-medium text-right whitespace-nowrap;
}
.active-status{
  @apply inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full;
}
.edit-btn{
  @apply text-indigo-600 hover:text-indigo-900;
}
</style>
