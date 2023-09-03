/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import axios from "../axiosAuth";
import router from '@/router/index'

export default {
  login({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/Login/Login?email=${data.email}&password=${data.password}`,
        method: "POST",
        data,
      })
        .then(async (response) => {
          resolve(response);
          localStorage.setItem('userData', JSON.stringify(response.data));
          router.push({
            name:'Login'
          })
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  signup({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/Login/SignOut`,
        method: "POST",
      })
        .then(async (response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};