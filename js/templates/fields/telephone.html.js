define(function() { var str ='<%var _id = (options.id) ? options.id: name;%><input type="tel" name="<%= name %>" id="<%= _id %>" placeholder="(xxx) xxx-xxxx" maxlength="14"<%= _attr %>/>';return str;});