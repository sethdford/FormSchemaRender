define(function() { var str ='<%var _btn_div = \'text-align:left;\', _validation = \'\';if (typeof options[\'btn-align\'] !== \'undefined\') {switch(options[\'btn-align\'].toLowerCase()) {case \'right\':_btn_div = \'text-align:right;\';break;case \'center\':_btn_div = \'text-align:center;\';break;}}if (typeof validation !== \'undefined\' && validation && validation.required) {_validation = \'<span class="required">*</span>\';}%><div<%= _attr %>><div id="<%= attributes.id %>_form_collection" class="subform-collection"></div><div style="<%= _btn_div %>" class="actions"><button class="btn btn-primary form-view" type="button" id="<%= attributes.id %>_add_btn"><%= description %> <%= _validation %></button></div><div id="<%= attributes.id %>_form_content"></div><hr/></div>';return str;});