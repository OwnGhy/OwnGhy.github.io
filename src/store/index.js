import Vue from 'vue';
import Vuex from 'vuex';
import blogs from './../../blog.json';
import {formatByMarked} from "../utils/tools";

Vue.use(Vuex);

let blog = blogs.blog;
blog = blog.sort((small, big) => +new Date(big.date) - +new Date(small.date));
const category = Array.from(new Set(blog.map(i => i.tags)));

const state = {
    blogsConfig: blog,
    blogWithContent: [],
    category,
    countBlog: blog.length,
    countCategory: category.length
};

const actions = {
    getAllBlogContent({ commit }) {
        const blogPromise = blog.map(b => {
            return import(`./../../src/publishers/${b.path.split('/src/publishers/')[1]}`);
        });

        Promise.all(blogPromise).then(res => {
            const blogWithContent = blog.map((b, index) => ({
                ...b,
                ...formatByMarked(res[index].default)
            }));

            commit('SET_ALL', blogWithContent);
        });
    }
};

const mutations = {
    SET_ALL (state, data) {
        state.blogWithContent = data
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations
});