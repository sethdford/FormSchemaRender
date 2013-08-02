/*
Lightbox v2.6
by Lokesh Dhakar - http://www.lokeshdhakar.com

For more information, visit:
http://lokeshdhakar.com/projects/lightbox2/

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact
*/

(function(){var e,t,n;e=jQuery,n=function(){function e(){this.fadeDuration=500,this.fitImagesInViewport=!0,this.resizeDuration=700,this.showImageNumberLabel=!0,this.wrapAround=!1}return e.prototype.albumLabel=function(e,t){return"Image "+e+" of "+t},e}(),t=function(){function t(e){this.options=e,this.album=[],this.currentImageIndex=void 0,this.init()}return t.prototype.init=function(){return this.enable(),this.build()},t.prototype.enable=function(){var t=this;return e("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(n){return t.start(e(n.currentTarget)),!1})},t.prototype.build=function(){var t=this;return e("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo(e("body")),this.$lightbox=e("#lightbox"),this.$overlay=e("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.containerTopPadding=parseInt(this.$container.css("padding-top"),10),this.containerRightPadding=parseInt(this.$container.css("padding-right"),10),this.containerBottomPadding=parseInt(this.$container.css("padding-bottom"),10),this.containerLeftPadding=parseInt(this.$container.css("padding-left"),10),this.$overlay.hide().on("click",function(){return t.end(),!1}),this.$lightbox.hide().on("click",function(n){return e(n.target).attr("id")==="lightbox"&&t.end(),!1}),this.$outerContainer.on("click",function(n){return e(n.target).attr("id")==="lightbox"&&t.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return t.currentImageIndex===0?t.changeImage(t.album.length-1):t.changeImage(t.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return t.currentImageIndex===t.album.length-1?t.changeImage(0):t.changeImage(t.currentImageIndex+1),!1}),this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){return t.end(),!1})},t.prototype.start=function(t){var n=this,r,i,s,o,u,a,f,l,c,h,p,d,v,m;e(window).on("resize",this.sizeOverlay),e("select, object, embed").css({visibility:"hidden"}),this.$overlay.width(e(document).width()).height(e(document).height()).fadeIn(this.options.fadeDuration),this.album=[],u=0,s=t.attr("data-lightbox");if(s){d=e(t.prop("tagName")+'[data-lightbox="'+s+'"]');for(o=l=0,h=d.length;l<h;o=++l)i=d[o],this.album.push({link:e(i).attr("href"),title:e(i).attr("title")}),m=new Image,m.src=e(i).attr("href"),m.onload=function(){n.album[n.album.length-1].width=this.width,n.album[n.album.length-1].height=this.height},e(i).attr("href")===t.attr("href")&&(u=o)}else if(t.attr("rel")==="lightbox")this.album.push({link:t.attr("href"),title:t.attr("title")});else{v=e(t.prop("tagName")+'[rel="'+t.attr("rel")+'"]');for(o=c=0,p=v.length;c<p;o=++c)i=v[o],this.album.push({link:e(i).attr("href"),title:e(i).attr("title")}),e(i).attr("href")===t.attr("href")&&(u=o)}r=e(window),f=r.scrollTop()+r.height()/10,a=r.scrollLeft(),this.$lightbox.css({top:f+"px",left:a+"px"}).fadeIn(this.options.fadeDuration),this.changeImage(u)},t.prototype.changeImage=function(t){var n,r,i=this;this.disableKeyboardNav(),n=this.$lightbox.find(".lb-image"),this.sizeOverlay(),this.$overlay.fadeIn(this.options.fadeDuration),e(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating"),r=new Image,r.onload=function(){var s,o,u,a,f,l,c;n.attr("src",i.album[t].link),s=e(r),n.width(r.width),n.height(r.height);if(i.options.fitImagesInViewport){c=e(window).width(),l=e(window).height(),f=c-i.containerLeftPadding-i.containerRightPadding-20,a=l-i.containerTopPadding-i.containerBottomPadding-110;if(r.width>f||r.height>a)r.width/f>r.height/a?(u=f,o=parseInt(r.height/(r.width/u),10),n.width(u),n.height(o)):(o=a,u=parseInt(r.width/(r.height/o),10),n.width(u),n.height(o))}return i.sizeContainer(i.album[t].width,i.album[t].height)},r.src=this.album[t].link,this.currentImageIndex=t},t.prototype.sizeOverlay=function(){return e("#lightboxOverlay").width(e(document).width()).height(e(document).height())},t.prototype.sizeContainer=function(e,t){var n,r,i,s,o=this;s=this.$outerContainer.outerWidth(),i=this.$outerContainer.outerHeight(),r=e+this.containerLeftPadding+this.containerRightPadding,n=t+this.containerTopPadding+this.containerBottomPadding,this.$outerContainer.animate({width:r,height:n},this.options.resizeDuration,"swing"),setTimeout(function(){o.$lightbox.find(".lb-dataContainer").width(r),o.$lightbox.find(".lb-prevLink").height(n),o.$lightbox.find(".lb-nextLink").height(n),o.showImage()},this.options.resizeDuration)},t.prototype.showImage=function(){this.$lightbox.find(".lb-loader").hide(),this.$lightbox.find(".lb-image").fadeIn("slow"),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},t.prototype.updateNav=function(){this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?this.$lightbox.find(".lb-prev, .lb-next").show():(this.currentImageIndex>0&&this.$lightbox.find(".lb-prev").show(),this.currentImageIndex<this.album.length-1&&this.$lightbox.find(".lb-next").show()))},t.prototype.updateDetails=function(){var e=this;typeof this.album[this.currentImageIndex].title!="undefined"&&this.album[this.currentImageIndex].title!==""&&this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast"),this.album.length>1&&this.options.showImageNumberLabel?this.$lightbox.find(".lb-number").text(this.options.albumLabel(this.currentImageIndex+1,this.album.length)).fadeIn("fast"):this.$lightbox.find(".lb-number").hide(),this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.resizeDuration,function(){return e.sizeOverlay()})},t.prototype.preloadNeighboringImages=function(){var e,t;this.album.length>this.currentImageIndex+1&&(e=new Image,e.src=this.album[this.currentImageIndex+1].link),this.currentImageIndex>0&&(t=new Image,t.src=this.album[this.currentImageIndex-1].link)},t.prototype.enableKeyboardNav=function(){e(document).on("keyup.keyboard",e.proxy(this.keyboardAction,this))},t.prototype.disableKeyboardNav=function(){e(document).off(".keyboard")},t.prototype.keyboardAction=function(e){var t,n,r,i,s;t=27,n=37,r=39,s=e.keyCode,i=String.fromCharCode(s).toLowerCase(),s===t||i.match(/x|o|c/)?this.end():i==="p"||s===n?this.currentImageIndex!==0&&this.changeImage(this.currentImageIndex-1):(i==="n"||s===r)&&this.currentImageIndex!==this.album.length-1&&this.changeImage(this.currentImageIndex+1)},t.prototype.end=function(){return this.disableKeyboardNav(),e(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),e("select, object, embed").css({visibility:"visible"})},t}(),e(function(){var e,r;return r=new n,e=new t(r)})}).call(this);