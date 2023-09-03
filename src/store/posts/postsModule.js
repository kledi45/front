import state from "./postsModuleState";
import mutations from "./postsModuleMutations";
import actions from "./postsModuleActions";
import getters from "./postsModuleGetters";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
