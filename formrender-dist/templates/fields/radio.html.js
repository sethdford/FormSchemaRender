define([],function(){var e='<%var _id = (typeof attributes.id !== \'undefined\') ? attributes.id: name,_val,_cnt = -1,_defaultVal = (typeof _data !== \'undefined\') ? \' value="\' + _data + \'" class="has-default-val"\': \'\',_btnClass = (options.btnclass) ? options.btnclass: \'\';%><div class="radio-container"><% if (typeof values !== \'undefined\') { %><% if (typeof options.render === \'undefined\') { %><% _.each(values, function(element, index) {_cnt++;_val = (_.isNumber(index)) ? element: index;%><label class="radio"><input type="radio" name="<%= name%>" id="<%= _id %>_<%= _cnt %>" value="<%= _val %>" /><%= element %></label><% }); %><% } else if (options.render === \'btn-group\') { %><div class="btn-group" data-toggle="buttons-radio"><% _.each(values, function(element, index) {_cnt++;_val = (_.isNumber(index)) ? element: index;%><button type="button" class="btn <%= _btnClass %>" value="<%= _val %>" data-value="<%= _val %>"><%= element %></button><% }); %><input type="hidden" name="<%= name%>" <%= _defaultVal %> id="<%= _id %>"></div><% } %><% } %></div>';return e});