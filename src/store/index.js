import Vue from 'vue';
import Vuex from 'vuex';
import blogs from './../../blog.json';
import {formatByMarked} from "@utils/tools";

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

function escape2Html(str) {
    let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"', '#x60': '`'};
    return str.replace(/&(lt|gt|nbsp|amp|quot|#x60);/ig,function(all,t){
        return arrEntities[t];
    });
}

const actions = {
    getBlogContent({ commit }, search = '') {
        const blogWithContent = (search ? blog.filter(i => i.title.includes(search) || i.tags.includes(search)) : blog).map((b) => ({
            ...b,
            ...formatByMarked(escape2Html(b.outline))
        }));

        commit('SET_ALL', blogWithContent);
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