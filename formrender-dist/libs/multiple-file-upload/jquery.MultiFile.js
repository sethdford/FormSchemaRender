window.jQuery&&function(e){e.fn.MultiFile=function(t){if(this.length==0)return this;if(typeof arguments[0]=="string"){if(this.length>1){var n=arguments;return this.each(function(){e.fn.MultiFile.apply(e(this),n)})}return e.fn.MultiFile[arguments[0]].apply(this,e.makeArray(arguments).slice(1)||[]),this}var t=e.extend({},e.fn.MultiFile.options,t||{});e("form").not("MultiFile-intercepted").addClass("MultiFile-intercepted").submit(e.fn.MultiFile.disableEmpty),e.fn.MultiFile.options.autoIntercept&&(e.fn.MultiFile.intercept(e.fn.MultiFile.options.autoIntercept),e.fn.MultiFile.options.autoIntercept=null),this.not(".MultiFile-applied").addClass("MultiFile-applied").each(function(){window.MultiFile=(window.MultiFile||0)+1;var n=window.MultiFile,r={e:this,E:e(this),clone:e(this).clone()};typeof t=="number"&&(t={max:t});var i=e.extend({},e.fn.MultiFile.options,t||{},(e.metadata?r.E.metadata():e.meta?r.E.data():null)||{},{});i.max>0||(i.max=r.E.attr("maxlength")),i.max>0||(i.max=(String(r.e.className.match(/\b(max|limit)\-([0-9]+)\b/gi)||[""]).match(/[0-9]+/gi)||[""])[0],i.max>0?i.max=String(i.max).match(/[0-9]+/gi)[0]:i.max=-1),i.max=new Number(i.max),i.accept=i.accept||r.E.attr("accept")||"",i.accept||(i.accept=r.e.className.match(/\b(accept\-[\w\|]+)\b/gi)||"",i.accept=(new String(i.accept)).replace(/^(accept|ext)\-/i,"")),e.extend(r,i||{}),r.STRING=e.extend({},e.fn.MultiFile.options.STRING,r.STRING),e.extend(r,{n:0,slaves:[],files:[],instanceKey:r.e.id||"MultiFile"+String(n),generateID:function(e){return r.instanceKey+(e>0?"_F"+String(e):"")},trigger:function(t,n){var i=r[t],s=e(n).attr("value");if(i){var o=i(n,s,r);if(o!=null)return o}return!0}}),String(r.accept).length>1&&(r.accept=r.accept.replace(/\W+/g,"|").replace(/^\W|\W$/g,""),r.rxAccept=new RegExp("\\.("+(r.accept?r.accept:"")+")$","gi")),r.wrapID=r.instanceKey+"_wrap",r.E.wrap('<div class="MultiFile-wrap" id="'+r.wrapID+'"></div>'),r.wrapper=e("#"+r.wrapID+""),r.e.name=r.e.name||"file"+n+"[]",r.list||(r.wrapper.append('<div class="MultiFile-list" id="'+r.wrapID+'_list"></div>'),r.list=e("#"+r.wrapID+"_list")),r.list=e(r.list),r.addSlave=function(t,i){r.n++,t.MultiFile=r,i>0&&(t.id=t.name=""),i>0&&(t.id=r.generateID(i)),t.name=String(r.namePattern.replace(/\$name/gi,e(r.clone).attr("name")).replace(/\$id/gi,e(r.clone).attr("id")).replace(/\$g/gi,n).replace(/\$i/gi,i)),r.max>0&&r.n-1>r.max&&(t.disabled=!0),r.current=r.slaves[i]=t,t=e(t),t.val("").attr("value","")[0].value="",t.addClass("MultiFile-applied"),t.change(function(){e(this).blur();if(!r.trigger("onFileSelect",this,r))return!1;var n="",s=String(this.value||"");r.accept&&s&&!s.match(r.rxAccept)&&(n=r.STRING.denied.replace("$ext",String(s.match(/\.\w{1,4}$/gi))));for(var o in r.slaves)r.slaves[o]&&r.slaves[o]!=this&&r.slaves[o].value==s&&(n=r.STRING.duplicate.replace("$file",s.match(/[^\/\\]+$/gi)));var u=e(r.clone).clone();u.addClass("MultiFile");if(n!="")return r.error(n),r.n--,r.addSlave(u[0],i),t.parent().prepend(u),t.remove(),!1;e(this).css({position:"absolute",top:"-3000px"}),t.after(u),r.addToList(this,i),r.addSlave(u[0],i+1);if(!r.trigger("afterFileSelect",this,r))return!1}),e(t).data("MultiFile",r)},r.addToList=function(t,n){if(!r.trigger("onFileAppend",t,r))return!1;var i=e('<div class="MultiFile-label"></div>'),s=String(t.value||""),o=e('<span class="MultiFile-title" title="'+r.STRING.selected.replace("$file",s)+'">'+r.STRING.file.replace("$file",s.match(/[^\/\\]+$/gi)[0])+"</span>"),u=e('<a class="MultiFile-remove" href="#'+r.wrapID+'">'+r.STRING.remove+"</a>");r.list.append(i.append(u," ",o)),u.click(function(){return r.trigger("onFileRemove",t,r)?(r.n--,r.current.disabled=!1,r.slaves[n]=null,e(t).remove(),e(this).parent().remove(),e(r.current).css({position:"",top:""}),e(r.current).reset().val("").attr("value","")[0].value="",r.trigger("afterFileRemove",t,r)?!1:!1):!1});if(!r.trigger("afterFileAppend",t,r))return!1},r.MultiFile||r.addSlave(r.e,0),r.n++,r.E.data("MultiFile",r)})},e.extend(e.fn.MultiFile,{reset:function(){var t=e(this).data("MultiFile");return t&&t.list.find("a.MultiFile-remove").click(),e(this)},disableEmpty:function(t){t=(typeof t=="string"?t:"")||"mfD";var n=[];return e("input:file.MultiFile").each(function(){e(this).val()==""&&(n[n.length]=this)}),e(n).each(function(){this.disabled=!0}).addClass(t)},reEnableEmpty:function(t){return t=(typeof t=="string"?t:"")||"mfD",e("input:file."+t).removeClass(t).each(function(){this.disabled=!1})},intercepted:{},intercept:function(t,n,r){var i,s;r=r||[],r.constructor.toString().indexOf("Array")<0&&(r=[r]);if(typeof t=="function")return e.fn.MultiFile.disableEmpty(),s=t.apply(n||window,r),setTimeout(function(){e.fn.MultiFile.reEnableEmpty()},1e3),s;t.constructor.toString().indexOf("Array")<0&&(t=[t]);for(var o=0;o<t.length;o++)i=t[o]+"",i&&function(t){e.fn.MultiFile.intercepted[t]=e.fn[t]||function(){},e.fn[t]=function(){return e.fn.MultiFile.disableEmpty(),s=e.fn.MultiFile.intercepted[t].apply(this,arguments),setTimeout(function(){e.fn.MultiFile.reEnableEmpty()},1e3),s}}(i)}}),e.fn.MultiFile.options={accept:"",max:-1,namePattern:"$name",STRING:{remove:"x",denied:"You cannot select a $ext file.\nTry again...",file:"$file",selected:"File selected: $file",duplicate:"This file has already been selected:\n$file"},autoIntercept:["submit","ajaxSubmit","ajaxForm","validate","valid"],error:function(e){alert(e)}},e.fn.reset=function(){return this.each(function(){try{this.reset()}catch(e){}})},e(function(){e("input[type=file].multi").MultiFile()})}(jQuery);