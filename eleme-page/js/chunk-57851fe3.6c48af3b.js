(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57851fe3"],{"07e5":function(t,s,e){},"32af":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"sellerShop"},[e("div",{staticClass:"content"},[e("div",{staticClass:"shopHeader"},[t.shopData.hasOwnProperty("score")?e("div",{staticClass:"shopHeaderTop"},[e("div",{staticClass:"shopHeaderMain"},[e("div",{staticClass:"shopHeaderTitle"},[t._v(t._s(t.shopData.name))]),e("div",{staticClass:"shopHeaderTotal"},[e("stars",{attrs:{stars:t.shopData.score,strictSize:12,noMargin:!0,id:"shopStar"}}),e("span",{staticClass:"ratingCount"},[t._v("（"+t._s(t.shopData.ratingCount)+"）")]),e("span",{staticClass:"saleCount"},[t._v("月售"+t._s(t.shopData.sellCount)+"单")])],1)]),e("div",{staticClass:"shopHeaderBtn",on:{click:function(s){return t.collectionShop()}}},[e("div",{staticClass:"favorite"},[e("div",{staticClass:"icon-favorite",style:t.isFavorite?{color:"#f01414"}:{color:"#ccc"}})]),e("div",{staticClass:"favoriteText"},[t._v(t._s(t.favoriteText))])])]):t._e(),e("div",{staticClass:"shopHeaderContent"},[e("div",{staticClass:"shopHeaderContentItem"},[e("div",{staticClass:"shopHeaderContentItemTitle"},[t._v("起送价")]),e("div",{staticClass:"shopHeaderContentItemNumber"},[t._v(t._s(t.shopData.minPrice))])]),e("div",{staticClass:"shopHeaderContentItem"},[e("div",{staticClass:"shopHeaderContentItemTitle"},[t._v("商家配送")]),e("div",{staticClass:"shopHeaderContentItemNumber"},[t._v(t._s(t.shopData.deliveryPrice))])]),e("div",{staticClass:"shopHeaderContentItem"},[e("div",{staticClass:"shopHeaderContentItemTitle"},[t._v("平均配送时间")]),e("div",{staticClass:"shopHeaderContentItemNumber"},[t._v(t._s(t.shopData.deliveryTime))])])])]),e("div",{staticClass:"divider"}),e("div",{staticClass:"shopCenter"},[t.shopData.bulletin?e("div",{staticClass:"introduction"},[e("h2",{staticClass:"introductionTitle"},[t._v("商品介绍")]),e("div",{staticClass:"foodText"},[t._v(t._s(t.shopData.bulletin))]),t.shopData.supports?e("div",{staticClass:"active"},t._l(t.shopData.supports,(function(s){return e("div",{key:s.description,staticClass:"supports"},[e("span",{staticClass:"icon",class:"iconType"+s.type}),e("span",{staticClass:"content"},[t._v(t._s(s.description))])])})),0):t._e()]):t._e()]),e("div",{staticClass:"divider"}),t.shopData.pics?e("div",{staticClass:"shopImageWrapper"},[e("div",{staticClass:"shopImageTitle"},[t._v("商家实景")]),e("div",{staticClass:"shopIamgeScroll"},[e("ul",t._l(t.shopData.pics,(function(t,s){return e("li",{key:s,staticClass:"shopPicItem"},[e("img",{staticClass:"shopPicItemImg",attrs:{src:t,alt:""}})])})),0)])]):t._e(),e("div",{staticClass:"divider"}),t.shopData.infos?e("div",{staticClass:"shopBottom"},[e("div",{staticClass:"shopBottomTitle"},[t._v("商家信息")]),e("div",{staticClass:"shopBottomContent"},t._l(t.shopData.infos,(function(s,a){return e("div",{key:a,staticClass:"shopBottomContentText"},[t._v(t._s(s))])})),0)]):t._e()])])},i=[],o=e("b2e9"),n={name:"SellerShop",components:{Stars:o["a"]},data:function(){return{shopData:{},isFavorite:!1,favoriteText:"收藏"}},created:function(){var t=this;this.$store.state.seller.dep||this.$http.get("/getSeller").then((function(s){t.shopData=s,t.$store.commit("sellerSet",s)})).catch((function(t){}))},methods:{collectionShop:function(){this.isFavorite=!this.isFavorite,this.favoriteText=this.isFavorite?"已收藏":"收藏"}}},r=n,c=(e("9d88"),e("2877")),l=Object(c["a"])(r,a,i,!1,null,"3eb4280c",null);s["default"]=l.exports},"621d":function(t,s,e){},7486:function(t,s,e){"use strict";var a=e("07e5"),i=e.n(a);i.a},"9d88":function(t,s,e){"use strict";var a=e("621d"),i=e.n(a);i.a},b2e9:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"stars"},t._l(t.scoreChange,(function(s,a){return e("span",{key:s+a,class:s,style:t.styleChange})})),0)},i=[],o=(e("b65f"),e("a9e3"),{name:"Stars",props:{stars:{type:Number,default:0},size:{type:Number,default:24},noMargin:{type:Boolean,default:!1},strictSize:{type:Number,default:0}},data:function(){return{score:[]}},methods:{scoreComputed:function(){this.score=[];for(var t=Math.trunc(this.stars),s=!!(this.stars%1),e=0;e<t;e++)this.score.push("score-on");s&&this.score.push("score-half");while(this.score.length<5)this.score.push("score-off")}},computed:{scoreChange:function(){return this.scoreComputed(),this.score},sizeChange:function(){return this.size/24>1.5?48:this.size/24===1.5?36:24},styleChange:function(){var t=this.strictSize?this.strictSize:this.sizeChange;return this.noMargin?{"background-size":t+"px "+t+"px",width:t+"px",height:t+"px"}:{"background-size":t+"px "+t+"px",width:t+"px",height:t+"px",margin:"16px "+t/2+"px 28px "+t/2+"px"}}}}),n=o,r=(e("7486"),e("2877")),c=Object(r["a"])(n,a,i,!1,null,"a9bbe5c6",null);s["a"]=c.exports},b65f:function(t,s,e){var a=e("23e7"),i=Math.ceil,o=Math.floor;a({target:"Math",stat:!0},{trunc:function(t){return(t>0?o:i)(t)}})}}]);
//# sourceMappingURL=chunk-57851fe3.6c48af3b.js.map