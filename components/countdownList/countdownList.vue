<template>
  <view class="item">
    <view class="itemFl">
      距离{{list.name}}还有
    </view>
    <view class="itemFr">
      <view class="days">
        {{dayOdd}}
      </view>
      <view class="sky">
        天
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"countdownList",
    props:['list'],
    data() {
      return {
        dayOdd:0
      };
    },
    // 这里要使用create 使用onLoad 或者onshow 不起作用
    created(){
      this.getDays()
    },
    methods:{
      getDayOdd(date1,date2){
        const one_day = 1000 * 60 * 60 *24
        const time1 = date1.getTime();
        const time2 = date2.getTime()
        const diff = Math.abs(time2 - time1)
        return Math.floor(diff /one_day)
      },
      getDays(){
        const day = new Date()
        console.log(day,this.list.Date);
        this.dayOdd = this.getDayOdd(new Date(this.list.Date),day)
      }
    }
  }
</script>

<style scoped lang="less">
.item{
  width: 90%;
  display: flex;
  justify-content: space-between;
  height: 80rpx;
  background-color: #fff;
  border-radius: 20rpx;
  align-items: center;
  box-sizing: border-box;
  padding-left: 40rpx;
  margin: 15rpx auto 0;
  & .itemFl{
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .itemFr{
    display: flex;
    color: #fff;
    // height: 100%;
    align-items: center;
    & .days{
      background-color: #7ca0ff;
      padding: 0 50rpx;
      // height: 100%;
      line-height: 80rpx;
    }
    & .sky{
      background-color: #4b7af6;
      padding: 0 30rpx;
      height: 100%;
       line-height: 80rpx;
      border-top-right-radius: 20rpx;
      border-bottom-right-radius: 20rpx;
    }
  }
}
</style>