(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fb695aa"],{6458:function(e,t,a){},"88cc":function(e,t,a){"use strict";var n=a("6458"),o=a.n(n);o.a},caef:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comment-list"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{name:"adminIndex"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("评论列表")])],1),a("dir",{staticClass:"comment-content"},[a("el-card",{class:"data-item",attrs:{shadow:"hover"}},[a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"请输入电影ID"},on:{change:e.handleChange},model:{value:e.searchCommentId,callback:function(t){e.searchCommentId=t},expression:"searchCommentId"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleCommentId},slot:"append"})],1),a("el-input",{attrs:{placeholder:"请输入电影名称"},on:{change:e.handleChange},model:{value:e.searchMovieName,callback:function(t){e.searchMovieName=t},expression:"searchMovieName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleSearchMovieName},slot:"append"})],1),a("el-input",{attrs:{placeholder:"请输入用户名称"},on:{change:e.handleChange},model:{value:e.searchUserName,callback:function(t){e.searchUserName=t},expression:"searchUserName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleSearchUserName},slot:"append"})],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.commentDataList,stripe:""}},[a("el-table-column",{attrs:{type:"index",label:"索引"}}),a("el-table-column",{attrs:{prop:"createdAt",label:"创建时间"}}),a("el-table-column",{attrs:{prop:"id",label:"评论ID"}}),a("el-table-column",{attrs:{prop:"Movie.name",label:"电影名称"}}),a("el-table-column",{attrs:{prop:"User.name",label:"用户名称"}}),a("el-table-column",{attrs:{prop:"content",label:"内容"}}),a("el-table-column",{attrs:{prop:"score",label:"评分"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("查看")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e.total>e.limit?[a("el-pagination",{attrs:{"current-page":e.nowPage,"page-size":e.limit,background:"",layout:"prev, pager, next",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})]:e._e()],2)],1),a("el-dialog",{attrs:{title:"评论信息查看",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"电影名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.form.MovieName,callback:function(t){e.$set(e.form,"MovieName",t)},expression:"form.MovieName"}})],1),a("el-form-item",{attrs:{disabled:"",label:"发布用户","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.form.UserName,callback:function(t){e.$set(e.form,"UserName",t)},expression:"form.UserName"}})],1),a("el-form-item",{attrs:{label:"发布内容","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",rows:4,disabled:"",autocomplete:"off"},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),a("el-form-item",{attrs:{label:"影片评分","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.form.score,callback:function(t){e.$set(e.form,"score",t)},expression:"form.score"}})],1),a("el-form-item",{attrs:{label:"累计喜欢","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.form.likes,callback:function(t){e.$set(e.form,"likes",t)},expression:"form.likes"}})],1),a("el-form-item",{attrs:{label:"发布时间","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.form.publishDate,callback:function(t){e.$set(e.form,"publishDate",t)},expression:"form.publishDate"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("关 闭")])],1)],1)],1)},o=[],r=(a("d81d"),a("fb6a"),a("b0c0"),a("96cf"),a("1da1")),i=a("5530"),s=a("c1df"),l=a.n(s),c={data:function(){return{nowPage:1,limit:15,total:0,commentData:[],loading:!0,searchCommentId:"",searchMovieName:"",searchUserName:"",dialogFormVisible:!1,formLabelWidth:"120px",form:{id:"",MovieName:"",UserName:"",content:"",publishDate:"",score:"",likes:""}}},computed:{commentDataList:function(){try{return this.commentData.slice(0).map((function(e){return e.createdAt=l()(e.createdAt).local().format("YYYY-MM-DD HH:mm:ss"),e}))}catch(e){}}},created:function(){var e=this;setTimeout((function(){void 0===e.$store.state.loginAdmin.name&&e.$router.push({name:"adminLogin"})}),1e3),this.getData()},methods:{handleChange:function(){""!==this.searchCommentId||""!==this.searchUserName||""!==this.searchMovieName||this.getData()},handleEdit:function(e){this.form.id=e.id,this.form.MovieName=e.Movie.name,this.form.UserName=e.User.name,this.form.content=e.content,this.form.publishDate=e.publishDate,this.form.score=e.score,this.form.likes=e.likes,this.dialogFormVisible=!0},handleDelete:function(e){var t=this;this.$confirm("此操作将删除该管理员, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$api.deleteComment(e.id,"admin").then((function(e){e&&(t.$message({type:"success",message:"删除成功!"}),t.getData())}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},warning:function(){this.$notify({title:"警告",message:"信息填写不完整！",type:"warning"})},success:function(e){this.$notify({title:e,message:e+"!",type:"success"})},error:function(){this.$notify.error({title:"失败",message:"未查询到数据！"})},getData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.loading=!0,this.$api.getCommentList(Object(i["a"])({limit:this.limit,page:this.nowPage},t),"admin").then((function(t){e.total=t.count,e.commentData=t.data,e.loading=!1}))},handleSizeChange:function(e){this.nowPage=e},handleCurrentChange:function(e){this.nowPage=e},handleCommentId:function(){var e=this;""!==this.searchCommentId?(this.loading=!0,this.$api.getCommentFindById(this.searchCommentId,"admin").then((function(t){t?(e.total=1,e.commentData=[t],e.loading=!1):(e.loading=!1,e.error())}))):this.getData()},handleSearchMovieName:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!==e.searchMovieName){t.next=3;break}return e.getData(),t.abrupt("return");case 3:return t.next=5,e.$api.getMovieList({name:e.searchMovieName},"admin");case 5:if(a=t.sent,0!==a.count){t.next=9;break}return e.error(),t.abrupt("return");case 9:e.getData({movieid:a.data[0].id});case 10:case"end":return t.stop()}}),t)})))()},handleSearchUserName:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!==e.searchUserName){t.next=3;break}return e.getData(),t.abrupt("return");case 3:return t.next=5,e.$api.getUserList({name:e.searchUserName},"admin");case 5:if(a=t.sent,0!==a.count){t.next=9;break}return e.error(),t.abrupt("return");case 9:e.getData({userid:a.data[0].id});case 10:case"end":return t.stop()}}),t)})))()}},watch:{nowPage:function(){var e={};""!==this.searchUserName&&(e.name=this.searchUserName),""!==this.searchMovieName&&(e.type=this.searchMovieName),this.getData(e)}}},m=c,u=(a("88cc"),a("2877")),d=Object(u["a"])(m,n,o,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-4fb695aa.b4382d3f.js.map