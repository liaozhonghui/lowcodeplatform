import { Commit } from 'vuex';
import { AppState } from '../../types/store';

const sidebarStatus = localStorage.getItem("sidebarStatus") || 0;

// 状态
const state = {
  sidebar: {
    opened: !!Number(sidebarStatus)
  }
};

// 计算属性
const getters = {
  sidebar: (state: AppState) => state.sidebar,
};

// 修改state
const mutations = {
  showSideBar(state: AppState) {
    localStorage.setItem("sidebarStatus", "1");
    state.sidebar.opened = true;
  },
  hideSideBar(state: AppState) {
    localStorage.setItem("sidebarStatus", "0");
    state.sidebar.opened = false;
  }
};

// 业务代码
const actions = {
  // 显示侧边栏
  showSideBar({ commit }: { commit: Commit; }) {
    commit('showSideBar');
  },
  // 隐藏侧边栏
  hideSideBar({ commit }: { commit: Commit; }) {
    commit('hideSideBar');
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
