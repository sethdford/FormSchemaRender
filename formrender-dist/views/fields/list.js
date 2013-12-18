define(["jquery","lodash","backbone","models/model","modelbinder","validation","vm","utils","events","text!templates/subform-layouts/default.html","jquery.expose","bootstrap"],function(e,t,n,r,i,s,o,u,a,f){return n.View.extend({_modelBinder:undefined,clean:function(){n.Validation.unbind(this),typeof this._modelBinder!="undefined"&&this._modelBinder.unbind(),u.destroyPopover(this.$el)},removeContent:function(){this.$el.html("").removeAttr("class").fadeIn()},initialize:function(){this._modelBinder=new i;var e;typeof this.options.model=="undefined"?(this.model=new r(t.extend(this.options.formSchema,{is_internal:this.options.internal,render_mode:this.options.mode})),this._btn_title="Add"):this._btn_title="Done",this.options.formSchema.view=this.options.formSchema.view||"";switch(this.options.formSchema.view.toLowerCase()){default:e=f}this.template=t.template(e)},render:function(r){var i=this,s="";require(["views/baseField"],function(a){var f="",l,c=o.create(i,"BaseField",a,{formSchema:i.options.formSchema});t.each(i.options.formSchema.fields,function(e,n,r){typeof e.description!="undefined"&&t.indexOf(c.notRenderLabel,e.type.toLowerCase())===-1&&(l=u.checkRequireFields(e,i.options.formSchema.validation),f+=c.renderLabel(e,l));if(e.type.toLowerCase()==="email"&&e.options.autocomplete&&i.model.get(e.name)!==""){var o=i.model.get(e.name).split("@");i.model.set(e.name+"_username",o[0]),i.model.set(e.name+"_server",o[1]),e.options["default"]?(s=e.options["default"],e.options["default"]=o[1]):s=""}f+=c.render(e),s!==""&&(e.options["default"]=s)});var h=t.clone(i.options.formSchema.formoptions);h.submitbutton=i._btn_title,h.subForm=!0,f+=c.renderButton(h),e(i.el).html(i.template(t.extend({html:f},i.options.formSchema))),i._modelBinder.bind(i.model,i.el),n.Validation.bind(i,{forceUpdate:!0}),c._hasEmailPicker&&i.setupEmailInput(),u.setupPlaceHolder(i.el),u.setupPopover(i.$el),c._hasBooleanInput&&u.setupBooleanInput(i.$el,c),r&&i.$(".form-actions button.btn-cancel").click()})},events:{"keypress div.sub_form_render :input":"preventEnterPressed","click div.form-actions .btn-submit":"sendForm","click div.form-actions .btn-cancel":"clickCancel","blur :input:not(:button)":"preValidate"},preventEnterPressed:function(t){if(t.keyCode===13&&e(t.currentTarget).is("input"))return t.stopPropagation(),!1},preValidate:function(e){e.stopPropagation(),u.preValidate(e,this.model)},sendForm:function(t){t.preventDefault();var n=this,r=e(".form-actions .btn-submit",this.$el);if(r.hasClass("submitted"))return;r.addClass("submitted"),u.setHiddenField(this.el);if(this.model.isValid(!0)){var i=e(".not_sending",this.el).trigger("change").attr("disabled",!0);i.each(function(){n.model.unset(e(this).attr("name"))}),r.removeClass("submitted"),this.$el.trigger(this.options.formId+".add",this)}else{var s={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> Validation Error',content:"Please correct the form"};r.popover(s).popover("show"),window.setTimeout(function(){r.removeClass("submitted").popover("destroy"),r.next(".popover").remove()},2e3)}},clickCancel:function(e){e.preventDefault(),o.remove("SubFormView"+this.options.formId,!0),o.remove("SubFormViewEdit"+this.options.formId,!0),this.$el.trigger(this.options.formId+".close",this)},setupEmailInput:function(){u.setupEmailInput(this.el)}})});