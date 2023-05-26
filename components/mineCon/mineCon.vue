<template>
  <view class="content">
    <view class="countdown" @click="gotoDown">
      <view class="downTab conTab">
        Countdown Days
      </view>
      <view class="downCon" v-for="(item,index) in downList" :key="index">
        <countdownList :list ="item"></countdownList>
      </view>
    </view>
    <view class="caleCon" @click="gotoCalendar">
      <view class="conTab">
        {{day}}
      </view>
      <calendarCon></calendarCon>
    </view>
    <view class="recording">
      <view class="recordTab">
        <view class="tabFr">
          <view class="title">
            学习记录
          </view>
          <view class="text">
            Let's do it
          </view>
        </view>
        <view class="tabFr" @click="gotoIndex">
          <image src="../../static/2.png" mode=""></image>
        </view>
      </view>
      <view class="recordCon">
        <arcbarCon></arcbarCon>
      </view>
    </view>
    <view class="diary">

    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import calendarCon from '@/components/calendarCon/calendarCon.vue'
  import countdownList from '@/components/countdownList/countdownList.vue'
  import arcbarCon from '@/components/arcbarCon/arcbarCon.vue'
  export default {
    name: "mineCon",
    data() {
      return {
        downList:[],
        day:''
      };
    },
    computed:{
      ...mapState('m_user',['Uid'])
    },
    created() {
      this.getDownDaysList()
    },
    onReady() {
      const date = new Date()
      console.log(date);
      const weekdayMap = ['日', '一', '二', '三', '四', '五', '六'];
      const weekday = weekdayMap[date.getDay()];
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      this.day = `${year}-${month}-${day} 周${weekday}`
    },
    methods: {
      gotoIndex(){
        uni.switchTab({
          url:'/pages/index/index'
        })
      },
      gotoDown() {
        uni.navigateTo({
          url: '/pages/downDays/downDays'
        })
      },
      gotoCalendar(){
        uni.navigateTo({
          url:'/pages/calendarPage/calendarPage'
        })
      },
      async getDownDaysList(){
        const res = await this.request({
          url:`/user/getCountDay/${this.Uid}`
        })
        console.log(res);
        this.downList = res
      }
    },
    components: {
      countdownList,
      calendarCon,
      arcbarCon
    }
  }
</script>

<style scoped lang="less">
  .content {
    padding: 100rpx 30rpx 0;

    & .conTab {

      background-color: #4b7af6;
      height: 150rpx;
      font-size: 40rpx;
      color: #fff;
      text-align: center;
      line-height: 150rpx;
      border-top-left-radius: 30rpx;
      border-top-right-radius: 30rpx;
    }

    & .countdown {
      // padding-top: 100rpx;
      width: 100%;
      height: 400rpx;
      border-radius: 30rpx;
      background-color: #f2f3f5;
      overflow: auto;
    }

    & .downTab {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    & .caleCon {
      margin-top: 50rpx;

    }

    & .recording {
      margin-top: 60rpx;
      padding-top: 60rpx;
      height: 400rpx;
      width: 100%;
      background-color: #fff;
      border-radius: 50rpx;
      box-shadow: 2rpx 2rpx 10rpx 1rpx rgba(0, 0, 0, .3);

      & .recordTab {
        padding: 0 52rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        & .tabFr {
          & .text {
            margin-top: 10rpx;
            font-size: 20rpx;
            color: #a9a9a9;
          }
        }

        & .tabFr {

          & image {
            width: 60rpx;
            height: 60rpx;
          }
        }
      }
    }
  }
</style>
