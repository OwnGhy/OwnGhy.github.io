(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/YeahMe.vue?vue&type=template&id=363c65bb&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('home-layout',[_c('div',{staticClass:"card markdown-container",attrs:{"slot":"content"},domProps:{"innerHTML":_vm._s(_vm.yeahmeMd)},slot:"content"})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/YeahMe.vue?vue&type=template&id=363c65bb&

// EXTERNAL MODULE: ./node_modules/marked/lib/marked.js
var marked = __webpack_require__(7);
var marked_default = /*#__PURE__*/__webpack_require__.n(marked);

// CONCATENATED MODULE: ./src/assets/yeahme.md
/* harmony default export */ var yeahme = ("> 自我介绍一向对于我是最难的了😢，可能对自我的认知太差了吧。\n\n### 什么都喜欢尝试的并且想成为全栈的前端程序媛\n\n虽然什么都喜欢尝试吧，虽然什么都喜欢尝试吧，也有个三分钟热度的毛病。所以在这里立下flag，那些三分钟扔掉的东西，啊啊啊啊，我一定要捡起来～\n\n说起三分钟热度，博客这件事也是，这一版之前我大概尝试了三个版本：\n\n- 前后端都包括的版本🤪\n- 不知道怎么形容的版本\n- 基于 Hexo 的静态博客\n\n然后就是现在这个版本，出于自己 Hexo 的原理的好奇，所以想自己实现一把，虽然很多实现方式不完全是按照 Hexo 来的，比如自己 yy 🤔的一些方式啊。\n\n虽然肯定不是最好的方式，但是觉得尝试的过程还是有很多收获滴～\n\n### 我喜欢\n\n唯一追的动漫海贼王，真的超爱💛🧡❤️，大概刷了三遍～还去漫画里找细节～海贼陪我走过的时间太长了，很喜欢里面的友情、梦想、态度。更多的是羡慕，嘻嘻～\n\n我是个颜控，喜欢好看的美好的事物，喜欢摄影（非常不专业的说🤪）；做饭也很在意颜值～\n\n最后，啊啊啊，我的 flag，挺住啊，持续学习 & 瘦 10 斤，一个都不能倒！！💃");
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/YeahMe.vue?vue&type=script&lang=js&
//
//
//
//
//



const HomeLayout = () => __webpack_require__.e(/* import() | home-layout */ 4).then(__webpack_require__.bind(null, 56));

marked_default.a.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
/* harmony default export */ var YeahMevue_type_script_lang_js_ = ({
  name: 'yeah-me',
  components: {
    HomeLayout
  },
  computed: {
    yeahmeMd() {
      return marked_default()(yeahme);
    }

  },

  mounted() {
    setTimeout(() => {
      document.getElementById('main').scrollIntoView();
    }, 300);
  }

});
// CONCATENATED MODULE: ./src/pages/YeahMe.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_YeahMevue_type_script_lang_js_ = (YeahMevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/pages/YeahMe.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_YeahMevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var YeahMe = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=yeahMe.js.map