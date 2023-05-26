<template>
  <view class="content">
    <view class="items">
      <view class="" v-for="(item,index) in  week" :key="index" :class="index == currentDay ?'active':''">{{item}}
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    name: "calendarCon",
    data() {
      return {
        week: [],
        currentDay:''
      };
    },
    mounted() {
      this.week = this.getWeeks()
      // console.log(data);
    },
    methods: {
      getWeeks() {
        // const date = new Date()
        // const day = date.getDay()
        // // console.log(this.week);
        // var diff = date.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        // var weekStart = new Date(date.setDate(diff));
        // var weekEnd = new Date(date.setDate(weekStart.getDate()+6));

        // // console.log(day);
        // console.log(weekEnd,weekStart);

        const today = new Date();
        const currentDay = today.getDay();
        console.log(currentDay);
         // 0: 星期日, 1: 星期一, ..., 6: 星期六
         this.currentDay = currentDay
        const diff = currentDay === 0 ? 0: 7 - currentDay; // 计算本周第一天和今天的日期差
        const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - currentDay); // 本周第一天的日期对象
        const dates = []; // 存放本周的所有日期
        for (let i = 0; i < 7; i++) {
          const date = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + i);
          const year = date.getFullYear();
          const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
          const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          dates.push(day);
        }
        console.log('dates',dates);
        return dates;
      },


    },
  }
</script>

<style scoped lang="less">
  .content {

    & .items {
      display: flex;
      text-align: center;
      height: 60px;
      background-color: #fff;
      border-bottom-left-radius: 30rpx;
      border-bottom-right-radius: 30rpx;
       box-shadow: 2rpx 2rpx 10rpx 1rpx rgba(0, 0, 0, .3);

      // line-height: 60rpx;
      & view {
        width: calc(100% / 7);
        height: 120rpx;
        line-height: 120rpx;
      }
      & .active{
        background-color: #4b7af6;
        border-radius: 40rpx;
      }
    }
  }
</style>
