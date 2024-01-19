/*!
 * Tiny Enhanced Media Embed plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 3.1.2-83
 */

!function() {
        "use strict";
        const e = Object.getPrototypeOf
          , t = (e,t,r)=>{
                var n;
                return !!r(e, t.prototype) || (null === (n = e.constructor) || void 0 === n ? void 0 : n.name) === t.name
        }
          , r = e=>r=>(e=>{
                const r = typeof e;
                return null === e ? "null" : "object" === r && Array.isArray(e) ? "array" : "object" === r && t(e, String, ((e,t)=>t.isPrototypeOf(e))) ? "string" : r
        }
        )(r) === e
          , n = e=>t=>typeof t === e
          , o = r("string")
          , s = r("object")
          , i = r=>((r,n)=>s(r) && t(r, n, ((t,r)=>e(t) === r)))(r, Object)
          , a = r("array")
          , l = n("boolean")
          , c = (void 0,
        e=>undefined === e);
        const u = e=>!(e=>null == e)(e)
          , h = n("function")
          , d = n("number");
        class p {
                constructor(e, t) {
                        this.tag = e,
                        this.value = t
                }
                static some(e) {
                        return new p(!0,e)
                }
                static none() {
                        return p.singletonNone
                }
                fold(e, t) {
                        return this.tag ? t(this.value) : e()
                }
                isSome() {
                        return this.tag
                }
                isNone() {
                        return !this.tag
                }
                map(e) {
                        return this.tag ? p.some(e(this.value)) : p.none()
                }
                bind(e) {
                        return this.tag ? e(this.value) : p.none()
                }
                exists(e) {
                        return this.tag && e(this.value)
                }
                forall(e) {
                        return !this.tag || e(this.value)
                }
                filter(e) {
                        return !this.tag || e(this.value) ? this : p.none()
                }
                getOr(e) {
                        return this.tag ? this.value : e
                }
                or(e) {
                        return this.tag ? this : e
                }
                getOrThunk(e) {
                        return this.tag ? this.value : e()
                }
                orThunk(e) {
                        return this.tag ? this : e()
                }
                getOrDie(e) {
                        if (this.tag)
                                return this.value;
                        throw new Error(null != e ? e : "Called getOrDie on None")
                }
                static from(e) {
                        return u(e) ? p.some(e) : p.none()
                }
                getOrNull() {
                        return this.tag ? this.value : null
                }
                getOrUndefined() {
                        return this.value
                }
                each(e) {
                        this.tag && e(this.value)
                }
                toArray() {
                        return this.tag ? [this.value] : []
                }
                toString() {
                        return this.tag ? `some(${this.value})` : "none()"
                }
        }
        p.singletonNone = new p(!1);
        const f = (e,t)=>((e,t,r)=>"" === t || e.length >= t.length && e.substr(0, 0 + t.length) === t)(e, t)
          , m = e=>parseInt(e, 10)
          , g = (e,t)=>{
                const r = e - t;
                return 0 === r ? 0 : r > 0 ? 1 : -1
        }
          , k = (e,t,r)=>({
                major: e,
                minor: t,
                patch: r
        })
          , y = e=>{
                const t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
                return t ? k(m(t[1]), m(t[2]), m(t[3])) : k(0, 0, 0)
        }
          , b = e=>t=>t.options.get(e)
          , v = b("mediaembed_content_css")
          , S = b("mediaembed_max_width")
          , C = b("mediaembed_inline_styles")
          , w = b("mediaembed_service_url")
          , x = e=>{
                if (null == e)
                        throw new Error("Node cannot be null or undefined");
                return {
                        dom: e
                }
        }
          , A = (e,t)=>{
                const r = (t || document).createElement(e);
                return x(r)
        }
          , T = x;
        "undefined" != typeof window ? window : Function("return this;")();
        const E = e=>1 === (e=>e.dom.nodeType)(e)
          , L = e=>t=>E(t) && t.dom.nodeName.toLowerCase() === e
          , O = ()=>{}
          , _ = e=>()=>e
          , I = e=>e
          , N = e=>e()
          , P = _(!1)
          , j = _(!0)
          , M = Array.prototype.slice
          , R = Array.prototype.indexOf
          , D = Array.prototype.push
          , B = (e,t)=>((e,t)=>R.call(e, t))(e, t) > -1
          , F = (e,t)=>{
                const r = e.length
                  , n = new Array(r);
                for (let o = 0; o < r; o++) {
                        const r = e[o];
                        n[o] = t(r, o)
                }
                return n
        }
          , U = (e,t)=>{
                for (let r = 0, n = e.length; r < n; r++)
                        t(e[r], r)
        }
          , V = (e,t)=>{
                const r = [];
                for (let n = 0, o = e.length; n < o; n++) {
                        const o = e[n];
                        t(o, n) && r.push(o)
                }
                return r
        }
          , z = (e,t,r)=>(U(e, ((e,n)=>{
                r = t(r, e, n)
        }
        )),
        r)
          , $ = (e,t)=>((e,t,r)=>{
                for (let n = 0, o = e.length; n < o; n++) {
                        const o = e[n];
                        if (t(o, n))
                                return p.some(o);
                        if (r(o, n))
                                break
                }
                return p.none()
        }
        )(e, t, P)
          , q = (e,t)=>(e=>{
                const t = [];
                for (let r = 0, n = e.length; r < n; ++r) {
                        if (!a(e[r]))
                                throw new Error("Arr.flatten item " + r + " was not an array, input: " + e);
                        D.apply(t, e[r])
                }
                return t
        }
        )(F(e, t))
          , J = h(Array.from) ? Array.from : e=>M.call(e)
          , W = (e,t)=>{
                const r = e.dom;
                if (1 !== r.nodeType)
                        return !1;
                {
                        const e = r;
                        if (void 0 !== e.matches)
                                return e.matches(t);
                        if (void 0 !== e.msMatchesSelector)
                                return e.msMatchesSelector(t);
                        if (void 0 !== e.webkitMatchesSelector)
                                return e.webkitMatchesSelector(t);
                        if (void 0 !== e.mozMatchesSelector)
                                return e.mozMatchesSelector(t);
                        throw new Error("Browser lacks native selectors")
                }
        }
          , H = e=>p.from(e.dom.parentNode).map(T)
          , G = e=>p.from(e.dom.nextSibling).map(T)
          , K = e=>F(e.dom.childNodes, T)
          , Q = e=>((e,t)=>{
                const r = e.dom.childNodes;
                return p.from(r[0]).map(T)
        }
        )(e)
          , Y = Object.keys
          , X = Object.hasOwnProperty
          , Z = (e,t)=>{
                const r = Y(e);
                for (let n = 0, o = r.length; n < o; n++) {
                        const o = r[n];
                        t(e[o], o)
                }
        }
          , ee = (e,t)=>te(e, t) ? p.from(e[t]) : p.none()
          , te = (e,t)=>X.call(e, t)
          , re = (e,t,r)=>{
                ((e,t,r)=>{
                        if (!(o(r) || l(r) || d(r)))
                                throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", r, ":: Element ", e),
                                new Error("Attribute value was not simple");
                        e.setAttribute(t, r + "")
                }
                )(e.dom, t, r)
        }
          , ne = (e,t,r)=>{
                if (!o(r))
                        throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", r, ":: Element ", e),
                        new Error("CSS value must be a string: " + r);
                (e=>void 0 !== e.style && h(e.style.getPropertyValue))(e) && e.style.setProperty(t, r)
        }
          , oe = (e,t,r)=>{
                const n = e.dom;
                ne(n, t, r)
        }
          , se = (e,t)=>{
                const r = e.dom;
                Z(t, ((e,t)=>{
                        ne(r, t, e)
                }
                ))
        }
          , ie = (e,t)=>{
                G(e).fold((()=>{
                        H(e).each((e=>{
                                ae(e, t)
                        }
                        ))
                }
                ), (e=>{
                        ((e,t)=>{
                                H(e).each((r=>{
                                        r.dom.insertBefore(t.dom, e.dom)
                                }
                                ))
                        }
                        )(e, t)
                }
                ))
        }
          , ae = (e,t)=>{
                e.dom.appendChild(t.dom)
        }
          , le = e=>{
                const t = e.dom;
                null !== t.parentNode && t.parentNode.removeChild(t)
        }
          , ce = e=>{
                const t = A("div")
                  , r = T(e.dom.cloneNode(!0));
                return ae(t, r),
                (e=>e.dom.innerHTML)(t)
        }
          , ue = (e,t)=>((e,r)=>V(K(e), (e=>W(e, t))))(e)
          , he = e=>e.dom.textContent
          , de = (e,t)=>{
                const r = t[t.length - 1];
                return ((e,t)=>{
                        for (let t = 0, s = e.length; t < s; t++)
                                if (n = e[t],
                                o = void 0,
                                o = r,
                                n.dom === o.dom)
                                        return p.some(t);
                        var n, o;
                        return p.none()
                }
                )(e).getOrDie("how is it possible you can't find a br you just found?")
        }
          , pe = e=>V(ue(e, "br"), (e=>G(e).isSome()))
          , fe = e=>z(e, ((e,t)=>e + he(t)), "")
          , me = e=>{
                const t = pe(e);
                if (t.length > 0) {
                        const r = K(e)
                          , n = de(r, t)
                          , o = r.slice(n + 1);
                        return fe(o)
                }
                return p.from(he(e)).getOr("")
        }
        ;
        var ge = Object.create
          , ke = Object.defineProperty
          , ye = Object.getOwnPropertyDescriptor
          , be = Object.getOwnPropertyNames
          , ve = Object.getPrototypeOf
          , Se = Object.prototype.hasOwnProperty
          , Ce = (e,t)=>()=>(t || e((t = {
                exports: {}
        }).exports, t),
        t.exports)
          , we = (e,t)=>{
                for (var r in t)
                        ke(e, r, {
                                get: t[r],
                                enumerable: !0
                        })
        }
          , xe = Ce((e=>{
                var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
                e.encode = function(e) {
                        if (0 <= e && e < t.length)
                                return t[e];
                        throw new TypeError("Must be between 0 and 63: " + e)
                }
                ,
                e.decode = function(e) {
                        return 65 <= e && e <= 90 ? e - 65 : 97 <= e && e <= 122 ? e - 97 + 26 : 48 <= e && e <= 57 ? e - 48 + 52 : 43 == e ? 62 : 47 == e ? 63 : -1
                }
        }
        ))
          , Ae = Ce((e=>{
                var t = xe();
                e.encode = function(e) {
                        var r, n, o = "", s = (n = e) < 0 ? 1 + (-n << 1) : 0 + (n << 1);
                        do {
                                r = 31 & s,
                                (s >>>= 5) > 0 && (r |= 32),
                                o += t.encode(r)
                        } while (s > 0);
                        return o
                }
                ,
                e.decode = function(e, r, n) {
                        var o, s, i = e.length, a = 0, l = 0;
                        do {
                                if (r >= i)
                                        throw new Error("Expected more digits in base 64 VLQ value.");
                                if (-1 === (s = t.decode(e.charCodeAt(r++))))
                                        throw new Error("Invalid base64 digit: " + e.charAt(r - 1));
                                o = !!(32 & s),
                                a += (s &= 31) << l,
                                l += 5
                        } while (o);
                        n.value = function(e) {
                                var t = e >> 1;
                                return 1 == (1 & e) ? -t : t
                        }(a),
                        n.rest = r
                }
        }
        ))
          , Te = Ce((e=>{
                e.getArg = function(e, t, r) {
                        if (t in e)
                                return e[t];
                        if (3 === arguments.length)
                                return r;
                        throw new Error('"' + t + '" is a required argument.')
                }
                ;
                var t = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/
                  , r = /^data:.+\,.+$/;
                function n(e) {
                        var r = e.match(t);
                        return r ? {
                                scheme: r[1],
                                auth: r[2],
                                host: r[3],
                                port: r[4],
                                path: r[5]
                        } : null
                }
                function o(e) {
                        var t = "";
                        return e.scheme && (t += e.scheme + ":"),
                        t += "//",
                        e.auth && (t += e.auth + "@"),
                        e.host && (t += e.host),
                        e.port && (t += ":" + e.port),
                        e.path && (t += e.path),
                        t
                }
                e.urlParse = n,
                e.urlGenerate = o;
                var s = function(t) {
                        var r = [];
                        return function(t) {
                                for (var s = 0; s < r.length; s++)
                                        if (r[s].input === t) {
                                                var i = r[0];
                                                return r[0] = r[s],
                                                r[s] = i,
                                                r[0].result
                                        }
                                var a = function(t) {
                                        var r = t
                                          , s = n(t);
                                        if (s) {
                                                if (!s.path)
                                                        return t;
                                                r = s.path
                                        }
                                        for (var i = e.isAbsolute(r), a = [], l = 0, c = 0; ; ) {
                                                if (l = c,
                                                -1 === (c = r.indexOf("/", l))) {
                                                        a.push(r.slice(l));
                                                        break
                                                }
                                                for (a.push(r.slice(l, c)); c < r.length && "/" === r[c]; )
                                                        c++
                                        }
                                        var u, h = 0;
                                        for (c = a.length - 1; c >= 0; c--)
                                                "." === (u = a[c]) ? a.splice(c, 1) : ".." === u ? h++ : h > 0 && ("" === u ? (a.splice(c + 1, h),
                                                h = 0) : (a.splice(c, 2),
                                                h--));
                                        return "" === (r = a.join("/")) && (r = i ? "/" : "."),
                                        s ? (s.path = r,
                                        o(s)) : r
                                }(t);
                                return r.unshift({
                                        input: t,
                                        result: a
                                }),
                                r.length > 32 && r.pop(),
                                a
                        }
                }();
                function i(e, t) {
                        "" === e && (e = "."),
                        "" === t && (t = ".");
                        var i = n(t)
                          , a = n(e);
                        if (a && (e = a.path || "/"),
                        i && !i.scheme)
                                return a && (i.scheme = a.scheme),
                                o(i);
                        if (i || t.match(r))
                                return t;
                        if (a && !a.host && !a.path)
                                return a.host = t,
                                o(a);
                        var l = "/" === t.charAt(0) ? t : s(e.replace(/\/+$/, "") + "/" + t);
                        return a ? (a.path = l,
                        o(a)) : l
                }
                e.normalize = s,
                e.join = i,
                e.isAbsolute = function(e) {
                        return "/" === e.charAt(0) || t.test(e)
                }
                ,
                e.relative = function(e, t) {
                        "" === e && (e = "."),
                        e = e.replace(/\/$/, "");
                        for (var r = 0; 0 !== t.indexOf(e + "/"); ) {
                                var n = e.lastIndexOf("/");
                                if (n < 0 || (e = e.slice(0, n)).match(/^([^\/]+:\/)?\/*$/))
                                        return t;
                                ++r
                        }
                        return Array(r + 1).join("../") + t.substr(e.length + 1)
                }
                ;
                var a = !("__proto__"in Object.create(null));
                function l(e) {
                        return e
                }
                function c(e) {
                        if (!e)
                                return !1;
                        var t = e.length;
                        if (t < 9 || 95 !== e.charCodeAt(t - 1) || 95 !== e.charCodeAt(t - 2) || 111 !== e.charCodeAt(t - 3) || 116 !== e.charCodeAt(t - 4) || 111 !== e.charCodeAt(t - 5) || 114 !== e.charCodeAt(t - 6) || 112 !== e.charCodeAt(t - 7) || 95 !== e.charCodeAt(t - 8) || 95 !== e.charCodeAt(t - 9))
                                return !1;
                        for (var r = t - 10; r >= 0; r--)
                                if (36 !== e.charCodeAt(r))
                                        return !1;
                        return !0
                }
                function u(e, t) {
                        return e === t ? 0 : null === e ? 1 : null === t ? -1 : e > t ? 1 : -1
                }
                e.toSetString = a ? l : function(e) {
                        return c(e) ? "$" + e : e
                }
                ,
                e.fromSetString = a ? l : function(e) {
                        return c(e) ? e.slice(1) : e
                }
                ,
                e.compareByOriginalPositions = function(e, t, r) {
                        var n = u(e.source, t.source);
                        return 0 !== n || 0 != (n = e.originalLine - t.originalLine) || 0 != (n = e.originalColumn - t.originalColumn) || r || 0 != (n = e.generatedColumn - t.generatedColumn) || 0 != (n = e.generatedLine - t.generatedLine) ? n : u(e.name, t.name)
                }
                ,
                e.compareByOriginalPositionsNoSource = function(e, t, r) {
                        var n;
                        return 0 != (n = e.originalLine - t.originalLine) || 0 != (n = e.originalColumn - t.originalColumn) || r || 0 != (n = e.generatedColumn - t.generatedColumn) || 0 != (n = e.generatedLine - t.generatedLine) ? n : u(e.name, t.name)
                }
                ,
                e.compareByGeneratedPositionsDeflated = function(e, t, r) {
                        var n = e.generatedLine - t.generatedLine;
                        return 0 !== n || 0 != (n = e.generatedColumn - t.generatedColumn) || r || 0 !== (n = u(e.source, t.source)) || 0 != (n = e.originalLine - t.originalLine) || 0 != (n = e.originalColumn - t.originalColumn) ? n : u(e.name, t.name)
                }
                ,
                e.compareByGeneratedPositionsDeflatedNoLine = function(e, t, r) {
                        var n = e.generatedColumn - t.generatedColumn;
                        return 0 !== n || r || 0 !== (n = u(e.source, t.source)) || 0 != (n = e.originalLine - t.originalLine) || 0 != (n = e.originalColumn - t.originalColumn) ? n : u(e.name, t.name)
                }
                ,
                e.compareByGeneratedPositionsInflated = function(e, t) {
                        var r = e.generatedLine - t.generatedLine;
                        return 0 !== r || 0 != (r = e.generatedColumn - t.generatedColumn) || 0 !== (r = u(e.source, t.source)) || 0 != (r = e.originalLine - t.originalLine) || 0 != (r = e.originalColumn - t.originalColumn) ? r : u(e.name, t.name)
                }
                ,
                e.parseSourceMapInput = function(e) {
                        return JSON.parse(e.replace(/^\)]}'[^\n]*\n/, ""))
                }
                ,
                e.computeSourceURL = function(e, t, r) {
                        if (t = t || "",
                        e && ("/" !== e[e.length - 1] && "/" !== t[0] && (e += "/"),
                        t = e + t),
                        r) {
                                var a = n(r);
                                if (!a)
                                        throw new Error("sourceMapURL could not be parsed");
                                if (a.path) {
                                        var l = a.path.lastIndexOf("/");
                                        l >= 0 && (a.path = a.path.substring(0, l + 1))
                                }
                                t = i(o(a), t)
                        }
                        return s(t)
                }
        }
        ))
          , Ee = Ce((e=>{
                var t = Te()
                  , r = Object.prototype.hasOwnProperty
                  , n = typeof Map < "u";
                function o() {
                        this._array = [],
                        this._set = n ? new Map : Object.create(null)
                }
                o.fromArray = function(e, t) {
                        for (var r = new o, n = 0, s = e.length; n < s; n++)
                                r.add(e[n], t);
                        return r
                }
                ,
                o.prototype.size = function() {
                        return n ? this._set.size : Object.getOwnPropertyNames(this._set).length
                }
                ,
                o.prototype.add = function(e, o) {
                        var s = n ? e : t.toSetString(e)
                          , i = n ? this.has(e) : r.call(this._set, s)
                          , a = this._array.length;
                        (!i || o) && this._array.push(e),
                        i || (n ? this._set.set(e, a) : this._set[s] = a)
                }
                ,
                o.prototype.has = function(e) {
                        if (n)
                                return this._set.has(e);
                        var o = t.toSetString(e);
                        return r.call(this._set, o)
                }
                ,
                o.prototype.indexOf = function(e) {
                        if (n) {
                                var o = this._set.get(e);
                                if (o >= 0)
                                        return o
                        } else {
                                var s = t.toSetString(e);
                                if (r.call(this._set, s))
                                        return this._set[s]
                        }
                        throw new Error('"' + e + '" is not in the set.')
                }
                ,
                o.prototype.at = function(e) {
                        if (e >= 0 && e < this._array.length)
                                return this._array[e];
                        throw new Error("No element indexed by " + e)
                }
                ,
                o.prototype.toArray = function() {
                        return this._array.slice()
                }
                ,
                e.ArraySet = o
        }
        ))
          , Le = Ce((e=>{
                var t = Te();
                function r() {
                        this._array = [],
                        this._sorted = !0,
                        this._last = {
                                generatedLine: -1,
                                generatedColumn: 0
                        }
                }
                r.prototype.unsortedForEach = function(e, t) {
                        this._array.forEach(e, t)
                }
                ,
                r.prototype.add = function(e) {
                        !function(e, r) {
                                var n = e.generatedLine
                                  , o = r.generatedLine
                                  , s = e.generatedColumn
                                  , i = r.generatedColumn;
                                return o > n || o == n && i >= s || t.compareByGeneratedPositionsInflated(e, r) <= 0
                        }(this._last, e) ? (this._sorted = !1,
                        this._array.push(e)) : (this._last = e,
                        this._array.push(e))
                }
                ,
                r.prototype.toArray = function() {
                        return this._sorted || (this._array.sort(t.compareByGeneratedPositionsInflated),
                        this._sorted = !0),
                        this._array
                }
                ,
                e.MappingList = r
        }
        ))
          , Oe = Ce((e=>{
                var t = Ae()
                  , r = Te()
                  , n = Ee().ArraySet
                  , o = Le().MappingList;
                function s(e) {
                        e || (e = {}),
                        this._file = r.getArg(e, "file", null),
                        this._sourceRoot = r.getArg(e, "sourceRoot", null),
                        this._skipValidation = r.getArg(e, "skipValidation", !1),
                        this._sources = new n,
                        this._names = new n,
                        this._mappings = new o,
                        this._sourcesContents = null
                }
                s.prototype._version = 3,
                s.fromSourceMap = function(e) {
                        var t = e.sourceRoot
                          , n = new s({
                                file: e.file,
                                sourceRoot: t
                        });
                        return e.eachMapping((function(e) {
                                var o = {
                                        generated: {
                                                line: e.generatedLine,
                                                column: e.generatedColumn
                                        }
                                };
                                null != e.source && (o.source = e.source,
                                null != t && (o.source = r.relative(t, o.source)),
                                o.original = {
                                        line: e.originalLine,
                                        column: e.originalColumn
                                },
                                null != e.name && (o.name = e.name)),
                                n.addMapping(o)
                        }
                        )),
                        e.sources.forEach((function(o) {
                                var s = o;
                                null !== t && (s = r.relative(t, o)),
                                n._sources.has(s) || n._sources.add(s);
                                var i = e.sourceContentFor(o);
                                null != i && n.setSourceContent(o, i)
                        }
                        )),
                        n
                }
                ,
                s.prototype.addMapping = function(e) {
                        var t = r.getArg(e, "generated")
                          , n = r.getArg(e, "original", null)
                          , o = r.getArg(e, "source", null)
                          , s = r.getArg(e, "name", null);
                        this._skipValidation || this._validateMapping(t, n, o, s),
                        null != o && (o = String(o),
                        this._sources.has(o) || this._sources.add(o)),
                        null != s && (s = String(s),
                        this._names.has(s) || this._names.add(s)),
                        this._mappings.add({
                                generatedLine: t.line,
                                generatedColumn: t.column,
                                originalLine: null != n && n.line,
                                originalColumn: null != n && n.column,
                                source: o,
                                name: s
                        })
                }
                ,
                s.prototype.setSourceContent = function(e, t) {
                        var n = e;
                        null != this._sourceRoot && (n = r.relative(this._sourceRoot, n)),
                        null != t ? (this._sourcesContents || (this._sourcesContents = Object.create(null)),
                        this._sourcesContents[r.toSetString(n)] = t) : this._sourcesContents && (delete this._sourcesContents[r.toSetString(n)],
                        0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null))
                }
                ,
                s.prototype.applySourceMap = function(e, t, o) {
                        var s = t;
                        if (null == t) {
                                if (null == e.file)
                                        throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
                                s = e.file
                        }
                        var i = this._sourceRoot;
                        null != i && (s = r.relative(i, s));
                        var a = new n
                          , l = new n;
                        this._mappings.unsortedForEach((function(t) {
                                if (t.source === s && null != t.originalLine) {
                                        var n = e.originalPositionFor({
                                                line: t.originalLine,
                                                column: t.originalColumn
                                        });
                                        null != n.source && (t.source = n.source,
                                        null != o && (t.source = r.join(o, t.source)),
                                        null != i && (t.source = r.relative(i, t.source)),
                                        t.originalLine = n.line,
                                        t.originalColumn = n.column,
                                        null != n.name && (t.name = n.name))
                                }
                                var c = t.source;
                                null != c && !a.has(c) && a.add(c);
                                var u = t.name;
                                null != u && !l.has(u) && l.add(u)
                        }
                        ), this),
                        this._sources = a,
                        this._names = l,
                        e.sources.forEach((function(t) {
                                var n = e.sourceContentFor(t);
                                null != n && (null != o && (t = r.join(o, t)),
                                null != i && (t = r.relative(i, t)),
                                this.setSourceContent(t, n))
                        }
                        ), this)
                }
                ,
                s.prototype._validateMapping = function(e, t, r, n) {
                        if (t && "number" != typeof t.line && "number" != typeof t.column)
                                throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
                        if (!(e && "line"in e && "column"in e && e.line > 0 && e.column >= 0) || t || r || n) {
                                if (e && "line"in e && "column"in e && t && "line"in t && "column"in t && e.line > 0 && e.column >= 0 && t.line > 0 && t.column >= 0 && r)
                                        return;
                                throw new Error("Invalid mapping: " + JSON.stringify({
                                        generated: e,
                                        source: r,
                                        original: t,
                                        name: n
                                }))
                        }
                }
                ,
                s.prototype._serializeMappings = function() {
                        for (var e, n, o, s, i = 0, a = 1, l = 0, c = 0, u = 0, h = 0, d = "", p = this._mappings.toArray(), f = 0, m = p.length; f < m; f++) {
                                if (e = "",
                                (n = p[f]).generatedLine !== a)
                                        for (i = 0; n.generatedLine !== a; )
                                                e += ";",
                                                a++;
                                else if (f > 0) {
                                        if (!r.compareByGeneratedPositionsInflated(n, p[f - 1]))
                                                continue;
                                        e += ","
                                }
                                e += t.encode(n.generatedColumn - i),
                                i = n.generatedColumn,
                                null != n.source && (s = this._sources.indexOf(n.source),
                                e += t.encode(s - h),
                                h = s,
                                e += t.encode(n.originalLine - 1 - c),
                                c = n.originalLine - 1,
                                e += t.encode(n.originalColumn - l),
                                l = n.originalColumn,
                                null != n.name && (o = this._names.indexOf(n.name),
                                e += t.encode(o - u),
                                u = o)),
                                d += e
                        }
                        return d
                }
                ,
                s.prototype._generateSourcesContent = function(e, t) {
                        return e.map((function(e) {
                                if (!this._sourcesContents)
                                        return null;
                                null != t && (e = r.relative(t, e));
                                var n = r.toSetString(e);
                                return Object.prototype.hasOwnProperty.call(this._sourcesContents, n) ? this._sourcesContents[n] : null
                        }
                        ), this)
                }
                ,
                s.prototype.toJSON = function() {
                        var e = {
                                version: this._version,
                                sources: this._sources.toArray(),
                                names: this._names.toArray(),
                                mappings: this._serializeMappings()
                        };
                        return null != this._file && (e.file = this._file),
                        null != this._sourceRoot && (e.sourceRoot = this._sourceRoot),
                        this._sourcesContents && (e.sourcesContent = this._generateSourcesContent(e.sources, e.sourceRoot)),
                        e
                }
                ,
                s.prototype.toString = function() {
                        return JSON.stringify(this.toJSON())
                }
                ,
                e.SourceMapGenerator = s
        }
        ));
        function _e(e) {
                return e >= 48 && e <= 57
        }
        function Ie(e) {
                return _e(e) || e >= 65 && e <= 70 || e >= 97 && e <= 102
        }
        function Ne(e) {
                return e >= 65 && e <= 90
        }
        function Pe(e) {
                return function(e) {
                        return Ne(e) || function(e) {
                                return e >= 97 && e <= 122
                        }(e)
                }(e) || function(e) {
                        return e >= 128
                }(e) || 95 === e
        }
        function je(e) {
                return Pe(e) || _e(e) || 45 === e
        }
        function Me(e) {
                return e >= 0 && e <= 8 || 11 === e || e >= 14 && e <= 31 || 127 === e
        }
        function Re(e) {
                return 10 === e || 13 === e || 12 === e
        }
        function De(e) {
                return Re(e) || 32 === e || 9 === e
        }
        function Be(e, t) {
                return !(92 !== e || Re(t) || 0 === t)
        }
        function Fe(e, t, r) {
                return 45 === e ? Pe(t) || 45 === t || Be(t, r) : !!Pe(e) || 92 === e && Be(e, t)
        }
        function Ue(e, t, r) {
                return 43 === e || 45 === e ? _e(t) ? 2 : 46 === t && _e(r) ? 3 : 0 : 46 === e ? _e(t) ? 2 : 0 : _e(e) ? 1 : 0
        }
        function Ve(e) {
                return 65279 === e || 65534 === e ? 1 : 0
        }
        var ze = new Array(128)
          , $e = 130
          , qe = 131
          , Je = 132
          , We = 133;
        for (let e = 0; e < ze.length; e++)
                ze[e] = De(e) && $e || _e(e) && qe || Pe(e) && Je || Me(e) && We || e || 128;
        function He(e) {
                return e < 128 ? ze[e] : Je
        }
        function Ge(e, t) {
                return t < e.length ? e.charCodeAt(t) : 0
        }
        function Ke(e, t, r) {
                return 13 === r && 10 === Ge(e, t + 1) ? 2 : 1
        }
        function Qe(e, t, r) {
                let n = e.charCodeAt(t);
                return Ne(n) && (n |= 32),
                n === r
        }
        function Ye(e, t, r, n) {
                if (r - t !== n.length || t < 0 || r > e.length)
                        return !1;
                for (let o = t; o < r; o++) {
                        let r = n.charCodeAt(o - t)
                          , s = e.charCodeAt(o);
                        if (Ne(s) && (s |= 32),
                        s !== r)
                                return !1
                }
                return !0
        }
        function Xe(e, t) {
                for (; t < e.length && De(e.charCodeAt(t)); t++)
                        ;
                return t
        }
        function Ze(e, t) {
                for (; t < e.length && _e(e.charCodeAt(t)); t++)
                        ;
                return t
        }
        function et(e, t) {
                if (Ie(Ge(e, (t += 2) - 1))) {
                        for (let r = Math.min(e.length, t + 5); t < r && Ie(Ge(e, t)); t++)
                                ;
                        let r = Ge(e, t);
                        De(r) && (t += Ke(e, t, r))
                }
                return t
        }
        function tt(e, t) {
                for (; t < e.length; t++) {
                        let r = e.charCodeAt(t);
                        if (!je(r)) {
                                if (Be(r, Ge(e, t + 1))) {
                                        t = et(e, t) - 1;
                                        continue
                                }
                                break
                        }
                }
                return t
        }
        function rt(e, t) {
                let r = e.charCodeAt(t);
                if ((43 === r || 45 === r) && (r = e.charCodeAt(t += 1)),
                _e(r) && (t = Ze(e, t + 1),
                r = e.charCodeAt(t)),
                46 === r && _e(e.charCodeAt(t + 1)) && (t = Ze(e, t += 2)),
                Qe(e, t, 101)) {
                        let n = 0;
                        r = e.charCodeAt(t + 1),
                        (45 === r || 43 === r) && (n = 1,
                        r = e.charCodeAt(t + 2)),
                        _e(r) && (t = Ze(e, t + 1 + n + 1))
                }
                return t
        }
        function nt(e, t) {
                for (; t < e.length; t++) {
                        let r = e.charCodeAt(t);
                        if (41 === r) {
                                t++;
                                break
                        }
                        Be(r, Ge(e, t + 1)) && (t = et(e, t))
                }
                return t
        }
        function ot(e) {
                if (1 === e.length && !Ie(e.charCodeAt(0)))
                        return e[0];
                let t = parseInt(e, 16);
                return (0 === t || t >= 55296 && t <= 57343 || t > 1114111) && (t = 65533),
                String.fromCodePoint(t)
        }
        var st = ["EOF-token", "ident-token", "function-token", "at-keyword-token", "hash-token", "string-token", "bad-string-token", "url-token", "bad-url-token", "delim-token", "number-token", "percentage-token", "dimension-token", "whitespace-token", "CDO-token", "CDC-token", "colon-token", "semicolon-token", "comma-token", "[-token", "]-token", "(-token", ")-token", "{-token", "}-token"];
        function it(e=null, t) {
                return null === e || e.length < t ? new Uint32Array(Math.max(t + 1024, 16384)) : e
        }
        function at(e) {
                let t = e.source
                  , r = t.length
                  , n = t.length > 0 ? Ve(t.charCodeAt(0)) : 0
                  , o = it(e.lines, r)
                  , s = it(e.columns, r)
                  , i = e.startLine
                  , a = e.startColumn;
                for (let e = n; e < r; e++) {
                        let n = t.charCodeAt(e);
                        o[e] = i,
                        s[e] = a++,
                        (10 === n || 13 === n || 12 === n) && (13 === n && e + 1 < r && 10 === t.charCodeAt(e + 1) && (e++,
                        o[e] = i,
                        s[e] = a),
                        i++,
                        a = 1)
                }
                o[r] = i,
                s[r] = a,
                e.lines = o,
                e.columns = s,
                e.computed = !0
        }
        var lt = 16777215
          , ct = 24
          , ut = new Map([[2, 22], [21, 22], [19, 20], [23, 24]]);
        function ht(e, t) {
                function r(t) {
                        return t < a ? e.charCodeAt(t) : 0
                }
                function n() {
                        return c = rt(e, c),
                        Fe(r(c), r(c + 1), r(c + 2)) ? (i = 12,
                        void (c = tt(e, c))) : 37 === r(c) ? (i = 11,
                        void c++) : void (i = 10)
                }
                function o() {
                        let t = c;
                        return c = tt(e, c),
                        Ye(e, t, c, "url") && 40 === r(c) ? (c = Xe(e, c + 1),
                        34 === r(c) || 39 === r(c) ? (i = 2,
                        void (c = t + 4)) : void function() {
                                for (i = 7,
                                c = Xe(e, c); c < e.length; c++) {
                                        let t = e.charCodeAt(c);
                                        switch (He(t)) {
                                        case 41:
                                                return void c++;
                                        case $e:
                                                return c = Xe(e, c),
                                                41 === r(c) || c >= e.length ? void (c < e.length && c++) : (c = nt(e, c),
                                                void (i = 8));
                                        case 34:
                                        case 39:
                                        case 40:
                                        case We:
                                                return c = nt(e, c),
                                                void (i = 8);
                                        case 92:
                                                if (Be(t, r(c + 1))) {
                                                        c = et(e, c) - 1;
                                                        break
                                                }
                                                return c = nt(e, c),
                                                void (i = 8)
                                        }
                                }
                        }()) : 40 === r(c) ? (i = 2,
                        void c++) : void (i = 1)
                }
                function s(t) {
                        for (t || (t = r(c++)),
                        i = 5; c < e.length; c++) {
                                let n = e.charCodeAt(c);
                                switch (He(n)) {
                                case t:
                                        return void c++;
                                case $e:
                                        if (Re(n))
                                                return c += Ke(e, c, n),
                                                void (i = 6);
                                        break;
                                case 92:
                                        if (c === e.length - 1)
                                                break;
                                        let o = r(c + 1);
                                        Re(o) ? c += Ke(e, c + 1, o) : Be(n, o) && (c = et(e, c) - 1)
                                }
                        }
                }
                let i, a = (e = String(e || "")).length, l = Ve(r(0)), c = l;
                for (; c < a; ) {
                        let a = e.charCodeAt(c);
                        switch (He(a)) {
                        case $e:
                                i = 13,
                                c = Xe(e, c + 1);
                                break;
                        case 34:
                                s();
                                break;
                        case 35:
                                je(r(c + 1)) || Be(r(c + 1), r(c + 2)) ? (i = 4,
                                c = tt(e, c + 1)) : (i = 9,
                                c++);
                                break;
                        case 39:
                                s();
                                break;
                        case 40:
                                i = 21,
                                c++;
                                break;
                        case 41:
                                i = 22,
                                c++;
                                break;
                        case 43:
                                Ue(a, r(c + 1), r(c + 2)) ? n() : (i = 9,
                                c++);
                                break;
                        case 44:
                                i = 18,
                                c++;
                                break;
                        case 45:
                                Ue(a, r(c + 1), r(c + 2)) ? n() : 45 === r(c + 1) && 62 === r(c + 2) ? (i = 15,
                                c += 3) : Fe(a, r(c + 1), r(c + 2)) ? o() : (i = 9,
                                c++);
                                break;
                        case 46:
                                Ue(a, r(c + 1), r(c + 2)) ? n() : (i = 9,
                                c++);
                                break;
                        case 47:
                                42 === r(c + 1) ? (i = 25,
                                c = e.indexOf("*/", c + 2),
                                c = -1 === c ? e.length : c + 2) : (i = 9,
                                c++);
                                break;
                        case 58:
                                i = 16,
                                c++;
                                break;
                        case 59:
                                i = 17,
                                c++;
                                break;
                        case 60:
                                33 === r(c + 1) && 45 === r(c + 2) && 45 === r(c + 3) ? (i = 14,
                                c += 4) : (i = 9,
                                c++);
                                break;
                        case 64:
                                Fe(r(c + 1), r(c + 2), r(c + 3)) ? (i = 3,
                                c = tt(e, c + 1)) : (i = 9,
                                c++);
                                break;
                        case 91:
                                i = 19,
                                c++;
                                break;
                        case 92:
                                Be(a, r(c + 1)) ? o() : (i = 9,
                                c++);
                                break;
                        case 93:
                                i = 20,
                                c++;
                                break;
                        case 123:
                                i = 23,
                                c++;
                                break;
                        case 125:
                                i = 24,
                                c++;
                                break;
                        case qe:
                                n();
                                break;
                        case Je:
                                o();
                                break;
                        default:
                                i = 9,
                                c++
                        }
                        t(i, l, l = c)
                }
        }
        var dt, pt = (dt = Oe(),
        ((e,t,r,n)=>{
                if (t && "object" == typeof t || "function" == typeof t)
                        for (let r of be(t))
                                !Se.call(e, r) && "default" !== r && ke(e, r, {
                                        get: ()=>t[r],
                                        enumerable: !(n = ye(t, r)) || n.enumerable
                                });
                return e
        }
        )((e=>ke(e, "__esModule", {
                value: !0
        }))(ke(null != dt ? ge(ve(dt)) : {}, "default", {
                value: dt,
                enumerable: !0
        })), dt)), ft = new Set(["Atrule", "Selector", "Declaration"]), mt = {};
        we(mt, {
                safe: ()=>St,
                spec: ()=>vt
        });
        var gt = (e,t)=>{
                if (9 === e && (e = t),
                "string" == typeof e) {
                        let t = e.charCodeAt(0);
                        return t > 127 ? 32768 : t << 8
                }
                return e
        }
          , kt = [[1, 1], [1, 2], [1, 7], [1, 8], [1, "-"], [1, 10], [1, 11], [1, 12], [1, 15], [1, 21], [3, 1], [3, 2], [3, 7], [3, 8], [3, "-"], [3, 10], [3, 11], [3, 12], [3, 15], [4, 1], [4, 2], [4, 7], [4, 8], [4, "-"], [4, 10], [4, 11], [4, 12], [4, 15], [12, 1], [12, 2], [12, 7], [12, 8], [12, "-"], [12, 10], [12, 11], [12, 12], [12, 15], ["#", 1], ["#", 2], ["#", 7], ["#", 8], ["#", "-"], ["#", 10], ["#", 11], ["#", 12], ["#", 15], ["-", 1], ["-", 2], ["-", 7], ["-", 8], ["-", "-"], ["-", 10], ["-", 11], ["-", 12], ["-", 15], [10, 1], [10, 2], [10, 7], [10, 8], [10, 10], [10, 11], [10, 12], [10, "%"], [10, 15], ["@", 1], ["@", 2], ["@", 7], ["@", 8], ["@", "-"], ["@", 15], [".", 10], [".", 11], [".", 12], ["+", 10], ["+", 11], ["+", 12], ["/", "*"]]
          , yt = kt.concat([[1, 4], [12, 4], [4, 4], [3, 21], [3, 5], [3, 16], [11, 11], [11, 12], [11, 2], [11, "-"], [22, 1], [22, 2], [22, 11], [22, 12], [22, 4], [22, "-"]]);
        function bt(e) {
                let t = new Set(e.map((([e,t])=>gt(e) << 16 | gt(t))));
                return function(e, r, n) {
                        let o = gt(r, n)
                          , s = n.charCodeAt(0);
                        return (45 === s && 1 !== r && 2 !== r && 15 !== r || 43 === s ? t.has(e << 16 | s << 8) : t.has(e << 16 | o)) && this.emit(" ", 13, !0),
                        o
                }
        }
        var vt = bt(kt)
          , St = bt(yt);
        function Ct(e, t) {
                if ("function" != typeof t)
                        e.children.forEach(this.node, this);
                else {
                        let r = null;
                        e.children.forEach((e=>{
                                null !== r && t.call(this, r),
                                this.node(e),
                                r = e
                        }
                        ))
                }
        }
        function wt(e) {
                ht(e, ((t,r,n)=>{
                        this.token(t, e.slice(r, n))
                }
                ))
        }
        var xt = {};
        we(xt, {
                AnPlusB: ()=>jt,
                Atrule: ()=>Mt,
                AtrulePrelude: ()=>Rt,
                AttributeSelector: ()=>Wt,
                Block: ()=>Ht,
                Brackets: ()=>Gt,
                CDC: ()=>Kt,
                CDO: ()=>Qt,
                ClassSelector: ()=>Xt,
                Combinator: ()=>er,
                Comment: ()=>tr,
                Declaration: ()=>rr,
                DeclarationList: ()=>nr,
                Dimension: ()=>or,
                Function: ()=>sr,
                Hash: ()=>ir,
                IdSelector: ()=>ur,
                Identifier: ()=>lr,
                MediaFeature: ()=>hr,
                MediaQuery: ()=>dr,
                MediaQueryList: ()=>pr,
                NestingSelector: ()=>mr,
                Nth: ()=>kr,
                Number: ()=>yr,
                Operator: ()=>br,
                Parentheses: ()=>vr,
                Percentage: ()=>Cr,
                PseudoClassSelector: ()=>xr,
                PseudoElementSelector: ()=>Tr,
                Ratio: ()=>Er,
                Raw: ()=>_r,
                Rule: ()=>Ir,
                Selector: ()=>Pr,
                SelectorList: ()=>Mr,
                String: ()=>Vr,
                StyleSheet: ()=>zr,
                TypeSelector: ()=>Wr,
                UnicodeRange: ()=>Hr,
                Url: ()=>en,
                Value: ()=>tn,
                WhiteSpace: ()=>rn
        });
        var At = 43
          , Tt = 45
          , Et = 110
          , Lt = !0;
        function Ot(e, t) {
                let r = this.tokenStart + e
                  , n = this.charCodeAt(r);
                for ((n === At || n === Tt) && (t && this.error("Number sign is not allowed"),
                r++); r < this.tokenEnd; r++)
                        _e(this.charCodeAt(r)) || this.error("Integer is expected", r)
        }
        function _t(e) {
                return Ot.call(this, 0, e)
        }
        function It(e, t) {
                if (!this.cmpChar(this.tokenStart + e, t)) {
                        let r = "";
                        switch (t) {
                        case Et:
                                r = "N is expected";
                                break;
                        case Tt:
                                r = "HyphenMinus is expected"
                        }
                        this.error(r, this.tokenStart + e)
                }
        }
        function Nt() {
                let e = 0
                  , t = 0
                  , r = this.tokenType;
                for (; 13 === r || 25 === r; )
                        r = this.lookupType(++e);
                if (10 !== r) {
                        if (!this.isDelim(At, e) && !this.isDelim(Tt, e))
                                return null;
                        t = this.isDelim(At, e) ? At : Tt;
                        do {
                                r = this.lookupType(++e)
                        } while (13 === r || 25 === r);
                        10 !== r && (this.skip(e),
                        _t.call(this, Lt))
                }
                return e > 0 && this.skip(e),
                0 === t && (r = this.charCodeAt(this.tokenStart),
                r !== At && r !== Tt && this.error("Number sign is expected")),
                _t.call(this, 0 !== t),
                t === Tt ? "-" + this.consume(10) : this.consume(10)
        }
        function Pt() {
                let e = this.tokenStart
                  , t = null
                  , r = null;
                if (10 === this.tokenType)
                        _t.call(this, !1),
                        r = this.consume(10);
                else if (1 === this.tokenType && this.cmpChar(this.tokenStart, Tt))
                        switch (t = "-1",
                        It.call(this, 1, Et),
                        this.tokenEnd - this.tokenStart) {
                        case 2:
                                this.next(),
                                r = Nt.call(this);
                                break;
                        case 3:
                                It.call(this, 2, Tt),
                                this.next(),
                                this.skipSC(),
                                _t.call(this, Lt),
                                r = "-" + this.consume(10);
                                break;
                        default:
                                It.call(this, 2, Tt),
                                Ot.call(this, 3, Lt),
                                this.next(),
                                r = this.substrToCursor(e + 2)
                        }
                else if (1 === this.tokenType || this.isDelim(At) && 1 === this.lookupType(1)) {
                        let n = 0;
                        switch (t = "1",
                        this.isDelim(At) && (n = 1,
                        this.next()),
                        It.call(this, 0, Et),
                        this.tokenEnd - this.tokenStart) {
                        case 1:
                                this.next(),
                                r = Nt.call(this);
                                break;
                        case 2:
                                It.call(this, 1, Tt),
                                this.next(),
                                this.skipSC(),
                                _t.call(this, Lt),
                                r = "-" + this.consume(10);
                                break;
                        default:
                                It.call(this, 1, Tt),
                                Ot.call(this, 2, Lt),
                                this.next(),
                                r = this.substrToCursor(e + n + 1)
                        }
                } else if (12 === this.tokenType) {
                        let n = this.charCodeAt(this.tokenStart)
                          , o = n === At || n === Tt
                          , s = this.tokenStart + o;
                        for (; s < this.tokenEnd && _e(this.charCodeAt(s)); s++)
                                ;
                        s === this.tokenStart + o && this.error("Integer is expected", this.tokenStart + o),
                        It.call(this, s - this.tokenStart, Et),
                        t = this.substring(e, s),
                        s + 1 === this.tokenEnd ? (this.next(),
                        r = Nt.call(this)) : (It.call(this, s - this.tokenStart + 1, Tt),
                        s + 2 === this.tokenEnd ? (this.next(),
                        this.skipSC(),
                        _t.call(this, Lt),
                        r = "-" + this.consume(10)) : (Ot.call(this, s - this.tokenStart + 2, Lt),
                        this.next(),
                        r = this.substrToCursor(s + 1)))
                } else
                        this.error();
                return null !== t && t.charCodeAt(0) === At && (t = t.substr(1)),
                null !== r && r.charCodeAt(0) === At && (r = r.substr(1)),
                {
                        type: "AnPlusB",
                        loc: this.getLocation(e, this.tokenStart),
                        a: t,
                        b: r
                }
        }
        function jt(e) {
                if (e.a) {
                        let t = ("+1" === e.a || "1" === e.a ? "n" : "-1" === e.a && "-n") || e.a + "n";
                        if (e.b) {
                                let r = "-" === e.b[0] || "+" === e.b[0] ? e.b : "+" + e.b;
                                this.tokenize(t + r)
                        } else
                                this.tokenize(t)
                } else
                        this.tokenize(e.b)
        }
        function Mt(e) {
                this.token(3, "@" + e.name),
                null !== e.prelude && this.node(e.prelude),
                e.block ? this.node(e.block) : this.token(17, ";")
        }
        function Rt(e) {
                this.children(e)
        }
        var Dt = 36
          , Bt = 42
          , Ft = 61
          , Ut = 94
          , Vt = 124
          , zt = 126;
        function $t() {
                this.eof && this.error("Unexpected end of input");
                let e = this.tokenStart
                  , t = !1;
                return this.isDelim(Bt) ? (t = !0,
                this.next()) : this.isDelim(Vt) || this.eat(1),
                this.isDelim(Vt) ? this.charCodeAt(this.tokenStart + 1) !== Ft ? (this.next(),
                this.eat(1)) : t && this.error("Identifier is expected", this.tokenEnd) : t && this.error("Vertical line is expected"),
                {
                        type: "Identifier",
                        loc: this.getLocation(e, this.tokenStart),
                        name: this.substrToCursor(e)
                }
        }
        function qt() {
                let e = this.tokenStart
                  , t = this.charCodeAt(e);
                return t !== Ft && t !== zt && t !== Ut && t !== Dt && t !== Bt && t !== Vt && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),
                this.next(),
                t !== Ft && (this.isDelim(Ft) || this.error("Equal sign is expected"),
                this.next()),
                this.substrToCursor(e)
        }
        function Jt() {
                let e, t = this.tokenStart, r = null, n = null, o = null;
                return this.eat(19),
                this.skipSC(),
                e = $t.call(this),
                this.skipSC(),
                20 !== this.tokenType && (1 !== this.tokenType && (r = qt.call(this),
                this.skipSC(),
                n = 5 === this.tokenType ? this.String() : this.Identifier(),
                this.skipSC()),
                1 === this.tokenType && (o = this.consume(1),
                this.skipSC())),
                this.eat(20),
                {
                        type: "AttributeSelector",
                        loc: this.getLocation(t, this.tokenStart),
                        name: e,
                        matcher: r,
                        value: n,
                        flags: o
                }
        }
        function Wt(e) {
                this.token(9, "["),
                this.node(e.name),
                null !== e.matcher && (this.tokenize(e.matcher),
                this.node(e.value)),
                null !== e.flags && this.token(1, e.flags),
                this.token(9, "]")
        }
        function Ht(e) {
                this.token(23, "{"),
                this.children(e, (e=>{
                        "Declaration" === e.type && this.token(17, ";")
                }
                )),
                this.token(24, "}")
        }
        function Gt(e) {
                this.token(9, "["),
                this.children(e),
                this.token(9, "]")
        }
        function Kt() {
                this.token(15, "--\x3e")
        }
        function Qt() {
                this.token(14, "\x3c!--")
        }
        function Yt() {
                return this.eatDelim(46),
                {
                        type: "ClassSelector",
                        loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
                        name: this.consume(1)
                }
        }
        function Xt(e) {
                this.token(9, "."),
                this.token(1, e.name)
        }
        function Zt() {
                let e, t = this.tokenStart;
                switch (this.tokenType) {
                case 13:
                        e = " ";
                        break;
                case 9:
                        switch (this.charCodeAt(this.tokenStart)) {
                        case 62:
                        case 43:
                        case 126:
                                this.next();
                                break;
                        case 47:
                                this.next(),
                                this.eatIdent("deep"),
                                this.eatDelim(47);
                                break;
                        default:
                                this.error("Combinator is expected")
                        }
                        e = this.substrToCursor(t)
                }
                return {
                        type: "Combinator",
                        loc: this.getLocation(t, this.tokenStart),
                        name: e
                }
        }
        function er(e) {
                this.tokenize(e.name)
        }
        function tr(e) {
                this.token(25, "/*" + e.value + "*/")
        }
        function rr(e) {
                this.token(1, e.property),
                this.token(16, ":"),
                this.node(e.value),
                e.important && (this.token(9, "!"),
                this.token(1, !0 === e.important ? "important" : e.important))
        }
        function nr(e) {
                this.children(e, (e=>{
                        "Declaration" === e.type && this.token(17, ";")
                }
                ))
        }
        function or(e) {
                this.token(12, e.value + e.unit)
        }
        function sr(e) {
                this.token(2, e.name + "("),
                this.children(e),
                this.token(22, ")")
        }
        function ir(e) {
                this.token(4, "#" + e.value)
        }
        function ar() {
                return {
                        type: "Identifier",
                        loc: this.getLocation(this.tokenStart, this.tokenEnd),
                        name: this.consume(1)
                }
        }
        function lr(e) {
                this.token(1, e.name)
        }
        function cr() {
                let e = this.tokenStart;
                return this.eat(4),
                {
                        type: "IdSelector",
                        loc: this.getLocation(e, this.tokenStart),
                        name: this.substrToCursor(e + 1)
                }
        }
        function ur(e) {
                this.token(9, "#" + e.name)
        }
        function hr(e) {
                this.token(21, "("),
                this.token(1, e.name),
                null !== e.value && (this.token(16, ":"),
                this.node(e.value)),
                this.token(22, ")")
        }
        function dr(e) {
                this.children(e)
        }
        function pr(e) {
                this.children(e, (()=>this.token(18, ",")))
        }
        function fr() {
                let e = this.tokenStart;
                return this.eatDelim(38),
                {
                        type: "NestingSelector",
                        loc: this.getLocation(e, this.tokenStart)
                }
        }
        function mr() {
                this.token(9, "&")
        }
        function gr() {
                this.skipSC();
                let e, t = this.tokenStart, r = t, n = null;
                return e = this.lookupValue(0, "odd") || this.lookupValue(0, "even") ? this.Identifier() : this.AnPlusB(),
                r = this.tokenStart,
                this.skipSC(),
                this.lookupValue(0, "of") && (this.next(),
                n = this.SelectorList(),
                r = this.tokenStart),
                {
                        type: "Nth",
                        loc: this.getLocation(t, r),
                        nth: e,
                        selector: n
                }
        }
        function kr(e) {
                this.node(e.nth),
                null !== e.selector && (this.token(1, "of"),
                this.node(e.selector))
        }
        function yr(e) {
                this.token(10, e.value)
        }
        function br(e) {
                this.tokenize(e.value)
        }
        function vr(e) {
                this.token(21, "("),
                this.children(e),
                this.token(22, ")")
        }
        function Sr() {
                return {
                        type: "Percentage",
                        loc: this.getLocation(this.tokenStart, this.tokenEnd),
                        value: this.consumeNumber(11)
                }
        }
        function Cr(e) {
                this.token(11, e.value + "%")
        }
        function wr() {
                let e, t, r = this.tokenStart, n = null;
                return this.eat(16),
                2 === this.tokenType ? (e = this.consumeFunctionName(),
                t = e.toLowerCase(),
                hasOwnProperty.call(this.pseudo, t) ? (this.skipSC(),
                n = this.pseudo[t].call(this),
                this.skipSC()) : (n = this.createList(),
                n.push(this.Raw(this.tokenIndex, null, !1))),
                this.eat(22)) : e = this.consume(1),
                {
                        type: "PseudoClassSelector",
                        loc: this.getLocation(r, this.tokenStart),
                        name: e,
                        children: n
                }
        }
        function xr(e) {
                this.token(16, ":"),
                null === e.children ? this.token(1, e.name) : (this.token(2, e.name + "("),
                this.children(e),
                this.token(22, ")"))
        }
        function Ar() {
                let e, t, r = this.tokenStart, n = null;
                return this.eat(16),
                this.eat(16),
                2 === this.tokenType ? (e = this.consumeFunctionName(),
                t = e.toLowerCase(),
                hasOwnProperty.call(this.pseudo, t) ? (this.skipSC(),
                n = this.pseudo[t].call(this),
                this.skipSC()) : (n = this.createList(),
                n.push(this.Raw(this.tokenIndex, null, !1))),
                this.eat(22)) : e = this.consume(1),
                {
                        type: "PseudoElementSelector",
                        loc: this.getLocation(r, this.tokenStart),
                        name: e,
                        children: n
                }
        }
        function Tr(e) {
                this.token(16, ":"),
                this.token(16, ":"),
                null === e.children ? this.token(1, e.name) : (this.token(2, e.name + "("),
                this.children(e),
                this.token(22, ")"))
        }
        function Er(e) {
                this.token(10, e.left),
                this.token(9, "/"),
                this.token(10, e.right)
        }
        function Lr() {
                return this.tokenIndex > 0 && 13 === this.lookupType(-1) ? this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset : this.tokenStart
        }
        function Or(e, t, r) {
                let n, o = this.getTokenStart(e);
                return this.skipUntilBalanced(e, t || this.consumeUntilBalanceEnd),
                n = r && this.tokenStart > o ? Lr.call(this) : this.tokenStart,
                {
                        type: "Raw",
                        loc: this.getLocation(o, n),
                        value: this.substring(o, n)
                }
        }
        function _r(e) {
                this.tokenize(e.value)
        }
        function Ir(e) {
                this.node(e.prelude),
                this.node(e.block)
        }
        function Nr() {
                let e = this.readSequence(this.scope.Selector);
                return null === this.getFirstListNode(e) && this.error("Selector is expected"),
                {
                        type: "Selector",
                        loc: this.getLocationFromList(e),
                        children: e
                }
        }
        function Pr(e) {
                this.children(e)
        }
        function jr() {
                let e = this.createList();
                for (; !this.eof && (e.push(this.Selector()),
                18 === this.tokenType); )
                        this.next();
                return {
                        type: "SelectorList",
                        loc: this.getLocationFromList(e),
                        children: e
                }
        }
        function Mr(e) {
                this.children(e, (()=>this.token(18, ",")))
        }
        var Rr = 92
          , Dr = 34
          , Br = 39;
        function Fr(e) {
                let t = e.length
                  , r = e.charCodeAt(0)
                  , n = r === Dr || r === Br ? 1 : 0
                  , o = 1 === n && t > 1 && e.charCodeAt(t - 1) === r ? t - 2 : t - 1
                  , s = "";
                for (let r = n; r <= o; r++) {
                        let n = e.charCodeAt(r);
                        if (n === Rr) {
                                if (r === o) {
                                        r !== t - 1 && (s = e.substr(r + 1));
                                        break
                                }
                                if (n = e.charCodeAt(++r),
                                Be(Rr, n)) {
                                        let t = r - 1
                                          , n = et(e, t);
                                        r = n - 1,
                                        s += ot(e.substring(t + 1, n))
                                } else
                                        13 === n && 10 === e.charCodeAt(r + 1) && r++
                        } else
                                s += e[r]
                }
                return s
        }
        function Ur() {
                return {
                        type: "String",
                        loc: this.getLocation(this.tokenStart, this.tokenEnd),
                        value: Fr(this.consume(5))
                }
        }
        function Vr(e) {
                this.token(5, function(e, t) {
                        let r = Dr
                          , n = ""
                          , o = !1;
                        for (let t = 0; t < e.length; t++) {
                                let s = e.charCodeAt(t);
                                0 !== s ? s <= 31 || 127 === s ? (n += "\\" + s.toString(16),
                                o = !0) : s === r || s === Rr ? (n += "\\" + e.charAt(t),
                                o = !1) : (o && (Ie(s) || De(s)) && (n += " "),
                                n += e.charAt(t),
                                o = !1) : n += "\ufffd"
                        }
                        return '"' + n + '"'
                }(e.value))
        }
        function zr(e) {
                this.children(e)
        }
        var $r = 42;
        function qr() {
                1 !== this.tokenType && !1 === this.isDelim($r) && this.error("Identifier or asterisk is expected"),
                this.next()
        }
        function Jr() {
                let e = this.tokenStart;
                return this.isDelim(124) ? (this.next(),
                qr.call(this)) : (qr.call(this),
                this.isDelim(124) && (this.next(),
                qr.call(this))),
                {
                        type: "TypeSelector",
                        loc: this.getLocation(e, this.tokenStart),
                        name: this.substrToCursor(e)
                }
        }
        function Wr(e) {
                this.tokenize(e.name)
        }
        function Hr(e) {
                this.tokenize(e.value)
        }
        var Gr = 32
          , Kr = 92
          , Qr = 34
          , Yr = 39
          , Xr = 40
          , Zr = 41;
        function en(e) {
                this.token(7, function(e) {
                        let t = ""
                          , r = !1;
                        for (let n = 0; n < e.length; n++) {
                                let o = e.charCodeAt(n);
                                0 !== o ? o <= 31 || 127 === o ? (t += "\\" + o.toString(16),
                                r = !0) : o === Gr || o === Kr || o === Qr || o === Yr || o === Xr || o === Zr ? (t += "\\" + e.charAt(n),
                                r = !1) : (r && Ie(o) && (t += " "),
                                t += e.charAt(n),
                                r = !1) : t += "\ufffd"
                        }
                        return "url(" + t + ")"
                }(e.value))
        }
        function tn(e) {
                this.children(e)
        }
        function rn(e) {
                this.token(13, e.value)
        }
        Object.freeze({
                type: "WhiteSpace",
                loc: null,
                value: " "
        });
        var nn = function(e) {
                let t = new Map;
                for (let r in e.node) {
                        let n = e.node[r];
                        "function" == typeof (n.generate || n) && t.set(r, n.generate || n)
                }
                return function(e, r) {
                        let n = ""
                          , o = 0
                          , s = {
                                node(e) {
                                        if (!t.has(e.type))
                                                throw new Error("Unknown node type: " + e.type);
                                        t.get(e.type).call(i, e)
                                },
                                tokenBefore: St,
                                token(e, t) {
                                        o = this.tokenBefore(o, e, t),
                                        this.emit(t, e, !1),
                                        9 === e && 92 === t.charCodeAt(0) && this.emit("\n", 13, !0)
                                },
                                emit(e) {
                                        n += e
                                },
                                result: ()=>n
                        };
                        r && ("function" == typeof r.decorator && (s = r.decorator(s)),
                        r.sourceMap && (s = function(e) {
                                let t = new pt.SourceMapGenerator
                                  , r = {
                                        line: 1,
                                        column: 0
                                }
                                  , n = {
                                        line: 0,
                                        column: 0
                                }
                                  , o = {
                                        line: 1,
                                        column: 0
                                }
                                  , s = {
                                        generated: o
                                }
                                  , i = 1
                                  , a = 0
                                  , l = !1
                                  , c = e.node;
                                e.node = function(e) {
                                        if (e.loc && e.loc.start && ft.has(e.type)) {
                                                let c = e.loc.start.line
                                                  , u = e.loc.start.column - 1;
                                                (n.line !== c || n.column !== u) && (n.line = c,
                                                n.column = u,
                                                r.line = i,
                                                r.column = a,
                                                l && (l = !1,
                                                (r.line !== o.line || r.column !== o.column) && t.addMapping(s)),
                                                l = !0,
                                                t.addMapping({
                                                        source: e.loc.source,
                                                        original: n,
                                                        generated: r
                                                }))
                                        }
                                        c.call(this, e),
                                        l && ft.has(e.type) && (o.line = i,
                                        o.column = a)
                                }
                                ;
                                let u = e.emit;
                                e.emit = function(e, t, r) {
                                        for (let t = 0; t < e.length; t++)
                                                10 === e.charCodeAt(t) ? (i++,
                                                a = 0) : a++;
                                        u(e, t, r)
                                }
                                ;
                                let h = e.result;
                                return e.result = function() {
                                        return l && t.addMapping(s),
                                        {
                                                css: h(),
                                                map: t
                                        }
                                }
                                ,
                                e
                        }(s)),
                        r.mode in mt && (s.tokenBefore = mt[r.mode]));
                        let i = {
                                node: e=>s.node(e),
                                children: Ct,
                                token: (e,t)=>s.token(e, t),
                                tokenize: wt
                        };
                        return s.node(e),
                        s.result()
                }
        }({
                node: xt
        })
          , on = null
          , sn = class {
                static createItem(e) {
                        return {
                                prev: null,
                                next: null,
                                data: e
                        }
                }
                constructor() {
                        this.head = null,
                        this.tail = null,
                        this.cursor = null
                }
                createItem(e) {
                        return sn.createItem(e)
                }
                allocateCursor(e, t) {
                        let r;
                        return null !== on ? (r = on,
                        on = on.cursor,
                        r.prev = e,
                        r.next = t,
                        r.cursor = this.cursor) : r = {
                                prev: e,
                                next: t,
                                cursor: this.cursor
                        },
                        this.cursor = r,
                        r
                }
                releaseCursor() {
                        let {cursor: e} = this;
                        this.cursor = e.cursor,
                        e.prev = null,
                        e.next = null,
                        e.cursor = on,
                        on = e
                }
                updateCursors(e, t, r, n) {
                        let {cursor: o} = this;
                        for (; null !== o; )
                                o.prev === e && (o.prev = t),
                                o.next === r && (o.next = n),
                                o = o.cursor
                }
                *[Symbol.iterator]() {
                        for (let e = this.head; null !== e; e = e.next)
                                yield e.data
                }
                get size() {
                        let e = 0;
                        for (let t = this.head; null !== t; t = t.next)
                                e++;
                        return e
                }
                get isEmpty() {
                        return null === this.head
                }
                get first() {
                        return this.head && this.head.data
                }
                get last() {
                        return this.tail && this.tail.data
                }
                fromArray(e) {
                        let t = null;
                        this.head = null;
                        for (let r of e) {
                                let e = sn.createItem(r);
                                null !== t ? t.next = e : this.head = e,
                                e.prev = t,
                                t = e
                        }
                        return this.tail = t,
                        this
                }
                toArray() {
                        return [...this]
                }
                toJSON() {
                        return [...this]
                }
                forEach(e, t=this) {
                        let r = this.allocateCursor(null, this.head);
                        for (; null !== r.next; ) {
                                let n = r.next;
                                r.next = n.next,
                                e.call(t, n.data, n, this)
                        }
                        this.releaseCursor()
                }
                forEachRight(e, t=this) {
                        let r = this.allocateCursor(this.tail, null);
                        for (; null !== r.prev; ) {
                                let n = r.prev;
                                r.prev = n.prev,
                                e.call(t, n.data, n, this)
                        }
                        this.releaseCursor()
                }
                reduce(e, t, r=this) {
                        let n, o = this.allocateCursor(null, this.head), s = t;
                        for (; null !== o.next; )
                                n = o.next,
                                o.next = n.next,
                                s = e.call(r, s, n.data, n, this);
                        return this.releaseCursor(),
                        s
                }
                reduceRight(e, t, r=this) {
                        let n, o = this.allocateCursor(this.tail, null), s = t;
                        for (; null !== o.prev; )
                                n = o.prev,
                                o.prev = n.prev,
                                s = e.call(r, s, n.data, n, this);
                        return this.releaseCursor(),
                        s
                }
                some(e, t=this) {
                        for (let r = this.head; null !== r; r = r.next)
                                if (e.call(t, r.data, r, this))
                                        return !0;
                        return !1
                }
                map(e, t=this) {
                        let r = new sn;
                        for (let n = this.head; null !== n; n = n.next)
                                r.appendData(e.call(t, n.data, n, this));
                        return r
                }
                filter(e, t=this) {
                        let r = new sn;
                        for (let n = this.head; null !== n; n = n.next)
                                e.call(t, n.data, n, this) && r.appendData(n.data);
                        return r
                }
                nextUntil(e, t, r=this) {
                        if (null === e)
                                return;
                        let n = this.allocateCursor(null, e);
                        for (; null !== n.next; ) {
                                let e = n.next;
                                if (n.next = e.next,
                                t.call(r, e.data, e, this))
                                        break
                        }
                        this.releaseCursor()
                }
                prevUntil(e, t, r=this) {
                        if (null === e)
                                return;
                        let n = this.allocateCursor(e, null);
                        for (; null !== n.prev; ) {
                                let e = n.prev;
                                if (n.prev = e.prev,
                                t.call(r, e.data, e, this))
                                        break
                        }
                        this.releaseCursor()
                }
                clear() {
                        this.head = null,
                        this.tail = null
                }
                copy() {
                        let e = new sn;
                        for (let t of this)
                                e.appendData(t);
                        return e
                }
                prepend(e) {
                        return this.updateCursors(null, e, this.head, e),
                        null !== this.head ? (this.head.prev = e,
                        e.next = this.head) : this.tail = e,
                        this.head = e,
                        this
                }
                prependData(e) {
                        return this.prepend(sn.createItem(e))
                }
                append(e) {
                        return this.insert(e)
                }
                appendData(e) {
                        return this.insert(sn.createItem(e))
                }
                insert(e, t=null) {
                        if (null !== t)
                                if (this.updateCursors(t.prev, e, t, e),
                                null === t.prev) {
                                        if (this.head !== t)
                                                throw new Error("before doesn't belong to list");
                                        this.head = e,
                                        t.prev = e,
                                        e.next = t,
                                        this.updateCursors(null, e)
                                } else
                                        t.prev.next = e,
                                        e.prev = t.prev,
                                        t.prev = e,
                                        e.next = t;
                        else
                                this.updateCursors(this.tail, e, null, e),
                                null !== this.tail ? (this.tail.next = e,
                                e.prev = this.tail) : this.head = e,
                                this.tail = e;
                        return this
                }
                insertData(e, t) {
                        return this.insert(sn.createItem(e), t)
                }
                remove(e) {
                        if (this.updateCursors(e, e.prev, e, e.next),
                        null !== e.prev)
                                e.prev.next = e.next;
                        else {
                                if (this.head !== e)
                                        throw new Error("item doesn't belong to list");
                                this.head = e.next
                        }
                        if (null !== e.next)
                                e.next.prev = e.prev;
                        else {
                                if (this.tail !== e)
                                        throw new Error("item doesn't belong to list");
                                this.tail = e.prev
                        }
                        return e.prev = null,
                        e.next = null,
                        e
                }
                push(e) {
                        this.insert(sn.createItem(e))
                }
                pop() {
                        return null !== this.tail ? this.remove(this.tail) : null
                }
                unshift(e) {
                        this.prepend(sn.createItem(e))
                }
                shift() {
                        return null !== this.head ? this.remove(this.head) : null
                }
                prependList(e) {
                        return this.insertList(e, this.head)
                }
                appendList(e) {
                        return this.insertList(e)
                }
                insertList(e, t) {
                        return null === e.head || (null != t ? (this.updateCursors(t.prev, e.tail, t, e.head),
                        null !== t.prev ? (t.prev.next = e.head,
                        e.head.prev = t.prev) : this.head = e.head,
                        t.prev = e.tail,
                        e.tail.next = t) : (this.updateCursors(this.tail, e.tail, null, e.head),
                        null !== this.tail ? (this.tail.next = e.head,
                        e.head.prev = this.tail) : this.head = e.head,
                        this.tail = e.tail),
                        e.head = null,
                        e.tail = null),
                        this
                }
                replace(e, t) {
                        "head"in t ? this.insertList(t, e) : this.insert(t, e),
                        this.remove(e)
                }
        }
          , an = 100
          , ln = 60
          , cn = "    ";
        function un({source: e, line: t, column: r}, n) {
                function o(e, t) {
                        return s.slice(e, t).map(((t,r)=>String(e + r + 1).padStart(l) + " |" + t)).join("\n")
                }
                let s = e.split(/\r\n?|\n|\f/)
                  , i = Math.max(1, t - n) - 1
                  , a = Math.min(t + n, s.length + 1)
                  , l = Math.max(4, String(a).length) + 1
                  , c = 0;
                (r += (cn.length - 1) * (s[t - 1].substr(0, r - 1).match(/\t/g) || []).length) > an && (c = r - ln + 3,
                r = ln - 2);
                for (let e = i; e <= a; e++)
                        e >= 0 && e < s.length && (s[e] = s[e].replace(/\t/g, cn),
                        s[e] = (c > 0 && s[e].length > c ? "\u2026" : "") + s[e].substr(c, an - 2) + (s[e].length > c + an - 1 ? "\u2026" : ""));
                return [o(i, t), new Array(r + l + 2).join("-") + "^", o(t, a)].filter(Boolean).join("\n")
        }
        function hn(e, t, r, n, o) {
                return Object.assign(function(e, t) {
                        let r = Object.create(SyntaxError.prototype)
                          , n = new Error;
                        return Object.assign(r, {
                                name: e,
                                message: t,
                                get stack() {
                                        return (n.stack || "").replace(/^(.+\n){1,3}/, `${e}: ${t}\n`)
                                }
                        })
                }("SyntaxError", e), {
                        source: t,
                        offset: r,
                        line: n,
                        column: o,
                        sourceFragment: e=>un({
                                source: t,
                                line: n,
                                column: o
                        }, isNaN(e) ? 0 : e),
                        get formattedMessage() {
                                return `Parse error: ${e}\n` + un({
                                        source: t,
                                        line: n,
                                        column: o
                                }, 2)
                        }
                })
        }
        function dn(e) {
                let t = this.createList()
                  , r = !1
                  , n = {
                        recognizer: e
                };
                for (; !this.eof; ) {
                        switch (this.tokenType) {
                        case 25:
                                this.next();
                                continue;
                        case 13:
                                r = !0,
                                this.next();
                                continue
                        }
                        let o = e.getNode.call(this, n);
                        if (void 0 === o)
                                break;
                        r && (e.onWhiteSpace && e.onWhiteSpace.call(this, o, t, n),
                        r = !1),
                        t.push(o)
                }
                return r && e.onWhiteSpace && e.onWhiteSpace.call(this, null, t, n),
                t
        }
        var pn = ()=>{}
        ;
        function fn(e) {
                return function() {
                        return this[e]()
                }
        }
        function mn(e) {
                let t = Object.create(null);
                for (let r in e) {
                        let n = e[r]
                          , o = n.parse || n;
                        o && (t[r] = o)
                }
                return t
        }
        var gn = {
                parse() {
                        return this.createSingleNodeList(this.SelectorList())
                }
        }
          , kn = {
                parse() {
                        return this.createSingleNodeList(this.Selector())
                }
        }
          , yn = {
                parse() {
                        return this.createSingleNodeList(this.Identifier())
                }
        }
          , bn = {
                parse() {
                        return this.createSingleNodeList(this.Nth())
                }
        }
          , vn = {
                dir: yn,
                has: gn,
                lang: yn,
                matches: gn,
                is: gn,
                "-moz-any": gn,
                "-webkit-any": gn,
                where: gn,
                not: gn,
                "nth-child": bn,
                "nth-last-child": bn,
                "nth-last-of-type": bn,
                "nth-of-type": bn,
                slotted: kn,
                host: kn,
                "host-context": kn
        }
          , Sn = {};
        we(Sn, {
                AnPlusB: ()=>Pt,
                AttributeSelector: ()=>Jt,
                ClassSelector: ()=>Yt,
                Combinator: ()=>Zt,
                IdSelector: ()=>cr,
                Identifier: ()=>ar,
                NestingSelector: ()=>fr,
                Nth: ()=>gr,
                Percentage: ()=>Sr,
                PseudoClassSelector: ()=>wr,
                PseudoElementSelector: ()=>Ar,
                Raw: ()=>Or,
                Selector: ()=>Nr,
                SelectorList: ()=>jr,
                String: ()=>Ur,
                TypeSelector: ()=>Jr
        });
        var Cn = function(e) {
                let t = ""
                  , r = "<unknown>"
                  , n = !1
                  , o = pn
                  , s = !1
                  , i = new class {
                        constructor() {
                                this.lines = null,
                                this.columns = null,
                                this.computed = !1
                        }
                        setSource(e, t=0, r=1, n=1) {
                                this.source = e,
                                this.startOffset = t,
                                this.startLine = r,
                                this.startColumn = n,
                                this.computed = !1
                        }
                        getLocation(e, t) {
                                return this.computed || at(this),
                                {
                                        source: t,
                                        offset: this.startOffset + e,
                                        line: this.lines[e],
                                        column: this.columns[e]
                                }
                        }
                        getLocationRange(e, t, r) {
                                return this.computed || at(this),
                                {
                                        source: r,
                                        start: {
                                                offset: this.startOffset + e,
                                                line: this.lines[e],
                                                column: this.columns[e]
                                        },
                                        end: {
                                                offset: this.startOffset + t,
                                                line: this.lines[t],
                                                column: this.columns[t]
                                        }
                                }
                        }
                }
                  , a = Object.assign(new class {
                        constructor(e, t) {
                                this.setSource(e, t)
                        }
                        reset() {
                                this.eof = !1,
                                this.tokenIndex = -1,
                                this.tokenType = 0,
                                this.tokenStart = this.firstCharOffset,
                                this.tokenEnd = this.firstCharOffset
                        }
                        setSource(e="", t=(()=>{}
                        )) {
                                let r = (e = String(e || "")).length
                                  , n = it(this.offsetAndType, e.length + 1)
                                  , o = it(this.balance, e.length + 1)
                                  , s = 0
                                  , i = 0
                                  , a = 0
                                  , l = -1;
                                for (this.offsetAndType = null,
                                this.balance = null,
                                t(e, ((e,t,c)=>{
                                        switch (e) {
                                        default:
                                                o[s] = r;
                                                break;
                                        case i:
                                                {
                                                        let e = a & lt;
                                                        for (a = o[e],
                                                        i = a >> ct,
                                                        o[s] = e,
                                                        o[e++] = s; e < s; e++)
                                                                o[e] === r && (o[e] = s);
                                                        break
                                                }
                                        case 21:
                                        case 2:
                                        case 19:
                                        case 23:
                                                o[s] = a,
                                                i = ut.get(e),
                                                a = i << ct | s
                                        }
                                        n[s++] = e << ct | c,
                                        -1 === l && (l = t)
                                }
                                )),
                                n[s] = 0 | r,
                                o[s] = r,
                                o[r] = r; 0 !== a; ) {
                                        let e = a & lt;
                                        a = o[e],
                                        o[e] = r
                                }
                                this.source = e,
                                this.firstCharOffset = -1 === l ? 0 : l,
                                this.tokenCount = s,
                                this.offsetAndType = n,
                                this.balance = o,
                                this.reset(),
                                this.next()
                        }
                        lookupType(e) {
                                return (e += this.tokenIndex) < this.tokenCount ? this.offsetAndType[e] >> ct : 0
                        }
                        lookupOffset(e) {
                                return (e += this.tokenIndex) < this.tokenCount ? this.offsetAndType[e - 1] & lt : this.source.length
                        }
                        lookupValue(e, t) {
                                return (e += this.tokenIndex) < this.tokenCount && Ye(this.source, this.offsetAndType[e - 1] & lt, this.offsetAndType[e] & lt, t)
                        }
                        getTokenStart(e) {
                                return e === this.tokenIndex ? this.tokenStart : e > 0 ? e < this.tokenCount ? this.offsetAndType[e - 1] & lt : this.offsetAndType[this.tokenCount] & lt : this.firstCharOffset
                        }
                        substrToCursor(e) {
                                return this.source.substring(e, this.tokenStart)
                        }
                        isBalanceEdge(e) {
                                return this.balance[this.tokenIndex] < e
                        }
                        isDelim(e, t) {
                                return t ? 9 === this.lookupType(t) && this.source.charCodeAt(this.lookupOffset(t)) === e : 9 === this.tokenType && this.source.charCodeAt(this.tokenStart) === e
                        }
                        skip(e) {
                                let t = this.tokenIndex + e;
                                t < this.tokenCount ? (this.tokenIndex = t,
                                this.tokenStart = this.offsetAndType[t - 1] & lt,
                                t = this.offsetAndType[t],
                                this.tokenType = t >> ct,
                                this.tokenEnd = t & lt) : (this.tokenIndex = this.tokenCount,
                                this.next())
                        }
                        next() {
                                let e = this.tokenIndex + 1;
                                e < this.tokenCount ? (this.tokenIndex = e,
                                this.tokenStart = this.tokenEnd,
                                e = this.offsetAndType[e],
                                this.tokenType = e >> ct,
                                this.tokenEnd = e & lt) : (this.eof = !0,
                                this.tokenIndex = this.tokenCount,
                                this.tokenType = 0,
                                this.tokenStart = this.tokenEnd = this.source.length)
                        }
                        skipSC() {
                                for (; 13 === this.tokenType || 25 === this.tokenType; )
                                        this.next()
                        }
                        skipUntilBalanced(e, t) {
                                let r, n, o = e;
                                e: for (; o < this.tokenCount && (r = this.balance[o],
                                !(r < e)); o++)
                                        switch (n = o > 0 ? this.offsetAndType[o - 1] & lt : this.firstCharOffset,
                                        t(this.source.charCodeAt(n))) {
                                        case 1:
                                                break e;
                                        case 2:
                                                o++;
                                                break e;
                                        default:
                                                this.balance[r] === o && (o = r)
                                        }
                                this.skip(o - this.tokenIndex)
                        }
                        forEachToken(e) {
                                for (let t = 0, r = this.firstCharOffset; t < this.tokenCount; t++) {
                                        let n = r
                                          , o = this.offsetAndType[t]
                                          , s = o & lt;
                                        r = s,
                                        e(o >> ct, n, s, t)
                                }
                        }
                        dump() {
                                let e = new Array(this.tokenCount);
                                return this.forEachToken(((t,r,n,o)=>{
                                        e[o] = {
                                                idx: o,
                                                type: st[t],
                                                chunk: this.source.substring(r, n),
                                                balance: this.balance[o]
                                        }
                                }
                                )),
                                e
                        }
                }
                , function(e) {
                        let t = {
                                context: Object.create(null),
                                scope: Object.assign(Object.create(null), e.scope),
                                atrule: mn(e.atrule),
                                pseudo: mn(e.pseudo),
                                node: mn(e.node)
                        };
                        for (let r in e.parseContext)
                                switch (typeof e.parseContext[r]) {
                                case "function":
                                        t.context[r] = e.parseContext[r];
                                        break;
                                case "string":
                                        t.context[r] = fn(e.parseContext[r])
                                }
                        return {
                                config: t,
                                ...t,
                                ...t.node
                        }
                }(e || {}), {
                        parseAtrulePrelude: !0,
                        parseRulePrelude: !0,
                        parseValue: !0,
                        parseCustomProperty: !1,
                        readSequence: dn,
                        consumeUntilBalanceEnd: ()=>0,
                        consumeUntilLeftCurlyBracket: e=>123 === e ? 1 : 0,
                        consumeUntilLeftCurlyBracketOrSemicolon: e=>123 === e || 59 === e ? 1 : 0,
                        consumeUntilExclamationMarkOrSemicolon: e=>33 === e || 59 === e ? 1 : 0,
                        consumeUntilSemicolonIncluded: e=>59 === e ? 2 : 0,
                        createList: ()=>new sn,
                        createSingleNodeList: e=>(new sn).appendData(e),
                        getFirstListNode: e=>e && e.first,
                        getLastListNode: e=>e && e.last,
                        parseWithFallback(e, t) {
                                let r = this.tokenIndex;
                                try {
                                        return e.call(this)
                                } catch (e) {
                                        if (s)
                                                throw e;
                                        let n = t.call(this, r);
                                        return s = !0,
                                        o(e, n),
                                        s = !1,
                                        n
                                }
                        },
                        lookupNonWSType(e) {
                                let t;
                                do {
                                        if (t = this.lookupType(e++),
                                        13 !== t)
                                                return t
                                } while (0 !== t);
                                return 0
                        },
                        charCodeAt: e=>e >= 0 && e < t.length ? t.charCodeAt(e) : 0,
                        substring: (e,r)=>t.substring(e, r),
                        substrToCursor(e) {
                                return this.source.substring(e, this.tokenStart)
                        },
                        cmpChar: (e,r)=>Qe(t, e, r),
                        cmpStr: (e,r,n)=>Ye(t, e, r, n),
                        consume(e) {
                                let t = this.tokenStart;
                                return this.eat(e),
                                this.substrToCursor(t)
                        },
                        consumeFunctionName() {
                                let e = t.substring(this.tokenStart, this.tokenEnd - 1);
                                return this.eat(2),
                                e
                        },
                        consumeNumber(e) {
                                let r = t.substring(this.tokenStart, rt(t, this.tokenStart));
                                return this.eat(e),
                                r
                        },
                        eat(e) {
                                if (this.tokenType !== e) {
                                        let t = st[e].slice(0, -6).replace(/-/g, " ").replace(/^./, (e=>e.toUpperCase()))
                                          , r = `${/[[\](){}]/.test(t) ? `"${t}"` : t} is expected`
                                          , n = this.tokenStart;
                                        switch (e) {
                                        case 1:
                                                2 === this.tokenType || 7 === this.tokenType ? (n = this.tokenEnd - 1,
                                                r = "Identifier is expected but function found") : r = "Identifier is expected";
                                                break;
                                        case 4:
                                                this.isDelim(35) && (this.next(),
                                                n++,
                                                r = "Name is expected");
                                                break;
                                        case 11:
                                                10 === this.tokenType && (n = this.tokenEnd,
                                                r = "Percent sign is expected")
                                        }
                                        this.error(r, n)
                                }
                                this.next()
                        },
                        eatIdent(e) {
                                (1 !== this.tokenType || !1 === this.lookupValue(0, e)) && this.error(`Identifier "${e}" is expected`),
                                this.next()
                        },
                        eatDelim(e) {
                                this.isDelim(e) || this.error(`Delim "${String.fromCharCode(e)}" is expected`),
                                this.next()
                        },
                        getLocation: (e,t)=>n ? i.getLocationRange(e, t, r) : null,
                        getLocationFromList(e) {
                                if (n) {
                                        let t = this.getFirstListNode(e)
                                          , n = this.getLastListNode(e);
                                        return i.getLocationRange(null !== t ? t.loc.start.offset - i.startOffset : this.tokenStart, null !== n ? n.loc.end.offset - i.startOffset : this.tokenStart, r)
                                }
                                return null
                        },
                        error(e, r) {
                                let n = typeof r < "u" && r < t.length ? i.getLocation(r) : this.eof ? i.getLocation(function(e, t) {
                                        for (; t >= 0 && De(e.charCodeAt(t)); t--)
                                                ;
                                        return t + 1
                                }(t, t.length - 1)) : i.getLocation(this.tokenStart);
                                throw new hn(e || "Unexpected input",t,n.offset,n.line,n.column)
                        }
                });
                return Object.assign((function(e, l) {
                        t = e,
                        l = l || {},
                        a.setSource(t, ht),
                        i.setSource(t, l.offset, l.line, l.column),
                        r = l.filename || "<unknown>",
                        n = Boolean(l.positions),
                        o = "function" == typeof l.onParseError ? l.onParseError : pn,
                        s = !1,
                        a.parseAtrulePrelude = !("parseAtrulePrelude"in l) || Boolean(l.parseAtrulePrelude),
                        a.parseRulePrelude = !("parseRulePrelude"in l) || Boolean(l.parseRulePrelude),
                        a.parseValue = !("parseValue"in l) || Boolean(l.parseValue),
                        a.parseCustomProperty = "parseCustomProperty"in l && Boolean(l.parseCustomProperty);
                        let {context: c="default", onComment: u} = l;
                        if (!(c in a.context))
                                throw new Error("Unknown context `" + c + "`");
                        "function" == typeof u && a.forEachToken(((e,r,n)=>{
                                if (25 === e) {
                                        let e = a.getLocation(r, n)
                                          , o = Ye(t, n - 2, n, "*/") ? t.slice(r + 2, n - 2) : t.slice(r + 2, n);
                                        u(o, e)
                                }
                        }
                        ));
                        let h = a.context[c].call(a, l);
                        return a.eof || a.error(),
                        h
                }
                ), {
                        SyntaxError: hn,
                        config: a.config
                })
        }({
                parseContext: {
                        default: "SelectorList",
                        selectorList: "SelectorList",
                        selector: "Selector"
                },
                scope: {
                        Selector: {
                                onWhiteSpace: function(e, t) {
                                        null !== t.last && "Combinator" !== t.last.type && null !== e && "Combinator" !== e.type && t.push({
                                                type: "Combinator",
                                                loc: null,
                                                name: " "
                                        })
                                },
                                getNode: function() {
                                        switch (this.tokenType) {
                                        case 19:
                                                return this.AttributeSelector();
                                        case 4:
                                                return this.IdSelector();
                                        case 16:
                                                return 16 === this.lookupType(1) ? this.PseudoElementSelector() : this.PseudoClassSelector();
                                        case 1:
                                                return this.TypeSelector();
                                        case 10:
                                        case 11:
                                                return this.Percentage();
                                        case 12:
                                                46 === this.charCodeAt(this.tokenStart) && this.error("Identifier is expected", this.tokenStart + 1);
                                                break;
                                        case 9:
                                                switch (this.charCodeAt(this.tokenStart)) {
                                                case 43:
                                                case 62:
                                                case 126:
                                                case 47:
                                                        return this.Combinator();
                                                case 46:
                                                        return this.ClassSelector();
                                                case 42:
                                                case 124:
                                                        return this.TypeSelector();
                                                case 35:
                                                        return this.IdSelector();
                                                case 38:
                                                        return this.NestingSelector()
                                                }
                                        }
                                }
                        }
                },
                atrule: {},
                pseudo: vn,
                node: Sn
        })
          , wn = (e,t)=>e.a === t.a ? e.b === t.b ? e.c - t.c : e.b - t.b : e.a - t.a
          , xn = (e,t)=>0 === wn(e, t)
          , An = (e,t)=>wn(e, t) > 0
          , Tn = (e,t)=>wn(e, t) < 0
          , En = (e,t="ASC")=>{
                let r = e.sort(wn);
                return "DESC" === t ? r.reverse() : r
        }
          , Ln = (...e)=>En(e, "ASC")
          , On = (...e)=>En(e, "DESC")
          , _n = (...e)=>On(...e)[0]
          , In = e=>{
                let t = {
                        a: 0,
                        b: 0,
                        c: 0
                };
                return e.children.forEach((e=>{
                        switch (e.type) {
                        case "IdSelector":
                                t.a += 1;
                                break;
                        case "AttributeSelector":
                        case "ClassSelector":
                                t.b += 1;
                                break;
                        case "PseudoClassSelector":
                                switch (e.name) {
                                case "where":
                                        break;
                                case "is":
                                case "matches":
                                case "-webkit-any":
                                case "-moz-any":
                                case "any":
                                case "not":
                                case "has":
                                        let r = _n(...Nn(e.children.first));
                                        t.a += r.a,
                                        t.b += r.b,
                                        t.c += r.c;
                                        break;
                                case "nth-child":
                                case "nth-last-child":
                                        if (t.b += 1,
                                        e.children.first.selector) {
                                                let r = _n(...Nn(e.children.first.selector));
                                                t.a += r.a,
                                                t.b += r.b,
                                                t.c += r.c
                                        }
                                        break;
                                case "host-context":
                                case "host":
                                        if (t.b += 1,
                                        e.children) {
                                                let r = {
                                                        type: "Selector",
                                                        children: []
                                                }
                                                  , n = !1;
                                                e.children.first.children.forEach((e=>!n && ("Combinator" === e.type ? (n = !0,
                                                !1) : void r.children.push(e))));
                                                let o = Nn(r)[0];
                                                t.a += o.a,
                                                t.b += o.b,
                                                t.c += o.c
                                        }
                                        break;
                                case "after":
                                case "before":
                                case "first-letter":
                                case "first-line":
                                        t.c += 1;
                                        break;
                                default:
                                        t.b += 1
                                }
                                break;
                        case "PseudoElementSelector":
                                if ("slotted" === e.name) {
                                        if (t.c += 1,
                                        e.children) {
                                                let r = {
                                                        type: "Selector",
                                                        children: []
                                                }
                                                  , n = !1;
                                                e.children.first.children.forEach((e=>!n && ("Combinator" === e.type ? (n = !0,
                                                !1) : void r.children.push(e))));
                                                let o = Nn(r)[0];
                                                t.a += o.a,
                                                t.b += o.b,
                                                t.c += o.c
                                        }
                                } else
                                        t.c += 1;
                                break;
                        case "TypeSelector":
                                let r = e.name;
                                r.includes("|") && (r = r.split("|")[1]),
                                "*" !== r && (t.c += 1)
                        }
                }
                )),
                new Pn(t,e)
        }
          , Nn = e=>{
                if (!e)
                        return [];
                let t = (e=>{
                        if ("string" == typeof e || e instanceof String)
                                try {
                                        return Cn(e, {
                                                context: "selectorList"
                                        })
                                } catch (t) {
                                        throw new TypeError(`Could not convert passed in source '${e}' to SelectorList: ${t.message}`)
                                }
                        if (e instanceof Object) {
                                if (e.type && ["Selector", "SelectorList"].includes(e.type))
                                        return e;
                                if (e.type && "Raw" === e.type)
                                        try {
                                                return Cn(e.value, {
                                                        context: "selectorList"
                                                })
                                        } catch (e) {
                                                throw new TypeError(`Could not convert passed in source to SelectorList: ${e.message}`)
                                        }
                                throw new TypeError("Passed in source is an Object but no AST / AST of the type Selector or SelectorList")
                        }
                        throw new TypeError("Passed in source is not a String nor an Object. I don't know what to do with it.")
                }
                )(e);
                if ("Selector" === t.type)
                        return [In(e)];
                if ("SelectorList" === t.type) {
                        let e = [];
                        return t.children.forEach((t=>{
                                let r = In(t);
                                e.push(r)
                        }
                        )),
                        e
                }
        }
          , Pn = class {
                constructor(e, t=null) {
                        this.value = e,
                        this.selector = t
                }
                get a() {
                        return this.value.a
                }
                set a(e) {
                        throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
                }
                get b() {
                        return this.value.b
                }
                set b(e) {
                        throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
                }
                get c() {
                        return this.value.c
                }
                set c(e) {
                        throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
                }
                selectorString() {
                        return "string" == typeof this.selector || this.selector instanceof String ? this.selector : this.selector instanceof Object && "Selector" === this.selector.type ? nn(this.selector) : ""
                }
                toObject() {
                        return this.value
                }
                toArray() {
                        return [this.value.a, this.value.b, this.value.c]
                }
                toString() {
                        return `(${this.value.a},${this.value.b},${this.value.c})`
                }
                toJSON() {
                        return {
                                selector: this.selectorString(),
                                asObject: this.toObject(),
                                asArray: this.toArray(),
                                asString: this.toString()
                        }
                }
                isEqualTo(e) {
                        return xn(this, e)
                }
                isGreaterThan(e) {
                        return An(this, e)
                }
                isLessThan(e) {
                        return Tn(this, e)
                }
                static calculate(e) {
                        return Nn(e)
                }
                static compare(e, t) {
                        return wn(e, t)
                }
                static equals(e, t) {
                        return xn(e, t)
                }
                static lessThan(e, t) {
                        return Tn(e, t)
                }
                static greaterThan(e, t) {
                        return An(e, t)
                }
                static min(...e) {
                        return ((...e)=>Ln(...e)[0])(...e)
                }
                static max(...e) {
                        return _n(...e)
                }
                static sortAsc(...e) {
                        return Ln(...e)
                }
                static sortDesc(...e) {
                        return On(...e)
                }
        }
        ;
        const jn = e=>{
                const t = new Map
                  , r = e=>{
                        const r = t.get(e);
                        if (u(r))
                                return r;
                        {
                                const r = Pn.calculate(e)[0];
                                return t.set(e, r),
                                r
                        }
                }
                ;
                return ((e,t)=>{
                        const n = M.call(e, 0);
                        return n.sort(((e,t)=>{
                                const n = r(e.selector)
                                  , o = r(t.selector);
                                return Pn.compare(n, o)
                        }
                        )),
                        n
                }
                )(e)
        }
          , Mn = e=>{
                const t = {};
                return U(e, (r=>{
                        const n = e.getPropertyValue(r);
                        o(n) && (t[r] = n)
                }
                )),
                t
        }
          , Rn = e=>({
                selector: e.selectorText,
                styles: Mn(e.style)
        })
          , Dn = e=>{
                const t = e.cssRules;
                return q(t, (e=>(e=>e.type === window.CSSRule.IMPORT_RULE)(e) ? Dn(e.styleSheet) : (e=>e.type === window.CSSRule.STYLE_RULE)(e) ? [Rn(e)] : []))
        }
          , Bn = (e,t)=>((e,t)=>{
                const r = {};
                var n;
                return ((e,t,r,n)=>{
                        Z(e, ((e,o)=>{
                                (t(e, o) ? r : n)(e, o)
                        }
                        ))
                }
                )(e, t, (n = r,
                (e,t)=>{
                        n[t] = e
                }
                ), O),
                r
        }
        )(z(t, ((e,t)=>({
                ...e,
                ...t.styles
        })), {}), ((t,r)=>!B(e.dom.style, r)))
          , Fn = (e,t,r)=>{
                const n = (e=>{
                        const t = (e=>q(e, (e=>(e=>-1 !== e.selector.indexOf(","))(e) ? (e=>{
                                const t = e.selector.split(/,(?![^(]*\))/g);
                                return F(t, (t=>{
                                        const r = t.trim();
                                        return {
                                                ...e,
                                                selector: r
                                        }
                                }
                                ))
                        }
                        )(e) : [e])))(e);
                        return jn(t)
                }
                )(e);
                ((e,t,r)=>{
                        const n = []
                          , o = document.createTreeWalker(e.dom, NodeFilter.SHOW_ELEMENT);
                        for (; u(o.nextNode()); ) {
                                const e = T(o.currentNode)
                                  , r = V(t, (t=>W(e, t.selector)));
                                if (r.length > 0) {
                                        const t = Bn(e, r);
                                        se(e, t),
                                        n.push(e)
                                }
                        }
                        r && U(n, (e=>("class",
                        void e.dom.removeAttribute("class"))))
                }
                )(t, n, r)
        }
        ;
        const Un = e=>{
                return t = (e=>{
                        const t = e.dom.styleSheets;
                        return Array.prototype.slice.call(t)
                }
                )(e),
                q(t, Dn);
                var t
        }
          , Vn = (!0,
        (e,t,r)=>((e,t,n,o)=>{
                const s = ((e,t)=>V(e, (e=>f(e.selector, t))))(Un(t), r);
                Fn(s, n, true)
        }
        )(0, e, t));
        const zn = e=>E(e) ? e : G(e).fold((()=>e), zn)
          , $n = (e,t)=>{
                const r = e.parser.parse(t, {
                        isRootContent: !0,
                        forced_root_block: !1
                })
                  , n = tinymce.html.Serializer({
                        validate: !0
                }, e.schema).serialize(r)
                  , o = T(e.dom.createFragment(n));
                return Kn(e, o)
        }
          , qn = L("video")
          , Jn = L("audio")
          , Wn = L("div")
          , Hn = L("a")
          , Gn = (e,t)=>{
                const r = e.dom.createFragment(t);
                return zn(T(r.firstChild))
        }
          , Kn = (e,t)=>{
                if (C(e)) {
                        const r = A("div");
                        ae(r, t);
                        const n = e.getDoc()
                          , o = T(n);
                        Vn(o, r, ".ephox-summary-card");
                        const s = ((e,t)=>{
                                const r = void 0 === t ? document : t.dom;
                                return 1 !== (n = r).nodeType && 9 !== n.nodeType && 11 !== n.nodeType || 0 === n.childElementCount ? [] : F(r.querySelectorAll(e), T);
                                var n
                        }
                        )("*[style]", r);
                        return U(s, (e=>{
                                var t;
                                (t = e,
                                "style",
                                p.from(((e,t)=>{
                                        const r = e.dom.getAttribute(t);
                                        return null === r ? void 0 : r
                                }
                                )(t, "style"))).each((t=>re(e, "data-mce-style", t)))
                        }
                        )),
                        ((e,t)=>{
                                const r = document.createDocumentFragment();
                                return U(e, (e=>{
                                        r.appendChild(e.dom)
                                }
                                )),
                                T(r)
                        }
                        )(K(r))
                }
                return t
        }
          , Qn = (e,t,r)=>((e,t,r)=>{
                const n = A("div")
                  , o = ((e,t)=>T(e.dom.cloneNode(!0)))(t)
                  , s = Wn(o) ? o : (e=>((qn(e) || Jn(e)) && oe(e, "width", "100%"),
                Jn(e) && oe(e, "min-width", "100px"),
                e))(o);
                return ae(n, s),
                oe(n, "max-width", r + "px"),
                re(n, "data-ephox-embed-iri", e),
                re(n, "contentEditable", !1),
                n
        }
        )(e, t, r)
          , Yn = (e,t,r)=>Hn(t) ? t : Qn(e, t, r)
          , Xn = (e,t,r)=>{
                const n = Gn(e, r);
                return ce(Yn(t, n, S(e)))
        }
          , Zn = (e,t,r,n)=>{
                const o = Yn(r, Gn(e, n), S(e));
                Wn(o) ? ((e,t,r)=>{
                        const n = $n(e, ce(r));
                        Q(n).each((r=>{
                                e.undoManager.transact((()=>{
                                        ie(t, r),
                                        le(t)
                                }
                                ))
                        }
                        ))
                }
                )(e, t, o) : ((e,t,r)=>{
                        const n = $n(e, ce(r));
                        e.undoManager.transact((()=>{
                                var e;
                                (e = t).dom.textContent = "",
                                U(K(e), (e=>{
                                        le(e)
                                }
                                )),
                                ae(t, n)
                        }
                        ))
                }
                )(e, t, o)
        }
          , eo = e=>{
                const t = (e=>{
                        const t = e.split(" ")
                          , r = {};
                        return U(t, (e=>{
                                r[e.toLowerCase()] = !0
                        }
                        )),
                        r
                }
                )(e);
                return e=>!!e && e.nodeName.toLowerCase()in t
        }
          , to = eo("h1 h2 h3 h4 h5 h6 p span")
          , ro = eo("strong em b span a br")
          , no = e=>to(e.dom) && (e=>{
                return $((e=>e ? J(e.querySelectorAll("*")) : [])(e), (t = ro,
                e=>!t(e))).isNone();
                var t
        }
        )(e.dom)
          , oo = e=>/^https?:\/\/\S+$/i.test(e.trim())
          , so = e=>p.from(e).filter(no).map(me).filter(oo)
          , io = (e,t,r,n)=>{
                const o = (s = T(e.newBlock),
                p.from(s.dom.previousSibling).map(T));
                var s;
                o.filter(E).bind(so).map((e=>{
                        r.getAndHandleResponse(e, (r=>{
                                const n = r.recommended().html();
                                ((e,t,r,n)=>{
                                        t.filter((e=>H(e).isSome())).each((t=>{
                                                const o = pe(t);
                                                o.length > 0 ? ((e,t,r,n,o)=>{
                                                        const s = K(t)
                                                          , i = de(s, r)
                                                          , a = s.slice(i)
                                                          , l = s.slice(i + 1);
                                                        if (fe(l) === n) {
                                                                const r = Yn(n, Gn(e, o), S(e));
                                                                Wn(r) ? ((e,t,r,n)=>{
                                                                        const o = $n(e, ce(n));
                                                                        Q(o).each((n=>{
                                                                                e.undoManager.transact((()=>{
                                                                                        ie(t, n),
                                                                                        U(r, le)
                                                                                }
                                                                                ))
                                                                        }
                                                                        ))
                                                                }
                                                                )(e, t, a, r) : ((e,t,r,n)=>{
                                                                        const o = $n(e, ce(n));
                                                                        e.undoManager.transact((()=>{
                                                                                U(r, le),
                                                                                ae(t, o)
                                                                        }
                                                                        ))
                                                                }
                                                                )(e, t, l, r)
                                                        }
                                                }
                                                )(e, t, o, r, n) : Zn(e, t, r, n)
                                        }
                                        ))
                                }
                                )(t, o, e, n)
                        }
                        ), n.logError)
                }
                ))
        }
          , ao = e=>{
                U(e, (e=>{
                        const t = new tinymce.html.Node("span",1);
                        t.attr("class", "mce-shim"),
                        t.attr("data-mce-bogus", "1"),
                        e.append(t),
                        e.attr("contenteditable", "false")
                }
                ))
        }
          , lo = e=>{
                U(e, (e=>{
                        e.attr("contenteditable", null)
                }
                ))
        }
          , co = "media_url_resolver"
          , uo = [{
                code: 404,
                message: "The specified url was not found."
        }, {
                code: 600,
                message: "The specified service did not respond correctly."
        }, {
                code: 601,
                message: "The specified service did not respond correctly." //Issue here
        }]
          , ho = (e,t)=>$(uo, (e=>e.code === t)).fold((()=>"Server didn't produce a valid result. (" + t + ")"), (e=>e.message))
          , po = e=>{
                const t = t=>t(e)
                  , r = _(e)
                  , n = ()=>o
                  , o = {
                        tag: !0,
                        inner: e,
                        fold: (t,r)=>r(e),
                        isValue: j,
                        isError: P,
                        map: t=>mo.value(t(e)),
                        mapError: n,
                        bind: t,
                        exists: t,
                        forall: t,
                        getOr: r,
                        or: n,
                        getOrThunk: r,
                        orThunk: n,
                        getOrDie: r,
                        each: t=>{
                                t(e)
                        }
                        ,
                        toOptional: ()=>p.some(e)
                };
                return o
        }
          , fo = e=>{
                const t = ()=>r
                  , r = {
                        tag: !1,
                        inner: e,
                        fold: (t,r)=>t(e),
                        isValue: P,
                        isError: j,
                        map: t,
                        mapError: t=>mo.error(t(e)),
                        bind: t,
                        exists: P,
                        forall: j,
                        getOr: I,
                        or: I,
                        getOrThunk: N,
                        orThunk: N,
                        getOrDie: (n = String(e),
                        ()=>{
                                throw new Error(n)
                        }
                        ),
                        each: O,
                        toOptional: p.none
                };
                var n;
                return r
        }
          , mo = {
                value: po,
                error: fo,
                fromOption: (e,t)=>e.fold((()=>fo(t)), po)
        };
        var go;
        !function(e) {
                e[e.Error = 0] = "Error",
                e[e.Value = 1] = "Value"
        }(go || (go = {}));
        const ko = (e,t,r)=>e.stype === go.Error ? t(e.serror) : r(e.svalue)
          , yo = e=>({
                stype: go.Value,
                svalue: e
        })
          , bo = e=>({
                stype: go.Error,
                serror: e
        })
          , vo = ko
          , So = e=>s(e) && Y(e).length > 100 ? " removed due to size" : JSON.stringify(e, null, 2)
          , Co = (e,t)=>bo([{
                path: e,
                getErrorInfo: t
        }])
          , wo = (xo = (e,t)=>i(e) && i(t) ? wo(e, t) : t,
        (...e)=>{
                if (0 === e.length)
                        throw new Error("Can't merge zero objects");
                const t = {};
                for (let r = 0; r < e.length; r++) {
                        const n = e[r];
                        for (const e in n)
                                te(n, e) && (t[e] = xo(t[e], n[e]))
                }
                return t
        }
        );
        var xo;
        const Ao = (e,t,r)=>{
                switch (e.tag) {
                case "field":
                        return t(e.key, e.newKey, e.presence, e.prop);
                case "custom":
                        return r(e.newKey, e.instantiator)
                }
        }
          , To = e=>({
                extract: (t,r)=>{
                        return n = e(r),
                        o = e=>((e,t)=>Co(e, _(t)))(t, e),
                        n.stype === go.Error ? o(n.serror) : n;
                        var n, o
                }
                ,
                toString: _("val")
        })
          , Eo = To(yo)
          , Lo = (e,t,r,n)=>n(ee(e, t).getOrThunk((()=>r(e))))
          , Oo = (e,t,r,n,o)=>{
                const s = e=>o.extract(t.concat([n]), e)
                  , i = e=>e.fold((()=>yo(p.none())), (e=>{
                        const r = o.extract(t.concat([n]), e);
                        return s = r,
                        i = p.some,
                        s.stype === go.Value ? {
                                stype: go.Value,
                                svalue: i(s.svalue)
                        } : s;
                        var s, i
                }
                ));
                switch (e.tag) {
                case "required":
                        return ((e,t,r,n)=>ee(t, r).fold((()=>((e,t,r)=>Co(e, (()=>'Could not find valid *required* value for "' + t + '" in ' + So(r))))(e, r, t)), n))(t, r, n, s);
                case "defaultedThunk":
                        return Lo(r, n, e.process, s);
                case "option":
                        return ((e,t,r)=>r(ee(e, t)))(r, n, i);
                case "defaultedOptionThunk":
                        return ((e,t,r,n)=>n(ee(e, t).map((t=>!0 === t ? r(e) : t))))(r, n, e.process, i);
                case "mergeWithThunk":
                        return Lo(r, n, _({}), (t=>{
                                const n = wo(e.process(r), t);
                                return s(n)
                        }
                        ))
                }
        }
          , _o = e=>({
                extract: (t,r)=>((e,t,r)=>{
                        const n = {}
                          , o = [];
                        for (const s of r)
                                Ao(s, ((r,s,i,a)=>{
                                        const l = Oo(i, e, t, r, a);
                                        vo(l, (e=>{
                                                o.push(...e)
                                        }
                                        ), (e=>{
                                                n[s] = e
                                        }
                                        ))
                                }
                                ), ((e,r)=>{
                                        n[e] = r(t)
                                }
                                ));
                        return o.length > 0 ? bo(o) : yo(n)
                }
                )(t, r, e),
                toString: ()=>{
                        const t = F(e, (e=>Ao(e, ((e,t,r,n)=>e + " -> " + n.toString()), ((e,t)=>"state(" + e + ")"))));
                        return "obj{\n" + t.join("\n") + "}"
                }
        })
          , Io = (e,t,r)=>{
                return n = ((e,t,r)=>((e,t)=>e.stype === go.Error ? {
                        stype: go.Error,
                        serror: t(e.serror)
                } : e)(t.extract([e], r), (e=>({
                        input: r,
                        errors: e
                }))))(e, t, r),
                ko(n, mo.error, mo.value);
                var n
        }
          , No = e=>"Errors: \n" + (e=>{
                const t = e.length > 10 ? e.slice(0, 10).concat([{
                        path: [],
                        getErrorInfo: _("... (only showing first ten failures)")
                }]) : e;
                return F(t, (e=>"Failed path: (" + e.path.join(" > ") + ")\n" + e.getErrorInfo()))
        }
        )(e.errors).join("\n") + "\n\nInput object: " + So(e.input)
          , Po = e=>{
                let t = p.none()
                  , r = [];
                const n = e=>{
                        o() ? s(e) : r.push(e)
                }
                  , o = ()=>t.isSome()
                  , s = e=>{
                        t.each((t=>{
                                setTimeout((()=>{
                                        e(t)
                                }
                                ), 0)
                        }
                        ))
                }
                ;
                return e((e=>{
                        o() || (t = p.some(e),
                        U(r, s),
                        r = [])
                }
                )),
                {
                        get: n,
                        map: e=>Po((t=>{
                                n((r=>{
                                        t(e(r))
                                }
                                ))
                        }
                        )),
                        isReady: o
                }
        }
          , jo = {
                nu: Po,
                pure: e=>Po((t=>{
                        t(e)
                }
                ))
        }
          , Mo = e=>{
                setTimeout((()=>{
                        throw e
                }
                ), 0)
        }
          , Ro = e=>{
                const t = t=>{
                        e().then(t, Mo)
                }
                ;
                return {
                        map: t=>Ro((()=>e().then(t))),
                        bind: t=>Ro((()=>e().then((e=>t(e).toPromise())))),
                        anonBind: t=>Ro((()=>e().then((()=>t.toPromise())))),
                        toLazy: ()=>jo.nu(t),
                        toCached: ()=>{
                                let t = null;
                                return Ro((()=>(null === t && (t = e()),
                                t)))
                        }
                        ,
                        toPromise: e,
                        get: t
                }
        }
          , Do = e=>Ro((()=>new Promise(e)))
          , Bo = e=>Ro((()=>Promise.resolve(e)))
          , Fo = e=>({
                ...e,
                toCached: ()=>Fo(e.toCached()),
                bindFuture: t=>Fo(e.bind((e=>e.fold((e=>Bo(mo.error(e))), (e=>t(e)))))),
                bindResult: t=>Fo(e.map((e=>e.bind(t)))),
                mapResult: t=>Fo(e.map((e=>e.map(t)))),
                mapError: t=>Fo(e.map((e=>e.mapError(t)))),
                foldResult: (t,r)=>e.map((e=>e.fold(t, r))),
                withTimeout: (t,r)=>Fo(Do((n=>{
                        let o = !1;
                        const s = setTimeout((()=>{
                                o = !0,
                                n(mo.error(r()))
                        }
                        ), t);
                        e.get((e=>{
                                o || (clearTimeout(s),
                                n(e))
                        }
                        ))
                }
                )))
        })
          , Uo = e=>Fo(Do(e))
          , Vo = e=>Fo(Bo(mo.value(e)))
          , zo = {
                nu: Uo,
                wrap: Fo,
                pure: Vo,
                value: Vo,
                error: e=>Fo(Bo(mo.error(e))),
                fromResult: e=>Fo(Bo(e)),
                fromFuture: e=>Fo(e.map(mo.value)),
                fromPromise: e=>Uo((t=>{
                        e.then((e=>{
                                t(mo.value(e))
                        }
                        ), (e=>{
                                t(mo.error(e))
                        }
                        ))
                }
                ))
        }
          , $o = ()=>(new Date).getTime();
        var qo;
        !function(e) {
                e.JSON = "json",
                e.Blob = "blob",
                e.Text = "text",
                e.FormData = "formdata",
                e.MultipartFormData = "multipart/form-data"
        }(qo || (qo = {}));
        const Jo = e=>Do((t=>{
                const r = new FileReader;
                r.onload = e=>{
                        const r = e.target ? e.target.result : "";
                        t(r)
                }
                ,
                r.readAsText(e)
        }
        ))
          , Wo = e=>{
                try {
                        const t = JSON.parse(e);
                        return mo.value(t)
                } catch (e) {
                        return mo.error("Response was not JSON.")
                }
        }
          , Ho = e=>Bo(e.response)
          , Go = (e,t)=>t.map((t=>{
                const r = ((e,t)=>{
                        const r = [];
                        return Z(e, ((e,t)=>{
                                var n;
                                r.push((n = e,
                                encodeURIComponent(t) + "=" + encodeURIComponent(n)))
                        }
                        )),
                        r
                }
                )(t)
                  , n = ((e,t,r=0,n)=>{
                        const o = e.indexOf(t, r);
                        return -1 !== o && (!!c(n) || o + t.length <= n)
                }
                )(e, "?") ? "&" : "?";
                return r.length > 0 ? e + n + r.join("&") : e
        }
        )).getOr(e)
          , Ko = e=>zo.nu((t=>{
                const r = new XMLHttpRequest;
                r.open(e.method, Go(e.url, p.from(e.query)), !0);
                const n = (e=>{
                        const t = (r = e.body,
                        p.from(r).bind((e=>{
                                switch (e.type) {
                                case qo.JSON:
                                        return p.some("application/json");
                                case qo.FormData:
                                        return p.some("application/x-www-form-urlencoded; charset=UTF-8");
                                case qo.MultipartFormData:
                                        return p.none();
                                case qo.Text:
                                default:
                                        return p.some("text/plain")
                                }
                        }
                        )));
                        var r;
                        const n = !0 === e.credentials ? p.some(!0) : p.none()
                          , o = (e=>{
                                switch (e) {
                                case qo.Blob:
                                        return "application/octet-stream";
                                case qo.JSON:
                                        return "application/json, text/javascript";
                                case qo.Text:
                                        return "text/plain";
                                default:
                                        return ""
                                }
                        }
                        )(e.responseType) + ", */*; q=0.01"
                          , s = void 0 !== e.headers ? e.headers : {};
                        return {
                                contentType: t,
                                responseType: (e=>{
                                        switch (e) {
                                        case qo.JSON:
                                                return p.none();
                                        case qo.Blob:
                                                return p.some("blob");
                                        case qo.Text:
                                                return p.some("text");
                                        default:
                                                return p.none()
                                        }
                                }
                                )(e.responseType),
                                credentials: n,
                                accept: o,
                                headers: s,
                                progress: h(e.progress) ? p.some(e.progress) : p.none()
                        }
                }
                )(e);
                ((e,t)=>{
                        t.contentType.each((t=>e.setRequestHeader("Content-Type", t))),
                        e.setRequestHeader("Accept", t.accept),
                        t.credentials.each((t=>e.withCredentials = t)),
                        t.responseType.each((t=>e.responseType = t)),
                        t.progress.each((t=>e.upload.addEventListener("progress", (e=>t(e.loaded, e.total))))),
                        Z(t.headers, ((t,r)=>e.setRequestHeader(r, t)))
                }
                )(r, n);
                const o = ()=>{
                        ((e,t,r)=>((e,t)=>{
                                switch (e) {
                                case qo.JSON:
                                        return Wo(t.response).fold((()=>Ho(t)), Bo);
                                case qo.Blob:
                                        return (e=>p.from(e.response).map(Jo).getOr(Bo("no response content")))(t);
                                case qo.Text:
                                default:
                                        return Ho(t)
                                }
                        }
                        )(t, r).map((t=>({
                                message: 0 === r.status ? "Unknown HTTP error (possible cross-domain request)" : `Could not load url ${e}: ${r.statusText}`,
                                status: r.status,
                                responseText: t
                        }))))(e.url, e.responseType, r).get((e=>t(mo.error(e))))
                }
                ;
                var s;
                r.onerror = o,
                r.onload = ()=>{
                        0 !== r.status || f(e.url, "file:") ? r.status < 100 || r.status >= 400 ? o() : ((e,t)=>{
                                const r = e=>zo.error({
                                        message: e,
                                        status: t.status,
                                        responseText: t.responseText
                                });
                                switch (e) {
                                case qo.JSON:
                                        return Wo(t.response).fold(r, zo.pure);
                                case qo.Blob:
                                case qo.Text:
                                        return zo.pure(t.response);
                                default:
                                        return r("unknown data type")
                                }
                        }
                        )(e.responseType, r).get(t) : o()
                }
                ,
                (s = e.body,
                p.from(s).map((e=>e.type === qo.JSON ? JSON.stringify(e.data) : e.type === qo.FormData || e.type === qo.MultipartFormData ? (e=>{
                        const t = new FormData;
                        return Z(e, ((e,r)=>{
                                t.append(r, e)
                        }
                        )),
                        t
                }
                )(e.data) : e.data))).fold((()=>r.send()), (e=>{
                        r.send(e)
                }
                ))
        }
        ))
          , Qo = e=>{
                const t = e.responseText;
                return s(t) ? t : e.message
        }
          , Yo = (e,t,r=Qo)=>{
                const n = (e=>ee(e, "tiny-api-key").orThunk((()=>ee(e, "tinymce-api-key"))).orThunk((()=>ee(e, "textbox-api-key"))).getOrUndefined())(t);
                return {
                        execute: o=>{
                                const s = (i = e=>l(e) ? String(e) : e,
                                ((e,t)=>{
                                        const r = {};
                                        return Z(e, ((e,n)=>{
                                                const o = t(e, n);
                                                r[o.k] = o.v
                                        }
                                        )),
                                        r
                                }
                                )(o, ((e,t)=>({
                                        k: t,
                                        v: i(e)
                                }))));
                                var i;
                                const a = ((e,t)=>{
                                        const r = -1 === e.indexOf("?") ? "?" : "&";
                                        return t ? e + r + "apiKey=" + encodeURIComponent(t) : e
                                }
                                )((u = s,
                                e.replace(/\$\{([^{}]*)\}/g, ((e,t)=>{
                                        const r = u[t];
                                        return (e=>{
                                                const t = typeof e;
                                                return "string" === t || "number" === t
                                        }
                                        )(r) ? r.toString() : e
                                }
                                ))), n)
                                  , c = (h = {
                                        url: a,
                                        responseType: qo.JSON,
                                        credentials: !0,
                                        headers: t
                                },
                                Ko({
                                        ...h,
                                        method: "get",
                                        body: {
                                                type: qo.Text,
                                                data: ""
                                        }
                                })).mapError(r);
                                var u, h;
                                return zo.wrap(c)
                        }
                        ,
                        cancelCurrent: O
                }
        }
        ;
        (e=>{
                if (!a(e))
                        throw new Error("cases must be an array");
                if (0 === e.length)
                        throw new Error("there must be at least one case");
                const t = []
                  , r = {};
                U(e, ((n,o)=>{
                        const s = Y(n);
                        if (1 !== s.length)
                                throw new Error("one and only one name per case");
                        const i = s[0]
                          , l = n[i];
                        if (void 0 !== r[i])
                                throw new Error("duplicate key detected:" + i);
                        if ("cata" === i)
                                throw new Error("cannot have a case named cata (sorry)");
                        if (!a(l))
                                throw new Error("case arguments must be an array");
                        t.push(i),
                        r[i] = (...r)=>{
                                const n = r.length;
                                if (n !== l.length)
                                        throw new Error("Wrong number of arguments to case " + i + ". Expected " + l.length + " (" + l + "), got " + n);
                                return {
                                        fold: (...t)=>{
                                                if (t.length !== e.length)
                                                        throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                                                return t[o].apply(null, r)
                                        }
                                        ,
                                        match: e=>{
                                                const n = Y(e);
                                                if (t.length !== n.length)
                                                        throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + n.join(","));
                                                if (!((e,t)=>{
                                                        for (let t = 0, o = e.length; t < o; ++t)
                                                                if (!0 !== (r = e[t],
                                                                B(n, r)))
                                                                        return !1;
                                                        var r;
                                                        return !0
                                                }
                                                )(t))
                                                        throw new Error("Not all branches were specified when using match. Specified: " + n.join(", ") + "\nRequired: " + t.join(", "));
                                                return e[i].apply(null, r)
                                        }
                                        ,
                                        log: e=>{
                                                console.log(e, {
                                                        constructors: t,
                                                        constructor: i,
                                                        params: r
                                                })
                                        }
                                }
                        }
                }
                ))
        }
        )([{
                bothErrors: ["error1", "error2"]
        }, {
                firstError: ["error1", "value2"]
        }, {
                secondError: ["value1", "error2"]
        }, {
                bothValues: ["value1", "value2"]
        }]);
        const Xo = _(Eo)
          , Zo = (e,t,r,n)=>({
                tag: "field",
                key: e,
                newKey: t,
                presence: r,
                prop: n
        })
          , es = e=>Zo(e, e, {
                tag: "required",
                process: {}
        }, Xo())
          , ts = "iframely"
          , rs = "oembed"
          , ns = "fallback"
          , os = "wikipedia"
          , ss = e=>"[" + e.join(", ") + "]"
          , is = [ts, rs, ns]
          , as = (e,t,r)=>((t,r)=>{
                for (let r = 0, o = t.length; r < o; r++)
                        if (n = t[r],
                        B(e, n))
                                return !0;
                var n;
                return !1
        }
        )(t) ? mo.error("Embed response source: " + ss(e) + " contains more than one of " + ss(is)) : mo.value(r)
          , ls = _o([es("url"), es("maxWidth"), ((e,t)=>Zo(e, e, {
                tag: "defaultedThunk",
                process: _(!1)
        }, Xo()))("fresh")])
          , cs = _o([es("status_code"), es("sub_code"), es("msg")])
          , us = _o([es("html"), (hs = "rels",
        ds = [Zo("source", "source", {
                tag: "required",
                process: {}
        }, (ps = e=>a(e) ? (e=>B(e, ts) ? as(e, [rs, ns, os], ts) : B(e, rs) ? as(e, [ts, ns, os], rs) : B(e, ns) ? as(e, [ts, rs, os], ns) : B(e, os) ? as(e, [ts, rs, ns], os) : mo.error("Embed response source: " + ss(e) + " did not contain any of: " + ss(is)))(e) : mo.error("Sources was not an array: " + e),
        To((e=>ps(e).fold(bo, yo)))))],
        Zo(hs, hs, {
                tag: "required",
                process: {}
        }, _o(ds)))]);
        var hs, ds, ps, fs = e=>Io("EmbedResponse.failure", cs, e).fold((e=>mo.error({
                code: _(600),
                subcode: _(0),
                msg: ()=>No(e)
        })), (e=>mo.error({
                code: _(e.status_code),
                subcode: _(e.sub_code),
                msg: _(e.msg)
        }))), ms = e=>Io("EmbedResponse.success", us, e).fold((e=>mo.error({ //Issue here
                code: _(601),
                subcode: _(0),
                msg: ()=>No(e),
                l: console.log(e.errors[0].getErrorInfo(), e)
        })), (e=>mo.value({
                recommended: ()=>({
                        html: _(e.html),
                        source: _(e.rels.source)
                })
        })));
        const gs = (e,t,r)=>{
                const n = ((e,t=36e5)=>{
                        const r = {}
                          , n = (e,t,n)=>{
                                r[e] = {
                                        result: t,
                                        timestamp: n
                                }
                        }
                          , o = (e,r)=>e - r < t
                          , i = _(r);
                        return s(e) && (e=>{
                                const t = $o();
                                Z(e, ((e,r)=>{
                                        o(t, e.timestamp) && n(r, e.result, e.timestamp)
                                }
                                ))
                        }
                        )(e),
                        {
                                set: n,
                                get: (e,t)=>p.from(r[t]).filter((t=>o(e, t.timestamp))).map((e=>e.result)),
                                dump: i
                        }
                }
                )(r)
                  , o = Yo(e + "/1/embed?url=${url}&maxWidth=${maxWidth}", t);
                return {
                        checkOne: (e,t,r=!1)=>{
                                const s = $o()
                                  , i = ((r,n,s,i,a)=>(a ? p.none() : n.get(i, s)).fold((()=>((r,n)=>{
                                        const s = {
                                                url: encodeURIComponent(e),
                                                maxWidth: t,
                                                fresh: n
                                        }
                                          , i = (a = "ephox.media.service.one.ajax.service.get",
                                        l = ls,
                                        c = s,
                                        Io(a, l, c).fold((e=>{
                                                throw new Error(No(e))
                                        }
                                        ), I));
                                        var a, l, c;
                                        return o.execute(i)
                                }
                                )(0, a).mapResult((e=>(n.set(s, e, i),
                                e)))), (e=>zo.pure(e))))(0, n, t + "&" + e, s, r);
                                return zo.wrap(i.map((e=>e.fold(fs, ms))))
                        }
                        ,
                        dumpCache: n.dump
                }
        }
          , ks = (e,t)=>{
                ((e,t)=>{
                        const r = e.options.register;
                        r("mediaembed_content_css", {
                                processor: "string",
                                default: t + "/content.min.css"
                        }),
                        r("mediaembed_max_width", {
                                processor: "number",
                                default: 650
                        }),
                        r("mediaembed_inline_styles", {
                                processor: "boolean",
                                default: !1
                        }),
                        r("mediaembed_service_url", {
                                processor: "string",
                                default: ""
                        }),
                        r("mediaembed_api_key", {
                                processor: "string"
                        })
                }
                )(e, t);
                const r = (e=>{
                        let t;
                        const r = t=>{
                                const r = (e=>{
                                        if ("string" == typeof e)
                                                return {
                                                        message: e
                                                };
                                        {
                                                const t = e.code();
                                                return {
                                                        message: ho(e.msg(), t),
                                                        code: t
                                                }
                                        }
                                }
                                )(t);
                                ((e,t)=>{
                                        e.dispatch("MediaEmbedError", t)
                                }
                                )(e, r),
                                console.error(`Media embed error: ${r.message}`)
                        }
                        ;
                        return {
                                formatMessage: ho,
                                logDialogError: e=>{
                                        const n = e.msg();
                                        n !== t && r(e),
                                        t = n
                                }
                                ,
                                logError: r
                        }
                }
                )(e)
                  , n = (e=>{
                        const t = (r = w(e),
                        n = (e=>{
                                var t;
                                return null !== (t = e.options.get("mediaembed_api_key")) && void 0 !== t ? t : e.options.get("api_key")
                        }
                        )(e),
                        gs(r, n ? {
                                "tinymce-api-key": n
                        } : {}));
                        var r, n;
                        const o = (e,r,n)=>t.checkOne(e, r, n)
                          , s = {};
                        return {
                                getOne: o,
                                dumpCache: ()=>{
                                        t.dumpCache()
                                }
                                ,
                                getAndHandleResponse: (t,r,n)=>{
                                        void 0 !== s[t] ? s[t] = s[t].concat(r) : (s[t] = [r],
                                        o(t.trim(), S(e)).get((e=>e.fold((e=>{
                                                n(e),
                                                delete s[t]
                                        }
                                        ), (e=>{
                                                U(s[t], (t=>{
                                                        t(e)
                                                }
                                                )),
                                                delete s[t]
                                        }
                                        )))))
                                }
                        }
                }
                )(e);
                (e=>{
                        e.on("click keyup touchend", (()=>{
                                const t = e.selection.getNode();
                                t && e.dom.getAttrib(t, "data-ephox-embed-iri") && e.dom.getAttrib(t, "data-mce-selected") && t.setAttribute("data-mce-selected", "2")
                        }
                        )),
                        e.on("PreInit", (()=>{
                                e.parser.addAttributeFilter("data-ephox-embed-iri", ao),
                                e.serializer.addAttributeFilter("data-ephox-embed-iri", lo)
                        }
                        ))
                }
                )(e),
                (e=>{
                        const t = v(e);
                        e.on("PreInit", (()=>{
                                e.contentCSS.push(e.documentBaseURI.toAbsolute(t))
                        }
                        ))
                }
                )(e),
                e.on("SkinLoaded", (()=>{
                        w(e).length > 0 ? (((e,t,r)=>{
                                e.on("NewBlock", (n=>{
                                        io(n, e, t, r)
                                }
                                ))
                        }
                        )(e, n, r),
                        ((e,t,r)=>{
                                const n = e.options;
                                n.isRegistered(co) && !n.isSet(co) && n.set(co, ((e,t,r)=>(n,o,s)=>{
                                        oo(n.url) ? t.getAndHandleResponse(n.url, (t=>{
                                                const r = t.recommended().html();
                                                o({
                                                        html: Xn(e, n.url, r)
                                                })
                                        }
                                        ), (e=>{
                                                r.logDialogError(e),
                                                s({
                                                        msg: r.formatMessage(e.msg(), e.code())
                                                })
                                        }
                                        )) : o({
                                                html: ""
                                        })
                                }
                                )(e, t, r))
                        }
                        )(e, n, r)) : r.logError("You need to specify the mediaembed_service_url setting")
                }
                ))
        }
        ;
        tinymce.PluginManager.add("mediaembed", ((e,t)=>{
                ((e,t)=>!!e && -1 === ((e,t)=>{
                        const r = g(e.major, t.major);
                        if (0 !== r)
                                return r;
                        const n = g(e.minor, t.minor);
                        if (0 !== n)
                                return n;
                        const o = g(e.patch, t.patch);
                        return 0 !== o ? o : 0
                }
                )((e=>y((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), y(t)))(tinymce, "6.0.0") ? console.error("The mediaembed plugin requires at least version 6.0.0 of TinyMCE.") : ks(e, t)
        }
        ))
}();
