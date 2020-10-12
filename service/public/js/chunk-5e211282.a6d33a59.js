(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e211282"],{2953:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"admin-index"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[t._v("首页")])],1),e("div",{staticClass:"data-show-content"},[e("div",{staticClass:"data-row"},[e("el-card",{class:"data-item",attrs:{shadow:"hover"}},[e("div",{staticClass:"icon"},[e("i",{staticClass:"el-icon-user-solid"})]),e("div",[e("p",{staticClass:"card-title"},[t._v("注册用户")]),e("p",{staticClass:"card-count"},[t._v(t._s(t.userData.count)+" 人")])])]),e("el-card",{class:"data-item",attrs:{shadow:"hover"}},[e("div",{staticClass:"icon"},[e("i",{staticClass:"el-icon-s-ticket"})]),e("div",[e("p",{staticClass:"card-title"},[t._v("运营影院")]),e("p",{staticClass:"card-count"},[t._v(t._s(t.cinemaData.count)+" 家")])])]),e("el-card",{class:"data-item",attrs:{shadow:"hover"}},[e("div",{staticClass:"icon"},[e("i",{staticClass:"el-icon-video-camera-solid"})]),e("div",[e("p",{staticClass:"card-title"},[t._v("上架电影")]),e("p",{staticClass:"card-count"},[t._v(t._s(t.movieData.count)+" 部")])])]),e("el-card",{class:"data-item",attrs:{shadow:"hover"}},[e("div",{staticClass:"icon"},[e("i",{staticClass:"el-icon-s-order"})]),e("div",[e("p",{staticClass:"card-title"},[t._v("累计订单")]),void 0===t.priceSum?e("p",{staticClass:"card-count"},[t._v("加载中")]):e("p",{staticClass:"card-count"},[t._v(t._s(t.orderData.count)+" 条")])])]),e("el-card",{class:"data-item",attrs:{shadow:"hover"}},[e("div",{staticClass:"icon"},[e("i",{staticClass:"el-icon-s-finance"})]),e("div",[e("p",{staticClass:"card-title"},[t._v("收入总计")]),void 0===t.priceSum?e("p",{staticClass:"card-count"},[t._v("加载中")]):e("p",{staticClass:"card-count"},[t._v("$"+t._s(t.priceSum))])])])],1),e("div",{staticClass:"data-row"},[e("el-card",{class:"data-list",attrs:{shadow:"hover"}},[e("div",[e("p",{staticClass:"title blue"},[t._v("最新用户")]),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:!t.userDateList,expression:"!userDateList"}],staticStyle:{width:"100%"},attrs:{data:t.userDateList}},[e("el-table-column",{attrs:{prop:"createdAt",label:"日期"}}),e("el-table-column",{attrs:{prop:"id",label:"用户ID"}}),e("el-table-column",{attrs:{prop:"loginId",label:"账号ID"}}),e("el-table-column",{attrs:{prop:"name",label:"姓名"}})],1)],1)]),e("el-card",{class:"data-list",attrs:{shadow:"hover"}},[e("div",[e("p",{staticClass:"title green"},[t._v("最新订单")]),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:!t.orderDataList,expression:"!orderDataList"}],staticStyle:{width:"100%"},attrs:{data:t.orderDataList}},[e("el-table-column",{attrs:{prop:"createdAt",label:"日期"}}),e("el-table-column",{attrs:{prop:"id",label:"订单ID"}}),e("el-table-column",{attrs:{prop:"Cinema.name",label:"影院名"}}),e("el-table-column",{attrs:{prop:"Movie.name",label:"电影名"}}),e("el-table-column",{attrs:{prop:"price",label:"总价"}}),e("el-table-column",{attrs:{prop:"User.name",label:"用户名"}})],1)],1)])],1),e("div",{staticClass:"data-row"},[e("el-card",{class:"data-list",attrs:{shadow:"hover"}},[e("div",[e("p",{staticClass:"title pink"},[t._v("最新影院")]),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:!t.cinemaDataList,expression:"!cinemaDataList"}],staticStyle:{width:"100%"},attrs:{data:t.cinemaDataList}},[e("el-table-column",{attrs:{prop:"id",label:"影院ID"}}),e("el-table-column",{attrs:{prop:"name",label:"影院名称"}}),e("el-table-column",{attrs:{prop:"address",label:"影院地址"}}),e("el-table-column",{attrs:{prop:"mobile",label:"联系方式"}})],1)],1)]),e("el-card",{class:"data-list",attrs:{shadow:"hover"}},[e("div",[e("p",{staticClass:"title"},[t._v("最新电影")]),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:!t.movieDataList,expression:"!movieDataList"}],staticStyle:{width:"100%"},attrs:{data:t.movieDataList}},[e("el-table-column",{attrs:{prop:"id",label:"电影ID"}}),e("el-table-column",{attrs:{prop:"name",label:"电影名称"}}),e("el-table-column",{attrs:{prop:"type",label:"电影类型"}}),e("el-table-column",{attrs:{prop:"publishDate",label:"上映时间"}})],1)],1)])],1)])],1)},i=[],l=(e("d81d"),e("fb6a"),e("b0c0"),e("b680"),e("d3b7"),e("ac1f"),e("25f0"),e("5319"),e("b85c")),r=e("c1df"),c=e.n(r),o={data:function(){return{userData:{},cinemaData:{},movieData:{},orderData:{}}},computed:{userDateList:function(){try{var t=this.userData.data.slice(0,5);return t.map((function(t){return t.createdAt=c()(t.createdAt).local().format("YYYY-MM-DD HH:mm:ss"),t}))}catch(a){}},orderDataList:function(){try{var t=this.orderData.data.slice(0,5);return t.map((function(t){return t.createdAt=c()(t.createdAt).local().format("YYYY-MM-DD HH:mm:ss"),t.price=(t.Session.price*t.number).toFixed(1),t}))}catch(a){}},cinemaDataList:function(){try{return this.cinemaData.data.slice(0,5)}catch(t){}},movieDataList:function(){try{return this.movieData.data.slice(0,5)}catch(t){}},priceSum:function(){try{var t,a=0,e=Object(l["a"])(this.orderData.data);try{for(e.s();!(t=e.n()).done;){var s=t.value;a+=Math.floor(s.Session.price*s.number)}}catch(i){e.e(i)}finally{e.f()}return a.toString().replace(/(?<=\d)(?<!\.\d*)(?=(\d{3})+(\.|$))/g,",")}catch(r){}}},created:function(){var t=this;setTimeout((function(){void 0===t.$store.state.loginAdmin.name&&t.$router.push({name:"adminLogin"})}),1e3),this.$api.getUserList({limit:9999999},"admin").then((function(a){t.userData=a})),this.$api.getCinemaList({limit:9999999}).then((function(a){t.cinemaData=a}),"admin"),this.$api.getMovieList({limit:9999999},"admin").then((function(a){t.movieData=a})),this.$api.getOrderList({limit:9999999},"admin").then((function(a){t.orderData=a}))}},n=o,d=(e("8416"),e("2877")),u=Object(d["a"])(n,s,i,!1,null,null,null);a["default"]=u.exports},8416:function(t,a,e){"use strict";var s=e("c05d"),i=e.n(s);i.a},c05d:function(t,a,e){}}]);
//# sourceMappingURL=chunk-5e211282.a6d33a59.js.map