define([],function(){var e="<%var _description = (options.defaulttext) ? options.defaulttext: description.toLowerCase();%><select id=\"<%= (typeof attributes.id !== 'undefined') ? attributes.id: name %>\" name=\"<%= name %>\"<%= _attr %>><option value=\"\">-- Select <%= _description %> --</option><% _value = $.isArray(values) %><% _.each(values, function(value, key) { %><option <%= (_value) ? '': ' value=\"'+key+'\"' %>><%= value %></option><% }); %></select>";return e});