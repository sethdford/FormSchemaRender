define(function() { var str ='<input type="hidden"  id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>" name="<%= name %>" data-value="<%= data_value %>"/>';return str;});