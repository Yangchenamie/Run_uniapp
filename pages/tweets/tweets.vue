<template>
  <view class="content">
    <view class="conTab">
      <conTab :arr="arr" :showFlag="true" :goUrl="goUrl"></conTab>
    </view>
    <view class="items">
      <friendCon></friendCon>
    </view>
  </view>
</template>

<script>
  import friendCon from '@/components/friendCon/friendCon.vue'
  import conTab from '@/components/conTab/conTab.vue'
  export default {
    data() {
      return {
        arr:['推荐','好友'],
        // flag:false,
        goUrl:'/pages/addTweets/addTweets'
      }
    },
    methods: {
      
    },
    components:{friendCon,conTab}
  }
</script>

<style scoped lang="less">
.conTab {
    margin: 30rpx 0 50rpx;
    }
</style>
