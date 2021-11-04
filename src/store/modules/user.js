// 用户状态
export default {
  namespaced: true,
  state: () => ({
    // 个人用户信息
    profile: {
      id: '',
      nickname: '',
      avatar: '',
      token: '',
      mobile: ''
    }
  }),
  // 测试代码
  mutations: {
    setUser (state) {
      state.profile.id = 10001
    }
  }
}
