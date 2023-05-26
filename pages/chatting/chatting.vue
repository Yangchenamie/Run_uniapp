<template>
  <view class="content">
    <view class="conTab">
     <!-- <ul>
        <li @click="changeTrue">
          <view :class="flag == true ? 'active' :''">
            信息
          </view>
        </li>
        <li  @click="changeFalse">
          <view :class="flag == false ? 'active' :''">
            朋友
          </view>
        </li>
      </ul> -->
      <conTab :arr="arr" :showFlag="true" @chattingFlag="chattingFlag($event)"></conTab>
      <!-- <image src="../../static/addPerson.png" mode=""></image> -->
    </view>
    <view class="Con" >
      <view class="" v-if="flag">
        <messageList></messageList>
      </view>
      <view class="" v-else>
        <friendsList></friendsList>
      </view>
      
    </view>
    <tabbar :state="state"></tabbar>
  </view>
</template>

<script>
  import tabbar from '../../components/tabbar/tabbar.vue'
  import friendsList from '@/components/friendsList/friendsList.vue'
  import messageList from '@/components/messageList/messageList.vue'
  import conTab from "@/components/conTab/conTab.vue"
  export default {
    data() {
      return {
        state: 4,
        index:0,
        flag:true,
         arr:['信息','朋友'],
      }
    },
    beforeCreate() {
      uni.hideTabBar()
    },
    methods: {
      chattingFlag(value){
        console.log(value);
        this.flag = value
      }
    },
    components: {
      tabbar,
      friendsList,
      messageList,conTab
    }
  }
</script>

<style scoped lang="less">
  .content {

    .conTab {
      margin-top: 130rpx;
    }

  }
</style>
