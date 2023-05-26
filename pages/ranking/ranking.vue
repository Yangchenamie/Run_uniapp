<template>
  <view class="content">
    <view class="top">
      <view class="topFl">
        <view class="">
          NO.1
        </view>
        <view class="person">
          <image :src="rankList[0].avatarUrl" mode="" class="pic"></image>

          <view class="">
            {{rankList[0].name}}
          </view>
        </view>
      </view>
      <view class="topFr">
        <view class="">
          {{rankList[0].duration}}min
        </view>
        <view class="">
          <image src="../../static/love.png" mode="" class="love" @click="flag = !flag" v-if="flag"></image>
          <image src="../../static/love-active.png" mode="" @click="flag = !flag" class="love" v-else></image>
        </view>
      </view>
    </view>
    <view class="list">
      <rankCon v-for="(item,index) in rankList.slice(1)" :key="item.id" :data = "item"></rankCon>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import rankCon from '@/components/rankCon/rankCon.vue'
  export default {
    data() {
      return {
        flag: true,
        rankList:[],
        defaultavatarUrl :
          'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      };
    },
    mounted() {
      this.getRanking();
    },
    computed:{
      ...mapState('m_user',['Uid','avatarurl'])
    },
    methods: {
      // calculateRank() {
      //   // 按学习时长排序
      //   this.students.sort((a, b) => b.studyTime - a.studyTime);
      //   // 计算排名
      //   for (let i = 0; i < this.students.length; i++) {
      //     this.students[i].rank = i + 1;
      //   }
      // },
      async getRanking() {
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const today = `${year}-${month}-${day-1}`
        const res = await this.request({
          url: `/user/ranking/${today}`
        })
        console.log(res);
          const data = res.data
          data.sort((a,b)=>Number(b.duration) - Number(a.duration))
          console.log('data',data);
          this.rankList = data
          for(let i=0;i<this.rankList.length;i++){
            if (this.rankList[i].userId == this.Uid) {
              this.rankList[i].avatarUrl = this.avatarurl
            }
            if(this.rankList[i].avatarUrl == 1 || this.rankList[i].avatarUrl == 0){
              this.rankList[i].avatarUrl = this.defaultavatarUrl
            }
          }
      }
    },
    components: {
      rankCon
    }
  };
</script>

<style scoped lang="less">
  .content {
    box-sizing: border-box;
    padding: 0 40rpx;

    & .top {
      margin-top: 50rpx;
      width: 100%;
      background-color: pink;
      height: 350rpx;
      border-radius: 36rpx;
      font-size: 40rpx;
      color: #fff;
      padding: 0 70rpx;
      box-sizing: border-box;
      font-weight: 700;

      & .topFl {
        padding-top: 30rpx;
        box-sizing: border-box;

        & .person {
          margin-top: 30rpx;
          display: flex;
          font-size: 36rpx;
          align-items: center;

          & .pic {
            width: 140rpx;
            height: 140rpx;
            border-radius: 50%;
            margin-right: 30rpx;
          }
        }

      }

      & .topFr {
        float: right;
        margin-top: -90rpx;

        & .love {
          float: right;
          width: 56rpx;
          height: 56rpx;
          margin-top: 30rpx;
        }
      }
    }

    & .list {
      margin-top: 50rpx;
    }
  }
</style>