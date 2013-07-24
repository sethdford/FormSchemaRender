define(["jquery","underscore","backbone"],function(e,t,n){return{ucwords:function(e){return(e+"").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()})},preValidate:function(t,n){var r=e(t.currentTarget),i=r.attr("name"),s;s=e.trim(r.val()),r.hasClass("tolowercase")&&(s=s.toLowerCase()),r.hasClass("toucwords")&&(s=this.ucwords(s)),r.val(s).trigger("change"),n.set(i,s),n.isValid(i,s)?r.removeClass("invalid"):r.addClass("invalid")},setupEmailInput:function(t){e(".emailpicker",t).each(function(){var t=e(".emailpicker_server",this),n=e(".not_sending",this);t.val(t.attr("data-value")).trigger("change"),n.on("change",this,function(t){var n=e(":hidden",t.data),r=e(".emailpicker_username",t.data),i=e(".emailpicker_server",t.data);r.val()!==""&&i.val()!==""?n.val(e.trim(r.val()+"@"+i.val())).trigger("change"):n.val("").trigger("change")}).on("keydown",function(e){if(e.keyCode===32)return e.preventDefault(),!1})})},setupBDateInput:function(t){e(".birthdaypicker",t).each(function(){e(this).birthdaypicker(e(this).attr("data-options"))})},getBDateinput:function(t,n){e("fieldset.birthday-picker",t).each(function(){e(".not_sending",this).trigger("change");var t=/NaN/i,r=e(':input[type="hidden"]',this);r.val().match(t)&&e(":hidden",this).val(""),n.set(r.attr("name"),r.val())})},setupDateInput:function(t){e(".datepicker",t).each(function(){var t={},n,r;if(e(this).attr("data-maxdate"))switch(e(this).attr("data-maxdate").toLowerCase()){case"today":r=new Date,n=new Date(r.getFullYear(),r.getMonth(),r.getDate(),0,0,0,0),t.onRender=function(e){return e.valueOf()>n.valueOf()?"disabled":""}}e(this).datepicker(t).on("changeDate",function(t){var n=e(t.currentTarget).removeClass("invalid").trigger("change");n.datepicker("hide")}).on("click",function(t){e("div.datepicker.dropdown-menu").css("display","none"),e(t.currentTarget).datepicker("show")})})},preventSpace:function(e){if(e.keyCode===32)return e.preventDefault(),!1},allowNumber:function(t){if(t.keyCode===8||t.keyCode===37||t.keyCode===39||t.keyCode===46||t.keyCode===9)return!0;(t.keyCode!==46&&t.keyCode!==190||e(t.currentTarget).val().indexOf(".")!==-1)&&(t.keyCode<48||t.keyCode>57)&&t.preventDefault()},allowZipCode:function(e){if(e.keyCode===8||e.keyCode===37||e.keyCode===39||e.keyCode===46||e.keyCode===9)return!0;(e.keyCode<48||e.keyCode>57)&&e.preventDefault()}}});