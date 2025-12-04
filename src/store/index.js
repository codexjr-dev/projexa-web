import { createStore } from "vuex";
import actions from './modules/actions'

const store = createStore({
  state: {
    page: {
      context: '',
      modalContext: '',

      sidebar: {
        show: true
      },

      header: {
        title: '',
        buttonVisibility: true,
      },
    },

    title: "Vuex Store",
    users: []
  },

  getters: {
    allUsers(state) {
      return state.users;
    }
  },

  mutations: {
      SET_PAGE_CONTEXT(state, context) {
        state.page.context = context
      },

      SET_AND_SHOW_MODAL_CONTEXT(state, context) {
        state.page.modalContext = context
      },

      SHOW_SIDEBAR(state, showSidebar) {
        state.page.sidebar.show = showSidebar
      },

      SET_HEADER_TITLE(state, title) {
        state.page.header.title = title
      },

      SET_HEADER_BUTTON_VISIBILITY(state, visibility) {
        state.page.header.buttonVisibility = visibility
      },
  },

  actions: {
    ...actions
  }
});

export default store;