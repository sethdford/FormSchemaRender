define(["jquery","underscore","backbone","text!templates/subform-layouts/buttondecision.html"],function(e,t,n,r){var i=n.View.extend({template:t.template(r),initialize:function(){},render:function(e){e=e||null;var t={};e&&(t.data=e),this.options.name&&(t.name=this.options.name),this.$el.after(this.template(t))},events:{}});return i});