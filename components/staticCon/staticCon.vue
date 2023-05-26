<template>
  <view class="content">
    <view class="conTitle">
      统计
    </view>
    <view class="conTab">
      <ul>
        <li :class="curr==0 || curr == 1 ?'active':''" data-index="0" @tap="setCurr">日</li>
        <li :class="curr==2?'active':''" data-index="0" @tap="setCurr">月</li>
        <li :class="curr==3?'active':''" data-index="0" @tap="setCurr">年</li>
      </ul>
    </view>
    <view class="Items">
      <swiper :current="curr" @change="setCurr" :style="{height: swiperHeight + 150 + 'px'}">
        <swiper-item>
          <scroll-view id="pieConId">
            <view class="timeTitle">
              03-25 - 昨天
            </view>
        	   <pieCon :showIndex="showIndex"></pieCon>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view>
            <view class="timeTitle">
              03-26 - 今天
            </view>
        	   <pieCon :showIndex="showIndex"></pieCon>
          </scroll-view>
        </swiper-item>
      	 <swiper-item>
          <scroll-view>
            <view class="changeTab">
              <view class="distribution" :class="index == 0 ? 'active' : ''" @click="changeIndex(0)">
                分布
              </view>
              |
              <view class="trend" :class="index == 1 ? 'active' : ''" @click="changeIndex(1)">
                趋势
              </view>
            </view>
            <pieCon v-if="index == 0" :showIndex="showIndex"></pieCon>
            <lineCon v-else></lineCon>
    		    </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view>
            <view class="changeTab">
              <view class="distribution active">
                分布
              </view>
              |
              <view class="trend" >
                趋势
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
    import {mapState} from 'vuex'
  import pieCon from '@/components/pieCon/pieCon.vue'
    import lineCon from '@/components/lineCon/lineCon.vue'
  export default {
    name: "staticCon",
    data() {
      return {
        curr:0,
        swiperHeight:null,
        index:0,
        todayData:[],
        showChild:false,
        showIndex:0
      };
    },
    computed:{
      ...mapState('m_user',['Uid'])
    },
    onReady() {
      this.getTodayData()
      this.getYesterdayData()
    },
    mounted() {
      const query = uni.createSelectorQuery().in(this);
      query.select('#pieConId').boundingClientRect(data => {
        console.log(data)
        this.swiperHeight = data.height
        
      }).exec();
    },
    watch:{
      showIndex:function(newVal,oldVal){
        console.log(newVal,oldVal);
        this.$nextTick(()=>{
          this.showIndex = this.curr ;
        })
      }
    },
    methods: {
      async getTodayData(){
        const res = await this.request({
          url:`/user/DateDay/${this.Uid}`,
          
        })
        this.$nextTick(()=>{
           this.todayData = res.data
           this.showChild = true
        })
        // this.todayData = res.data
        
        console.log(res);
      },
      async getYesterdayData(){
        const res = await this.request({
          url:`/user/yesterday/${this.Uid}`
        })
        console.log(res);
      },
      // async getLastMonthData(){
      //   const res = await this.request({
      //     url:``
      //   })
      // }
      setCurr(e) {
        // console.log(e.detail.current)
        let thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
        // console.log(thisCurr)
        this.curr = thisCurr;
        this.$nextTick(()=>{
          this.showIndex = this.curr ;
        })
      },
      changeIndex(index){
        this.index = index
      }
    },
    components: {
      pieCon,lineCon
    }
  }
</script>

<style scoped lang="less">
  .content {
    /* margin-top: 30rpx; */
    padding: 40rpx 60rpx;
  
  & .conTitle {
      font-size: 52rpx;
    }

    & .conTab {
      width: 100%;
      margin-top: 40rpx;

      & ul {
        display: flex;
        border: 2rpx solid #5495f7;
        text-align: center;
        height: 60rpx;
        font-size: 36rpx;
        line-height: 60rpx;

        & li {
          flex: 1;
          background-color: #fff;
          color: #5495f7;
          border-right: 2rpx solid #5495f7;

          &:last-child {
            border-right: 2rpx solid transparent;
          }
        }

        & .active {
          color: #fff;
          background-color: #5495f7;
        }
      }
    }

    & .Items {
      & .timeTitle{
        margin-top: 30rpx;
        color: #7F7F7F;
      }
    }
    & .changeTab{
      display: flex;
      // margin: 40rpx 0;
      margin-top: 40rpx;
      float: right;
      color: #7F7F7F;
      // margin-bottom: 40rpx;
      & .distribution{
        margin-right: 10rpx;
      }
      & .trend{
        margin-left: 10rpx;
      }
      & .active{
        color: #333;
        font-weight: 700;
      }
    }
  }
</style>
