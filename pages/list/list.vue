<template>
  <view class="content">
    <view class="con">
      <listTab></listTab>
      <listItem :listData="listData" :isShowArr="isShowArr" :update-data="updateIsShowArr"></listItem>
    </view>
    <tabbar :state="state"></tabbar>
  </view>
</template>

<script>
  import tabbar from '../../components/tabbar/tabbar.vue'
  import listTab from '@/components/listTab/listTab.vue'
  import listItem from '@/components/listItem/listItem.vue'
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        state: 2,
        listData: [],
        isShowArr: []
      }
    },
    beforeCreate() {
      uni.hideTabBar()
    },
    computed: {
      ...mapState('m_user', ['Uid'])
    },
    onLoad() {
      this.getFormList()
    },
    methods: {
      async getFormList() {
        const res = await this.request({
          url: `/user/eventList/${this.Uid}`,
          data: {
            Uid: this.Uid
          }
        })
        console.log(res);
        const data = res.data
        this.listData = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        for (let i = 0; i < this.listData.length; i++) {

          for (let j = 0; j < this.listData[i].items.length; j++) {
            this.listData[i].items = this.listData[i].items.sort((a, b) => this.timeToNumber(a.event_startTime) - this
              .timeToNumber(b.event_startTime))
          }
        }
        console.log('this.listData', this.listData);
        for (let i = 0; i < this.listData.length; i++) {
          this.isShowArr.push(true)
        }
        console.log('this.isShowArr', this.isShowArr);
      },
      updateIsShowArr(newData){
        this.isShowArr = newData
      },
      timeToNumber(timeString) {
        const [hour, minute] = timeString.split(':').map(Number);
        return hour + minute / 60;
      }

    },
    watch: {
      // this.listData:{

      // }
    },
    components: {
      tabbar,
      listTab,
      listItem
    }
  }
</script>

<style scoped lang="less">
  .content {
    .con {
      padding-bottom: 150rpx;
    }
  }
</style>