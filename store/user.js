export default{
  namespaced:true,
  state:()=>({
    Uid:uni.getStorageSync('Uid'),
    token:uni.getStorageSync('token'),
    avatarurl:uni.getStorageSync('avatarurl'),
    nickname:uni.getStorageSync('nickname'),
  }),
  mutations:{
    updateUid(state,Uid){
      state.Uid = Uid
      this.commit('m_user/saveUidToStorage')
    },
    saveUidToStorage(state){
      uni.setStorageSync('Uid',state.Uid)
    },
    updateToken(state,token){
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token',state.token)
    },
    updateavatarurl(state,avatarurl){
      state.avatarurl = avatarurl
      this.commit('m_user/saveavatarurlToStorage')
    },
    saveavatarurlToStorage(state){
      uni.setStorageSync('avatarurl',state.avatarurl)
    },
    updateNickname(state,nickname){
      state.nickname = nickname
      this.commit('m_user/saveNicknameToStorage')
    },
    saveNicknameToStorage(state){
      uni.setStorageSync('nickname',state.nickname)
    },
  }
}