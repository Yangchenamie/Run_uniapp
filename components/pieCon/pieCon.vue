<template>

  <view class="">
    <view class="charts-box">
      <qiun-data-charts type="ring" :opts="opts" :chartData="chartData" :inScrollView="true" />
    </view>
    <view class="chartsTab">
      <view class="Item" v-for="(item,index) in todayData" :key="item.id">
        <view class="point" :style="{background:opts.color[index]}">

        </view>
        <view class="itemText">
          <view class="itemName">
            {{item.name}}
          </view>
          <view class="time">
            {{item.duration}}min
          </view>
        </view>
      </view>
   <!-- <view class="Item">
        <view class="point">

        </view>
        <view class="itemText">
          <view class="itemName">
            四级复习
          </view>
          <view class="time">
            60min
          </view>
        </view>
      </view> -->
      

    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "pieCon",
    props:['showIndex'],
    data() {
      return {
        chartData: {},
        todayData: [],
        //您可以通过修改 config-ucharts.js 文件中下标为 ['ring'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
        opts: {
          rotate: false,
          rotateLock: false,
          color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
          // padding: [0, 5, 5, 5],
          dataLabel: true,
          enableScroll: false,
          legend: {
            show: true,
            position: "right",
            lineHeight: 25
          },
          title: {
            name: "效率",
            fontSize: 15,
            color: "#666666"
          },
          subtitle: {
            name: "70%",
            fontSize: 25,
            color: "#7cb5ec"
          },
          extra: {
            ring: {
              ringWidth: 10,
              activeOpacity: 0.5,
              activeRadius: 10,
              offsetAngle: 0,
              labelWidth: 15,
              border: true,
              borderWidth: 3,
              borderColor: "#FFFFFF",
              // linearType: "custom"
            }
          }
        }
      };
    },
    computed: {
      ...mapState('m_user', ['Uid'])
    },
    watch:{
      showIndex:function(newVal,oldVal){
        console.log(newVal,oldVal);
        if(this.showIndex == 0){
          this.getYesterDayData()
        }else if(this.showIndex == 1){
          this.getTodayData()
        }
      }
    },
    onReady() {
      if(this.showIndex == 0){
        this.getYesterDayData()
      }else if(this.showIndex == 1){
        this.getTodayData()
      }
      
      // this.getServerData()
    },
    methods: {
      async getTodayData() {
        const res = await this.request({
          url: `/user/DateDay/${this.Uid}`,

        })
        console.log('res', res);
        this.todayData = res.data
        this.getServerData()
      },
      
      async getYesterDayData() {
        const res = await this.request({
          url: `/user/yesterday/${this.Uid}`,
      
        })
        console.log('getYesterDayData', res);
        this.todayData = res.data
        console.log('getYesterDayData中的this.todayData', this.todayData );
        this.getServerData()
      },
      getServerData() {
        // this.chartData = {
        //     series: [],  
        // };
        // class data {
        //   name:String,
        //   value:Number
        // }
        // console.log('this.todayData',this.todayData);
        // let dataArr = []
        // for(let i=0;i<this.todayData.length;i++){
        //   let a={
        //     name:this.todayData[i].name,
        //     value:Number(this.todayData[i].duration)
        //   }
        //   dataArr.push(a)
        // }
        let res = {
          series: [{
            data: []
          }]
        }
        for (let i = 0; i < this.todayData.length; i++) {
          let a = {
            name: this.todayData[i].name,
            value: Number(this.todayData[i].duration)
          }
          res.series[0].data.push(a)
        }
        // this.chartData.series.push(dataArr)
        console.log('res', res);
        //模拟从服务器获取数据时的延时
        // setTimeout(() => {
        //   //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        // let res = {
        //   series: [{
        //     data: [{
        //       "name": "一班",
        //       "value": 50
        //     }, {
        //       "name": "二班",
        //       "value": 30
        //     }, {
        //       "name": "三班",
        //       "value": 20
        //     }, {
        //       "name": "四班",
        //       "value": 18
        //     }, {
        //       "name": "五班",
        //       "value": 8
        //     }]
        //   }]
        // };
        this.chartData = JSON.parse(JSON.stringify(res));
        // }, 500);

        console.log('this.chartData', this.chartData);
      },
    }
  };
</script>

<style lang='less'>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 250px;
  }

  .chartsTab {
    display: flex;
    flex-wrap: wrap;

    & .Item {
      display: flex;
      align-items: center;
      flex-basis: 33%;
      margin-bottom: 40rpx;

      & .itemText {
        & .itemName {}

        & .time {
          color: #7F7F7F;
          font-size: 24rpx;
          line-height: 40rpx;
        }
      }

      & .point {

        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        /* background-color: #FFB600; */
        margin-right: 30rpx;
      }


    }
  }
</style>