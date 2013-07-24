define(["jquery","lodash","backbone","vm","utils","events","modelbinder","validation","views/baseField","text!templates/form-layouts/wizard.html","jquery.wizard"],function(e,t,n,r,i,s,o,u,a,f){var l=a.extend({_modelBinder:undefined,template:t.template(f),initialize:function(){a.prototype.initialize.call(this),this._steps=[];if(typeof this.options.formSchema=="undefined")throw"formSchema is not in the options parameters";this.el="#"+this.options.formSchema.name},render:function(){var r=this,i,s=a.prototype.render,o="";t.each(this.options.formSchema.fields,function(e,n,u){typeof e.description!="undefined"&&t.indexOf(r.notRenderLabel,e.type.toLowerCase())===-1?(i=typeof r.options.formSchema.validation[e.name]!="undefined"&&r.options.formSchema.validation[e.name].required?!0:!1,o+=r.renderLabel(e,i)):e.type.toLowerCase()==="step"&&r._steps.push(e),o+=s.call(r,e)}),o+=a.prototype.closeOpenDiv.call(this),o+=a.prototype.closeOpenDiv.call(this,"_stepDiv"),e(this.el).html(this.template(t.extend({html:o},this.options.formSchema))),this.renderWizardNavBar(),r._modelBinder.bind(r.model,r.el),n.Validation.bind(r,{forceUpdate:!0}),this.$formWizard=e(".wizard-view .wizard",this.el),this.$prevBtn=e(".wizard-view .wizard-actions .btn_prev",this.el),this.$nextBtn=e(".wizard-view .wizard-actions .btn_next",this.el),e(".step-content .step-pane .form-actions",this.el).hide(),this.attachedEvents()},renderWizardNavBar:function(){var n="",r,i,s,o;t.each(this._steps,function(e,t){e["class"]=e["class"]||"",t===0&&(e["class"]+=" active"),r=typeof e.icon=="undefined"?"":'<i class="icon '+e.icon+' icon-3x"></i>',n+='<li data-target="#wizard_step'+(t+1)+'" class="'+e["class"]+'">'+r+'<span class="badge badge-info">'+(t+1)+"</span>"+e.description+"</li>"}),i=e(".wizard-view ul.steps",this.el).html(n),s=Math.floor((i.width()-this._steps.length)/this._steps.length),o=i.width()-s*this._steps.length-2,e("li",i).css("width",s).last().css("width",s+o)},attachedEvents:function(){this.$prevBtn.on("click",this,this.clickPrev),this.$nextBtn.on("click",this,this.clickNext),this.$formWizard.on("change",this,this.changeStep),this.$formWizard.on("finished",this,this.submittingForm),this.$formWizard.on("stepclick",this,this.stepClicked),e(this.el).on(this.options.formSchema.name+".validated",this,this.validatedForm),e(this.el).on(this.options.formSchema.name+".postSubmit",this,this.respondResult)},clickPrev:function(e){e.data.$formWizard.wizard("previous")},clickNext:function(e){e.data.$formWizard.wizard("next")},stepClicked:function(e,t){switch(t.step){case 1:e.data.$prevBtn.attr("disabled",!0).fadeOut("slow");default:e.data.$nextBtn.removeClass("btn-info").addClass("btn-primary").html('Next <i class="icon-arrow-right"></i>')}},changeStep:function(e,t){var n=e.data._steps.length;i.getBDateinput(e.data.el,e.data.model);if(t.direction==="next")if(!e.data.isStepValid(t.step-1))e.preventDefault();else switch(t.step){case 1:e.data.$prevBtn.removeAttr("disabled").fadeIn("slow");break;case n-1:e.data.$nextBtn.removeClass("btn-primary").addClass("btn-info").html('<i class="icon-envelope-alt"></i> Submit')}else if(!e.data.isStepValid(t.step-2))e.preventDefault();else switch(t.step){case 2:e.data.$prevBtn.attr("disabled",!0).fadeOut("slow");break;case n:e.data.$nextBtn.removeClass("btn-info").addClass("btn-primary").html('Next <i class="icon-arrow-right"></i>')}},isStepValid:function(n){var r=this,i=!1,s,o;if(typeof this._stepValidated[n]!="undefined"){t.each(this._stepValidated[n],function(t){o=e(':input[name="'+t+'"]',r.el).removeClass("invalid"),s=r.model.isValid(t),s||(o.addClass("invalid"),i=!0)});if(i){var u={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> Validation Error',content:"Please correct the form"};this.renderErrorPopover(this.$nextBtn,e(this.el),u)}}return!i},submittingForm:function(t){var n=e(':submit[type="submit"]',t.data.el);n.length>0&&n.trigger("click")},validatedForm:function(t){var n=e(t.data.el),r={html:!0,placement:"top",trigger:"manual"};n.hasClass("validation_pass")?(r.title="Submitting Form, Please wait",r.content='<i class="icon-spinner icon-spin icon-large"></i> Sending data...',t.data.$nextBtn.attr("disabled",!0).popover(r).popover("show").next(".popover").addClass("success")):(r.title='<i class="icon-edit"></i> Validation Error',r.content="Please correct the form",t.data.renderErrorPopover(t.data.$nextBtn,n,r))},renderErrorPopover:function(t,n,r){t.attr("disabled",!0).popover(r).popover("show"),window.setTimeout(function(){e(".invalid:first",n).focus(),t.attr("disabled",!1).popover("destroy"),t.next(".popover").remove()},2e3)},respondResult:function(e){window.setTimeout(function(){e.data.$nextBtn.attr("disabled",!1).popover("destroy").next(".popover").removeClass("success").remove()},3e3)}});return l});