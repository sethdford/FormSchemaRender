define(["jquery","lodash","backbone","vm","utils","events","text!templates/layout.html","jquery.ajaxsubmit","jquery.datepicker","jquery.placeholder","jquery.lightbox","jquery.expose","bootstrap"],function(e,t,n,r,i,s,o){var u=n.View.extend({template:t.template(o),el:"#app",initialize:function(){if(typeof this.options.formSchema=="undefined")throw"formSchema is not in the options parameters"},render:function(){var t=this,n="view"in this.options.formSchema?this.options.formSchema.view:"default",s={formSchema:t.options.formSchema,formData:t.options.formData,mode:t.options.mode,internal:t.options.internal,hideButtons:t.options.hideButtons,lang:t.options.lang};this.$el.html(this.template(this.options.formSchema)),typeof this.options.mode!="undefined"&&this.options.mode==="read"?(e("#"+t.options.formSchema.name,t.el).addClass("read-mode"),require(["views/readonly/"+n],function(e){var n=r.create(t,"ReadView",e,s);n.render(),i.finalReadSetup(n)})):require(["views/form-layouts/"+n],function(n){t.formView=r.create(t,"FormView",n,s),t.formView.render(),t.formView._hasDate&&t.setupDateInput(),t.formView._hasBDate&&t.setupBDateInput(),t.formView._hasEmailPicker&&t.setupEmailInput(),i.setupSpinner(t.el),i.setupPlaceHolder(t.el),i.setupFileInput(t.el),i.finalSetup(t.formView),e("#"+t.options.formSchema.name,t.el).trigger(t.options.formSchema.name+".renderCompleted",t);var o=e(t.el).find("form.form-render");t.options.formActionUrl&&o.attr("action",t.options.formActionUrl);var u=e("div.form-actions",o)})},setupBDateInput:function(){i.setupBDateInput(this.el,this.formView.model)},getBDateinput:function(e,t){i.getBDateinput(e,t)},setupEmailInput:function(){i.setupEmailInput(this.el)},setupDateInput:function(){i.setupDateInput(this.el)},preventSpace:function(e){i.preventSpace(e)},allowNumber:function(e){i.allowNumber(e)},allowNaturalNumber:function(e){i.allowNaturalNumber(e)},allowZipCode:function(e){i.allowZipCode(e)},formatTelephoneNumber:function(t){var n=e(t.currentTarget),r=n.val(),i="";if(t.type==="keydown"&&t.keyCode>=48&&t.keyCode<=57||t.keyCode>=96&&t.keyCode<=105)switch(r.length){case 0:if(t.keyCode===48||t.keyCode===105){t.preventDefault();return}n.val("("+r);break;case 4:n.val(r+") ");break;case 9:n.val(r+"-")}else{for(var s=0,o=r.length;s<o;s++)isNaN(parseInt(r[s]))||(i+=r[s]);r="";for(var s=0,o=i.length;s<o;s++){switch(s){case 0:r+="(";break;case 3:r+=") ";break;case 6:r+="-"}r+=i[s]}n.val(r)}},events:{"submit form.form-render":"submitForm","click .form-actions .btn-clear-form":"clearForm","click .form-actions .btn-render-form":"setupForm","blur :input:not(:button)":"preValidate","change :file":"preValidate",'keydown :input[type="email"]':"preventSpace",'keydown :input[type="number"], :input.number':"allowNumber",'keydown :input[type="number"], :input.natural':"allowNaturalNumber","keydown :input.allowzipcode, :input.integer":"allowZipCode","keydown :input.telephone":"formatTelephoneNumber","blur :input.telephone":"formatTelephoneNumber"},submitForm:function(t){var n=e("#"+this.options.formSchema.name,this.el),r=e('.form-actions button[type="submit"]',this.el),s,o;if(n.hasClass("form_submitted"))return;n.addClass("form_submitted").removeClass("validation_pass validation_error"),this.getBDateinput(this.el,this.formView.model),e(".not_sending",n).attr("disabled",!0);if(this.formView.model.isValid(!0)){n.addClass("validation_pass"),this.options.token!==""&&n.prepend('<input type="hidden" name="token" value="'+this.options.token+'"/>'),this.options.mode==="create"&&n.prepend('<input type="hidden" name="form_name" value="'+this.options.formSchema.name+'"/>'),e("input.subform_before_submit",this.el).remove(),this.formView.model.appendSubFormInput(this.options.formSchema.name,this.formView._internalFields),o={beforeSubmit:this.showRequest,success:this.showResponse},i.resetPlaceHolderValue(this.el),this.formView._ajaxSubmit&&(t.preventDefault(),n.ajaxSubmit(o));if(this.formView.options.formSchema.view!=="wizard"){var u,a;switch(this.formView.options.lang){case"sp":u="Enviando la forma; por favor espere",a="Cargando Información";break;default:u="Submitting form; please wait.",a="Sending data"}s={html:!0,placement:"top",trigger:"manual",title:u,content:'<i class="icon-spinner icon-spin icon-large"></i> '+a+" ..."},r.attr("disabled",!0).popover(s).popover("show").next(".popover").addClass("success")}}else t.preventDefault(),n.addClass("validation_error"),n.removeClass("form_submitted"),e(".not_sending",n).attr("disabled",!1),this.formView.options.formSchema.view!=="wizard"&&(s={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> Validation Error',content:"Please correct the form"},r.attr("disabled",!0).popover(s).popover("show"),window.setTimeout(function(){e(".invalid:first",n).focus(),r.attr("disabled",!1).popover("destroy"),r.next(".popover").remove()},2e3));n.trigger(this.options.formSchema.name+".validated")},showRequest:function(e,t,n){t.trigger(t.attr("id")+".preSubmit",[e,t,n]);if(t.attr("data-stopSubmit"))return t.removeAttr("data-stopSubmit"),!1},showResponse:function(n,r,i,s){var o=e.parseJSON(n);t.each(o,function(e,n){typeof e=="string"&&(o[n]=t.unescape(e))}),e(':hidden[name="token"], :hidden[name="form_name"]',s).remove(),s.removeClass("form_submitted"),e(".not_sending",s).attr("disabled",!1),s.trigger(s.attr("id")+".postSubmit",[n,o,r,i,s]),window.setTimeout(function(){e('.form-actions button[type="submit"]',s).attr("disabled",!1).popover("destroy").next(".popover").removeClass("success").remove()},3e3)},preValidate:function(e){i.preValidate(e,this.formView.model)},clearForm:function(){var n=this;t.each(this.formView.model.attributes,function(t,r){typeof t.reset=="function"?n.formView.model.get(r).reset():(e(':input[name="'+r+'"]',n.el).val("").trigger("change"),n.formView.model.set(r,""))})},setupForm:function(t){var n=this,i=e(t.currentTarget);return t.preventDefault(),e.getJSON(i.attr("href"),{},function(e,t){t==="success"?require(["views/hiddenForm"],function(t){var i=r.create(n,"FormView",t);i.render(e)}):location.refresh()}),!1}});return u});