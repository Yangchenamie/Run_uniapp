<template>
  <view class="dialog-bg" v-if="show">
    <view class="dialog">
      <view class="title">Add Event</view>
      <view class="input-wrap">
        <input type="text" placeholder="Event name" v-model="title">
      </view>
      <view class="buttons">
        <view class="button" @tap="addEvent">Add</view>
        <view class="button cancel" @tap="close">Cancel</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        title: ''
      }
    },
    methods: {
      addEvent() {
        if (!this.title) return
        this.$emit('add', this.title)
        this.title = ''
      },
      close() {
        this.$emit('close')
        this.title = ''
      }
    }
  }
</script>
