(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_sass_resources_loader_lib_loader_js_ref_3_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Overview.vue?vue&type=template&id=7d8612c3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overview"},[_c('div',{staticClass:"catch-me"},[_c('div',{staticClass:"catch-pic"}),_vm._v(" "),_c('p',{staticClass:"catch-label"},[_vm._v("Can you catch me?")]),_vm._v(" "),_c('div',{staticClass:"catch-wrap"},_vm._l((this.catch),function(c){return _c('a',{key:c.icon,staticClass:"catch-item",attrs:{"target":"_blank","data-tip":c.tip,"href":c.url}},[_c('svg',{staticClass:"icon",attrs:{"aria-hidden":"true"}},[_c('use',{attrs:{"xlink:href":("#icon-" + (c.icon))}})])])}),0)]),_vm._v(" "),_c('div',{staticClass:"blog-count"},[_c('div',{staticClass:"count-item"},[_c('p',[_vm._v("文章")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.countBlog))])]),_vm._v(" "),_c('div',{staticClass:"count-item"},[_c('p',[_vm._v("分类")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.countCategory))])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Overview.vue?vue&type=template&id=7d8612c3&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Overview.vue?vue&type=script&lang=js&
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
//
//
//
/* harmony default export */ var Overviewvue_type_script_lang_js_ = ({
  name: 'overview',
  computed: {
    countBlog() {
      return this.$store.state.countBlog;
    },

    countCategory() {
      return this.$store.state.countCategory;
    }

  },

  data() {
    return {
      catch: [{
        name: 'Github',
        icon: 'github',
        tip: 'Github',
        url: 'https://github.com/OwnGhy'
      }, {
        name: '微博',
        icon: 'weibo',
        tip: '微博',
        url: 'https://weibo.com/3211313701/profile?topnav=1&wvr=6&is_all=1'
      }, {
        name: 'Email',
        icon: 'email',
        tip: 'Email me!',
        url: 'mailto:guohy7@gmail.com'
      }]
    };
  }

});
// CONCATENATED MODULE: ./src/components/Overview.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Overviewvue_type_script_lang_js_ = (Overviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Overview.vue?vue&type=style&index=0&lang=less&
var Overviewvue_type_style_index_0_lang_less_ = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/Overview.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Overviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Overview = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=overview.js.map