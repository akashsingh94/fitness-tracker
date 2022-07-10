import { createStore } from "vuex";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      userSession: null,
    };
  },
  mutations: {
    updateUserSession(state, session) {
      state.userSession = session;
    },
  },
});
