import Vue from 'vue';
import Vuex from 'vuex';
import blogs from './../../blog.json';
import {formatByMarked} from "@utils/tools";
import path from 'path';

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
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"', '#x60': '`'};
    return str.replace(/&(lt|gt|nbsp|amp|quot|#x60);/ig,function(all,t){
        return arrEntities[t];
    });
}

const actions = {
    getAllBlogContent({ commit }) {
        // const blogPromise = blog.map(b => {
        //     // import(b.path)不行，是因为webpack的import()不能完全实现动态导入，不能传入变量，必须是字符串
        //     // import(`./../../${b.path}`)不行，虽然是字符串了，但是没有标明一个统一的目录
        //     // webpack会根据标明的目录统一将该目录下的文件进行单独打包，以实现动态导入
        //     return import(`./../../publishers/${b.path.split('/publishers/')[1]}`);
        // });
        //
        // Promise.all(blogPromise).then(res => {
        //
        // });

        const blogWithContent = blog.map((b) => ({
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