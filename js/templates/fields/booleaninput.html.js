define(function() { var str ='<%var _yes = (options.text && options.text.yes) ? options.text.yes: \'Yes\',_no = (options.text && options.text.no) ? options.text.no: \'No\',_id = (attributes.id)? attributes.id: name;%><div class="form-render_booleaninput_wrapper"><div class="btn-group form-render_booleaninput" data-toggle="buttons-radio" id="<%= _id %>_booleaninput"><button type="button" class="btn btn-primary btn-yes" data-value="true" data-id="<%= _id %>"><%= _yes %></button><button type="button" class="btn btn-primary btn-no" data-value="false" data-id="<%= _id %>"><%= _no %></button><input type="hidden" id="<%= _id %>" name="<%= name %>" value=""/></div><p class="booleaninput-value-render" style="display:none"></p></div>';return str;});