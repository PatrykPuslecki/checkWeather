(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"72f5":function(t,n,i){},"9f52":function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"about"},[this.infos.city?i("div",[i("h1",[t._v("AirApp")]),i("div",{staticClass:"infoBox"},[i("span",[i("strong",[t._v("Date:")]),t._v(" "+t._s(this.currentDate)+" ")]),i("span",[i("strong",[t._v("Location:")]),t._v(" "+t._s(this.infos.city.name)+", "+t._s(this.infos.city.country)+" ")])]),i("div",{staticClass:"hourlyBox"},[i("table",[t._m(0),i("tbody",t._l(this.infos.list,(function(n){return i("tr",{key:n.dt},[i("td",[t._v(t._s(t.formatToHour(n.dt_txt)))]),i("td",[t._v(t._s(Math.round(n.main.temp))+"°C")]),i("td",[t._v(t._s(n.weather[0].description))])])})),0)])])]):i("div",[t._v("Loading...")])])},o=[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("thead",[i("tr",[i("td",[t._v("Hour")]),i("td",[t._v("Temperature")]),i("td",[t._v("Description")])])])}],s=i("f9c4"),a=i("bc3a"),r=i.n(a),c=i("c1df"),u=i.n(c),f={name:"Details",props:["city"],data:function(){return{currentDate:u()().format("DD-MM-YYYY"),infos:{}}},methods:{formatToHour:function(t){var n=new Date(t);return u()(n).format("HH:mm")},getWeather:function(t){var n=this;r.a.get(t).then((function(t){n.infos=t.data})).catch((function(t){console.log(t)}))}},beforeMount:function(){this.city?this.getWeather(s["a"]+"&q="+this.city+s["b"]+"&cnt=6"):this.$router.go(-1)}},d=f,_=(i("b09e"),i("2877")),h=Object(_["a"])(d,e,o,!1,null,"774d152b",null);n["default"]=h.exports},b09e:function(t,n,i){"use strict";var e=i("72f5"),o=i.n(e);o.a}}]);
//# sourceMappingURL=about.70cfd3d8.js.map