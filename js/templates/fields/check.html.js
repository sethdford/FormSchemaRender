define(function() { var str ='<%var _id = (typeof attributes.id !== \'undefined\') ? attributes.id: name,index = -1,numRow = Math.ceil(values.length/options.numcolumns),spanNum = 12/options.numcolumns,lastRow = numRow - 1,lastValue = values.length - 1,_modulo = false,_checked = \'\';%><div id="<%= _id %>_checkbox"<%= _attr %> class="checkbox-container"><% if(description) { %><label><%= description %></label><% } %><% if(options.numcolumns > 1) { %><div class="row-fluid"><% } %><% _.each(values, function(value, key) {index++;if (typeof _data !== \'undefined\') {_checked = (_.indexOf(_data, value) < 0) ? \'\': \'checked\';}if (options.numcolumns > 1) {_modulo = index % numRow;}if (_modulo === 0) {%><div class="span<%= spanNum %>"><% } %><label class="checkbox"><input type="checkbox" name="<%= name %>[]" value="<%= value %>" id="<%= _id %>_<%= index %>" <%= _checked %>><%= value %></label><% if (_modulo === lastRow || (index === lastValue && _modulo) ) { %></div><% } }); %><% if(options.numcolumns > 1) { %></div><% } %><% if(options.othertextbox) {var _hasOther = (typeof _data === \'undefined\') ? false: _.indexOf(_data, \'_other\') > -1;%><div><label class="checkbox"><input type="checkbox" id="<%= _id %>_other" name="<%= name %>[]" class="checkbox-other" <%= (_hasOther) ? \'checked\': \'\' %> value="_other">Other (please specify)</label><textarea name="<%= name %>_other" class="span12 other-textbox <%= (_hasOther) ? \'\': \'not_sending\' %>" placeholder="Other (please specify)" <%= (_hasOther) ? \'style="display:block;"\': \'\' %>><%= (typeof _otherValue !== \'undefined\' && _otherValue) ? _otherValue: \'\' %></textarea></div><% } %><% if(options.addselectall || options.addclearall) { %><div class="text-right"><% if(options.addselectall) { %><button type="button" class="btn btn-primary checkbox-selectall">Select All</button><% } %><% if(options.addclearall) { %><button type="button" class="btn btn-danger checkbox-clearall">Clear All</button><% } %></div><% } %></div>';return str;});