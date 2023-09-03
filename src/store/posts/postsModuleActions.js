/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import axios from "../axiosAuth";

export default {
    createPost({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            axios({
                url: `/api/Posts`,
                method: "POST",
                data,
            })
            .then(async (response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    getPosts({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/Posts/${id}`)
            .then(async (response) => {
                resolve(response);
                commit('SET_POSTS', response.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    updatePost({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            axios({
                url: `/api/Posts/${data.id}`,
                method: "PUT",
                data,
            })
            .then(async (response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    deletePost({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            axios({
                url: `/api/Posts/${id}`,
                method: "DELETE",
            })
            .then(async (response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    getPostLikes({ commit, state }, id) {
        return new Promise((resolve, reject) => {
        axios.get(`/api/Posts/${id}/likes`)
            .then(async (response) => {
                resolve(response);
                commit('SET_POST_LIKES', response.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    createPostLike({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            axios({
                url: `/api/Posts/${id}/likes`,
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
    deletePostLike({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            axios({
                url: `/api/Posts/${id}/likes`,
                method: "DELETE",
            })
            .then(async (response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
}