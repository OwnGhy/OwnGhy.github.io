(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
!function (t, e) {
   true ? module.exports = e() : undefined;
}(this, function () {
  "use strict";

  var t = Object.freeze({});

  function e(t) {
    return null == t;
  }

  function n(t) {
    return null != t;
  }

  function r(t) {
    return !0 === t;
  }

  function o(t) {
    return "string" == typeof t || "number" == typeof t || "symbol" == typeof t || "boolean" == typeof t;
  }

  function i(t) {
    return null !== t && "object" == typeof t;
  }

  var a = Object.prototype.toString;

  function s(t) {
    return "[object Object]" === a.call(t);
  }

  function c(t) {
    var e = parseFloat(String(t));
    return e >= 0 && Math.floor(e) === e && isFinite(t);
  }

  function u(t) {
    return n(t) && "function" == typeof t.then && "function" == typeof t.catch;
  }

  function l(t) {
    return null == t ? "" : Array.isArray(t) || s(t) && t.toString === a ? JSON.stringify(t, null, 2) : String(t);
  }

  function f(t) {
    var e = parseFloat(t);
    return isNaN(e) ? t : e;
  }

  function d(t, e) {
    for (var n = Object.create(null), r = t.split(","), o = 0; o < r.length; o++) n[r[o]] = !0;

    return e ? function (t) {
      return n[t.toLowerCase()];
    } : function (t) {
      return n[t];
    };
  }

  var p = d("key,ref,slot,slot-scope,is");

  function v(t, e) {
    if (t.length) {
      var n = t.indexOf(e);
      if (n > -1) return t.splice(n, 1);
    }
  }

  var h = Object.prototype.hasOwnProperty;

  function m(t, e) {
    return h.call(t, e);
  }

  function y(t) {
    var e = Object.create(null);
    return function (n) {
      return e[n] || (e[n] = t(n));
    };
  }

  var g = /-(\w)/g,
      _ = y(function (t) {
    return t.replace(g, function (t, e) {
      return e ? e.toUpperCase() : "";
    });
  }),
      b = y(function (t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }),
      C = /\B([A-Z])/g,
      $ = y(function (t) {
    return t.replace(C, "-$1").toLowerCase();
  });

  var w = Function.prototype.bind ? function (t, e) {
    return t.bind(e);
  } : function (t, e) {
    function n(n) {
      var r = arguments.length;
      return r ? r > 1 ? t.apply(e, arguments) : t.call(e, n) : t.call(e);
    }

    return n._length = t.length, n;
  };

  function A(t, e) {
    e = e || 0;

    for (var n = t.length - e, r = new Array(n); n--;) r[n] = t[n + e];

    return r;
  }

  function x(t, e) {
    for (var n in e) t[n] = e[n];

    return t;
  }

  function O(t) {
    for (var e = {}, n = 0; n < t.length; n++) t[n] && x(e, t[n]);

    return e;
  }

  function k(t, e, n) {}

  var S = function (t, e, n) {
    return !1;
  },
      E = function (t) {
    return t;
  };

  function j(t, e) {
    if (t === e) return !0;
    var n = i(t),
        r = i(e);
    if (!n || !r) return !n && !r && String(t) === String(e);

    try {
      var o = Array.isArray(t),
          a = Array.isArray(e);
      if (o && a) return t.length === e.length && t.every(function (t, n) {
        return j(t, e[n]);
      });
      if (t instanceof Date && e instanceof Date) return t.getTime() === e.getTime();
      if (o || a) return !1;
      var s = Object.keys(t),
          c = Object.keys(e);
      return s.length === c.length && s.every(function (n) {
        return j(t[n], e[n]);
      });
    } catch (t) {
      return !1;
    }
  }

  function T(t, e) {
    for (var n = 0; n < t.length; n++) if (j(t[n], e)) return n;

    return -1;
  }

  function I(t) {
    var e = !1;
    return function () {
      e || (e = !0, t.apply(this, arguments));
    };
  }

  var D = "data-server-rendered",
      N = ["component", "directive", "filter"],
      P = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch"],
      L = {
    optionMergeStrategies: Object.create(null),
    silent: !1,
    productionTip: !1,
    devtools: !1,
    performance: !1,
    errorHandler: null,
    warnHandler: null,
    ignoredElements: [],
    keyCodes: Object.create(null),
    isReservedTag: S,
    isReservedAttr: S,
    isUnknownElement: S,
    getTagNamespace: k,
    parsePlatformTagName: E,
    mustUseProp: S,
    async: !0,
    _lifecycleHooks: P
  };

  function M(t, e, n, r) {
    Object.defineProperty(t, e, {
      value: n,
      enumerable: !!r,
      writable: !0,
      configurable: !0
    });
  }

  var F = new RegExp("[^" + /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/.source + ".$_\\d]");
  var R,
      U = "__proto__" in {},
      H = "undefined" != typeof window,
      V = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform,
      B = V && WXEnvironment.platform.toLowerCase(),
      z = H && window.navigator.userAgent.toLowerCase(),
      W = z && /msie|trident/.test(z),
      q = z && z.indexOf("msie 9.0") > 0,
      K = z && z.indexOf("edge/") > 0,
      X = (z && z.indexOf("android"), z && /iphone|ipad|ipod|ios/.test(z) || "ios" === B),
      G = (z && /chrome\/\d+/.test(z), z && /phantomjs/.test(z), z && z.match(/firefox\/(\d+)/)),
      Z = {}.watch,
      J = !1;
  if (H) try {
    var Q = {};
    Object.defineProperty(Q, "passive", {
      get: function () {
        J = !0;
      }
    }), window.addEventListener("test-passive", null, Q);
  } catch (t) {}

  var Y = function () {
    return void 0 === R && (R = !H && !V && "undefined" != typeof global && global.process && "server" === global.process.env.VUE_ENV), R;
  },
      tt = H && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  function et(t) {
    return "function" == typeof t && /native code/.test(t.toString());
  }

  var nt,
      rt = "undefined" != typeof Symbol && et(Symbol) && "undefined" != typeof Reflect && et(Reflect.ownKeys);
  nt = "undefined" != typeof Set && et(Set) ? Set : function () {
    function t() {
      this.set = Object.create(null);
    }

    return t.prototype.has = function (t) {
      return !0 === this.set[t];
    }, t.prototype.add = function (t) {
      this.set[t] = !0;
    }, t.prototype.clear = function () {
      this.set = Object.create(null);
    }, t;
  }();

  var ot = k,
      it = 0,
      at = function () {
    this.id = it++, this.subs = [];
  };

  at.prototype.addSub = function (t) {
    this.subs.push(t);
  }, at.prototype.removeSub = function (t) {
    v(this.subs, t);
  }, at.prototype.depend = function () {
    at.target && at.target.addDep(this);
  }, at.prototype.notify = function () {
    for (var t = this.subs.slice(), e = 0, n = t.length; e < n; e++) t[e].update();
  }, at.target = null;
  var st = [];

  function ct(t) {
    st.push(t), at.target = t;
  }

  function ut() {
    st.pop(), at.target = st[st.length - 1];
  }

  var lt = function (t, e, n, r, o, i, a, s) {
    this.tag = t, this.data = e, this.children = n, this.text = r, this.elm = o, this.ns = void 0, this.context = i, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = e && e.key, this.componentOptions = a, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
  },
      ft = {
    child: {
      configurable: !0
    }
  };

  ft.child.get = function () {
    return this.componentInstance;
  }, Object.defineProperties(lt.prototype, ft);

  var dt = function (t) {
    void 0 === t && (t = "");
    var e = new lt();
    return e.text = t, e.isComment = !0, e;
  };

  function pt(t) {
    return new lt(void 0, void 0, void 0, String(t));
  }

  function vt(t) {
    var e = new lt(t.tag, t.data, t.children && t.children.slice(), t.text, t.elm, t.context, t.componentOptions, t.asyncFactory);
    return e.ns = t.ns, e.isStatic = t.isStatic, e.key = t.key, e.isComment = t.isComment, e.fnContext = t.fnContext, e.fnOptions = t.fnOptions, e.fnScopeId = t.fnScopeId, e.asyncMeta = t.asyncMeta, e.isCloned = !0, e;
  }

  var ht = Array.prototype,
      mt = Object.create(ht);
  ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (t) {
    var e = ht[t];
    M(mt, t, function () {
      for (var n = [], r = arguments.length; r--;) n[r] = arguments[r];

      var o,
          i = e.apply(this, n),
          a = this.__ob__;

      switch (t) {
        case "push":
        case "unshift":
          o = n;
          break;

        case "splice":
          o = n.slice(2);
      }

      return o && a.observeArray(o), a.dep.notify(), i;
    });
  });
  var yt = Object.getOwnPropertyNames(mt),
      gt = !0;

  function _t(t) {
    gt = t;
  }

  var bt = function (t) {
    var e;
    this.value = t, this.dep = new at(), this.vmCount = 0, M(t, "__ob__", this), Array.isArray(t) ? (U ? (e = mt, t.__proto__ = e) : function (t, e, n) {
      for (var r = 0, o = n.length; r < o; r++) {
        var i = n[r];
        M(t, i, e[i]);
      }
    }(t, mt, yt), this.observeArray(t)) : this.walk(t);
  };

  function Ct(t, e) {
    var n;
    if (i(t) && !(t instanceof lt)) return m(t, "__ob__") && t.__ob__ instanceof bt ? n = t.__ob__ : gt && !Y() && (Array.isArray(t) || s(t)) && Object.isExtensible(t) && !t._isVue && (n = new bt(t)), e && n && n.vmCount++, n;
  }

  function $t(t, e, n, r, o) {
    var i = new at(),
        a = Object.getOwnPropertyDescriptor(t, e);

    if (!a || !1 !== a.configurable) {
      var s = a && a.get,
          c = a && a.set;
      s && !c || 2 !== arguments.length || (n = t[e]);
      var u = !o && Ct(n);
      Object.defineProperty(t, e, {
        enumerable: !0,
        configurable: !0,
        get: function () {
          var e = s ? s.call(t) : n;
          return at.target && (i.depend(), u && (u.dep.depend(), Array.isArray(e) && function t(e) {
            for (var n = void 0, r = 0, o = e.length; r < o; r++) (n = e[r]) && n.__ob__ && n.__ob__.dep.depend(), Array.isArray(n) && t(n);
          }(e))), e;
        },
        set: function (e) {
          var r = s ? s.call(t) : n;
          e === r || e != e && r != r || s && !c || (c ? c.call(t, e) : n = e, u = !o && Ct(e), i.notify());
        }
      });
    }
  }

  function wt(t, e, n) {
    if (Array.isArray(t) && c(e)) return t.length = Math.max(t.length, e), t.splice(e, 1, n), n;
    if (e in t && !(e in Object.prototype)) return t[e] = n, n;
    var r = t.__ob__;
    return t._isVue || r && r.vmCount ? n : r ? ($t(r.value, e, n), r.dep.notify(), n) : (t[e] = n, n);
  }

  function At(t, e) {
    if (Array.isArray(t) && c(e)) t.splice(e, 1);else {
      var n = t.__ob__;
      t._isVue || n && n.vmCount || m(t, e) && (delete t[e], n && n.dep.notify());
    }
  }

  bt.prototype.walk = function (t) {
    for (var e = Object.keys(t), n = 0; n < e.length; n++) $t(t, e[n]);
  }, bt.prototype.observeArray = function (t) {
    for (var e = 0, n = t.length; e < n; e++) Ct(t[e]);
  };
  var xt = L.optionMergeStrategies;

  function Ot(t, e) {
    if (!e) return t;

    for (var n, r, o, i = rt ? Reflect.ownKeys(e) : Object.keys(e), a = 0; a < i.length; a++) "__ob__" !== (n = i[a]) && (r = t[n], o = e[n], m(t, n) ? r !== o && s(r) && s(o) && Ot(r, o) : wt(t, n, o));

    return t;
  }

  function kt(t, e, n) {
    return n ? function () {
      var r = "function" == typeof e ? e.call(n, n) : e,
          o = "function" == typeof t ? t.call(n, n) : t;
      return r ? Ot(r, o) : o;
    } : e ? t ? function () {
      return Ot("function" == typeof e ? e.call(this, this) : e, "function" == typeof t ? t.call(this, this) : t);
    } : e : t;
  }

  function St(t, e) {
    var n = e ? t ? t.concat(e) : Array.isArray(e) ? e : [e] : t;
    return n ? function (t) {
      for (var e = [], n = 0; n < t.length; n++) -1 === e.indexOf(t[n]) && e.push(t[n]);

      return e;
    }(n) : n;
  }

  function Et(t, e, n, r) {
    var o = Object.create(t || null);
    return e ? x(o, e) : o;
  }

  xt.data = function (t, e, n) {
    return n ? kt(t, e, n) : e && "function" != typeof e ? t : kt(t, e);
  }, P.forEach(function (t) {
    xt[t] = St;
  }), N.forEach(function (t) {
    xt[t + "s"] = Et;
  }), xt.watch = function (t, e, n, r) {
    if (t === Z && (t = void 0), e === Z && (e = void 0), !e) return Object.create(t || null);
    if (!t) return e;
    var o = {};

    for (var i in x(o, t), e) {
      var a = o[i],
          s = e[i];
      a && !Array.isArray(a) && (a = [a]), o[i] = a ? a.concat(s) : Array.isArray(s) ? s : [s];
    }

    return o;
  }, xt.props = xt.methods = xt.inject = xt.computed = function (t, e, n, r) {
    if (!t) return e;
    var o = Object.create(null);
    return x(o, t), e && x(o, e), o;
  }, xt.provide = kt;

  var jt = function (t, e) {
    return void 0 === e ? t : e;
  };

  function Tt(t, e, n) {
    if ("function" == typeof e && (e = e.options), function (t, e) {
      var n = t.props;

      if (n) {
        var r,
            o,
            i = {};
        if (Array.isArray(n)) for (r = n.length; r--;) "string" == typeof (o = n[r]) && (i[_(o)] = {
          type: null
        });else if (s(n)) for (var a in n) o = n[a], i[_(a)] = s(o) ? o : {
          type: o
        };
        t.props = i;
      }
    }(e), function (t, e) {
      var n = t.inject;

      if (n) {
        var r = t.inject = {};
        if (Array.isArray(n)) for (var o = 0; o < n.length; o++) r[n[o]] = {
          from: n[o]
        };else if (s(n)) for (var i in n) {
          var a = n[i];
          r[i] = s(a) ? x({
            from: i
          }, a) : {
            from: a
          };
        }
      }
    }(e), function (t) {
      var e = t.directives;
      if (e) for (var n in e) {
        var r = e[n];
        "function" == typeof r && (e[n] = {
          bind: r,
          update: r
        });
      }
    }(e), !e._base && (e.extends && (t = Tt(t, e.extends, n)), e.mixins)) for (var r = 0, o = e.mixins.length; r < o; r++) t = Tt(t, e.mixins[r], n);
    var i,
        a = {};

    for (i in t) c(i);

    for (i in e) m(t, i) || c(i);

    function c(r) {
      var o = xt[r] || jt;
      a[r] = o(t[r], e[r], n, r);
    }

    return a;
  }

  function It(t, e, n, r) {
    if ("string" == typeof n) {
      var o = t[e];
      if (m(o, n)) return o[n];

      var i = _(n);

      if (m(o, i)) return o[i];
      var a = b(i);
      return m(o, a) ? o[a] : o[n] || o[i] || o[a];
    }
  }

  function Dt(t, e, n, r) {
    var o = e[t],
        i = !m(n, t),
        a = n[t],
        s = Lt(Boolean, o.type);
    if (s > -1) if (i && !m(o, "default")) a = !1;else if ("" === a || a === $(t)) {
      var c = Lt(String, o.type);
      (c < 0 || s < c) && (a = !0);
    }

    if (void 0 === a) {
      a = function (t, e, n) {
        if (!m(e, "default")) return;
        var r = e.default;
        if (t && t.$options.propsData && void 0 === t.$options.propsData[n] && void 0 !== t._props[n]) return t._props[n];
        return "function" == typeof r && "Function" !== Nt(e.type) ? r.call(t) : r;
      }(r, o, t);

      var u = gt;
      _t(!0), Ct(a), _t(u);
    }

    return a;
  }

  function Nt(t) {
    var e = t && t.toString().match(/^\s*function (\w+)/);
    return e ? e[1] : "";
  }

  function Pt(t, e) {
    return Nt(t) === Nt(e);
  }

  function Lt(t, e) {
    if (!Array.isArray(e)) return Pt(e, t) ? 0 : -1;

    for (var n = 0, r = e.length; n < r; n++) if (Pt(e[n], t)) return n;

    return -1;
  }

  function Mt(t, e, n) {
    ct();

    try {
      if (e) for (var r = e; r = r.$parent;) {
        var o = r.$options.errorCaptured;
        if (o) for (var i = 0; i < o.length; i++) try {
          if (!1 === o[i].call(r, t, e, n)) return;
        } catch (t) {
          Rt(t, r, "errorCaptured hook");
        }
      }
      Rt(t, e, n);
    } finally {
      ut();
    }
  }

  function Ft(t, e, n, r, o) {
    var i;

    try {
      (i = n ? t.apply(e, n) : t.call(e)) && !i._isVue && u(i) && !i._handled && (i.catch(function (t) {
        return Mt(t, r, o + " (Promise/async)");
      }), i._handled = !0);
    } catch (t) {
      Mt(t, r, o);
    }

    return i;
  }

  function Rt(t, e, n) {
    if (L.errorHandler) try {
      return L.errorHandler.call(null, t, e, n);
    } catch (e) {
      e !== t && Ut(e, null, "config.errorHandler");
    }
    Ut(t, e, n);
  }

  function Ut(t, e, n) {
    if (!H && !V || "undefined" == typeof console) throw t;
    console.error(t);
  }

  var Ht,
      Vt = !1,
      Bt = [],
      zt = !1;

  function Wt() {
    zt = !1;
    var t = Bt.slice(0);
    Bt.length = 0;

    for (var e = 0; e < t.length; e++) t[e]();
  }

  if ("undefined" != typeof Promise && et(Promise)) {
    var qt = Promise.resolve();
    Ht = function () {
      qt.then(Wt), X && setTimeout(k);
    }, Vt = !0;
  } else if (W || "undefined" == typeof MutationObserver || !et(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) Ht = "undefined" != typeof setImmediate && et(setImmediate) ? function () {
    setImmediate(Wt);
  } : function () {
    setTimeout(Wt, 0);
  };else {
    var Kt = 1,
        Xt = new MutationObserver(Wt),
        Gt = document.createTextNode(String(Kt));
    Xt.observe(Gt, {
      characterData: !0
    }), Ht = function () {
      Kt = (Kt + 1) % 2, Gt.data = String(Kt);
    }, Vt = !0;
  }

  function Zt(t, e) {
    var n;
    if (Bt.push(function () {
      if (t) try {
        t.call(e);
      } catch (t) {
        Mt(t, e, "nextTick");
      } else n && n(e);
    }), zt || (zt = !0, Ht()), !t && "undefined" != typeof Promise) return new Promise(function (t) {
      n = t;
    });
  }

  var Jt = new nt();

  function Qt(t) {
    !function t(e, n) {
      var r, o;
      var a = Array.isArray(e);
      if (!a && !i(e) || Object.isFrozen(e) || e instanceof lt) return;

      if (e.__ob__) {
        var s = e.__ob__.dep.id;
        if (n.has(s)) return;
        n.add(s);
      }

      if (a) for (r = e.length; r--;) t(e[r], n);else for (o = Object.keys(e), r = o.length; r--;) t(e[o[r]], n);
    }(t, Jt), Jt.clear();
  }

  var Yt = y(function (t) {
    var e = "&" === t.charAt(0),
        n = "~" === (t = e ? t.slice(1) : t).charAt(0),
        r = "!" === (t = n ? t.slice(1) : t).charAt(0);
    return {
      name: t = r ? t.slice(1) : t,
      once: n,
      capture: r,
      passive: e
    };
  });

  function te(t, e) {
    function n() {
      var t = arguments,
          r = n.fns;
      if (!Array.isArray(r)) return Ft(r, null, arguments, e, "v-on handler");

      for (var o = r.slice(), i = 0; i < o.length; i++) Ft(o[i], null, t, e, "v-on handler");
    }

    return n.fns = t, n;
  }

  function ee(t, n, o, i, a, s) {
    var c, u, l, f;

    for (c in t) u = t[c], l = n[c], f = Yt(c), e(u) || (e(l) ? (e(u.fns) && (u = t[c] = te(u, s)), r(f.once) && (u = t[c] = a(f.name, u, f.capture)), o(f.name, u, f.capture, f.passive, f.params)) : u !== l && (l.fns = u, t[c] = l));

    for (c in n) e(t[c]) && i((f = Yt(c)).name, n[c], f.capture);
  }

  function ne(t, o, i) {
    var a;
    t instanceof lt && (t = t.data.hook || (t.data.hook = {}));
    var s = t[o];

    function c() {
      i.apply(this, arguments), v(a.fns, c);
    }

    e(s) ? a = te([c]) : n(s.fns) && r(s.merged) ? (a = s).fns.push(c) : a = te([s, c]), a.merged = !0, t[o] = a;
  }

  function re(t, e, r, o, i) {
    if (n(e)) {
      if (m(e, r)) return t[r] = e[r], i || delete e[r], !0;
      if (m(e, o)) return t[r] = e[o], i || delete e[o], !0;
    }

    return !1;
  }

  function oe(t) {
    return o(t) ? [pt(t)] : Array.isArray(t) ? function t(i, a) {
      var s = [];
      var c, u, l, f;

      for (c = 0; c < i.length; c++) e(u = i[c]) || "boolean" == typeof u || (l = s.length - 1, f = s[l], Array.isArray(u) ? u.length > 0 && (ie((u = t(u, (a || "") + "_" + c))[0]) && ie(f) && (s[l] = pt(f.text + u[0].text), u.shift()), s.push.apply(s, u)) : o(u) ? ie(f) ? s[l] = pt(f.text + u) : "" !== u && s.push(pt(u)) : ie(u) && ie(f) ? s[l] = pt(f.text + u.text) : (r(i._isVList) && n(u.tag) && e(u.key) && n(a) && (u.key = "__vlist" + a + "_" + c + "__"), s.push(u)));

      return s;
    }(t) : void 0;
  }

  function ie(t) {
    return n(t) && n(t.text) && !1 === t.isComment;
  }

  function ae(t, e) {
    if (t) {
      for (var n = Object.create(null), r = rt ? Reflect.ownKeys(t) : Object.keys(t), o = 0; o < r.length; o++) {
        var i = r[o];

        if ("__ob__" !== i) {
          for (var a = t[i].from, s = e; s;) {
            if (s._provided && m(s._provided, a)) {
              n[i] = s._provided[a];
              break;
            }

            s = s.$parent;
          }

          if (!s && "default" in t[i]) {
            var c = t[i].default;
            n[i] = "function" == typeof c ? c.call(e) : c;
          }
        }
      }

      return n;
    }
  }

  function se(t, e) {
    if (!t || !t.length) return {};

    for (var n = {}, r = 0, o = t.length; r < o; r++) {
      var i = t[r],
          a = i.data;
      if (a && a.attrs && a.attrs.slot && delete a.attrs.slot, i.context !== e && i.fnContext !== e || !a || null == a.slot) (n.default || (n.default = [])).push(i);else {
        var s = a.slot,
            c = n[s] || (n[s] = []);
        "template" === i.tag ? c.push.apply(c, i.children || []) : c.push(i);
      }
    }

    for (var u in n) n[u].every(ce) && delete n[u];

    return n;
  }

  function ce(t) {
    return t.isComment && !t.asyncFactory || " " === t.text;
  }

  function ue(e, n, r) {
    var o,
        i = Object.keys(n).length > 0,
        a = e ? !!e.$stable : !i,
        s = e && e.$key;

    if (e) {
      if (e._normalized) return e._normalized;
      if (a && r && r !== t && s === r.$key && !i && !r.$hasNormal) return r;

      for (var c in o = {}, e) e[c] && "$" !== c[0] && (o[c] = le(n, c, e[c]));
    } else o = {};

    for (var u in n) u in o || (o[u] = fe(n, u));

    return e && Object.isExtensible(e) && (e._normalized = o), M(o, "$stable", a), M(o, "$key", s), M(o, "$hasNormal", i), o;
  }

  function le(t, e, n) {
    var r = function () {
      var t = arguments.length ? n.apply(null, arguments) : n({});
      return (t = t && "object" == typeof t && !Array.isArray(t) ? [t] : oe(t)) && (0 === t.length || 1 === t.length && t[0].isComment) ? void 0 : t;
    };

    return n.proxy && Object.defineProperty(t, e, {
      get: r,
      enumerable: !0,
      configurable: !0
    }), r;
  }

  function fe(t, e) {
    return function () {
      return t[e];
    };
  }

  function de(t, e) {
    var r, o, a, s, c;
    if (Array.isArray(t) || "string" == typeof t) for (r = new Array(t.length), o = 0, a = t.length; o < a; o++) r[o] = e(t[o], o);else if ("number" == typeof t) for (r = new Array(t), o = 0; o < t; o++) r[o] = e(o + 1, o);else if (i(t)) if (rt && t[Symbol.iterator]) {
      r = [];

      for (var u = t[Symbol.iterator](), l = u.next(); !l.done;) r.push(e(l.value, r.length)), l = u.next();
    } else for (s = Object.keys(t), r = new Array(s.length), o = 0, a = s.length; o < a; o++) c = s[o], r[o] = e(t[c], c, o);
    return n(r) || (r = []), r._isVList = !0, r;
  }

  function pe(t, e, n, r) {
    var o,
        i = this.$scopedSlots[t];
    i ? (n = n || {}, r && (n = x(x({}, r), n)), o = i(n) || e) : o = this.$slots[t] || e;
    var a = n && n.slot;
    return a ? this.$createElement("template", {
      slot: a
    }, o) : o;
  }

  function ve(t) {
    return It(this.$options, "filters", t) || E;
  }

  function he(t, e) {
    return Array.isArray(t) ? -1 === t.indexOf(e) : t !== e;
  }

  function me(t, e, n, r, o) {
    var i = L.keyCodes[e] || n;
    return o && r && !L.keyCodes[e] ? he(o, r) : i ? he(i, t) : r ? $(r) !== e : void 0;
  }

  function ye(t, e, n, r, o) {
    if (n) if (i(n)) {
      var a;
      Array.isArray(n) && (n = O(n));

      var s = function (i) {
        if ("class" === i || "style" === i || p(i)) a = t;else {
          var s = t.attrs && t.attrs.type;
          a = r || L.mustUseProp(e, s, i) ? t.domProps || (t.domProps = {}) : t.attrs || (t.attrs = {});
        }

        var c = _(i),
            u = $(i);

        c in a || u in a || (a[i] = n[i], o && ((t.on || (t.on = {}))["update:" + i] = function (t) {
          n[i] = t;
        }));
      };

      for (var c in n) s(c);
    } else ;
    return t;
  }

  function ge(t, e) {
    var n = this._staticTrees || (this._staticTrees = []),
        r = n[t];
    return r && !e ? r : (be(r = n[t] = this.$options.staticRenderFns[t].call(this._renderProxy, null, this), "__static__" + t, !1), r);
  }

  function _e(t, e, n) {
    return be(t, "__once__" + e + (n ? "_" + n : ""), !0), t;
  }

  function be(t, e, n) {
    if (Array.isArray(t)) for (var r = 0; r < t.length; r++) t[r] && "string" != typeof t[r] && Ce(t[r], e + "_" + r, n);else Ce(t, e, n);
  }

  function Ce(t, e, n) {
    t.isStatic = !0, t.key = e, t.isOnce = n;
  }

  function $e(t, e) {
    if (e) if (s(e)) {
      var n = t.on = t.on ? x({}, t.on) : {};

      for (var r in e) {
        var o = n[r],
            i = e[r];
        n[r] = o ? [].concat(o, i) : i;
      }
    } else ;
    return t;
  }

  function we(t, e, n, r) {
    e = e || {
      $stable: !n
    };

    for (var o = 0; o < t.length; o++) {
      var i = t[o];
      Array.isArray(i) ? we(i, e, n) : i && (i.proxy && (i.fn.proxy = !0), e[i.key] = i.fn);
    }

    return r && (e.$key = r), e;
  }

  function Ae(t, e) {
    for (var n = 0; n < e.length; n += 2) {
      var r = e[n];
      "string" == typeof r && r && (t[e[n]] = e[n + 1]);
    }

    return t;
  }

  function xe(t, e) {
    return "string" == typeof t ? e + t : t;
  }

  function Oe(t) {
    t._o = _e, t._n = f, t._s = l, t._l = de, t._t = pe, t._q = j, t._i = T, t._m = ge, t._f = ve, t._k = me, t._b = ye, t._v = pt, t._e = dt, t._u = we, t._g = $e, t._d = Ae, t._p = xe;
  }

  function ke(e, n, o, i, a) {
    var s,
        c = this,
        u = a.options;
    m(i, "_uid") ? (s = Object.create(i))._original = i : (s = i, i = i._original);
    var l = r(u._compiled),
        f = !l;
    this.data = e, this.props = n, this.children = o, this.parent = i, this.listeners = e.on || t, this.injections = ae(u.inject, i), this.slots = function () {
      return c.$slots || ue(e.scopedSlots, c.$slots = se(o, i)), c.$slots;
    }, Object.defineProperty(this, "scopedSlots", {
      enumerable: !0,
      get: function () {
        return ue(e.scopedSlots, this.slots());
      }
    }), l && (this.$options = u, this.$slots = this.slots(), this.$scopedSlots = ue(e.scopedSlots, this.$slots)), u._scopeId ? this._c = function (t, e, n, r) {
      var o = Le(s, t, e, n, r, f);
      return o && !Array.isArray(o) && (o.fnScopeId = u._scopeId, o.fnContext = i), o;
    } : this._c = function (t, e, n, r) {
      return Le(s, t, e, n, r, f);
    };
  }

  function Se(t, e, n, r, o) {
    var i = vt(t);
    return i.fnContext = n, i.fnOptions = r, e.slot && ((i.data || (i.data = {})).slot = e.slot), i;
  }

  function Ee(t, e) {
    for (var n in e) t[_(n)] = e[n];
  }

  Oe(ke.prototype);
  var je = {
    init: function (t, e) {
      if (t.componentInstance && !t.componentInstance._isDestroyed && t.data.keepAlive) {
        var r = t;
        je.prepatch(r, r);
      } else {
        (t.componentInstance = function (t, e) {
          var r = {
            _isComponent: !0,
            _parentVnode: t,
            parent: e
          },
              o = t.data.inlineTemplate;
          n(o) && (r.render = o.render, r.staticRenderFns = o.staticRenderFns);
          return new t.componentOptions.Ctor(r);
        }(t, qe)).$mount(e ? t.elm : void 0, e);
      }
    },
    prepatch: function (e, n) {
      var r = n.componentOptions;
      !function (e, n, r, o, i) {
        var a = o.data.scopedSlots,
            s = e.$scopedSlots,
            c = !!(a && !a.$stable || s !== t && !s.$stable || a && e.$scopedSlots.$key !== a.$key),
            u = !!(i || e.$options._renderChildren || c);
        e.$options._parentVnode = o, e.$vnode = o, e._vnode && (e._vnode.parent = o);

        if (e.$options._renderChildren = i, e.$attrs = o.data.attrs || t, e.$listeners = r || t, n && e.$options.props) {
          _t(!1);

          for (var l = e._props, f = e.$options._propKeys || [], d = 0; d < f.length; d++) {
            var p = f[d],
                v = e.$options.props;
            l[p] = Dt(p, v, n, e);
          }

          _t(!0), e.$options.propsData = n;
        }

        r = r || t;
        var h = e.$options._parentListeners;
        e.$options._parentListeners = r, We(e, r, h), u && (e.$slots = se(i, o.context), e.$forceUpdate());
      }(n.componentInstance = e.componentInstance, r.propsData, r.listeners, n, r.children);
    },
    insert: function (t) {
      var e,
          n = t.context,
          r = t.componentInstance;
      r._isMounted || (r._isMounted = !0, Ze(r, "mounted")), t.data.keepAlive && (n._isMounted ? ((e = r)._inactive = !1, Qe.push(e)) : Ge(r, !0));
    },
    destroy: function (t) {
      var e = t.componentInstance;
      e._isDestroyed || (t.data.keepAlive ? function t(e, n) {
        if (n && (e._directInactive = !0, Xe(e))) return;

        if (!e._inactive) {
          e._inactive = !0;

          for (var r = 0; r < e.$children.length; r++) t(e.$children[r]);

          Ze(e, "deactivated");
        }
      }(e, !0) : e.$destroy());
    }
  },
      Te = Object.keys(je);

  function Ie(o, a, s, c, l) {
    if (!e(o)) {
      var f = s.$options._base;

      if (i(o) && (o = f.extend(o)), "function" == typeof o) {
        var d;
        if (e(o.cid) && void 0 === (o = function (t, o) {
          if (r(t.error) && n(t.errorComp)) return t.errorComp;
          if (n(t.resolved)) return t.resolved;
          var a = Fe;
          a && n(t.owners) && -1 === t.owners.indexOf(a) && t.owners.push(a);
          if (r(t.loading) && n(t.loadingComp)) return t.loadingComp;

          if (a && !n(t.owners)) {
            var s = t.owners = [a],
                c = !0,
                l = null,
                f = null;
            a.$on("hook:destroyed", function () {
              return v(s, a);
            });

            var d = function (t) {
              for (var e = 0, n = s.length; e < n; e++) s[e].$forceUpdate();

              t && (s.length = 0, null !== l && (clearTimeout(l), l = null), null !== f && (clearTimeout(f), f = null));
            },
                p = I(function (e) {
              t.resolved = Re(e, o), c ? s.length = 0 : d(!0);
            }),
                h = I(function (e) {
              n(t.errorComp) && (t.error = !0, d(!0));
            }),
                m = t(p, h);

            return i(m) && (u(m) ? e(t.resolved) && m.then(p, h) : u(m.component) && (m.component.then(p, h), n(m.error) && (t.errorComp = Re(m.error, o)), n(m.loading) && (t.loadingComp = Re(m.loading, o), 0 === m.delay ? t.loading = !0 : l = setTimeout(function () {
              l = null, e(t.resolved) && e(t.error) && (t.loading = !0, d(!1));
            }, m.delay || 200)), n(m.timeout) && (f = setTimeout(function () {
              f = null, e(t.resolved) && h(null);
            }, m.timeout)))), c = !1, t.loading ? t.loadingComp : t.resolved;
          }
        }(d = o, f))) return function (t, e, n, r, o) {
          var i = dt();
          return i.asyncFactory = t, i.asyncMeta = {
            data: e,
            context: n,
            children: r,
            tag: o
          }, i;
        }(d, a, s, c, l);
        a = a || {}, _n(o), n(a.model) && function (t, e) {
          var r = t.model && t.model.prop || "value",
              o = t.model && t.model.event || "input";
          (e.attrs || (e.attrs = {}))[r] = e.model.value;
          var i = e.on || (e.on = {}),
              a = i[o],
              s = e.model.callback;
          n(a) ? (Array.isArray(a) ? -1 === a.indexOf(s) : a !== s) && (i[o] = [s].concat(a)) : i[o] = s;
        }(o.options, a);

        var p = function (t, r, o) {
          var i = r.options.props;

          if (!e(i)) {
            var a = {},
                s = t.attrs,
                c = t.props;
            if (n(s) || n(c)) for (var u in i) {
              var l = $(u);
              re(a, c, u, l, !0) || re(a, s, u, l, !1);
            }
            return a;
          }
        }(a, o);

        if (r(o.options.functional)) return function (e, r, o, i, a) {
          var s = e.options,
              c = {},
              u = s.props;
          if (n(u)) for (var l in u) c[l] = Dt(l, u, r || t);else n(o.attrs) && Ee(c, o.attrs), n(o.props) && Ee(c, o.props);
          var f = new ke(o, c, a, i, e),
              d = s.render.call(null, f._c, f);
          if (d instanceof lt) return Se(d, o, f.parent, s);

          if (Array.isArray(d)) {
            for (var p = oe(d) || [], v = new Array(p.length), h = 0; h < p.length; h++) v[h] = Se(p[h], o, f.parent, s);

            return v;
          }
        }(o, p, a, s, c);
        var h = a.on;

        if (a.on = a.nativeOn, r(o.options.abstract)) {
          var m = a.slot;
          a = {}, m && (a.slot = m);
        }

        !function (t) {
          for (var e = t.hook || (t.hook = {}), n = 0; n < Te.length; n++) {
            var r = Te[n],
                o = e[r],
                i = je[r];
            o === i || o && o._merged || (e[r] = o ? De(i, o) : i);
          }
        }(a);
        var y = o.options.name || l;
        return new lt("vue-component-" + o.cid + (y ? "-" + y : ""), a, void 0, void 0, void 0, s, {
          Ctor: o,
          propsData: p,
          listeners: h,
          tag: l,
          children: c
        }, d);
      }
    }
  }

  function De(t, e) {
    var n = function (n, r) {
      t(n, r), e(n, r);
    };

    return n._merged = !0, n;
  }

  var Ne = 1,
      Pe = 2;

  function Le(t, a, s, c, u, l) {
    return (Array.isArray(s) || o(s)) && (u = c, c = s, s = void 0), r(l) && (u = Pe), function (t, o, a, s, c) {
      if (n(a) && n(a.__ob__)) return dt();
      n(a) && n(a.is) && (o = a.is);
      if (!o) return dt();
      Array.isArray(s) && "function" == typeof s[0] && ((a = a || {}).scopedSlots = {
        default: s[0]
      }, s.length = 0);
      c === Pe ? s = oe(s) : c === Ne && (s = function (t) {
        for (var e = 0; e < t.length; e++) if (Array.isArray(t[e])) return Array.prototype.concat.apply([], t);

        return t;
      }(s));
      var u, l;

      if ("string" == typeof o) {
        var f;
        l = t.$vnode && t.$vnode.ns || L.getTagNamespace(o), u = L.isReservedTag(o) ? new lt(L.parsePlatformTagName(o), a, s, void 0, void 0, t) : a && a.pre || !n(f = It(t.$options, "components", o)) ? new lt(o, a, s, void 0, void 0, t) : Ie(f, a, t, s, o);
      } else u = Ie(o, a, t, s);

      return Array.isArray(u) ? u : n(u) ? (n(l) && function t(o, i, a) {
        o.ns = i;
        "foreignObject" === o.tag && (i = void 0, a = !0);
        if (n(o.children)) for (var s = 0, c = o.children.length; s < c; s++) {
          var u = o.children[s];
          n(u.tag) && (e(u.ns) || r(a) && "svg" !== u.tag) && t(u, i, a);
        }
      }(u, l), n(a) && function (t) {
        i(t.style) && Qt(t.style);
        i(t.class) && Qt(t.class);
      }(a), u) : dt();
    }(t, a, s, c, u);
  }

  var Me,
      Fe = null;

  function Re(t, e) {
    return (t.__esModule || rt && "Module" === t[Symbol.toStringTag]) && (t = t.default), i(t) ? e.extend(t) : t;
  }

  function Ue(t) {
    return t.isComment && t.asyncFactory;
  }

  function He(t) {
    if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
      var r = t[e];
      if (n(r) && (n(r.componentOptions) || Ue(r))) return r;
    }
  }

  function Ve(t, e) {
    Me.$on(t, e);
  }

  function Be(t, e) {
    Me.$off(t, e);
  }

  function ze(t, e) {
    var n = Me;
    return function r() {
      null !== e.apply(null, arguments) && n.$off(t, r);
    };
  }

  function We(t, e, n) {
    Me = t, ee(e, n || {}, Ve, Be, ze, t), Me = void 0;
  }

  var qe = null;

  function Ke(t) {
    var e = qe;
    return qe = t, function () {
      qe = e;
    };
  }

  function Xe(t) {
    for (; t && (t = t.$parent);) if (t._inactive) return !0;

    return !1;
  }

  function Ge(t, e) {
    if (e) {
      if (t._directInactive = !1, Xe(t)) return;
    } else if (t._directInactive) return;

    if (t._inactive || null === t._inactive) {
      t._inactive = !1;

      for (var n = 0; n < t.$children.length; n++) Ge(t.$children[n]);

      Ze(t, "activated");
    }
  }

  function Ze(t, e) {
    ct();
    var n = t.$options[e],
        r = e + " hook";
    if (n) for (var o = 0, i = n.length; o < i; o++) Ft(n[o], t, null, t, r);
    t._hasHookEvent && t.$emit("hook:" + e), ut();
  }

  var Je = [],
      Qe = [],
      Ye = {},
      tn = !1,
      en = !1,
      nn = 0;
  var rn = 0,
      on = Date.now;

  if (H && !W) {
    var an = window.performance;
    an && "function" == typeof an.now && on() > document.createEvent("Event").timeStamp && (on = function () {
      return an.now();
    });
  }

  function sn() {
    var t, e;

    for (rn = on(), en = !0, Je.sort(function (t, e) {
      return t.id - e.id;
    }), nn = 0; nn < Je.length; nn++) (t = Je[nn]).before && t.before(), e = t.id, Ye[e] = null, t.run();

    var n = Qe.slice(),
        r = Je.slice();
    nn = Je.length = Qe.length = 0, Ye = {}, tn = en = !1, function (t) {
      for (var e = 0; e < t.length; e++) t[e]._inactive = !0, Ge(t[e], !0);
    }(n), function (t) {
      var e = t.length;

      for (; e--;) {
        var n = t[e],
            r = n.vm;
        r._watcher === n && r._isMounted && !r._isDestroyed && Ze(r, "updated");
      }
    }(r), tt && L.devtools && tt.emit("flush");
  }

  var cn = 0,
      un = function (t, e, n, r, o) {
    this.vm = t, o && (t._watcher = this), t._watchers.push(this), r ? (this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync, this.before = r.before) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++cn, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new nt(), this.newDepIds = new nt(), this.expression = "", "function" == typeof e ? this.getter = e : (this.getter = function (t) {
      if (!F.test(t)) {
        var e = t.split(".");
        return function (t) {
          for (var n = 0; n < e.length; n++) {
            if (!t) return;
            t = t[e[n]];
          }

          return t;
        };
      }
    }(e), this.getter || (this.getter = k)), this.value = this.lazy ? void 0 : this.get();
  };

  un.prototype.get = function () {
    var t;
    ct(this);
    var e = this.vm;

    try {
      t = this.getter.call(e, e);
    } catch (t) {
      if (!this.user) throw t;
      Mt(t, e, 'getter for watcher "' + this.expression + '"');
    } finally {
      this.deep && Qt(t), ut(), this.cleanupDeps();
    }

    return t;
  }, un.prototype.addDep = function (t) {
    var e = t.id;
    this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this));
  }, un.prototype.cleanupDeps = function () {
    for (var t = this.deps.length; t--;) {
      var e = this.deps[t];
      this.newDepIds.has(e.id) || e.removeSub(this);
    }

    var n = this.depIds;
    this.depIds = this.newDepIds, this.newDepIds = n, this.newDepIds.clear(), n = this.deps, this.deps = this.newDeps, this.newDeps = n, this.newDeps.length = 0;
  }, un.prototype.update = function () {
    this.lazy ? this.dirty = !0 : this.sync ? this.run() : function (t) {
      var e = t.id;

      if (null == Ye[e]) {
        if (Ye[e] = !0, en) {
          for (var n = Je.length - 1; n > nn && Je[n].id > t.id;) n--;

          Je.splice(n + 1, 0, t);
        } else Je.push(t);

        tn || (tn = !0, Zt(sn));
      }
    }(this);
  }, un.prototype.run = function () {
    if (this.active) {
      var t = this.get();

      if (t !== this.value || i(t) || this.deep) {
        var e = this.value;
        if (this.value = t, this.user) try {
          this.cb.call(this.vm, t, e);
        } catch (t) {
          Mt(t, this.vm, 'callback for watcher "' + this.expression + '"');
        } else this.cb.call(this.vm, t, e);
      }
    }
  }, un.prototype.evaluate = function () {
    this.value = this.get(), this.dirty = !1;
  }, un.prototype.depend = function () {
    for (var t = this.deps.length; t--;) this.deps[t].depend();
  }, un.prototype.teardown = function () {
    if (this.active) {
      this.vm._isBeingDestroyed || v(this.vm._watchers, this);

      for (var t = this.deps.length; t--;) this.deps[t].removeSub(this);

      this.active = !1;
    }
  };
  var ln = {
    enumerable: !0,
    configurable: !0,
    get: k,
    set: k
  };

  function fn(t, e, n) {
    ln.get = function () {
      return this[e][n];
    }, ln.set = function (t) {
      this[e][n] = t;
    }, Object.defineProperty(t, n, ln);
  }

  function dn(t) {
    t._watchers = [];
    var e = t.$options;
    e.props && function (t, e) {
      var n = t.$options.propsData || {},
          r = t._props = {},
          o = t.$options._propKeys = [];
      t.$parent && _t(!1);

      var i = function (i) {
        o.push(i);
        var a = Dt(i, e, n, t);
        $t(r, i, a), i in t || fn(t, "_props", i);
      };

      for (var a in e) i(a);

      _t(!0);
    }(t, e.props), e.methods && function (t, e) {
      t.$options.props;

      for (var n in e) t[n] = "function" != typeof e[n] ? k : w(e[n], t);
    }(t, e.methods), e.data ? function (t) {
      var e = t.$options.data;
      s(e = t._data = "function" == typeof e ? function (t, e) {
        ct();

        try {
          return t.call(e, e);
        } catch (t) {
          return Mt(t, e, "data()"), {};
        } finally {
          ut();
        }
      }(e, t) : e || {}) || (e = {});
      var n = Object.keys(e),
          r = t.$options.props,
          o = (t.$options.methods, n.length);

      for (; o--;) {
        var i = n[o];
        r && m(r, i) || (a = void 0, 36 !== (a = (i + "").charCodeAt(0)) && 95 !== a && fn(t, "_data", i));
      }

      var a;
      Ct(e, !0);
    }(t) : Ct(t._data = {}, !0), e.computed && function (t, e) {
      var n = t._computedWatchers = Object.create(null),
          r = Y();

      for (var o in e) {
        var i = e[o],
            a = "function" == typeof i ? i : i.get;
        r || (n[o] = new un(t, a || k, k, pn)), o in t || vn(t, o, i);
      }
    }(t, e.computed), e.watch && e.watch !== Z && function (t, e) {
      for (var n in e) {
        var r = e[n];
        if (Array.isArray(r)) for (var o = 0; o < r.length; o++) yn(t, n, r[o]);else yn(t, n, r);
      }
    }(t, e.watch);
  }

  var pn = {
    lazy: !0
  };

  function vn(t, e, n) {
    var r = !Y();
    "function" == typeof n ? (ln.get = r ? hn(e) : mn(n), ln.set = k) : (ln.get = n.get ? r && !1 !== n.cache ? hn(e) : mn(n.get) : k, ln.set = n.set || k), Object.defineProperty(t, e, ln);
  }

  function hn(t) {
    return function () {
      var e = this._computedWatchers && this._computedWatchers[t];
      if (e) return e.dirty && e.evaluate(), at.target && e.depend(), e.value;
    };
  }

  function mn(t) {
    return function () {
      return t.call(this, this);
    };
  }

  function yn(t, e, n, r) {
    return s(n) && (r = n, n = n.handler), "string" == typeof n && (n = t[n]), t.$watch(e, n, r);
  }

  var gn = 0;

  function _n(t) {
    var e = t.options;

    if (t.super) {
      var n = _n(t.super);

      if (n !== t.superOptions) {
        t.superOptions = n;

        var r = function (t) {
          var e,
              n = t.options,
              r = t.sealedOptions;

          for (var o in n) n[o] !== r[o] && (e || (e = {}), e[o] = n[o]);

          return e;
        }(t);

        r && x(t.extendOptions, r), (e = t.options = Tt(n, t.extendOptions)).name && (e.components[e.name] = t);
      }
    }

    return e;
  }

  function bn(t) {
    this._init(t);
  }

  function Cn(t) {
    t.cid = 0;
    var e = 1;

    t.extend = function (t) {
      t = t || {};
      var n = this,
          r = n.cid,
          o = t._Ctor || (t._Ctor = {});
      if (o[r]) return o[r];

      var i = t.name || n.options.name,
          a = function (t) {
        this._init(t);
      };

      return (a.prototype = Object.create(n.prototype)).constructor = a, a.cid = e++, a.options = Tt(n.options, t), a.super = n, a.options.props && function (t) {
        var e = t.options.props;

        for (var n in e) fn(t.prototype, "_props", n);
      }(a), a.options.computed && function (t) {
        var e = t.options.computed;

        for (var n in e) vn(t.prototype, n, e[n]);
      }(a), a.extend = n.extend, a.mixin = n.mixin, a.use = n.use, N.forEach(function (t) {
        a[t] = n[t];
      }), i && (a.options.components[i] = a), a.superOptions = n.options, a.extendOptions = t, a.sealedOptions = x({}, a.options), o[r] = a, a;
    };
  }

  function $n(t) {
    return t && (t.Ctor.options.name || t.tag);
  }

  function wn(t, e) {
    return Array.isArray(t) ? t.indexOf(e) > -1 : "string" == typeof t ? t.split(",").indexOf(e) > -1 : (n = t, "[object RegExp]" === a.call(n) && t.test(e));
    var n;
  }

  function An(t, e) {
    var n = t.cache,
        r = t.keys,
        o = t._vnode;

    for (var i in n) {
      var a = n[i];

      if (a) {
        var s = $n(a.componentOptions);
        s && !e(s) && xn(n, i, r, o);
      }
    }
  }

  function xn(t, e, n, r) {
    var o = t[e];
    !o || r && o.tag === r.tag || o.componentInstance.$destroy(), t[e] = null, v(n, e);
  }

  !function (e) {
    e.prototype._init = function (e) {
      var n = this;
      n._uid = gn++, n._isVue = !0, e && e._isComponent ? function (t, e) {
        var n = t.$options = Object.create(t.constructor.options),
            r = e._parentVnode;
        n.parent = e.parent, n._parentVnode = r;
        var o = r.componentOptions;
        n.propsData = o.propsData, n._parentListeners = o.listeners, n._renderChildren = o.children, n._componentTag = o.tag, e.render && (n.render = e.render, n.staticRenderFns = e.staticRenderFns);
      }(n, e) : n.$options = Tt(_n(n.constructor), e || {}, n), n._renderProxy = n, n._self = n, function (t) {
        var e = t.$options,
            n = e.parent;

        if (n && !e.abstract) {
          for (; n.$options.abstract && n.$parent;) n = n.$parent;

          n.$children.push(t);
        }

        t.$parent = n, t.$root = n ? n.$root : t, t.$children = [], t.$refs = {}, t._watcher = null, t._inactive = null, t._directInactive = !1, t._isMounted = !1, t._isDestroyed = !1, t._isBeingDestroyed = !1;
      }(n), function (t) {
        t._events = Object.create(null), t._hasHookEvent = !1;
        var e = t.$options._parentListeners;
        e && We(t, e);
      }(n), function (e) {
        e._vnode = null, e._staticTrees = null;
        var n = e.$options,
            r = e.$vnode = n._parentVnode,
            o = r && r.context;
        e.$slots = se(n._renderChildren, o), e.$scopedSlots = t, e._c = function (t, n, r, o) {
          return Le(e, t, n, r, o, !1);
        }, e.$createElement = function (t, n, r, o) {
          return Le(e, t, n, r, o, !0);
        };
        var i = r && r.data;
        $t(e, "$attrs", i && i.attrs || t, null, !0), $t(e, "$listeners", n._parentListeners || t, null, !0);
      }(n), Ze(n, "beforeCreate"), function (t) {
        var e = ae(t.$options.inject, t);
        e && (_t(!1), Object.keys(e).forEach(function (n) {
          $t(t, n, e[n]);
        }), _t(!0));
      }(n), dn(n), function (t) {
        var e = t.$options.provide;
        e && (t._provided = "function" == typeof e ? e.call(t) : e);
      }(n), Ze(n, "created"), n.$options.el && n.$mount(n.$options.el);
    };
  }(bn), function (t) {
    var e = {
      get: function () {
        return this._data;
      }
    },
        n = {
      get: function () {
        return this._props;
      }
    };
    Object.defineProperty(t.prototype, "$data", e), Object.defineProperty(t.prototype, "$props", n), t.prototype.$set = wt, t.prototype.$delete = At, t.prototype.$watch = function (t, e, n) {
      if (s(e)) return yn(this, t, e, n);
      (n = n || {}).user = !0;
      var r = new un(this, t, e, n);
      if (n.immediate) try {
        e.call(this, r.value);
      } catch (t) {
        Mt(t, this, 'callback for immediate watcher "' + r.expression + '"');
      }
      return function () {
        r.teardown();
      };
    };
  }(bn), function (t) {
    var e = /^hook:/;
    t.prototype.$on = function (t, n) {
      var r = this;
      if (Array.isArray(t)) for (var o = 0, i = t.length; o < i; o++) r.$on(t[o], n);else (r._events[t] || (r._events[t] = [])).push(n), e.test(t) && (r._hasHookEvent = !0);
      return r;
    }, t.prototype.$once = function (t, e) {
      var n = this;

      function r() {
        n.$off(t, r), e.apply(n, arguments);
      }

      return r.fn = e, n.$on(t, r), n;
    }, t.prototype.$off = function (t, e) {
      var n = this;
      if (!arguments.length) return n._events = Object.create(null), n;

      if (Array.isArray(t)) {
        for (var r = 0, o = t.length; r < o; r++) n.$off(t[r], e);

        return n;
      }

      var i,
          a = n._events[t];
      if (!a) return n;
      if (!e) return n._events[t] = null, n;

      for (var s = a.length; s--;) if ((i = a[s]) === e || i.fn === e) {
        a.splice(s, 1);
        break;
      }

      return n;
    }, t.prototype.$emit = function (t) {
      var e = this._events[t];

      if (e) {
        e = e.length > 1 ? A(e) : e;

        for (var n = A(arguments, 1), r = 'event handler for "' + t + '"', o = 0, i = e.length; o < i; o++) Ft(e[o], this, n, this, r);
      }

      return this;
    };
  }(bn), function (t) {
    t.prototype._update = function (t, e) {
      var n = this,
          r = n.$el,
          o = n._vnode,
          i = Ke(n);
      n._vnode = t, n.$el = o ? n.__patch__(o, t) : n.__patch__(n.$el, t, e, !1), i(), r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el);
    }, t.prototype.$forceUpdate = function () {
      this._watcher && this._watcher.update();
    }, t.prototype.$destroy = function () {
      var t = this;

      if (!t._isBeingDestroyed) {
        Ze(t, "beforeDestroy"), t._isBeingDestroyed = !0;
        var e = t.$parent;
        !e || e._isBeingDestroyed || t.$options.abstract || v(e.$children, t), t._watcher && t._watcher.teardown();

        for (var n = t._watchers.length; n--;) t._watchers[n].teardown();

        t._data.__ob__ && t._data.__ob__.vmCount--, t._isDestroyed = !0, t.__patch__(t._vnode, null), Ze(t, "destroyed"), t.$off(), t.$el && (t.$el.__vue__ = null), t.$vnode && (t.$vnode.parent = null);
      }
    };
  }(bn), function (t) {
    Oe(t.prototype), t.prototype.$nextTick = function (t) {
      return Zt(t, this);
    }, t.prototype._render = function () {
      var t,
          e = this,
          n = e.$options,
          r = n.render,
          o = n._parentVnode;
      o && (e.$scopedSlots = ue(o.data.scopedSlots, e.$slots, e.$scopedSlots)), e.$vnode = o;

      try {
        Fe = e, t = r.call(e._renderProxy, e.$createElement);
      } catch (n) {
        Mt(n, e, "render"), t = e._vnode;
      } finally {
        Fe = null;
      }

      return Array.isArray(t) && 1 === t.length && (t = t[0]), t instanceof lt || (t = dt()), t.parent = o, t;
    };
  }(bn);
  var On = [String, RegExp, Array],
      kn = {
    KeepAlive: {
      name: "keep-alive",
      abstract: !0,
      props: {
        include: On,
        exclude: On,
        max: [String, Number]
      },
      created: function () {
        this.cache = Object.create(null), this.keys = [];
      },
      destroyed: function () {
        for (var t in this.cache) xn(this.cache, t, this.keys);
      },
      mounted: function () {
        var t = this;
        this.$watch("include", function (e) {
          An(t, function (t) {
            return wn(e, t);
          });
        }), this.$watch("exclude", function (e) {
          An(t, function (t) {
            return !wn(e, t);
          });
        });
      },
      render: function () {
        var t = this.$slots.default,
            e = He(t),
            n = e && e.componentOptions;

        if (n) {
          var r = $n(n),
              o = this.include,
              i = this.exclude;
          if (o && (!r || !wn(o, r)) || i && r && wn(i, r)) return e;
          var a = this.cache,
              s = this.keys,
              c = null == e.key ? n.Ctor.cid + (n.tag ? "::" + n.tag : "") : e.key;
          a[c] ? (e.componentInstance = a[c].componentInstance, v(s, c), s.push(c)) : (a[c] = e, s.push(c), this.max && s.length > parseInt(this.max) && xn(a, s[0], s, this._vnode)), e.data.keepAlive = !0;
        }

        return e || t && t[0];
      }
    }
  };
  !function (t) {
    var e = {
      get: function () {
        return L;
      }
    };
    Object.defineProperty(t, "config", e), t.util = {
      warn: ot,
      extend: x,
      mergeOptions: Tt,
      defineReactive: $t
    }, t.set = wt, t.delete = At, t.nextTick = Zt, t.observable = function (t) {
      return Ct(t), t;
    }, t.options = Object.create(null), N.forEach(function (e) {
      t.options[e + "s"] = Object.create(null);
    }), t.options._base = t, x(t.options.components, kn), function (t) {
      t.use = function (t) {
        var e = this._installedPlugins || (this._installedPlugins = []);
        if (e.indexOf(t) > -1) return this;
        var n = A(arguments, 1);
        return n.unshift(this), "function" == typeof t.install ? t.install.apply(t, n) : "function" == typeof t && t.apply(null, n), e.push(t), this;
      };
    }(t), function (t) {
      t.mixin = function (t) {
        return this.options = Tt(this.options, t), this;
      };
    }(t), Cn(t), function (t) {
      N.forEach(function (e) {
        t[e] = function (t, n) {
          return n ? ("component" === e && s(n) && (n.name = n.name || t, n = this.options._base.extend(n)), "directive" === e && "function" == typeof n && (n = {
            bind: n,
            update: n
          }), this.options[e + "s"][t] = n, n) : this.options[e + "s"][t];
        };
      });
    }(t);
  }(bn), Object.defineProperty(bn.prototype, "$isServer", {
    get: Y
  }), Object.defineProperty(bn.prototype, "$ssrContext", {
    get: function () {
      return this.$vnode && this.$vnode.ssrContext;
    }
  }), Object.defineProperty(bn, "FunctionalRenderContext", {
    value: ke
  }), bn.version = "2.6.10";

  var Sn = d("style,class"),
      En = d("input,textarea,option,select,progress"),
      jn = d("contenteditable,draggable,spellcheck"),
      Tn = d("events,caret,typing,plaintext-only"),
      In = function (t, e) {
    return Mn(e) || "false" === e ? "false" : "contenteditable" === t && Tn(e) ? e : "true";
  },
      Dn = d("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
      Nn = "http://www.w3.org/1999/xlink",
      Pn = function (t) {
    return ":" === t.charAt(5) && "xlink" === t.slice(0, 5);
  },
      Ln = function (t) {
    return Pn(t) ? t.slice(6, t.length) : "";
  },
      Mn = function (t) {
    return null == t || !1 === t;
  };

  function Fn(t) {
    for (var e = t.data, r = t, o = t; n(o.componentInstance);) (o = o.componentInstance._vnode) && o.data && (e = Rn(o.data, e));

    for (; n(r = r.parent);) r && r.data && (e = Rn(e, r.data));

    return function (t, e) {
      if (n(t) || n(e)) return Un(t, Hn(e));
      return "";
    }(e.staticClass, e.class);
  }

  function Rn(t, e) {
    return {
      staticClass: Un(t.staticClass, e.staticClass),
      class: n(t.class) ? [t.class, e.class] : e.class
    };
  }

  function Un(t, e) {
    return t ? e ? t + " " + e : t : e || "";
  }

  function Hn(t) {
    return Array.isArray(t) ? function (t) {
      for (var e, r = "", o = 0, i = t.length; o < i; o++) n(e = Hn(t[o])) && "" !== e && (r && (r += " "), r += e);

      return r;
    }(t) : i(t) ? function (t) {
      var e = "";

      for (var n in t) t[n] && (e && (e += " "), e += n);

      return e;
    }(t) : "string" == typeof t ? t : "";
  }

  var Vn = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML"
  },
      Bn = d("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),
      zn = d("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
      Wn = function (t) {
    return Bn(t) || zn(t);
  };

  var qn = Object.create(null);
  var Kn = d("text,number,password,search,email,tel,url");
  var Xn = Object.freeze({
    createElement: function (t, e) {
      var n = document.createElement(t);
      return "select" !== t ? n : (e.data && e.data.attrs && void 0 !== e.data.attrs.multiple && n.setAttribute("multiple", "multiple"), n);
    },
    createElementNS: function (t, e) {
      return document.createElementNS(Vn[t], e);
    },
    createTextNode: function (t) {
      return document.createTextNode(t);
    },
    createComment: function (t) {
      return document.createComment(t);
    },
    insertBefore: function (t, e, n) {
      t.insertBefore(e, n);
    },
    removeChild: function (t, e) {
      t.removeChild(e);
    },
    appendChild: function (t, e) {
      t.appendChild(e);
    },
    parentNode: function (t) {
      return t.parentNode;
    },
    nextSibling: function (t) {
      return t.nextSibling;
    },
    tagName: function (t) {
      return t.tagName;
    },
    setTextContent: function (t, e) {
      t.textContent = e;
    },
    setStyleScope: function (t, e) {
      t.setAttribute(e, "");
    }
  }),
      Gn = {
    create: function (t, e) {
      Zn(e);
    },
    update: function (t, e) {
      t.data.ref !== e.data.ref && (Zn(t, !0), Zn(e));
    },
    destroy: function (t) {
      Zn(t, !0);
    }
  };

  function Zn(t, e) {
    var r = t.data.ref;

    if (n(r)) {
      var o = t.context,
          i = t.componentInstance || t.elm,
          a = o.$refs;
      e ? Array.isArray(a[r]) ? v(a[r], i) : a[r] === i && (a[r] = void 0) : t.data.refInFor ? Array.isArray(a[r]) ? a[r].indexOf(i) < 0 && a[r].push(i) : a[r] = [i] : a[r] = i;
    }
  }

  var Jn = new lt("", {}, []),
      Qn = ["create", "activate", "update", "remove", "destroy"];

  function Yn(t, o) {
    return t.key === o.key && (t.tag === o.tag && t.isComment === o.isComment && n(t.data) === n(o.data) && function (t, e) {
      if ("input" !== t.tag) return !0;
      var r,
          o = n(r = t.data) && n(r = r.attrs) && r.type,
          i = n(r = e.data) && n(r = r.attrs) && r.type;
      return o === i || Kn(o) && Kn(i);
    }(t, o) || r(t.isAsyncPlaceholder) && t.asyncFactory === o.asyncFactory && e(o.asyncFactory.error));
  }

  function tr(t, e, r) {
    var o,
        i,
        a = {};

    for (o = e; o <= r; ++o) n(i = t[o].key) && (a[i] = o);

    return a;
  }

  var er = {
    create: nr,
    update: nr,
    destroy: function (t) {
      nr(t, Jn);
    }
  };

  function nr(t, e) {
    (t.data.directives || e.data.directives) && function (t, e) {
      var n,
          r,
          o,
          i = t === Jn,
          a = e === Jn,
          s = or(t.data.directives, t.context),
          c = or(e.data.directives, e.context),
          u = [],
          l = [];

      for (n in c) r = s[n], o = c[n], r ? (o.oldValue = r.value, o.oldArg = r.arg, ar(o, "update", e, t), o.def && o.def.componentUpdated && l.push(o)) : (ar(o, "bind", e, t), o.def && o.def.inserted && u.push(o));

      if (u.length) {
        var f = function () {
          for (var n = 0; n < u.length; n++) ar(u[n], "inserted", e, t);
        };

        i ? ne(e, "insert", f) : f();
      }

      l.length && ne(e, "postpatch", function () {
        for (var n = 0; n < l.length; n++) ar(l[n], "componentUpdated", e, t);
      });
      if (!i) for (n in s) c[n] || ar(s[n], "unbind", t, t, a);
    }(t, e);
  }

  var rr = Object.create(null);

  function or(t, e) {
    var n,
        r,
        o = Object.create(null);
    if (!t) return o;

    for (n = 0; n < t.length; n++) (r = t[n]).modifiers || (r.modifiers = rr), o[ir(r)] = r, r.def = It(e.$options, "directives", r.name);

    return o;
  }

  function ir(t) {
    return t.rawName || t.name + "." + Object.keys(t.modifiers || {}).join(".");
  }

  function ar(t, e, n, r, o) {
    var i = t.def && t.def[e];
    if (i) try {
      i(n.elm, t, n, r, o);
    } catch (r) {
      Mt(r, n.context, "directive " + t.name + " " + e + " hook");
    }
  }

  var sr = [Gn, er];

  function cr(t, r) {
    var o = r.componentOptions;

    if (!(n(o) && !1 === o.Ctor.options.inheritAttrs || e(t.data.attrs) && e(r.data.attrs))) {
      var i,
          a,
          s = r.elm,
          c = t.data.attrs || {},
          u = r.data.attrs || {};

      for (i in n(u.__ob__) && (u = r.data.attrs = x({}, u)), u) a = u[i], c[i] !== a && ur(s, i, a);

      for (i in (W || K) && u.value !== c.value && ur(s, "value", u.value), c) e(u[i]) && (Pn(i) ? s.removeAttributeNS(Nn, Ln(i)) : jn(i) || s.removeAttribute(i));
    }
  }

  function ur(t, e, n) {
    t.tagName.indexOf("-") > -1 ? lr(t, e, n) : Dn(e) ? Mn(n) ? t.removeAttribute(e) : (n = "allowfullscreen" === e && "EMBED" === t.tagName ? "true" : e, t.setAttribute(e, n)) : jn(e) ? t.setAttribute(e, In(e, n)) : Pn(e) ? Mn(n) ? t.removeAttributeNS(Nn, Ln(e)) : t.setAttributeNS(Nn, e, n) : lr(t, e, n);
  }

  function lr(t, e, n) {
    if (Mn(n)) t.removeAttribute(e);else {
      if (W && !q && "TEXTAREA" === t.tagName && "placeholder" === e && "" !== n && !t.__ieph) {
        var r = function (e) {
          e.stopImmediatePropagation(), t.removeEventListener("input", r);
        };

        t.addEventListener("input", r), t.__ieph = !0;
      }

      t.setAttribute(e, n);
    }
  }

  var fr = {
    create: cr,
    update: cr
  };

  function dr(t, r) {
    var o = r.elm,
        i = r.data,
        a = t.data;

    if (!(e(i.staticClass) && e(i.class) && (e(a) || e(a.staticClass) && e(a.class)))) {
      var s = Fn(r),
          c = o._transitionClasses;
      n(c) && (s = Un(s, Hn(c))), s !== o._prevClass && (o.setAttribute("class", s), o._prevClass = s);
    }
  }

  var pr,
      vr = {
    create: dr,
    update: dr
  },
      hr = "__r",
      mr = "__c";

  function yr(t, e, n) {
    var r = pr;
    return function o() {
      null !== e.apply(null, arguments) && br(t, o, n, r);
    };
  }

  var gr = Vt && !(G && Number(G[1]) <= 53);

  function _r(t, e, n, r) {
    if (gr) {
      var o = rn,
          i = e;

      e = i._wrapper = function (t) {
        if (t.target === t.currentTarget || t.timeStamp >= o || t.timeStamp <= 0 || t.target.ownerDocument !== document) return i.apply(this, arguments);
      };
    }

    pr.addEventListener(t, e, J ? {
      capture: n,
      passive: r
    } : n);
  }

  function br(t, e, n, r) {
    (r || pr).removeEventListener(t, e._wrapper || e, n);
  }

  function Cr(t, r) {
    if (!e(t.data.on) || !e(r.data.on)) {
      var o = r.data.on || {},
          i = t.data.on || {};
      pr = r.elm, function (t) {
        if (n(t[hr])) {
          var e = W ? "change" : "input";
          t[e] = [].concat(t[hr], t[e] || []), delete t[hr];
        }

        n(t[mr]) && (t.change = [].concat(t[mr], t.change || []), delete t[mr]);
      }(o), ee(o, i, _r, br, yr, r.context), pr = void 0;
    }
  }

  var $r,
      wr = {
    create: Cr,
    update: Cr
  };

  function Ar(t, r) {
    if (!e(t.data.domProps) || !e(r.data.domProps)) {
      var o,
          i,
          a = r.elm,
          s = t.data.domProps || {},
          c = r.data.domProps || {};

      for (o in n(c.__ob__) && (c = r.data.domProps = x({}, c)), s) o in c || (a[o] = "");

      for (o in c) {
        if (i = c[o], "textContent" === o || "innerHTML" === o) {
          if (r.children && (r.children.length = 0), i === s[o]) continue;
          1 === a.childNodes.length && a.removeChild(a.childNodes[0]);
        }

        if ("value" === o && "PROGRESS" !== a.tagName) {
          a._value = i;
          var u = e(i) ? "" : String(i);
          xr(a, u) && (a.value = u);
        } else if ("innerHTML" === o && zn(a.tagName) && e(a.innerHTML)) {
          ($r = $r || document.createElement("div")).innerHTML = "<svg>" + i + "</svg>";

          for (var l = $r.firstChild; a.firstChild;) a.removeChild(a.firstChild);

          for (; l.firstChild;) a.appendChild(l.firstChild);
        } else if (i !== s[o]) try {
          a[o] = i;
        } catch (t) {}
      }
    }
  }

  function xr(t, e) {
    return !t.composing && ("OPTION" === t.tagName || function (t, e) {
      var n = !0;

      try {
        n = document.activeElement !== t;
      } catch (t) {}

      return n && t.value !== e;
    }(t, e) || function (t, e) {
      var r = t.value,
          o = t._vModifiers;

      if (n(o)) {
        if (o.number) return f(r) !== f(e);
        if (o.trim) return r.trim() !== e.trim();
      }

      return r !== e;
    }(t, e));
  }

  var Or = {
    create: Ar,
    update: Ar
  },
      kr = y(function (t) {
    var e = {},
        n = /:(.+)/;
    return t.split(/;(?![^(]*\))/g).forEach(function (t) {
      if (t) {
        var r = t.split(n);
        r.length > 1 && (e[r[0].trim()] = r[1].trim());
      }
    }), e;
  });

  function Sr(t) {
    var e = Er(t.style);
    return t.staticStyle ? x(t.staticStyle, e) : e;
  }

  function Er(t) {
    return Array.isArray(t) ? O(t) : "string" == typeof t ? kr(t) : t;
  }

  var jr,
      Tr = /^--/,
      Ir = /\s*!important$/,
      Dr = function (t, e, n) {
    if (Tr.test(e)) t.style.setProperty(e, n);else if (Ir.test(n)) t.style.setProperty($(e), n.replace(Ir, ""), "important");else {
      var r = Pr(e);
      if (Array.isArray(n)) for (var o = 0, i = n.length; o < i; o++) t.style[r] = n[o];else t.style[r] = n;
    }
  },
      Nr = ["Webkit", "Moz", "ms"],
      Pr = y(function (t) {
    if (jr = jr || document.createElement("div").style, "filter" !== (t = _(t)) && t in jr) return t;

    for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < Nr.length; n++) {
      var r = Nr[n] + e;
      if (r in jr) return r;
    }
  });

  function Lr(t, r) {
    var o = r.data,
        i = t.data;

    if (!(e(o.staticStyle) && e(o.style) && e(i.staticStyle) && e(i.style))) {
      var a,
          s,
          c = r.elm,
          u = i.staticStyle,
          l = i.normalizedStyle || i.style || {},
          f = u || l,
          d = Er(r.data.style) || {};
      r.data.normalizedStyle = n(d.__ob__) ? x({}, d) : d;

      var p = function (t, e) {
        var n,
            r = {};
        if (e) for (var o = t; o.componentInstance;) (o = o.componentInstance._vnode) && o.data && (n = Sr(o.data)) && x(r, n);
        (n = Sr(t.data)) && x(r, n);

        for (var i = t; i = i.parent;) i.data && (n = Sr(i.data)) && x(r, n);

        return r;
      }(r, !0);

      for (s in f) e(p[s]) && Dr(c, s, "");

      for (s in p) (a = p[s]) !== f[s] && Dr(c, s, null == a ? "" : a);
    }
  }

  var Mr = {
    create: Lr,
    update: Lr
  },
      Fr = /\s+/;

  function Rr(t, e) {
    if (e && (e = e.trim())) if (t.classList) e.indexOf(" ") > -1 ? e.split(Fr).forEach(function (e) {
      return t.classList.add(e);
    }) : t.classList.add(e);else {
      var n = " " + (t.getAttribute("class") || "") + " ";
      n.indexOf(" " + e + " ") < 0 && t.setAttribute("class", (n + e).trim());
    }
  }

  function Ur(t, e) {
    if (e && (e = e.trim())) if (t.classList) e.indexOf(" ") > -1 ? e.split(Fr).forEach(function (e) {
      return t.classList.remove(e);
    }) : t.classList.remove(e), t.classList.length || t.removeAttribute("class");else {
      for (var n = " " + (t.getAttribute("class") || "") + " ", r = " " + e + " "; n.indexOf(r) >= 0;) n = n.replace(r, " ");

      (n = n.trim()) ? t.setAttribute("class", n) : t.removeAttribute("class");
    }
  }

  function Hr(t) {
    if (t) {
      if ("object" == typeof t) {
        var e = {};
        return !1 !== t.css && x(e, Vr(t.name || "v")), x(e, t), e;
      }

      return "string" == typeof t ? Vr(t) : void 0;
    }
  }

  var Vr = y(function (t) {
    return {
      enterClass: t + "-enter",
      enterToClass: t + "-enter-to",
      enterActiveClass: t + "-enter-active",
      leaveClass: t + "-leave",
      leaveToClass: t + "-leave-to",
      leaveActiveClass: t + "-leave-active"
    };
  }),
      Br = H && !q,
      zr = "transition",
      Wr = "animation",
      qr = "transition",
      Kr = "transitionend",
      Xr = "animation",
      Gr = "animationend";
  Br && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (qr = "WebkitTransition", Kr = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Xr = "WebkitAnimation", Gr = "webkitAnimationEnd"));
  var Zr = H ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function (t) {
    return t();
  };

  function Jr(t) {
    Zr(function () {
      Zr(t);
    });
  }

  function Qr(t, e) {
    var n = t._transitionClasses || (t._transitionClasses = []);
    n.indexOf(e) < 0 && (n.push(e), Rr(t, e));
  }

  function Yr(t, e) {
    t._transitionClasses && v(t._transitionClasses, e), Ur(t, e);
  }

  function to(t, e, n) {
    var r = no(t, e),
        o = r.type,
        i = r.timeout,
        a = r.propCount;
    if (!o) return n();

    var s = o === zr ? Kr : Gr,
        c = 0,
        u = function () {
      t.removeEventListener(s, l), n();
    },
        l = function (e) {
      e.target === t && ++c >= a && u();
    };

    setTimeout(function () {
      c < a && u();
    }, i + 1), t.addEventListener(s, l);
  }

  var eo = /\b(transform|all)(,|$)/;

  function no(t, e) {
    var n,
        r = window.getComputedStyle(t),
        o = (r[qr + "Delay"] || "").split(", "),
        i = (r[qr + "Duration"] || "").split(", "),
        a = ro(o, i),
        s = (r[Xr + "Delay"] || "").split(", "),
        c = (r[Xr + "Duration"] || "").split(", "),
        u = ro(s, c),
        l = 0,
        f = 0;
    return e === zr ? a > 0 && (n = zr, l = a, f = i.length) : e === Wr ? u > 0 && (n = Wr, l = u, f = c.length) : f = (n = (l = Math.max(a, u)) > 0 ? a > u ? zr : Wr : null) ? n === zr ? i.length : c.length : 0, {
      type: n,
      timeout: l,
      propCount: f,
      hasTransform: n === zr && eo.test(r[qr + "Property"])
    };
  }

  function ro(t, e) {
    for (; t.length < e.length;) t = t.concat(t);

    return Math.max.apply(null, e.map(function (e, n) {
      return oo(e) + oo(t[n]);
    }));
  }

  function oo(t) {
    return 1e3 * Number(t.slice(0, -1).replace(",", "."));
  }

  function io(t, r) {
    var o = t.elm;
    n(o._leaveCb) && (o._leaveCb.cancelled = !0, o._leaveCb());
    var a = Hr(t.data.transition);

    if (!e(a) && !n(o._enterCb) && 1 === o.nodeType) {
      for (var s = a.css, c = a.type, u = a.enterClass, l = a.enterToClass, d = a.enterActiveClass, p = a.appearClass, v = a.appearToClass, h = a.appearActiveClass, m = a.beforeEnter, y = a.enter, g = a.afterEnter, _ = a.enterCancelled, b = a.beforeAppear, C = a.appear, $ = a.afterAppear, w = a.appearCancelled, A = a.duration, x = qe, O = qe.$vnode; O && O.parent;) x = O.context, O = O.parent;

      var k = !x._isMounted || !t.isRootInsert;

      if (!k || C || "" === C) {
        var S = k && p ? p : u,
            E = k && h ? h : d,
            j = k && v ? v : l,
            T = k && b || m,
            D = k && "function" == typeof C ? C : y,
            N = k && $ || g,
            P = k && w || _,
            L = f(i(A) ? A.enter : A),
            M = !1 !== s && !q,
            F = co(D),
            R = o._enterCb = I(function () {
          M && (Yr(o, j), Yr(o, E)), R.cancelled ? (M && Yr(o, S), P && P(o)) : N && N(o), o._enterCb = null;
        });
        t.data.show || ne(t, "insert", function () {
          var e = o.parentNode,
              n = e && e._pending && e._pending[t.key];
          n && n.tag === t.tag && n.elm._leaveCb && n.elm._leaveCb(), D && D(o, R);
        }), T && T(o), M && (Qr(o, S), Qr(o, E), Jr(function () {
          Yr(o, S), R.cancelled || (Qr(o, j), F || (so(L) ? setTimeout(R, L) : to(o, c, R)));
        })), t.data.show && (r && r(), D && D(o, R)), M || F || R();
      }
    }
  }

  function ao(t, r) {
    var o = t.elm;
    n(o._enterCb) && (o._enterCb.cancelled = !0, o._enterCb());
    var a = Hr(t.data.transition);
    if (e(a) || 1 !== o.nodeType) return r();

    if (!n(o._leaveCb)) {
      var s = a.css,
          c = a.type,
          u = a.leaveClass,
          l = a.leaveToClass,
          d = a.leaveActiveClass,
          p = a.beforeLeave,
          v = a.leave,
          h = a.afterLeave,
          m = a.leaveCancelled,
          y = a.delayLeave,
          g = a.duration,
          _ = !1 !== s && !q,
          b = co(v),
          C = f(i(g) ? g.leave : g),
          $ = o._leaveCb = I(function () {
        o.parentNode && o.parentNode._pending && (o.parentNode._pending[t.key] = null), _ && (Yr(o, l), Yr(o, d)), $.cancelled ? (_ && Yr(o, u), m && m(o)) : (r(), h && h(o)), o._leaveCb = null;
      });

      y ? y(w) : w();
    }

    function w() {
      $.cancelled || (!t.data.show && o.parentNode && ((o.parentNode._pending || (o.parentNode._pending = {}))[t.key] = t), p && p(o), _ && (Qr(o, u), Qr(o, d), Jr(function () {
        Yr(o, u), $.cancelled || (Qr(o, l), b || (so(C) ? setTimeout($, C) : to(o, c, $)));
      })), v && v(o, $), _ || b || $());
    }
  }

  function so(t) {
    return "number" == typeof t && !isNaN(t);
  }

  function co(t) {
    if (e(t)) return !1;
    var r = t.fns;
    return n(r) ? co(Array.isArray(r) ? r[0] : r) : (t._length || t.length) > 1;
  }

  function uo(t, e) {
    !0 !== e.data.show && io(e);
  }

  var lo = function (t) {
    var i,
        a,
        s = {},
        c = t.modules,
        u = t.nodeOps;

    for (i = 0; i < Qn.length; ++i) for (s[Qn[i]] = [], a = 0; a < c.length; ++a) n(c[a][Qn[i]]) && s[Qn[i]].push(c[a][Qn[i]]);

    function l(t) {
      var e = u.parentNode(t);
      n(e) && u.removeChild(e, t);
    }

    function f(t, e, o, i, a, c, l) {
      if (n(t.elm) && n(c) && (t = c[l] = vt(t)), t.isRootInsert = !a, !function (t, e, o, i) {
        var a = t.data;

        if (n(a)) {
          var c = n(t.componentInstance) && a.keepAlive;
          if (n(a = a.hook) && n(a = a.init) && a(t, !1), n(t.componentInstance)) return p(t, e), v(o, t.elm, i), r(c) && function (t, e, r, o) {
            for (var i, a = t; a.componentInstance;) if (a = a.componentInstance._vnode, n(i = a.data) && n(i = i.transition)) {
              for (i = 0; i < s.activate.length; ++i) s.activate[i](Jn, a);

              e.push(a);
              break;
            }

            v(r, t.elm, o);
          }(t, e, o, i), !0;
        }
      }(t, e, o, i)) {
        var f = t.data,
            d = t.children,
            m = t.tag;
        n(m) ? (t.elm = t.ns ? u.createElementNS(t.ns, m) : u.createElement(m, t), g(t), h(t, d, e), n(f) && y(t, e), v(o, t.elm, i)) : r(t.isComment) ? (t.elm = u.createComment(t.text), v(o, t.elm, i)) : (t.elm = u.createTextNode(t.text), v(o, t.elm, i));
      }
    }

    function p(t, e) {
      n(t.data.pendingInsert) && (e.push.apply(e, t.data.pendingInsert), t.data.pendingInsert = null), t.elm = t.componentInstance.$el, m(t) ? (y(t, e), g(t)) : (Zn(t), e.push(t));
    }

    function v(t, e, r) {
      n(t) && (n(r) ? u.parentNode(r) === t && u.insertBefore(t, e, r) : u.appendChild(t, e));
    }

    function h(t, e, n) {
      if (Array.isArray(e)) for (var r = 0; r < e.length; ++r) f(e[r], n, t.elm, null, !0, e, r);else o(t.text) && u.appendChild(t.elm, u.createTextNode(String(t.text)));
    }

    function m(t) {
      for (; t.componentInstance;) t = t.componentInstance._vnode;

      return n(t.tag);
    }

    function y(t, e) {
      for (var r = 0; r < s.create.length; ++r) s.create[r](Jn, t);

      n(i = t.data.hook) && (n(i.create) && i.create(Jn, t), n(i.insert) && e.push(t));
    }

    function g(t) {
      var e;
      if (n(e = t.fnScopeId)) u.setStyleScope(t.elm, e);else for (var r = t; r;) n(e = r.context) && n(e = e.$options._scopeId) && u.setStyleScope(t.elm, e), r = r.parent;
      n(e = qe) && e !== t.context && e !== t.fnContext && n(e = e.$options._scopeId) && u.setStyleScope(t.elm, e);
    }

    function _(t, e, n, r, o, i) {
      for (; r <= o; ++r) f(n[r], i, t, e, !1, n, r);
    }

    function b(t) {
      var e,
          r,
          o = t.data;
      if (n(o)) for (n(e = o.hook) && n(e = e.destroy) && e(t), e = 0; e < s.destroy.length; ++e) s.destroy[e](t);
      if (n(e = t.children)) for (r = 0; r < t.children.length; ++r) b(t.children[r]);
    }

    function C(t, e, r, o) {
      for (; r <= o; ++r) {
        var i = e[r];
        n(i) && (n(i.tag) ? ($(i), b(i)) : l(i.elm));
      }
    }

    function $(t, e) {
      if (n(e) || n(t.data)) {
        var r,
            o = s.remove.length + 1;

        for (n(e) ? e.listeners += o : e = function (t, e) {
          function n() {
            0 == --n.listeners && l(t);
          }

          return n.listeners = e, n;
        }(t.elm, o), n(r = t.componentInstance) && n(r = r._vnode) && n(r.data) && $(r, e), r = 0; r < s.remove.length; ++r) s.remove[r](t, e);

        n(r = t.data.hook) && n(r = r.remove) ? r(t, e) : e();
      } else l(t.elm);
    }

    function w(t, e, r, o) {
      for (var i = r; i < o; i++) {
        var a = e[i];
        if (n(a) && Yn(t, a)) return i;
      }
    }

    function A(t, o, i, a, c, l) {
      if (t !== o) {
        n(o.elm) && n(a) && (o = a[c] = vt(o));
        var d = o.elm = t.elm;
        if (r(t.isAsyncPlaceholder)) n(o.asyncFactory.resolved) ? k(t.elm, o, i) : o.isAsyncPlaceholder = !0;else if (r(o.isStatic) && r(t.isStatic) && o.key === t.key && (r(o.isCloned) || r(o.isOnce))) o.componentInstance = t.componentInstance;else {
          var p,
              v = o.data;
          n(v) && n(p = v.hook) && n(p = p.prepatch) && p(t, o);
          var h = t.children,
              y = o.children;

          if (n(v) && m(o)) {
            for (p = 0; p < s.update.length; ++p) s.update[p](t, o);

            n(p = v.hook) && n(p = p.update) && p(t, o);
          }

          e(o.text) ? n(h) && n(y) ? h !== y && function (t, r, o, i, a) {
            for (var s, c, l, d = 0, p = 0, v = r.length - 1, h = r[0], m = r[v], y = o.length - 1, g = o[0], b = o[y], $ = !a; d <= v && p <= y;) e(h) ? h = r[++d] : e(m) ? m = r[--v] : Yn(h, g) ? (A(h, g, i, o, p), h = r[++d], g = o[++p]) : Yn(m, b) ? (A(m, b, i, o, y), m = r[--v], b = o[--y]) : Yn(h, b) ? (A(h, b, i, o, y), $ && u.insertBefore(t, h.elm, u.nextSibling(m.elm)), h = r[++d], b = o[--y]) : Yn(m, g) ? (A(m, g, i, o, p), $ && u.insertBefore(t, m.elm, h.elm), m = r[--v], g = o[++p]) : (e(s) && (s = tr(r, d, v)), e(c = n(g.key) ? s[g.key] : w(g, r, d, v)) ? f(g, i, t, h.elm, !1, o, p) : Yn(l = r[c], g) ? (A(l, g, i, o, p), r[c] = void 0, $ && u.insertBefore(t, l.elm, h.elm)) : f(g, i, t, h.elm, !1, o, p), g = o[++p]);

            d > v ? _(t, e(o[y + 1]) ? null : o[y + 1].elm, o, p, y, i) : p > y && C(0, r, d, v);
          }(d, h, y, i, l) : n(y) ? (n(t.text) && u.setTextContent(d, ""), _(d, null, y, 0, y.length - 1, i)) : n(h) ? C(0, h, 0, h.length - 1) : n(t.text) && u.setTextContent(d, "") : t.text !== o.text && u.setTextContent(d, o.text), n(v) && n(p = v.hook) && n(p = p.postpatch) && p(t, o);
        }
      }
    }

    function x(t, e, o) {
      if (r(o) && n(t.parent)) t.parent.data.pendingInsert = e;else for (var i = 0; i < e.length; ++i) e[i].data.hook.insert(e[i]);
    }

    var O = d("attrs,class,staticClass,staticStyle,key");

    function k(t, e, o, i) {
      var a,
          s = e.tag,
          c = e.data,
          u = e.children;
      if (i = i || c && c.pre, e.elm = t, r(e.isComment) && n(e.asyncFactory)) return e.isAsyncPlaceholder = !0, !0;
      if (n(c) && (n(a = c.hook) && n(a = a.init) && a(e, !0), n(a = e.componentInstance))) return p(e, o), !0;

      if (n(s)) {
        if (n(u)) if (t.hasChildNodes()) {
          if (n(a = c) && n(a = a.domProps) && n(a = a.innerHTML)) {
            if (a !== t.innerHTML) return !1;
          } else {
            for (var l = !0, f = t.firstChild, d = 0; d < u.length; d++) {
              if (!f || !k(f, u[d], o, i)) {
                l = !1;
                break;
              }

              f = f.nextSibling;
            }

            if (!l || f) return !1;
          }
        } else h(e, u, o);

        if (n(c)) {
          var v = !1;

          for (var m in c) if (!O(m)) {
            v = !0, y(e, o);
            break;
          }

          !v && c.class && Qt(c.class);
        }
      } else t.data !== e.text && (t.data = e.text);

      return !0;
    }

    return function (t, o, i, a) {
      if (!e(o)) {
        var c,
            l = !1,
            d = [];
        if (e(t)) l = !0, f(o, d);else {
          var p = n(t.nodeType);
          if (!p && Yn(t, o)) A(t, o, d, null, null, a);else {
            if (p) {
              if (1 === t.nodeType && t.hasAttribute(D) && (t.removeAttribute(D), i = !0), r(i) && k(t, o, d)) return x(o, d, !0), t;
              c = t, t = new lt(u.tagName(c).toLowerCase(), {}, [], void 0, c);
            }

            var v = t.elm,
                h = u.parentNode(v);
            if (f(o, d, v._leaveCb ? null : h, u.nextSibling(v)), n(o.parent)) for (var y = o.parent, g = m(o); y;) {
              for (var _ = 0; _ < s.destroy.length; ++_) s.destroy[_](y);

              if (y.elm = o.elm, g) {
                for (var $ = 0; $ < s.create.length; ++$) s.create[$](Jn, y);

                var w = y.data.hook.insert;
                if (w.merged) for (var O = 1; O < w.fns.length; O++) w.fns[O]();
              } else Zn(y);

              y = y.parent;
            }
            n(h) ? C(0, [t], 0, 0) : n(t.tag) && b(t);
          }
        }
        return x(o, d, l), o.elm;
      }

      n(t) && b(t);
    };
  }({
    nodeOps: Xn,
    modules: [fr, vr, wr, Or, Mr, H ? {
      create: uo,
      activate: uo,
      remove: function (t, e) {
        !0 !== t.data.show ? ao(t, e) : e();
      }
    } : {}].concat(sr)
  });

  q && document.addEventListener("selectionchange", function () {
    var t = document.activeElement;
    t && t.vmodel && _o(t, "input");
  });
  var fo = {
    inserted: function (t, e, n, r) {
      "select" === n.tag ? (r.elm && !r.elm._vOptions ? ne(n, "postpatch", function () {
        fo.componentUpdated(t, e, n);
      }) : po(t, e, n.context), t._vOptions = [].map.call(t.options, mo)) : ("textarea" === n.tag || Kn(t.type)) && (t._vModifiers = e.modifiers, e.modifiers.lazy || (t.addEventListener("compositionstart", yo), t.addEventListener("compositionend", go), t.addEventListener("change", go), q && (t.vmodel = !0)));
    },
    componentUpdated: function (t, e, n) {
      if ("select" === n.tag) {
        po(t, e, n.context);
        var r = t._vOptions,
            o = t._vOptions = [].map.call(t.options, mo);
        if (o.some(function (t, e) {
          return !j(t, r[e]);
        })) (t.multiple ? e.value.some(function (t) {
          return ho(t, o);
        }) : e.value !== e.oldValue && ho(e.value, o)) && _o(t, "change");
      }
    }
  };

  function po(t, e, n) {
    vo(t, e, n), (W || K) && setTimeout(function () {
      vo(t, e, n);
    }, 0);
  }

  function vo(t, e, n) {
    var r = e.value,
        o = t.multiple;

    if (!o || Array.isArray(r)) {
      for (var i, a, s = 0, c = t.options.length; s < c; s++) if (a = t.options[s], o) i = T(r, mo(a)) > -1, a.selected !== i && (a.selected = i);else if (j(mo(a), r)) return void (t.selectedIndex !== s && (t.selectedIndex = s));

      o || (t.selectedIndex = -1);
    }
  }

  function ho(t, e) {
    return e.every(function (e) {
      return !j(e, t);
    });
  }

  function mo(t) {
    return "_value" in t ? t._value : t.value;
  }

  function yo(t) {
    t.target.composing = !0;
  }

  function go(t) {
    t.target.composing && (t.target.composing = !1, _o(t.target, "input"));
  }

  function _o(t, e) {
    var n = document.createEvent("HTMLEvents");
    n.initEvent(e, !0, !0), t.dispatchEvent(n);
  }

  function bo(t) {
    return !t.componentInstance || t.data && t.data.transition ? t : bo(t.componentInstance._vnode);
  }

  var Co = {
    model: fo,
    show: {
      bind: function (t, e, n) {
        var r = e.value,
            o = (n = bo(n)).data && n.data.transition,
            i = t.__vOriginalDisplay = "none" === t.style.display ? "" : t.style.display;
        r && o ? (n.data.show = !0, io(n, function () {
          t.style.display = i;
        })) : t.style.display = r ? i : "none";
      },
      update: function (t, e, n) {
        var r = e.value;
        !r != !e.oldValue && ((n = bo(n)).data && n.data.transition ? (n.data.show = !0, r ? io(n, function () {
          t.style.display = t.__vOriginalDisplay;
        }) : ao(n, function () {
          t.style.display = "none";
        })) : t.style.display = r ? t.__vOriginalDisplay : "none");
      },
      unbind: function (t, e, n, r, o) {
        o || (t.style.display = t.__vOriginalDisplay);
      }
    }
  },
      $o = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };

  function wo(t) {
    var e = t && t.componentOptions;
    return e && e.Ctor.options.abstract ? wo(He(e.children)) : t;
  }

  function Ao(t) {
    var e = {},
        n = t.$options;

    for (var r in n.propsData) e[r] = t[r];

    var o = n._parentListeners;

    for (var i in o) e[_(i)] = o[i];

    return e;
  }

  function xo(t, e) {
    if (/\d-keep-alive$/.test(e.tag)) return t("keep-alive", {
      props: e.componentOptions.propsData
    });
  }

  var Oo = function (t) {
    return t.tag || Ue(t);
  },
      ko = function (t) {
    return "show" === t.name;
  },
      So = {
    name: "transition",
    props: $o,
    abstract: !0,
    render: function (t) {
      var e = this,
          n = this.$slots.default;

      if (n && (n = n.filter(Oo)).length) {
        var r = this.mode,
            i = n[0];
        if (function (t) {
          for (; t = t.parent;) if (t.data.transition) return !0;
        }(this.$vnode)) return i;
        var a = wo(i);
        if (!a) return i;
        if (this._leaving) return xo(t, i);
        var s = "__transition-" + this._uid + "-";
        a.key = null == a.key ? a.isComment ? s + "comment" : s + a.tag : o(a.key) ? 0 === String(a.key).indexOf(s) ? a.key : s + a.key : a.key;
        var c = (a.data || (a.data = {})).transition = Ao(this),
            u = this._vnode,
            l = wo(u);

        if (a.data.directives && a.data.directives.some(ko) && (a.data.show = !0), l && l.data && !function (t, e) {
          return e.key === t.key && e.tag === t.tag;
        }(a, l) && !Ue(l) && (!l.componentInstance || !l.componentInstance._vnode.isComment)) {
          var f = l.data.transition = x({}, c);
          if ("out-in" === r) return this._leaving = !0, ne(f, "afterLeave", function () {
            e._leaving = !1, e.$forceUpdate();
          }), xo(t, i);

          if ("in-out" === r) {
            if (Ue(a)) return u;

            var d,
                p = function () {
              d();
            };

            ne(c, "afterEnter", p), ne(c, "enterCancelled", p), ne(f, "delayLeave", function (t) {
              d = t;
            });
          }
        }

        return i;
      }
    }
  },
      Eo = x({
    tag: String,
    moveClass: String
  }, $o);

  function jo(t) {
    t.elm._moveCb && t.elm._moveCb(), t.elm._enterCb && t.elm._enterCb();
  }

  function To(t) {
    t.data.newPos = t.elm.getBoundingClientRect();
  }

  function Io(t) {
    var e = t.data.pos,
        n = t.data.newPos,
        r = e.left - n.left,
        o = e.top - n.top;

    if (r || o) {
      t.data.moved = !0;
      var i = t.elm.style;
      i.transform = i.WebkitTransform = "translate(" + r + "px," + o + "px)", i.transitionDuration = "0s";
    }
  }

  delete Eo.mode;
  var Do = {
    Transition: So,
    TransitionGroup: {
      props: Eo,
      beforeMount: function () {
        var t = this,
            e = this._update;

        this._update = function (n, r) {
          var o = Ke(t);
          t.__patch__(t._vnode, t.kept, !1, !0), t._vnode = t.kept, o(), e.call(t, n, r);
        };
      },
      render: function (t) {
        for (var e = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, o = this.$slots.default || [], i = this.children = [], a = Ao(this), s = 0; s < o.length; s++) {
          var c = o[s];
          c.tag && null != c.key && 0 !== String(c.key).indexOf("__vlist") && (i.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = a);
        }

        if (r) {
          for (var u = [], l = [], f = 0; f < r.length; f++) {
            var d = r[f];
            d.data.transition = a, d.data.pos = d.elm.getBoundingClientRect(), n[d.key] ? u.push(d) : l.push(d);
          }

          this.kept = t(e, null, u), this.removed = l;
        }

        return t(e, null, i);
      },
      updated: function () {
        var t = this.prevChildren,
            e = this.moveClass || (this.name || "v") + "-move";
        t.length && this.hasMove(t[0].elm, e) && (t.forEach(jo), t.forEach(To), t.forEach(Io), this._reflow = document.body.offsetHeight, t.forEach(function (t) {
          if (t.data.moved) {
            var n = t.elm,
                r = n.style;
            Qr(n, e), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(Kr, n._moveCb = function t(r) {
              r && r.target !== n || r && !/transform$/.test(r.propertyName) || (n.removeEventListener(Kr, t), n._moveCb = null, Yr(n, e));
            });
          }
        }));
      },
      methods: {
        hasMove: function (t, e) {
          if (!Br) return !1;
          if (this._hasMove) return this._hasMove;
          var n = t.cloneNode();
          t._transitionClasses && t._transitionClasses.forEach(function (t) {
            Ur(n, t);
          }), Rr(n, e), n.style.display = "none", this.$el.appendChild(n);
          var r = no(n);
          return this.$el.removeChild(n), this._hasMove = r.hasTransform;
        }
      }
    }
  };
  return bn.config.mustUseProp = function (t, e, n) {
    return "value" === n && En(t) && "button" !== e || "selected" === n && "option" === t || "checked" === n && "input" === t || "muted" === n && "video" === t;
  }, bn.config.isReservedTag = Wn, bn.config.isReservedAttr = Sn, bn.config.getTagNamespace = function (t) {
    return zn(t) ? "svg" : "math" === t ? "math" : void 0;
  }, bn.config.isUnknownElement = function (t) {
    if (!H) return !0;
    if (Wn(t)) return !1;
    if (t = t.toLowerCase(), null != qn[t]) return qn[t];
    var e = document.createElement(t);
    return t.indexOf("-") > -1 ? qn[t] = e.constructor === window.HTMLUnknownElement || e.constructor === window.HTMLElement : qn[t] = /HTMLUnknownElement/.test(e.toString());
  }, x(bn.options.directives, Co), x(bn.options.components, Do), bn.prototype.__patch__ = H ? lo : k, bn.prototype.$mount = function (t, e) {
    return function (t, e, n) {
      var r;
      return t.$el = e, t.$options.render || (t.$options.render = dt), Ze(t, "beforeMount"), r = function () {
        t._update(t._render(), n);
      }, new un(t, r, k, {
        before: function () {
          t._isMounted && !t._isDestroyed && Ze(t, "beforeUpdate");
        }
      }, !0), n = !1, null == t.$vnode && (t._isMounted = !0, Ze(t, "mounted")), t;
    }(this, t = t && H ? function (t) {
      if ("string" == typeof t) {
        var e = document.querySelector(t);
        return e || document.createElement("div");
      }

      return t;
    }(t) : void 0, e);
  }, H && setTimeout(function () {
    L.devtools && tt && tt.emit("init", bn);
  }, 0), bn;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(18).setImmediate))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/
(function (factory) {
  // Find the global object for export to both the browser and web workers.
  var globalObject = typeof window === 'object' && window || typeof self === 'object' && self; // Setup highlight.js for different environments. First is Node.js or
  // CommonJS.
  // `nodeType` is checked to ensure that `exports` is not a HTML element.

  if ( true && !exports.nodeType) {
    factory(exports);
  } else if (globalObject) {
    // Export hljs globally even when using AMD for cases when this script
    // is loaded with others that may still expect a global hljs.
    globalObject.hljs = factory({}); // Finally register the global hljs with AMD.

    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return globalObject.hljs;
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})(function (hljs) {
  // Convenience variables for build-in objects
  var ArrayProto = [],
      objectKeys = Object.keys; // Global internal variables used within the highlight.js library.

  var languages = {},
      aliases = {}; // Regular expressions used throughout the highlight.js library.

  var noHighlightRe = /^(no-?highlight|plain|text)$/i,
      languagePrefixRe = /\blang(?:uage)?-([\w-]+)\b/i,
      fixMarkupRe = /((^(<[^>]+>|\t|)+|(?:\n)))/gm; // The object will be assigned by the build tool. It used to synchronize API 
  // of external language files with minified version of the highlight.js library.

  var API_REPLACES;
  var spanEndTag = '</span>'; // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.

  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };
  /* Utility functions */

  function escape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0;
  }

  function isNotHighlighted(language) {
    return noHighlightRe.test(language);
  }

  function blockLanguage(block) {
    var i, match, length, _class;

    var classes = block.className + ' ';
    classes += block.parentNode ? block.parentNode.className : ''; // language-* takes precedence over non-prefixed class names.

    match = languagePrefixRe.exec(classes);

    if (match) {
      return getLanguage(match[1]) ? match[1] : 'no-highlight';
    }

    classes = classes.split(/\s+/);

    for (i = 0, length = classes.length; i < length; i++) {
      _class = classes[i];

      if (isNotHighlighted(_class) || getLanguage(_class)) {
        return _class;
      }
    }
  }

  function inherit(parent) {
    // inherit(parent, override_obj, override_obj, ...)
    var key;
    var result = {};
    var objects = Array.prototype.slice.call(arguments, 1);

    for (key in parent) result[key] = parent[key];

    objects.forEach(function (obj) {
      for (key in obj) result[key] = obj[key];
    });
    return result;
  }
  /* Stream merging */


  function nodeStream(node) {
    var result = [];

    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === 3) offset += child.nodeValue.length;else if (child.nodeType === 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset); // Prevent void elements from having an end tag that would actually
          // double them in the output. There are more void elements in HTML
          // but we list only those realistically expected in code display.

          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }

      return offset;
    })(node, 0);

    return result;
  }

  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }

      if (original[0].offset !== highlighted[0].offset) {
        return original[0].offset < highlighted[0].offset ? original : highlighted;
      }
      /*
      To avoid starting the stream just before it should stop the order is
      ensured that original always starts first and closes last:
       if (event1 == 'start' && event2 == 'start')
        return original;
      if (event1 == 'start' && event2 == 'stop')
        return highlighted;
      if (event1 == 'stop' && event2 == 'start')
        return original;
      if (event1 == 'stop' && event2 == 'stop')
        return highlighted;
       ... which is collapsed to:
      */


      return highlighted[0].event === 'start' ? original : highlighted;
    }

    function open(node) {
      function attr_str(a) {
        return ' ' + a.nodeName + '="' + escape(a.value).replace('"', '&quot;') + '"';
      }

      result += '<' + tag(node) + ArrayProto.map.call(node.attributes, attr_str).join('') + '>';
    }

    function close(node) {
      result += '</' + tag(node) + '>';
    }

    function render(event) {
      (event.event === 'start' ? open : close)(event.node);
    }

    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substring(processed, stream[0].offset));
      processed = stream[0].offset;

      if (stream === original) {
        /*
        On any opening or closing tag of the original markup we first close
        the entire highlighted node stack, then render the original tag along
        with all the following original tags at the same offset and then
        reopen all the tags on the highlighted stack.
        */
        nodeStack.reverse().forEach(close);

        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream === original && stream.length && stream[0].offset === processed);

        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event === 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }

        render(stream.splice(0, 1)[0]);
      }
    }

    return result + escape(value.substr(processed));
  }
  /* Initialization */


  function expand_mode(mode) {
    if (mode.variants && !mode.cached_variants) {
      mode.cached_variants = mode.variants.map(function (variant) {
        return inherit(mode, {
          variants: null
        }, variant);
      });
    }

    return mode.cached_variants || mode.endsWithParent && [inherit(mode)] || [mode];
  }

  function restoreLanguageApi(obj) {
    if (API_REPLACES && !obj.langApiRestored) {
      obj.langApiRestored = true;

      for (var key in API_REPLACES) obj[key] && (obj[API_REPLACES[key]] = obj[key]);

      (obj.contains || []).concat(obj.variants || []).forEach(restoreLanguageApi);
    }
  }

  function compileLanguage(language) {
    function reStr(re) {
      return re && re.source || re;
    }

    function langRe(value, global) {
      return new RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
    } // joinRe logically computes regexps.join(separator), but fixes the
    // backreferences so they continue to match.


    function joinRe(regexps, separator) {
      // backreferenceRe matches an open parenthesis or backreference. To avoid
      // an incorrect parse, it additionally matches the following:
      // - [...] elements, where the meaning of parentheses and escapes change
      // - other escape sequences, so we do not misparse escape sequences as
      //   interesting elements
      // - non-matching or lookahead parentheses, which do not capture. These
      //   follow the '(' with a '?'.
      var backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      var numCaptures = 0;
      var ret = '';

      for (var i = 0; i < regexps.length; i++) {
        var offset = numCaptures;
        var re = reStr(regexps[i]);

        if (i > 0) {
          ret += separator;
        }

        while (re.length > 0) {
          var match = backreferenceRe.exec(re);

          if (match == null) {
            ret += re;
            break;
          }

          ret += re.substring(0, match.index);
          re = re.substring(match.index + match[0].length);

          if (match[0][0] == '\\' && match[1]) {
            // Adjust the backreference.
            ret += '\\' + String(Number(match[1]) + offset);
          } else {
            ret += match[0];

            if (match[0] == '(') {
              numCaptures++;
            }
          }
        }
      }

      return ret;
    }

    function compileMode(mode, parent) {
      if (mode.compiled) return;
      mode.compiled = true;
      mode.keywords = mode.keywords || mode.beginKeywords;

      if (mode.keywords) {
        var compiled_keywords = {};

        var flatten = function (className, str) {
          if (language.case_insensitive) {
            str = str.toLowerCase();
          }

          str.split(' ').forEach(function (kw) {
            var pair = kw.split('|');
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
          });
        };

        if (typeof mode.keywords === 'string') {
          // string
          flatten('keyword', mode.keywords);
        } else {
          objectKeys(mode.keywords).forEach(function (className) {
            flatten(className, mode.keywords[className]);
          });
        }

        mode.keywords = compiled_keywords;
      }

      mode.lexemesRe = langRe(mode.lexemes || /\w+/, true);

      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }

        if (!mode.begin) mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (mode.endSameAsBegin) mode.end = mode.begin;
        if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
        if (mode.end) mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end) mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }

      if (mode.illegal) mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance == null) mode.relevance = 1;

      if (!mode.contains) {
        mode.contains = [];
      }

      mode.contains = Array.prototype.concat.apply([], mode.contains.map(function (c) {
        return expand_mode(c === 'self' ? mode : c);
      }));
      mode.contains.forEach(function (c) {
        compileMode(c, mode);
      });

      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      var terminators = mode.contains.map(function (c) {
        return c.beginKeywords ? '\\.?(?:' + c.begin + ')\\.?' : c.begin;
      }).concat([mode.terminator_end, mode.illegal]).map(reStr).filter(Boolean);
      mode.terminators = terminators.length ? langRe(joinRe(terminators, '|'), true) : {
        exec: function ()
        /*s*/
        {
          return null;
        }
      };
    }

    compileMode(language);
  }
  /*
  Core highlighting function. Accepts a language name, or an alias, and a
  string with the code to highlight. Returns an object with the following
  properties:
   - relevance (int)
  - value (an HTML string with highlighting markup)
   */


  function highlight(name, value, ignore_illegals, continuation) {
    function escapeRe(value) {
      return new RegExp(value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
    }

    function subMode(lexeme, mode) {
      var i, length;

      for (i = 0, length = mode.contains.length; i < length; i++) {
        if (testRe(mode.contains[i].beginRe, lexeme)) {
          if (mode.contains[i].endSameAsBegin) {
            mode.contains[i].endRe = escapeRe(mode.contains[i].beginRe.exec(lexeme)[0]);
          }

          return mode.contains[i];
        }
      }
    }

    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        while (mode.endsParent && mode.parent) {
          mode = mode.parent;
        }

        return mode;
      }

      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function isIllegal(lexeme, mode) {
      return !ignore_illegals && testRe(mode.illegalRe, lexeme);
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan = '<span class="' + classPrefix,
          closeSpan = leaveOpen ? '' : spanEndTag;
      openSpan += classname + '">';
      if (!classname) return insideSpan;
      return openSpan + insideSpan + closeSpan;
    }

    function processKeywords() {
      var keyword_match, last_index, match, result;
      if (!top.keywords) return escape(mode_buffer);
      result = '';
      last_index = 0;
      top.lexemesRe.lastIndex = 0;
      match = top.lexemesRe.exec(mode_buffer);

      while (match) {
        result += escape(mode_buffer.substring(last_index, match.index));
        keyword_match = keywordMatch(top, match);

        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }

        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }

      return result + escape(mode_buffer.substr(last_index));
    }

    function processSubLanguage() {
      var explicit = typeof top.subLanguage === 'string';

      if (explicit && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }

      var result = explicit ? highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) : highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined); // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Usecase in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.

      if (top.relevance > 0) {
        relevance += result.relevance;
      }

      if (explicit) {
        continuations[top.subLanguage] = result.top;
      }

      return buildSpan(result.language, result.value, false, true);
    }

    function processBuffer() {
      result += top.subLanguage != null ? processSubLanguage() : processKeywords();
      mode_buffer = '';
    }

    function startNewMode(mode) {
      result += mode.className ? buildSpan(mode.className, '', true) : '';
      top = Object.create(mode, {
        parent: {
          value: top
        }
      });
    }

    function processLexeme(buffer, lexeme) {
      mode_buffer += buffer;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      var new_mode = subMode(lexeme, top);

      if (new_mode) {
        if (new_mode.skip) {
          mode_buffer += lexeme;
        } else {
          if (new_mode.excludeBegin) {
            mode_buffer += lexeme;
          }

          processBuffer();

          if (!new_mode.returnBegin && !new_mode.excludeBegin) {
            mode_buffer = lexeme;
          }
        }

        startNewMode(new_mode, lexeme);
        return new_mode.returnBegin ? 0 : lexeme.length;
      }

      var end_mode = endOfMode(top, lexeme);

      if (end_mode) {
        var origin = top;

        if (origin.skip) {
          mode_buffer += lexeme;
        } else {
          if (!(origin.returnEnd || origin.excludeEnd)) {
            mode_buffer += lexeme;
          }

          processBuffer();

          if (origin.excludeEnd) {
            mode_buffer = lexeme;
          }
        }

        do {
          if (top.className) {
            result += spanEndTag;
          }

          if (!top.skip && !top.subLanguage) {
            relevance += top.relevance;
          }

          top = top.parent;
        } while (top !== end_mode.parent);

        if (end_mode.starts) {
          if (end_mode.endSameAsBegin) {
            end_mode.starts.endRe = end_mode.endRe;
          }

          startNewMode(end_mode.starts, '');
        }

        return origin.returnEnd ? 0 : lexeme.length;
      }

      if (isIllegal(lexeme, top)) throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
      /*
      Parser should not reach this point as all types of lexemes should be caught
      earlier, but if it does due to some bug make sure it advances at least one
      character forward to prevent infinite looping.
      */

      mode_buffer += lexeme;
      return lexeme.length || 1;
    }

    var language = getLanguage(name);

    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages

    var result = '',
        current;

    for (current = top; current !== language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }

    var mode_buffer = '';
    var relevance = 0;

    try {
      var match,
          count,
          index = 0;

      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(value);
        if (!match) break;
        count = processLexeme(value.substring(index, match.index), match[0]);
        index = match.index + count;
      }

      processLexeme(value.substr(index));

      for (current = top; current.parent; current = current.parent) {
        // close dangling modes
        if (current.className) {
          result += spanEndTag;
        }
      }

      return {
        relevance: relevance,
        value: result,
        language: name,
        top: top
      };
    } catch (e) {
      if (e.message && e.message.indexOf('Illegal') !== -1) {
        return {
          relevance: 0,
          value: escape(value)
        };
      } else {
        throw e;
      }
    }
  }
  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:
   - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)
   */


  function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || objectKeys(languages);
    var result = {
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    languageSubset.filter(getLanguage).filter(autoDetection).forEach(function (name) {
      var current = highlight(name, text, false);
      current.language = name;

      if (current.relevance > second_best.relevance) {
        second_best = current;
      }

      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });

    if (second_best.language) {
      result.second_best = second_best;
    }

    return result;
  }
  /*
  Post-processing of the highlighted markup:
   - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers
   */


  function fixMarkup(value) {
    return !(options.tabReplace || options.useBR) ? value : value.replace(fixMarkupRe, function (match, p1) {
      if (options.useBR && match === '\n') {
        return '<br>';
      } else if (options.tabReplace) {
        return p1.replace(/\t/g, options.tabReplace);
      }

      return '';
    });
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (prevClassName.indexOf(language) === -1) {
      result.push(language);
    }

    return result.join(' ').trim();
  }
  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */


  function highlightBlock(block) {
    var node, originalStream, result, resultNode, text;
    var language = blockLanguage(block);
    if (isNotHighlighted(language)) return;

    if (options.useBR) {
      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }

    text = node.textContent;
    result = language ? highlight(language, text, true) : highlightAuto(text);
    originalStream = nodeStream(node);

    if (originalStream.length) {
      resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }

    result.value = fixMarkup(result.value);
    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };

    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }
  /*
  Updates highlight.js global options with values passed in the form of an object.
  */


  function configure(user_options) {
    options = inherit(options, user_options);
  }
  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */


  function initHighlighting() {
    if (initHighlighting.called) return;
    initHighlighting.called = true;
    var blocks = document.querySelectorAll('pre code');
    ArrayProto.forEach.call(blocks, highlightBlock);
  }
  /*
  Attaches highlighting to the page load event.
  */


  function initHighlightingOnLoad() {
    addEventListener('DOMContentLoaded', initHighlighting, false);
    addEventListener('load', initHighlighting, false);
  }

  function registerLanguage(name, language) {
    var lang = languages[name] = language(hljs);
    restoreLanguageApi(lang);

    if (lang.aliases) {
      lang.aliases.forEach(function (alias) {
        aliases[alias] = name;
      });
    }
  }

  function listLanguages() {
    return objectKeys(languages);
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  function autoDetection(name) {
    var lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }
  /* Interface definition */


  hljs.highlight = highlight;
  hljs.highlightAuto = highlightAuto;
  hljs.fixMarkup = fixMarkup;
  hljs.highlightBlock = highlightBlock;
  hljs.configure = configure;
  hljs.initHighlighting = initHighlighting;
  hljs.initHighlightingOnLoad = initHighlightingOnLoad;
  hljs.registerLanguage = registerLanguage;
  hljs.listLanguages = listLanguages;
  hljs.getLanguage = getLanguage;
  hljs.autoDetection = autoDetection;
  hljs.inherit = inherit; // Common regexps

  hljs.IDENT_RE = '[a-zA-Z]\\w*';
  hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
  hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float

  hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...

  hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~'; // Common modes

  hljs.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]',
    relevance: 0
  };
  hljs.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'',
    end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"',
    end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  };

  hljs.COMMENT = function (begin, end, inherits) {
    var mode = hljs.inherit({
      className: 'comment',
      begin: begin,
      end: end,
      contains: []
    }, inherits || {});
    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
    mode.contains.push({
      className: 'doctag',
      begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
      relevance: 0
    });
    return mode;
  };

  hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
  hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
  hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
  hljs.NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
  };
  hljs.C_NUMBER_MODE = {
    className: 'number',
    begin: hljs.C_NUMBER_RE,
    relevance: 0
  };
  hljs.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: hljs.BINARY_NUMBER_RE,
    relevance: 0
  };
  hljs.CSS_NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
    relevance: 0
  };
  hljs.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [hljs.BACKSLASH_ESCAPE, {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [hljs.BACKSLASH_ESCAPE]
    }]
  };
  hljs.TITLE_MODE = {
    className: 'title',
    begin: hljs.IDENT_RE,
    relevance: 0
  };
  hljs.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
  hljs.METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
  return hljs;
});

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * marked - a markdown parser
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
;

(function (root) {
  'use strict';
  /**
   * Block-Level Grammar
   */

  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: noop,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
    nptable: noop,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    table: noop,
    lheading: /^([^\n]+)\n {0,3}(=|-){2,} *(?:\n+|$)/,
    paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit(block.def).replace('label', block._label).replace('title', block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}\.)/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
  block.item = edit(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();
  block.list = edit(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
  block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
  block._comment = /<!--(?!-?>)[\s\S]*?-->/;
  block.html = edit(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  block.paragraph = edit(block.paragraph).replace('hr', block.hr).replace('heading', block.heading).replace('lheading', block.lheading).replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();
  block.blockquote = edit(block.blockquote).replace('paragraph', block.paragraph).getRegex();
  /**
   * Normal Block Grammar
   */

  block.normal = merge({}, block);
  /**
   * GFM Block Grammar
   */

  block.gfm = merge({}, block.normal, {
    fences: /^ {0,3}(`{3,}|~{3,})([^`\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    paragraph: /^/,
    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
  });
  block.gfm.paragraph = edit(block.paragraph).replace('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|' + block.list.source.replace('\\1', '\\3') + '|').getRegex();
  /**
   * GFM + Tables Block Grammar
   */

  block.tables = merge({}, block.gfm, {
    nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
    table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
  });
  /**
   * Pedantic grammar
   */

  block.pedantic = merge({}, block.normal, {
    html: edit('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/
  });
  /**
   * Block Lexer
   */

  function Lexer(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || marked.defaults;
    this.rules = block.normal;

    if (this.options.pedantic) {
      this.rules = block.pedantic;
    } else if (this.options.gfm) {
      if (this.options.tables) {
        this.rules = block.tables;
      } else {
        this.rules = block.gfm;
      }
    }
  }
  /**
   * Expose Block Rules
   */


  Lexer.rules = block;
  /**
   * Static Lex Method
   */

  Lexer.lex = function (src, options) {
    var lexer = new Lexer(options);
    return lexer.lex(src);
  };
  /**
   * Preprocessing
   */


  Lexer.prototype.lex = function (src) {
    src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u00a0/g, ' ').replace(/\u2424/g, '\n');
    return this.token(src, true);
  };
  /**
   * Lexing
   */


  Lexer.prototype.token = function (src, top) {
    src = src.replace(/^ +$/gm, '');
    var next, loose, cap, bull, b, item, listStart, listItems, t, space, i, tag, l, isordered, istask, ischecked;

    while (src) {
      // newline
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);

        if (cap[0].length > 1) {
          this.tokens.push({
            type: 'space'
          });
        }
      } // code


      if (cap = this.rules.code.exec(src)) {
        var lastToken = this.tokens[this.tokens.length - 1];
        src = src.substring(cap[0].length); // An indented code block cannot interrupt a paragraph.

        if (lastToken && lastToken.type === 'paragraph') {
          lastToken.text += '\n' + cap[0].trimRight();
        } else {
          cap = cap[0].replace(/^ {4}/gm, '');
          this.tokens.push({
            type: 'code',
            codeBlockStyle: 'indented',
            text: !this.options.pedantic ? rtrim(cap, '\n') : cap
          });
        }

        continue;
      } // fences (gfm)


      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'code',
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: cap[3] || ''
        });
        continue;
      } // heading


      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[1].length,
          text: cap[2]
        });
        continue;
      } // table no leading pipe (gfm)


      if (cap = this.rules.nptable.exec(src)) {
        item = {
          type: 'table',
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(item.cells[i], item.header.length);
          }

          this.tokens.push(item);
          continue;
        }
      } // hr


      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'hr'
        });
        continue;
      } // blockquote


      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'blockquote_start'
        });
        cap = cap[0].replace(/^ *> ?/gm, ''); // Pass `top` to keep the current
        // "toplevel" state. This is exactly
        // how markdown.pl works.

        this.token(cap, top);
        this.tokens.push({
          type: 'blockquote_end'
        });
        continue;
      } // list


      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
        isordered = bull.length > 1;
        listStart = {
          type: 'list_start',
          ordered: isordered,
          start: isordered ? +bull : '',
          loose: false
        };
        this.tokens.push(listStart); // Get each top-level item.

        cap = cap[0].match(this.rules.item);
        listItems = [];
        next = false;
        l = cap.length;
        i = 0;

        for (; i < l; i++) {
          item = cap[i]; // Remove the list item's bullet
          // so it is seen as the next token.

          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) */, ''); // Outdent whatever the
          // list item contains. Hacky.

          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
          } // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.


          if (i !== l - 1) {
            b = block.bullet.exec(cap[i + 1])[0];

            if (bull.length > 1 ? b.length === 1 : b.length > 1 || this.options.smartLists && b !== bull) {
              src = cap.slice(i + 1).join('\n') + src;
              i = l - 1;
            }
          } // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.


          loose = next || /\n\n(?!\s*$)/.test(item);

          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }

          if (loose) {
            listStart.loose = true;
          } // Check for task list items


          istask = /^\[[ xX]\] /.test(item);
          ischecked = undefined;

          if (istask) {
            ischecked = item[1] !== ' ';
            item = item.replace(/^\[[ xX]\] +/, '');
          }

          t = {
            type: 'list_item_start',
            task: istask,
            checked: ischecked,
            loose: loose
          };
          listItems.push(t);
          this.tokens.push(t); // Recurse.

          this.token(item, false);
          this.tokens.push({
            type: 'list_item_end'
          });
        }

        if (listStart.loose) {
          l = listItems.length;
          i = 0;

          for (; i < l; i++) {
            listItems[i].loose = true;
          }
        }

        this.tokens.push({
          type: 'list_end'
        });
        continue;
      } // html


      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize ? 'paragraph' : 'html',
          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: cap[0]
        });
        continue;
      } // def


      if (top && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        tag = cap[1].toLowerCase().replace(/\s+/g, ' ');

        if (!this.tokens.links[tag]) {
          this.tokens.links[tag] = {
            href: cap[2],
            title: cap[3]
          };
        }

        continue;
      } // table (gfm)


      if (cap = this.rules.table.exec(src)) {
        item = {
          type: 'table',
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(item.cells[i].replace(/^ *\| *| *\| *$/g, ''), item.header.length);
          }

          this.tokens.push(item);
          continue;
        }
      } // lheading


      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[2] === '=' ? 1 : 2,
          text: cap[1]
        });
        continue;
      } // top-level paragraph


      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'paragraph',
          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
        });
        continue;
      } // text


      if (cap = this.rules.text.exec(src)) {
        // Top-level should never reach here.
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'text',
          text: cap[0]
        });
        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return this.tokens;
  };
  /**
   * Inline-Level Grammar
   */


  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noop,
    tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    // CDATA section
    link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
    em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noop,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
  }; // list of punctuation marks from common mark spec
  // without ` and ] to workaround Rule 17 (inline code blocks/links)

  inline._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
  inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit(inline.tag).replace('comment', block._comment).replace('attribute', inline._attribute).getRegex();
  inline._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|`(?!`)|[^\[\]\\`])*?/;
  inline._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*)/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
  inline.reflink = edit(inline.reflink).replace('label', inline._label).getRegex();
  /**
   * Normal Inline Grammar
   */

  inline.normal = merge({}, inline);
  /**
   * Pedantic Inline Grammar
   */

  inline.pedantic = merge({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
  });
  /**
   * GFM Inline Grammar
   */

  inline.gfm = merge({}, inline.normal, {
    escape: edit(inline.escape).replace('])', '~|])').getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~+(?=\S)([\s\S]*?\S)~+/,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  });
  inline.gfm.url = edit(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
  /**
   * GFM + Line Breaks Inline Grammar
   */

  inline.breaks = merge({}, inline.gfm, {
    br: edit(inline.br).replace('{2,}', '*').getRegex(),
    text: edit(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
  });
  /**
   * Inline Lexer & Compiler
   */

  function InlineLexer(links, options) {
    this.options = options || marked.defaults;
    this.links = links;
    this.rules = inline.normal;
    this.renderer = this.options.renderer || new Renderer();
    this.renderer.options = this.options;

    if (!this.links) {
      throw new Error('Tokens array requires a `links` property.');
    }

    if (this.options.pedantic) {
      this.rules = inline.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    }
  }
  /**
   * Expose Inline Rules
   */


  InlineLexer.rules = inline;
  /**
   * Static Lexing/Compiling Method
   */

  InlineLexer.output = function (src, links, options) {
    var inline = new InlineLexer(links, options);
    return inline.output(src);
  };
  /**
   * Lexing/Compiling
   */


  InlineLexer.prototype.output = function (src) {
    var out = '',
        link,
        text,
        href,
        title,
        cap,
        prevCapZero;

    while (src) {
      // escape
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += escape(cap[1]);
        continue;
      } // tag


      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }

        if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = true;
        } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = false;
        }

        src = src.substring(cap[0].length);
        out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
        continue;
      } // link


      if (cap = this.rules.link.exec(src)) {
        var lastParenIndex = findClosingBracket(cap[2], '()');

        if (lastParenIndex > -1) {
          var linkLen = cap[0].length - (cap[2].length - lastParenIndex) - (cap[3] || '').length;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }

        src = src.substring(cap[0].length);
        this.inLink = true;
        href = cap[2];

        if (this.options.pedantic) {
          link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = '';
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }

        href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
        out += this.outputLink(cap, {
          href: InlineLexer.escapes(href),
          title: InlineLexer.escapes(title)
        });
        this.inLink = false;
        continue;
      } // reflink, nolink


      if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = this.links[link.toLowerCase()];

        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }

        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      } // strong


      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
        continue;
      } // em


      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
        continue;
      } // code


      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape(cap[2].trim(), true));
        continue;
      } // br


      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      } // del (gfm)


      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      } // autolink


      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);

        if (cap[2] === '@') {
          text = escape(this.mangle(cap[1]));
          href = 'mailto:' + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }

        out += this.renderer.link(href, null, text);
        continue;
      } // url (gfm)


      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        if (cap[2] === '@') {
          text = escape(cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);

          text = escape(cap[0]);

          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }

        src = src.substring(cap[0].length);
        out += this.renderer.link(href, null, text);
        continue;
      } // text


      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);

        if (this.inRawBlock) {
          out += this.renderer.text(cap[0]);
        } else {
          out += this.renderer.text(escape(this.smartypants(cap[0])));
        }

        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return out;
  };

  InlineLexer.escapes = function (text) {
    return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
  };
  /**
   * Compile Link
   */


  InlineLexer.prototype.outputLink = function (cap, link) {
    var href = link.href,
        title = link.title ? escape(link.title) : null;
    return cap[0].charAt(0) !== '!' ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
  };
  /**
   * Smartypants Transformations
   */


  InlineLexer.prototype.smartypants = function (text) {
    if (!this.options.smartypants) return text;
    return text // em-dashes
    .replace(/---/g, '\u2014') // en-dashes
    .replace(/--/g, '\u2013') // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018') // closing singles & apostrophes
    .replace(/'/g, '\u2019') // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c') // closing doubles
    .replace(/"/g, '\u201d') // ellipses
    .replace(/\.{3}/g, '\u2026');
  };
  /**
   * Mangle Links
   */


  InlineLexer.prototype.mangle = function (text) {
    if (!this.options.mangle) return text;
    var out = '',
        l = text.length,
        i = 0,
        ch;

    for (; i < l; i++) {
      ch = text.charCodeAt(i);

      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }

      out += '&#' + ch + ';';
    }

    return out;
  };
  /**
   * Renderer
   */


  function Renderer(options) {
    this.options = options || marked.defaults;
  }

  Renderer.prototype.code = function (code, infostring, escaped) {
    var lang = (infostring || '').match(/\S*/)[0];

    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);

      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return '<pre><code>' + (escaped ? code : escape(code, true)) + '</code></pre>';
    }

    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '</code></pre>\n';
  };

  Renderer.prototype.blockquote = function (quote) {
    return '<blockquote>\n' + quote + '</blockquote>\n';
  };

  Renderer.prototype.html = function (html) {
    return html;
  };

  Renderer.prototype.heading = function (text, level, raw, slugger) {
    if (this.options.headerIds) {
      return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n';
    } // ignore IDs


    return '<h' + level + '>' + text + '</h' + level + '>\n';
  };

  Renderer.prototype.hr = function () {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  };

  Renderer.prototype.list = function (body, ordered, start) {
    var type = ordered ? 'ol' : 'ul',
        startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  };

  Renderer.prototype.listitem = function (text) {
    return '<li>' + text + '</li>\n';
  };

  Renderer.prototype.checkbox = function (checked) {
    return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
  };

  Renderer.prototype.paragraph = function (text) {
    return '<p>' + text + '</p>\n';
  };

  Renderer.prototype.table = function (header, body) {
    if (body) body = '<tbody>' + body + '</tbody>';
    return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
  };

  Renderer.prototype.tablerow = function (content) {
    return '<tr>\n' + content + '</tr>\n';
  };

  Renderer.prototype.tablecell = function (content, flags) {
    var type = flags.header ? 'th' : 'td';
    var tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  }; // span level renderer


  Renderer.prototype.strong = function (text) {
    return '<strong>' + text + '</strong>';
  };

  Renderer.prototype.em = function (text) {
    return '<em>' + text + '</em>';
  };

  Renderer.prototype.codespan = function (text) {
    return '<code>' + text + '</code>';
  };

  Renderer.prototype.br = function () {
    return this.options.xhtml ? '<br/>' : '<br>';
  };

  Renderer.prototype.del = function (text) {
    return '<del>' + text + '</del>';
  };

  Renderer.prototype.link = function (href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);

    if (href === null) {
      return text;
    }

    var out = '<a href="' + escape(href) + '"';

    if (title) {
      out += ' title="' + title + '"';
    }

    out += '>' + text + '</a>';
    return out;
  };

  Renderer.prototype.image = function (href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);

    if (href === null) {
      return text;
    }

    var out = '<img src="' + href + '" alt="' + text + '"';

    if (title) {
      out += ' title="' + title + '"';
    }

    out += this.options.xhtml ? '/>' : '>';
    return out;
  };

  Renderer.prototype.text = function (text) {
    return text;
  };
  /**
   * TextRenderer
   * returns only the textual part of the token
   */


  function TextRenderer() {} // no need for block level renderers


  TextRenderer.prototype.strong = TextRenderer.prototype.em = TextRenderer.prototype.codespan = TextRenderer.prototype.del = TextRenderer.prototype.text = function (text) {
    return text;
  };

  TextRenderer.prototype.link = TextRenderer.prototype.image = function (href, title, text) {
    return '' + text;
  };

  TextRenderer.prototype.br = function () {
    return '';
  };
  /**
   * Parsing & Compiling
   */


  function Parser(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || marked.defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.slugger = new Slugger();
  }
  /**
   * Static Parse Method
   */


  Parser.parse = function (src, options) {
    var parser = new Parser(options);
    return parser.parse(src);
  };
  /**
   * Parse Loop
   */


  Parser.prototype.parse = function (src) {
    this.inline = new InlineLexer(src.links, this.options); // use an InlineLexer with a TextRenderer to extract pure text

    this.inlineText = new InlineLexer(src.links, merge({}, this.options, {
      renderer: new TextRenderer()
    }));
    this.tokens = src.reverse();
    var out = '';

    while (this.next()) {
      out += this.tok();
    }

    return out;
  };
  /**
   * Next Token
   */


  Parser.prototype.next = function () {
    this.token = this.tokens.pop();
    return this.token;
  };
  /**
   * Preview Next Token
   */


  Parser.prototype.peek = function () {
    return this.tokens[this.tokens.length - 1] || 0;
  };
  /**
   * Parse Text Tokens
   */


  Parser.prototype.parseText = function () {
    var body = this.token.text;

    while (this.peek().type === 'text') {
      body += '\n' + this.next().text;
    }

    return this.inline.output(body);
  };
  /**
   * Parse Current Token
   */


  Parser.prototype.tok = function () {
    switch (this.token.type) {
      case 'space':
        {
          return '';
        }

      case 'hr':
        {
          return this.renderer.hr();
        }

      case 'heading':
        {
          return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, unescape(this.inlineText.output(this.token.text)), this.slugger);
        }

      case 'code':
        {
          return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
        }

      case 'table':
        {
          var header = '',
              body = '',
              i,
              row,
              cell,
              j; // header

          cell = '';

          for (i = 0; i < this.token.header.length; i++) {
            cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), {
              header: true,
              align: this.token.align[i]
            });
          }

          header += this.renderer.tablerow(cell);

          for (i = 0; i < this.token.cells.length; i++) {
            row = this.token.cells[i];
            cell = '';

            for (j = 0; j < row.length; j++) {
              cell += this.renderer.tablecell(this.inline.output(row[j]), {
                header: false,
                align: this.token.align[j]
              });
            }

            body += this.renderer.tablerow(cell);
          }

          return this.renderer.table(header, body);
        }

      case 'blockquote_start':
        {
          body = '';

          while (this.next().type !== 'blockquote_end') {
            body += this.tok();
          }

          return this.renderer.blockquote(body);
        }

      case 'list_start':
        {
          body = '';
          var ordered = this.token.ordered,
              start = this.token.start;

          while (this.next().type !== 'list_end') {
            body += this.tok();
          }

          return this.renderer.list(body, ordered, start);
        }

      case 'list_item_start':
        {
          body = '';
          var loose = this.token.loose;
          var checked = this.token.checked;
          var task = this.token.task;

          if (this.token.task) {
            body += this.renderer.checkbox(checked);
          }

          while (this.next().type !== 'list_item_end') {
            body += !loose && this.token.type === 'text' ? this.parseText() : this.tok();
          }

          return this.renderer.listitem(body, task, checked);
        }

      case 'html':
        {
          // TODO parse inline content if parameter markdown=1
          return this.renderer.html(this.token.text);
        }

      case 'paragraph':
        {
          return this.renderer.paragraph(this.inline.output(this.token.text));
        }

      case 'text':
        {
          return this.renderer.paragraph(this.parseText());
        }

      default:
        {
          var errMsg = 'Token with "' + this.token.type + '" type was not found.';

          if (this.options.silent) {
            console.log(errMsg);
          } else {
            throw new Error(errMsg);
          }
        }
    }
  };
  /**
   * Slugger generates header id
   */


  function Slugger() {
    this.seen = {};
  }
  /**
   * Convert string to unique id
   */


  Slugger.prototype.slug = function (value) {
    var slug = value.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');

    if (this.seen.hasOwnProperty(slug)) {
      var originalSlug = slug;

      do {
        this.seen[originalSlug]++;
        slug = originalSlug + '-' + this.seen[originalSlug];
      } while (this.seen.hasOwnProperty(slug));
    }

    this.seen[slug] = 0;
    return slug;
  };
  /**
   * Helpers
   */


  function escape(html, encode) {
    if (encode) {
      if (escape.escapeTest.test(html)) {
        return html.replace(escape.escapeReplace, function (ch) {
          return escape.replacements[ch];
        });
      }
    } else {
      if (escape.escapeTestNoEncode.test(html)) {
        return html.replace(escape.escapeReplaceNoEncode, function (ch) {
          return escape.replacements[ch];
        });
      }
    }

    return html;
  }

  escape.escapeTest = /[&<>"']/;
  escape.escapeReplace = /[&<>"']/g;
  escape.replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

  function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function (_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';

      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }

      return '';
    });
  }

  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || '';
    return {
      replace: function (name, val) {
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, '$1');
        regex = regex.replace(name, val);
        return this;
      },
      getRegex: function () {
        return new RegExp(regex, opt);
      }
    };
  }

  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, '').toLowerCase();
      } catch (e) {
        return null;
      }

      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
        return null;
      }
    }

    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }

    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }

    return href;
  }

  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (/^[^:]+:\/*[^/]*$/.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim(base, '/', true);
      }
    }

    base = baseUrls[' ' + base];

    if (href.slice(0, 2) === '//') {
      return base.replace(/:[\s\S]*/, ':') + href;
    } else if (href.charAt(0) === '/') {
      return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
    } else {
      return base + href;
    }
  }

  var baseUrls = {};
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  function noop() {}

  noop.exec = noop;

  function merge(obj) {
    var i = 1,
        target,
        key;

    for (; i < arguments.length; i++) {
      target = arguments[i];

      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }

    return obj;
  }

  function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    var row = tableRow.replace(/\|/g, function (match, offset, str) {
      var escaped = false,
          curr = offset;

      while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;

      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
        cells = row.split(/ \|/),
        i = 0;

    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) cells.push('');
    }

    for (; i < cells.length; i++) {
      // leading or trailing whitespace is ignored per the gfm spec
      cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }

    return cells;
  } // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.


  function rtrim(str, c, invert) {
    if (str.length === 0) {
      return '';
    } // Length of suffix matching the invert condition.


    var suffLen = 0; // Step left until we fail to match the invert condition.

    while (suffLen < str.length) {
      var currChar = str.charAt(str.length - suffLen - 1);

      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, str.length - suffLen);
  }

  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }

    var level = 0;

    for (var i = 0; i < str.length; i++) {
      if (str[i] === '\\') {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;

        if (level < 0) {
          return i;
        }
      }
    }

    return -1;
  }
  /**
   * Marked
   */


  function marked(src, opt, callback) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked(): input parameter is undefined or null');
    }

    if (typeof src !== 'string') {
      throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }

    if (callback || typeof opt === 'function') {
      if (!callback) {
        callback = opt;
        opt = null;
      }

      opt = merge({}, marked.defaults, opt || {});
      var highlight = opt.highlight,
          tokens,
          pending,
          i = 0;

      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }

      pending = tokens.length;

      var done = function (err) {
        if (err) {
          opt.highlight = highlight;
          return callback(err);
        }

        var out;

        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }

        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return done();
      }

      delete opt.highlight;
      if (!pending) return done();

      for (; i < tokens.length; i++) {
        (function (token) {
          if (token.type !== 'code') {
            return --pending || done();
          }

          return highlight(token.text, token.lang, function (err, code) {
            if (err) return done(err);

            if (code == null || code === token.text) {
              return --pending || done();
            }

            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }

      return;
    }

    try {
      if (opt) opt = merge({}, marked.defaults, opt);
      return Parser.parse(Lexer.lex(src, opt), opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';

      if ((opt || marked.defaults).silent) {
        return '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
      }

      throw e;
    }
  }
  /**
   * Options
   */


  marked.options = marked.setOptions = function (opt) {
    merge(marked.defaults, opt);
    return marked;
  };

  marked.getDefaults = function () {
    return {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      highlight: null,
      langPrefix: 'language-',
      mangle: true,
      pedantic: false,
      renderer: new Renderer(),
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tables: true,
      xhtml: false
    };
  };

  marked.defaults = marked.getDefaults();
  /**
   * Expose
   */

  marked.Parser = Parser;
  marked.parser = Parser.parse;
  marked.Renderer = Renderer;
  marked.TextRenderer = TextRenderer;
  marked.Lexer = Lexer;
  marked.lexer = Lexer.lex;
  marked.InlineLexer = InlineLexer;
  marked.inlineLexer = InlineLexer.output;
  marked.Slugger = Slugger;
  marked.parse = marked;

  if (true) {
    module.exports = marked;
  } else {}
})(this || (typeof window !== 'undefined' ? window : global));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.1.1
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({
      beforeCreate: vuexInit
    });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;

    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;

      _init.call(this, options);
    };
  }
  /**
   * Vuex init hook, injected into each instances init hooks list.
   */


  function vuexInit() {
    var options = this.$options; // store injection

    if (options.store) {
      this.$store = typeof options.store === 'function' ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {
    return;
  }

  store._devtoolHook = devtoolHook;
  devtoolHook.emit('vuex:init', store);
  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });
  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */


function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}

function partial(fn, arg) {
  return function () {
    return fn(arg);
  };
} // Base data struct for store's module, package with some attribute and method


var Module = function Module(rawModule, runtime) {
  this.runtime = runtime; // Store some children item

  this._children = Object.create(null); // Store the origin module object which passed by programmer

  this._rawModule = rawModule;
  var rawState = rawModule.state; // Store the origin module's state

  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = {
  namespaced: {
    configurable: true
  }
};

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;

  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }

  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }

  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  if (false) {}

  var newModule = new Module(rawModule, runtime);

  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  } // register nested modules


  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (!parent.getChild(key).runtime) {
    return;
  }

  parent.removeChild(key);
};

function update(path, targetModule, newModule) {
  if (false) {} // update target module


  targetModule.update(newModule); // update nested modules

  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (false) {}

        return;
      }

      update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var functionAssert = {
  assert: function (value) {
    return typeof value === 'function';
  },
  expected: 'function'
};
var objectAssert = {
  assert: function (value) {
    return typeof value === 'function' || typeof value === 'object' && typeof value.handler === 'function';
  },
  expected: 'function or object with "handler" function'
};
var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) {
      return;
    }

    var assertOptions = assertTypes[key];
    forEachValue(rawModule[key], function (value, type) {
      assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
    });
  });
}

function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";

  if (path.length > 0) {
    buf += " in module \"" + path.join('.') + "\"";
  }

  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {}; // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731

  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (false) {}

  var plugins = options.plugins;
  if (plugins === void 0) plugins = [];
  var strict = options.strict;
  if (strict === void 0) strict = false; // store internal state

  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue(); // bind commit and dispatch to self

  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;

  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };

  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  }; // strict mode


  this.strict = strict;
  var state = this._modules.root.state; // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters

  installModule(this, state, [], this._modules.root); // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)

  resetStoreVM(this, state); // apply plugins

  plugins.forEach(function (plugin) {
    return plugin(this$1);
  });
  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;

  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = {
  state: {
    configurable: true
  }
};

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors$1.state.set = function (v) {
  if (false) {}
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this; // check object-style commit

  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;
  var mutation = {
    type: type,
    payload: payload
  };
  var entry = this._mutations[type];

  if (!entry) {
    if (false) {}

    return;
  }

  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });

  this._subscribers.forEach(function (sub) {
    return sub(mutation, this$1.state);
  });

  if (false) {}
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1 = this; // check object-style dispatch

  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;
  var action = {
    type: type,
    payload: payload
  };
  var entry = this._actions[type];

  if (!entry) {
    if (false) {}

    return;
  }

  try {
    this._actionSubscribers.filter(function (sub) {
      return sub.before;
    }).forEach(function (sub) {
      return sub.before(action, this$1.state);
    });
  } catch (e) {
    if (false) {}
  }

  var result = entry.length > 1 ? Promise.all(entry.map(function (handler) {
    return handler(payload);
  })) : entry[0](payload);
  return result.then(function (res) {
    try {
      this$1._actionSubscribers.filter(function (sub) {
        return sub.after;
      }).forEach(function (sub) {
        return sub.after(action, this$1.state);
      });
    } catch (e) {
      if (false) {}
    }

    return res;
  });
};

Store.prototype.subscribe = function subscribe(fn) {
  return genericSubscribe(fn, this._subscribers);
};

Store.prototype.subscribeAction = function subscribeAction(fn) {
  var subs = typeof fn === 'function' ? {
    before: fn
  } : fn;
  return genericSubscribe(subs, this._actionSubscribers);
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  if (false) {}

  return this._watcherVM.$watch(function () {
    return getter(this$1.state, this$1.getters);
  }, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};

  if (typeof path === 'string') {
    path = [path];
  }

  if (false) {}

  this._modules.register(path, rawModule);

  installModule(this, this.state, path, this._modules.get(path), options.preserveState); // reset store to update getters...

  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {
    path = [path];
  }

  if (false) {}

  this._modules.unregister(path);

  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });

  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);

  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors$1);

function genericSubscribe(fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }

  return function () {
    var i = subs.indexOf(fn);

    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state; // init all modules

  installModule(store, state, [], store._modules.root, true); // reset vm

  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm; // bind store public getters

  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure enviroment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () {
        return store._vm[key];
      },
      enumerable: true // for local getters

    });
  }); // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins

  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent; // enable strict mode for new vm

  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }

    Vue.nextTick(function () {
      return oldVm.$destroy();
    });
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;

  var namespace = store._modules.getNamespace(path); // register in namespace map


  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  } // set state


  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];

    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);
  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });
  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */


function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';
  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;

        if (false) {}
      }

      return store.dispatch(type, payload);
    },
    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;

        if (false) {}
      }

      store.commit(type, payload, options);
    }
  }; // getters and state object must be gotten lazily
  // because they will be changed by vm update

  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function () {
        return store.getters;
      } : function () {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function () {
        return getNestedState(store.state, path);
      }
    }
  });
  return local;
}

function makeLocalGetters(store, namespace) {
  var gettersProxy = {};
  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) {
      return;
    } // extract local getter type


    var localType = type.slice(splitPos); // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.

    Object.defineProperty(gettersProxy, localType, {
      get: function () {
        return store.getters[type];
      },
      enumerable: true
    });
  });
  return gettersProxy;
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);

    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }

    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);

        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (false) {}

    return;
  }

  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {
    return this._data.$$state;
  }, function () {
    if (false) {}
  }, {
    deep: true,
    sync: true
  });
}

function getNestedState(state, path) {
  return path.length ? path.reduce(function (state, key) {
    return state[key];
  }, state) : state;
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (false) {}

  return {
    type: type,
    payload: payload,
    options: options
  };
}

function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (false) {}

    return;
  }

  Vue = _Vue;
  applyMixin(Vue);
}
/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */


var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);

        if (!module) {
          return;
        }

        state = module.context.state;
        getters = module.context.getters;
      }

      return typeof val === 'function' ? val.call(this, state, getters) : state[val];
    }; // mark vuex getter for devtools


    res[key].vuex = true;
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation() {
      var args = [],
          len = arguments.length;

      while (len--) args[len] = arguments[len]; // Get the commit method from store


      var commit = this.$store.commit;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);

        if (!module) {
          return;
        }

        commit = module.context.commit;
      }

      return typeof val === 'function' ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val; // The namespace has been mutated by normalizeNamespace

    val = namespace + val;

    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }

      if (false) {}

      return this.$store.getters[val];
    }; // mark vuex getter for devtools


    res[key].vuex = true;
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction() {
      var args = [],
          len = arguments.length;

      while (len--) args[len] = arguments[len]; // get dispatch function from store


      var dispatch = this.$store.dispatch;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);

        if (!module) {
          return;
        }

        dispatch = module.context.dispatch;
      }

      return typeof val === 'function' ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */

var createNamespacedHelpers = function (namespace) {
  return {
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace)
  };
};
/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */


function normalizeMap(map) {
  return Array.isArray(map) ? map.map(function (key) {
    return {
      key: key,
      val: key
    };
  }) : Object.keys(map).map(function (key) {
    return {
      key: key,
      val: map[key]
    };
  });
}
/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */


function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }

    return fn(namespace, map);
  };
}
/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */


function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];

  if (false) {}

  return module;
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};
/* harmony default export */ __webpack_exports__["a"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
  * vue-router v3.1.2
  * (c) 2019 Evan You
  * @license MIT
  */

/*  */
function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if (false) {}
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

function isExtendedError(constructor, err) {
  return err instanceof constructor || // _name is to support IE9 too
  err && (err.name === constructor.name || err._name === constructor._name);
}

function extend(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }

  return a;
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data; // used by devtools to display a router-view badge

    data.routerView = true; // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots

    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {}); // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.

    var depth = 0;
    var inactive = false;

    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;

      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }

        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }

      parent = parent.$parent;
    }

    data.routerViewDepth = depth; // render previous view if the tree is inactive and kept-alive

    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth]; // render empty node if no matched route

    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name]; // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks

    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];

      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    } // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;

    (data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    }; // register instance in init hook
    // in case kept-alive component be actived when routes changed


    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive && vnode.componentInstance && vnode.componentInstance !== matched.instances[name]) {
        matched.instances[name] = vnode.componentInstance;
      }
    }; // resolve props


    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);

    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass); // pass non-declared props as attrs

      var attrs = data.attrs = data.attrs || {};

      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config) {
    case 'undefined':
      return;

    case 'object':
      return config;

    case 'function':
      return config(route);

    case 'boolean':
      return config ? route.params : undefined;

    default:
      if (false) {}

  }
}
/*  */


var encodeReserveRE = /[!'()*]/g;

var encodeReserveReplacer = function (c) {
  return '%' + c.charCodeAt(0).toString(16);
};

var commaRE = /%2C/g; // fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas

var encode = function (str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};
  var parse = _parseQuery || parseQuery;
  var parsedQuery;

  try {
    parsedQuery = parse(query || '');
  } catch (e) {
     false && false;
    parsedQuery = {};
  }

  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }

  return parsedQuery;
}

function parseQuery(query) {
  var res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}
/*  */


var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var query = location.query || {};

  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };

  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }

  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === 'object') {
    var res = {};

    for (var key in value) {
      res[key] = clone(value[key]);
    }

    return res;
  } else {
    return value;
  }
} // the starting route that represents the initial state


var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];

  while (record) {
    res.unshift(record);
    record = record.parent;
  }

  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;
  if (query === void 0) query = {};
  var hash = ref.hash;
  if (hash === void 0) hash = '';
  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {}; // handle null value #1566

  if (!a || !b) {
    return a === b;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key]; // check nested equality

    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal);
    }

    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }

  return true;
}
/*  */


function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);

  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/'); // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)

  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  } // resolve relative path


  var segments = relative.replace(/^\//, '').split('/');

  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];

    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  } // ensure leading slash


  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';
  var hashIndex = path.indexOf('#');

  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');

  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};
/**
 * Expose `pathToRegexp`.
 */


var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */


function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter; // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".

  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path,
    /** @type {!Array} */
    keys);
  }

  if (isarray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path,
    /** @type {!Array} */
    keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path,
  /** @type {!Array} */
  keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
/*  */
// $flow-disable-line

var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  params = params || {};

  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path)); // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}

    if (params.pathMatch) {
      params[0] = params.pathMatch;
    }

    return filler(params, {
      pretty: true
    });
  } catch (e) {
    if (false) {}

    return '';
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}
/*  */


function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? {
    path: raw
  } : raw; // named target

  if (next._normalized) {
    return next;
  } else if (next.name) {
    return extend({}, raw);
  } // relative params


  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);

    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if (false) {}

    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;
  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);
  var hash = next.hash || parsedPath.hash;

  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}
/*  */
// work around weird flow bug


var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;
    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass; // Support global empty active class

    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = route.redirectedFrom ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router) : route;
    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = {
      click: guardEvent
    };

    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };
    var scopedSlot = !this.$scopedSlots.$hasNormal && this.$scopedSlots.default && this.$scopedSlots.default({
      href: href,
      route: route,
      navigate: handler,
      isActive: classes[activeClass],
      isExactActive: classes[exactActiveClass]
    });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0];
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (false) {}

        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot);
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = {
        href: href
      };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);

      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  } // don't redirect when preventDefault called


  if (e.defaultPrevented) {
    return;
  } // don't redirect on right click


  if (e.button !== undefined && e.button !== 0) {
    return;
  } // don't redirect if `target="_blank"`


  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');

    if (/\b_blank\b/i.test(target)) {
      return;
    }
  } // this may be a Weex event which doesn't have this method


  if (e.preventDefault) {
    e.preventDefault();
  }

  return true;
}

function findAnchor(children) {
  if (children) {
    var child;

    for (var i = 0; i < children.length; i++) {
      child = children[i];

      if (child.tag === 'a') {
        return child;
      }

      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }

  install.installed = true;
  _Vue = Vue;

  var isDef = function (v) {
    return v !== undefined;
  };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;

    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;

        this._router.init(this);

        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }

      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });
  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);
  var strats = Vue.config.optionMergeStrategies; // use the same hook merging strategy for route hooks

  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}
/*  */


var inBrowser = typeof window !== 'undefined';
/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || []; // $flow-disable-line

  var pathMap = oldPathMap || Object.create(null); // $flow-disable-line

  var nameMap = oldNameMap || Object.create(null);
  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  }); // ensure wildcard routes are always at the end

  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;

  if (false) {}

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || {
      default: route.component
    },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : {
      default: route.props
    }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (false) {}

    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];

    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];

      if (false) {}

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (false) {}
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);

  if (false) { var keys; }

  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }

  if (path[0] === '/') {
    return path;
  }

  if (parent == null) {
    return path;
  }

  return cleanPath(parent.path + "/" + path);
}
/*  */


function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];

      if (false) {}

      if (!record) {
        return _createRoute(null, location);
      }

      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
      return _createRoute(record, location, redirectedFrom);
    } else if (location.path) {
      location.params = {};

      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];

        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    } // no match


    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = {
        path: redirect
      };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (false) {}

      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];

      if (false) {}

      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record); // 2. resolve params

      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\""); // 3. rematch with existing query and hash

      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if (false) {}

      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });

    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }

    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }

    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }

    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];

    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}
/*  */


var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({
    key: getStateKey()
  }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();

    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;

  if (!behavior) {
    return;
  }

  if (false) {} // wait until re-render finishes before scrolling


  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(router, to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if (false) {}
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();

  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();

  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition(shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';

  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
    ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
    : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}
/*  */


var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}(); // use User Timing api (if present) for more accurate key precision


var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition(); // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls

  var history = window.history;

  try {
    if (replace) {
      history.replaceState({
        key: _key
      }, '', url);
    } else {
      _key = genKey();
      history.pushState({
        key: _key
      }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}
/*  */


function runQueue(queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };

  step(0);
}
/*  */


function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;
    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;
        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          } // save resolved on async factory in case it's used elsewhere


          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;

          if (pending <= 0) {
            next();
          }
        });
        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
           false && false;

          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });
        var res;

        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }

        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;

            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
} // in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.


function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    if (called) {
      return;
    }

    called = true;
    return fn.apply(this, args);
  };
}

var NavigationDuplicated =
/*@__PURE__*/
function (Error) {
  function NavigationDuplicated() {
    Error.call(this, 'Navigating to current location is not allowed');
    this.name = this._name = 'NavigationDuplicated';
  }

  if (Error) NavigationDuplicated.__proto__ = Error;
  NavigationDuplicated.prototype = Object.create(Error && Error.prototype);
  NavigationDuplicated.prototype.constructor = NavigationDuplicated;
  return NavigationDuplicated;
}(Error); // support IE9


NavigationDuplicated._name = 'NavigationDuplicated';
/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base); // start with a route object that stands for "nowhere"

  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);

    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;
  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL(); // fire ready cbs once

    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }

    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;
  var current = this.current;

  var abort = function (err) {
    // after merging https://github.com/vuejs/vue-router/pull/2771 we
    // When the user navigates through history through back/forward buttons
    // we do not want to throw the error. We only throw it if directly calling
    // push/replace. That's why it's not included in isError
    if (!isExtendedError(NavigationDuplicated, err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }

    onAbort && onAbort(err);
  };

  if (isSameRoute(route, current) && // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort(new NavigationDuplicated(route));
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;
  var queue = [].concat( // in-component leave guards
  extractLeaveGuards(deactivated), // global before hooks
  this.router.beforeHooks, // in-component update hooks
  extractUpdateHooks(updated), // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }), // async components
  resolveAsyncComponents(activated));
  this.pending = route;

  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }

    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || typeof to === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();

          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];

    var isValid = function () {
      return this$1.current === route;
    }; // wait until async components are resolved before
    // extracting in-component enter guards


    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }

      this$1.pending = null;
      onComplete(route);

      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/'; // strip full URL origin

      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  } // make sure there's the starting slash


  if (base.charAt(0) !== '/') {
    base = '/' + base;
  } // remove trailing slash


  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);

  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }

  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);

    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }

  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }

      next(cb);
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key] && !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
      cb(instances[key]);
    } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}
/*  */


var HTML5History =
/*@__PURE__*/
function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;
    History$$1.call(this, router, base);
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current; // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.

      var location = getLocation(this$1.base);

      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = decodeURI(window.location.pathname);

  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }

  return (path || '/') + window.location.search + window.location.hash;
}
/*  */


var HashHistory =
/*@__PURE__*/
function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base); // check history fallback deeplinking

    if (fallback && checkFallback(this.base)) {
      return;
    }

    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory; // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early

  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;
    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;

      if (!ensureSlash()) {
        return;
      }

      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }

        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;

    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);

  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();

  if (path.charAt(0) === '/') {
    return true;
  }

  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#'); // empty path

  if (index < 0) {
    return '';
  }

  href = href.slice(index + 1); // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708

  var searchIndex = href.indexOf('?');

  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');

    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else {
      href = decodeURI(href);
    }
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
  }

  return href;
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}
/*  */


var AbstractHistory =
/*@__PURE__*/
function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;
    var targetIndex = this.index + n;

    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }

    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    }, function (err) {
      if (isExtendedError(NavigationDuplicated, err)) {
        this$1.index = targetIndex;
      }
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {// noop
  };

  return AbstractHistory;
}(History);
/*  */


var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};
  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);
  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;

  if (this.fallback) {
    mode = 'hash';
  }

  if (!inBrowser) {
    mode = 'abstract';
  }

  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;

    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;

    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;

    default:
      if (false) {}

  }
};

var prototypeAccessors = {
  currentRoute: {
    configurable: true
  }
};

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app
/* Vue component instance */
) {
  var this$1 = this;
   false && false;
  this.apps.push(app); // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639

  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);

    if (index > -1) {
      this$1.apps.splice(index, 1);
    } // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused


    if (this$1.app === app) {
      this$1.app = this$1.apps[0] || null;
    }
  }); // main app previously initialized
  // return as we don't need to set up new history listener

  if (this.app) {
    return;
  }

  this.app = app;
  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };

    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  var this$1 = this; // $flow-disable-line

  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    });
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  var this$1 = this; // $flow-disable-line

  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    });
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;

  if (!route) {
    return [];
  }

  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  current = current || this.history.current;
  var location = normalizeLocation(to, current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);

  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);

    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.1.2';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

module.exports = function (hljs) {
  var IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var KEYWORDS = {
    keyword: 'in of if for while finally var new function do return void else break catch ' + 'instanceof with throw case default try this switch continue typeof delete ' + 'let yield const export super debugger as async await static ' + // ECMAScript 6 modules import
    'import from as',
    literal: 'true false null undefined NaN Infinity',
    built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' + 'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' + 'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' + 'TypeError URIError Number Math Date String RegExp Array Float32Array ' + 'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' + 'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' + 'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' + 'Promise'
  };
  var NUMBER = {
    className: 'number',
    variants: [{
      begin: '\\b(0[bB][01]+)'
    }, {
      begin: '\\b(0[oO][0-7]+)'
    }, {
      begin: hljs.C_NUMBER_RE
    }],
    relevance: 0
  };
  var SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS,
    contains: [] // defined later

  };
  var TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST]
  };
  SUBST.contains = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, TEMPLATE_STRING, NUMBER, hljs.REGEXP_MODE];
  var PARAMS_CONTAINS = SUBST.contains.concat([hljs.C_BLOCK_COMMENT_MODE, hljs.C_LINE_COMMENT_MODE]);
  return {
    aliases: ['js', 'jsx'],
    keywords: KEYWORDS,
    contains: [{
      className: 'meta',
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    }, {
      className: 'meta',
      begin: /^#!/,
      end: /$/
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, TEMPLATE_STRING, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, NUMBER, {
      // object attr container
      begin: /[{,]\s*/,
      relevance: 0,
      contains: [{
        begin: IDENT_RE + '\\s*:',
        returnBegin: true,
        relevance: 0,
        contains: [{
          className: 'attr',
          begin: IDENT_RE,
          relevance: 0
        }]
      }]
    }, {
      // "value" container
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.REGEXP_MODE, {
        className: 'function',
        begin: '(\\(.*?\\)|' + IDENT_RE + ')\\s*=>',
        returnBegin: true,
        end: '\\s*=>',
        contains: [{
          className: 'params',
          variants: [{
            begin: IDENT_RE
          }, {
            begin: /\(\s*\)/
          }, {
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            contains: PARAMS_CONTAINS
          }]
        }]
      }, {
        className: '',
        begin: /\s/,
        end: /\s*/,
        skip: true
      }, {
        // E4X / JSX
        begin: /</,
        end: /(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,
        subLanguage: 'xml',
        contains: [{
          begin: /<[A-Za-z0-9\\._:-]+\s*\/>/,
          skip: true
        }, {
          begin: /<[A-Za-z0-9\\._:-]+/,
          end: /(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,
          skip: true,
          contains: [{
            begin: /<[A-Za-z0-9\\._:-]+\s*\/>/,
            skip: true
          }, 'self']
        }]
      }],
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'function',
      end: /\{/,
      excludeEnd: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {
        begin: IDENT_RE
      }), {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        contains: PARAMS_CONTAINS
      }],
      illegal: /\[|%/
    }, {
      begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`

    }, hljs.METHOD_GUARD, {
      // ES6 class
      className: 'class',
      beginKeywords: 'class',
      end: /[{;=]/,
      excludeEnd: true,
      illegal: /[:"\[\]]/,
      contains: [{
        beginKeywords: 'extends'
      }, hljs.UNDERSCORE_TITLE_MODE]
    }, {
      beginKeywords: 'constructor get set',
      end: /\{/,
      excludeEnd: true
    }],
    illegal: /#(?!!)/
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var RULE = {
    begin: /[A-Z\_\.\-]+\s*:/,
    returnBegin: true,
    end: ';',
    endsWithParent: true,
    contains: [{
      className: 'attribute',
      begin: /\S/,
      end: ':',
      excludeEnd: true,
      starts: {
        endsWithParent: true,
        excludeEnd: true,
        contains: [{
          begin: /[\w-]+\(/,
          returnBegin: true,
          contains: [{
            className: 'built_in',
            begin: /[\w-]+/
          }, {
            begin: /\(/,
            end: /\)/,
            contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
          }]
        }, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, {
          className: 'number',
          begin: '#[0-9A-Fa-f]+'
        }, {
          className: 'meta',
          begin: '!important'
        }]
      }
    }]
  };
  return {
    case_insensitive: true,
    illegal: /[=\/|'\$]/,
    contains: [hljs.C_BLOCK_COMMENT_MODE, {
      className: 'selector-id',
      begin: /#[A-Za-z0-9_-]+/
    }, {
      className: 'selector-class',
      begin: /\.[A-Za-z0-9_-]+/
    }, {
      className: 'selector-attr',
      begin: /\[/,
      end: /\]/,
      illegal: '$'
    }, {
      className: 'selector-pseudo',
      begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
    }, {
      begin: '@(font-face|page)',
      lexemes: '[a-z-]+',
      keywords: 'font-face page'
    }, {
      begin: '@',
      end: '[{;]',
      // at_rule eating first "{" is a good thing
      // because it doesn’t let it to be parsed as
      // a rule set but instead drops parser into
      // the default mode which is how it should be.
      illegal: /:/,
      // break on Less variables @var: ...
      contains: [{
        className: 'keyword',
        begin: /\w+/
      }, {
        begin: /\s/,
        endsWithParent: true,
        excludeEnd: true,
        relevance: 0,
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.CSS_NUMBER_MODE]
      }]
    }, {
      className: 'selector-tag',
      begin: IDENT_RE,
      relevance: 0
    }, {
      begin: '{',
      end: '}',
      illegal: /\S/,
      contains: [hljs.C_BLOCK_COMMENT_MODE, RULE]
    }]
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (hljs) {
  var VAR = {
    className: 'variable',
    variants: [{
      begin: /\$[\w\d#@][\w\d_]*/
    }, {
      begin: /\$\{(.*?)}/
    }]
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, VAR, {
      className: 'variable',
      begin: /\$\(/,
      end: /\)/,
      contains: [hljs.BACKSLASH_ESCAPE]
    }]
  };
  var ESCAPED_QUOTE = {
    className: '',
    begin: /\\"/
  };
  var APOS_STRING = {
    className: 'string',
    begin: /'/,
    end: /'/
  };
  return {
    aliases: ['sh', 'zsh'],
    lexemes: /\b-?[a-z\._]+\b/,
    keywords: {
      keyword: 'if then else elif fi for while in do done case esac function',
      literal: 'true false',
      built_in: // Shell built-ins
      // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
      'break cd continue eval exec exit export getopts hash pwd readonly return shift test times ' + 'trap umask unset ' + // Bash built-ins
      'alias bind builtin caller command declare echo enable help let local logout mapfile printf ' + 'read readarray source type typeset ulimit unalias ' + // Shell modifiers
      'set shopt ' + // Zsh built-ins
      'autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles ' + 'compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate ' + 'fc fg float functions getcap getln history integer jobs kill limit log noglob popd print ' + 'pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit ' + 'unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof ' + 'zpty zregexparse zsocket zstyle ztcp',
      _: '-ne -eq -lt -gt -f -d -e -s -l -a' // relevance booster

    },
    contains: [{
      className: 'meta',
      begin: /^#![^\n]+sh\s*$/,
      relevance: 10
    }, {
      className: 'function',
      begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
      returnBegin: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {
        begin: /\w[\w\d_]*/
      })],
      relevance: 0
    }, hljs.HASH_COMMENT_MODE, QUOTE_STRING, ESCAPED_QUOTE, APOS_STRING, VAR]
  };
};

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(19); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function (handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function (event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function (handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function (handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function (handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function (handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(20)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ })
]]);
//# sourceMappingURL=vendor.js.map