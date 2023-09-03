import state from "./authModuleState";
import mutations from "./authModuleMutations";
import actions from "./authModuleActions";
import getters from "./authModuleGetters";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
