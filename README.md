FormSchemaRender
================
Read JS object and Build the HTML Form.

Version `version 0.0.1`

### Head Section
Please use font-awesome to add visual effect to the UI.
`<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">`

Please include these styles

* form-render.css (Required) `<link rel="stylesheet" href="css/form-render.css" />`
* datepicker.css (If you use type = "date") `<link rel="stylesheet" href="css/datepicker.css" />`

Load JS with RequireJS
`<script data-main="js/main" src="js/libs/require/require.js"></script>`

### JS Object
1. formSchema: formSchema JS Object (Require)
2. formData: formData JS Object (Optional)
3. mode: mode either "read", "edit" or "create" (Optional)
4. view: view to render "default", "horizontal" or "wizard" (Optional, default view is horizontal view)

Example:

	<script type="text/javascript">
		var formSchema = {}
		, formData = {}
		, mode = ""
		, view = "";
	</script>

### HTML Markup
	<div id="app">
		<p class="data-loader">
			<i class="icon-spinner icon-spin icon-large"></i> <span class="text-info">Loading Information ...</span>
		</p>
	</div>

### Views

#### Wizard View
Required wizard.css style
`<link rel="stylesheet" href="css/wizard.css">`

Field type = 'step' is unique for this view only. Other View will not render this field type.
It will set the step for wizard view.

### Build
1. Under js/libs path will have `build.js` file.
2. run with this command at the app root `r.js -o js/libs/build.js`

### Version

* 0.0.1 - Init Project.
