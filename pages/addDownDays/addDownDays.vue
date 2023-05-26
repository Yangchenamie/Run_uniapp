<template>
  <view class="content">
    <view class="conTab">
      <view class="">
         Countdown Days
      </view>
    </view>
    <form action="">
      <view class="form">
        <view class="item">
          <label for="">名称：</label>
          <input type="text" v-model="downDaysName">
        </view>
        <view class="item">
          <label for="">时间：</label>
          <picker mode="date" fields="day" :value="dataMonth" @change="bindDateChange">
            <view>{{dataYear}}-{{dataMonth}}-{{dataDay}}</view>
          </picker>
        </view>
        <view class="btn" @click="addDownDaysDto">
          确定
        </view>

      </view>
    </form>
  </view>
</template>

<script>
import { mapState } from 'vuex' 
  export default {
    data() {
      return {
        beginHours: null,
        beginMinute: null,
        endHours: null,
        endMinute: null,
        noticeArr:['开始前5分钟','开始前10分钟','开始前15分钟','开始前20分钟','开始前半小时','开始前一小时'],
        noticeCurrent:0,
        dataMonth: this.getCurrentMonth(),
        dataYear: this.getCurrentYear(),
        dataDay:this.getCurrentDay(),
        downDaysName:''
      }
    },
    onLoad() {
      this.getCurrentDay()
    },
    computed:{
        ...mapState('m_user',['Uid'])
    },
    methods: {

      bindDateChange: function(e) {
        this.date = e.target.value
        this.date = this.date.split('-')
        this.dataMonth = this.date[1]
        this.dataYear = this.date[0]
        this.dataDay = this.date[2]
        console.log(this.date)
      },
      getCurrentMonth(){
        const date = new Date()
        let month =  date.getMonth()+1
        month = month > 9 ?month : '0' + month
        return month
      },
      getCurrentYear(){
        const date = new Date()
        return date.getFullYear()
      },
      getCurrentDay(){
        const date = new Date()
        console.log(date);
        return date.getDate()
      },
      async addDownDaysDto(){
        const date = `${this.dataYear}-${this.dataMonth}-${this.dataDay}`
        const day = new Date()
        const res = await this.request({
          url:`/user/countDay/${this.Uid}`,
          data:{
            name:this.downDaysName,
            date:date,
            day:day
          },
          method:'POST'
        })
        if(res.code ==200){
          uni.showLoading({
            title:'添加成功'
          })
          uni.navigateBack()
        }
        console.log(res);
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    padding-bottom:  40rpx;
    & .conTab{
      height: 270rpx;
      background-color: #4b7af6;
      display: flex;
      justify-content: space-between;
      font-size:  52rpx;
      color: #fff;
      align-items: center;
      padding: 40rpx 40rpx 0;
      box-sizing: border-box;
      & image{
        width: 50rpx;
        height: 50rpx;
      }
    }
    & .form {
      padding: 0 56rpx;
      width: 100%;
      box-sizing: border-box;
      margin-top: 50rpx;

      & .item {
        display: flex;
        align-items: center;
        height: 100rpx;
        margin-bottom: 60rpx;
        width: 100%;
        display: flex;
        border-bottom: 2rpx solid #ccc;
        & label{
          color: #a9a9a9;
          margin-right: 40rpx;
        }
        & input {
          width: 70%;
        }

        & picker {
          width: 220rpx;
        }
      }

      & .time {
        display: flex;
        margin-bottom: 60rpx;
        & .timeItem{
          display: flex;
          flex:1;
          & label{
            margin-right: 40rpx;
            color: #a9a9a9;
          }
        }
      }

      & .btn {
        transform: translateX(50%);
        margin-left: 60rpx;
        width: 240rpx;
        height: 66rppx;
        border-radius: 30rpx;
        background-color: #4b7af6;
        text-align: center;
        line-height: 66rpx;
        color: #fff;
      }
    }
  }
</style>
