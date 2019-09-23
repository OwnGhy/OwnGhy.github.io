(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageBoard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageBoard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageBoard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageBoard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/MessageBoard.vue?vue&type=template&id=5fc53a49&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('home-layout',[_c('div',{attrs:{"slot":"content"},slot:"content"},[_c('div',{staticClass:"card message-desc"},[_c('p',[_vm._v("有个同学说要来给我喊 666，所以加了个留言板，hhhhhh～😜")]),_vm._v(" "),_c('p',[_vm._v("当然，希望大家一起来讨论或者是给我提意见才是正经的～")])]),_vm._v(" "),_c('div',{staticClass:"card",attrs:{"id":"comment-wrap"}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/MessageBoard.vue?vue&type=template&id=5fc53a49&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/MessageBoard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
const HomeLayout = () => __webpack_require__.e(/* import() | home-layout */ 5).then(__webpack_require__.bind(null, 63));

/* harmony default export */ var MessageBoardvue_type_script_lang_js_ = ({
  name: 'message_board',
  components: {
    HomeLayout
  },

  mounted() {
    setTimeout(() => {
      document.getElementById('main').scrollIntoView();
    }, 300);
    setTimeout(() => {
      // 初始化 gitalk
      const gitalk = new Gitalk({
        clientID: '9df6ba9180805813015e',
        clientSecret: '49ebf141c03115c93550de2dc7d70876428e7c3e',
        repo: 'OwnGhy.github.io',
        owner: 'OwnGhy',
        admin: ['OwnGhy'],
        id: 'MessageBoard',
        distractionFreeMode: false // Facebook-like distraction free mode

      });
      gitalk.render('comment-wrap');
    }, 1000);
  }

});
// CONCATENATED MODULE: ./src/pages/MessageBoard.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_MessageBoardvue_type_script_lang_js_ = (MessageBoardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/MessageBoard.vue?vue&type=style&index=0&lang=less&
var MessageBoardvue_type_style_index_0_lang_less_ = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/pages/MessageBoard.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_MessageBoardvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MessageBoard = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=message.js.map