<template>
  <view class="content">
    <view class="itemCon" v-for="(item,index) in tweetsInfoList" :key="index">
      <view class="item">
        <view class="itemFl">
          <image :src="item.essay.user_info_avatarUrl" mode=""></image>
        </view>
        <view class="itemFr">
          <view class="itemText">
            <view class="">
              {{item.essay.user_info_nickName}}
            </view>
            <view class="time">
              三分钟前
            </view>
          </view>
          <view class="text">
            {{item.essay.essay_content}}
          </view>
        </view>

      </view>
      <view class="comments">
        <image src="../../static/comments.png" mode="" @click="toggleCommentInput(index)"></image>
        <image src="../../static/like.png" mode="" v-if="!flagArr[index]" @click="isShow(index)"></image>
        <image src="../../static/like-active.png" mode="" v-else @click="isShow(index)"></image>
      </view>
      <view class="commentList" v-for="(item2,index2) in item.comment" :key="index2">
        <text class="">
          {{item2.comment_nickName}}:
        </text>
        <text class="">
          {{item2.comment_content}}
        </text>
      </view>
      <view class="InputComments" v-if="commentFlag[index]">
        <input type="text" placeholder="评论" v-model="commentContent">
        <button @click="addComment(item,index)">评论</button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "friendCon",
    data() {
      return {
        flagArr: [],
        commentFlag: [],
        commentList: [],
        commentContent: '',
        tweetsInfoList: [],
        defaultavatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        commentIndex: null,
        changeFlag: false
      };
    },
    computed: {
      ...mapState('m_user', ['Uid', 'avatarurl'])
    },
    onReady() {
      this.getTweetsInfo()
    },
    methods: {
      isShow(index) {
        // this.flagArr[index] = !this.flagArr[index]
        this.$set(this.flagArr, index, !this.flagArr[index]);
        console.log('-----', this.flagArr);
      },
      async getTweetsInfo() {
        const res = await this.request({
          url: "/user/getEssay"
        })

        this.tweetsInfoList = res.data
        for (let i = 0; i < this.tweetsInfoList.length; i++) {
          if (this.tweetsInfoList[i].essay.user_id == this.Uid) {
            this.tweetsInfoList[i].essay.user_info_avatarUrl = this.avatarurl
          }
          if (this.tweetsInfoList[i].essay.user_info_avatarUrl == 1 || this.tweetsInfoList[i].user_info_avatarUrl ==
            0) {
            this.tweetsInfoList[i].essay.user_info_avatarUrl = this.defaultavatarUrl

          }
        }
        for (let i = 0; i < this.tweetsInfoList.length; i++) {
          this.flagArr.push(false)
        }
        for (let i = 0; i < this.tweetsInfoList.length; i++) {
          this.commentFlag.push(false)
        }
        console.log('-----', this.flagArr);
        console.log(this.tweetsInfoList);
      },
      toggleCommentInput(index) {
        this.$set(this.commentFlag, index, !this.commentFlag[index]);
        this.commentIndex = index
      },
      async addComment(item, index) {
        const res = await this.request({
          url: "/user/comments",
          method: 'POST',
          data: {
            id: item.essay.essay_id,
            Uid: this.Uid,
            content: this.commentContent
          },
        })
        if (res.code == 200) {
          this.commentList.push(res.data)
          console.log(this.commentList);
          this.tweetsInfoList[index].comment.push({
            comment_Uid: res.data.Uid,
            comment_content: res.data.content,
            comment_essayId:res.data.essay.id,
            comment_id: res.data.id,
          })
          this.commentContent = ''
          this.toggleCommentInput(this.commentIndex)
          this.$forceUpdate()
        }
      }
    },
  }
</script>

<style scoped lang="less">
  .content {
    padding: 0 50rpx 0 40rpx;

    .item {
      display: flex;

      & .itemFl {

        & image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
        }
      }

      & .itemFr {
        display: flex;
        flex-flow: column;
        margin-left: 20rpx;

        & .itemText {
          display: flex;
          height: 100rpx;
          justify-content: space-evenly;
          flex-flow: column;

          & .time {
            font-size: 20rpx;
            color: #777;
          }
        }

        & .text {
          margin-top: 15rpx;
          font-size: 28rpx;
        }

      }
    }

    .comments {
      float: right;

      & image {
        width: 40rpx;
        height: 40rpx;
        margin: 20rpx 10rpx;
      }
    }

    & .InputComments {
      padding: 0;
      clear: both;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & input {
        width: 480rpx;
      }

      & button {
        height: 70rpx;
        width: 130rpx;
        background-color: #5495f7;
        margin: 0;
        font-size: 28rpx;
        color: #fff;
      }
    }

    & .commentList {
      clear: both;
      font-size: 28rpx;
      color: #999;
      margin: 6rpx 0 6rpx 50rpx;
    }
  }

  .itemCon {
    padding-bottom: 50px;
  }
</style>