!function(t,e){for(var n in e)t[n]=e[n]}(exports,function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=84)}({84:function(t,e,n){var r=n(85);e.handler=async(t,e,n)=>{const o=r.generate({length:8,count:1});return{statusCode:200,body:JSON.stringify(o)}}},85:function(t,e,n){(function(){"use strict";function e(t){return t[(e=0,n=t.length-1,Math.floor(Math.random()*(n-e+1))+e)];var e,n}function n(t){return{numbers:"0123456789",alphabetic:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",alphanumeric:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"}[t]}function r(t){t=t||{},this.count=t.count||1,this.length=t.length||8,this.charset=t.charset||n("alphanumeric"),this.prefix=t.prefix||"",this.postfix=t.postfix||"",this.pattern=t.pattern||function(t,e){for(var n="",r=0;r<e;r++)n+=t;return n}("#",this.length)}function o(t){var n=t.pattern.split("").map((function(n){return"#"===n?e(t.charset):n})).join("");return t.prefix+n+t.postfix}var u={generate:function(t){var e=(t=new r(t)).count;if(!function(t,e,n){return Math.pow(t.length,(e.match(/#/g)||[]).length)>=n}(t.charset,t.pattern,t.count))throw new Error("Not possible to generate requested number of codes.");for(var n={};e>0;){var u=o(t);void 0===n[u]&&(n[u]=!0,e--)}return Object.keys(n)},charset:n};t.exports&&(t.exports=u),u}).call(this)}}));