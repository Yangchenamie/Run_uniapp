<template>
  <view class="content">
    <view class="pic">
      <image src="../../static/3.png" mode=""></image>
    </view>
    <form action="">
      <view class="form">
        <view class="item">
          <label for="">名称：</label>
          <input type="text" v-model="formData.name">
        </view>
        <view class="item">
          <label for="">时间：</label>
          <picker mode="date" fields="day" :value="dataMonth" @change="bindDateChange">
            <view>{{dataYear}}-{{dataMonth}}-{{dataDay}}</view>
          </picker>
        </view>
        <view class="time">
          <view class="timeItem">
            <label for="">开始：</label>
            <picker mode="multiSelector" @change="ChangeTimeBegin" :value="index" :range="timeOptions">
              <view class="" v-if="beginHours == null && beginMinute == null">
                开始时间
              </view>
              <view v-else>{{beginHours}}:{{beginMinute}}</view>
            </picker>
          </view>
          <view class="timeItem">
            <label for="">结束：</label>
            <picker mode="multiSelector" @change="ChangeTimeEnd" :value="index" :range="timeOptions">
              <view class="" v-if="endHours == null && endMinute == null">
                结束时间
              </view>
              <view v-else>{{endHours}}:{{endMinute}}</view>
            </picker>
          </view>
        </view>
        <view class="item">
          <label for="" >备注：</label>
          <input type="text" v-model="formData.classify">
        </view>
        <view class="item">
          <label for="">通知：</label>
          <picker  @change="changeNotice" :range="noticeArr" >
            <view v-if>{{noticeArr[noticeCurrent]}}</view>
          </picker>
        </view>
        <view class="btn" @click="gotoCreateFrom">
          确定
        </view>

      </view>
    </form>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        timeOptions: [
          ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
            '18', '19', '20', '21', '22', '23'
          ],
          ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
        ],
        index: [0, 0],
        timeVal: null,
        beginHours: null,
        beginMinute: null,
        endHours: null,
        endMinute: null,
        noticeArr:['开始前5分钟','开始前10分钟','开始前15分钟','开始前20分钟','开始前半小时','开始前一小时'],
        noticeCurrent:0,
        dataMonth: this.getCurrentMonth(),
        dataYear: this.getCurrentYear(),
        dataDay:this.getCurrentDay(),
        formData:{
          name:'',
          day:'',
          startTime:'',
          endTime:'',
          classify:''
        },
        list:[]
      }
    },
    onLoad() {
      this.getCurrentDay()
    },
    computed:{
      ...mapState('m_user',['Uid'])
    },
    methods: {
      ChangeTimeBegin(e) {
        this.index = e.target.value
        console.log(e.target.value);
        // const date = e.target.value
        this.beginHours = this.timeOptions[0][this.index[0]]
        this.beginMinute = this.timeOptions[1][this.index[1]]
        // console.log(this.hours, this.minute);
      },
      ChangeTimeEnd(e){
        this.index = e.target.value
        console.log(e.target.value);
        let date = e.target.value
        
        date = this.timeOptions[0][this.index[0]]
        // this.endMinute = this.timeOptions[1][this.index[1]]
        if(date <= this.beginHours){
          uni.showModal({
            title:"请重新选择时间"
          })
          return
        }
        this.endHours = this.timeOptions[0][this.index[0]]
        this.endMinute = this.timeOptions[1][this.index[1]]
      },
      changeNotice(e){
        this.noticeCurrent = e.target.value
        
      },
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
      async gotoCreateFrom(){
        const date = `${this.dataYear}-${this.dataMonth}-${this.dataDay}`
        const startTime = `${this.beginHours}:${this.beginMinute}`
        console.log(this.Uid);
        const res = await this.request({
          url:"/user/addEvent",
          method:'POST',
          data:{
            id:this.Uid,
            name:this.formData.name,
            classify:this.formData.classify,
            startTime:startTime,
            date:date
          }
        })
        console.log(11);
        console.log(res);
        if(res.code ==200){
          // this.updateList()
          uni.showModal({
            content:'添加成功！',
            success: (res) => {
              if(res.confirm){
                uni.reLaunch({
                  url:"/pages/list/list"
                })
              }
            }
          })
          // uni.navigateBack()
          
        }else{
          uni.showModal({
            content:'添加失败！'
          })
        }
      },
      async updateList(){
        this.request({
          url:`/user/eventList/${this.Uid}`
        }).then(res =>{
          this.list = res.data
          uni.reLaunch({
            url:"/pages/list/list"
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    padding-bottom:  40rpx;
    .pic {
      height: 400rpx;
      width: 100%;

      & image {
        width: 100%;
        height: 100%;
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
        background-color: #3b7cff;
        text-align: center;
        line-height: 66rpx;
        color: #fff;
      }
    }
  }
</style>
