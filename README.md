FormSchemaRender
================
Read JS object and Build the HTML Form.

Version `version 0.1.6`

### Head Section
Please use font-awesome to add visual effect to the UI.

`<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">`

or

`<link href="css/font-awesome.css" rel="stylesheet">`

If need IE7 supports for font-awesome,

	<!--[if IE 7]>
		<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome-ie7.min.css" rel="stylesheet">
	<![endif]-->

or

	<!--[if IE 7]>
		<link href="css/font-awesome-ie7.css" rel="stylesheet">
	<![endif]-->

Please include these styles

* form-render.css (Required) `<link rel="stylesheet" href="css/form-render.css" />`
* wizard.css (Required: if rendering with Wizard View) `<link rel="stylesheet" href="css/wizard.css">`
* spinner.css (Required: if setting type 'Number' with options 'Spinner = true' ) `<link rel="stylesheet" href="css/spinner.css">`
* lightbox.css (Required: if setting type 'Image' ) `<link rel="stylesheet" href="css/lightbox.css" />`
* datepicker.css (If you use type = "date") `<link rel="stylesheet" href="css/datepicker.css" />`
* select2.css (If you use type = "UserId" with options.render = "Select") `<link rel="stylesheet" href="css/select2.css" />`

Load JS with RequireJS
`<script data-main="js/main" src="js/libs/require/require.js"></script>`

### JS Object
1. language: form language default value is "en", support language code [ISO 639-1](http://loc.gov/standards/iso639-2/php/code_list.php)
2. formSchema: formSchema JS Object (Require)
3. formActionUrl: set url action for the form (Require for read and update modes).
4. formData: formData JS Object (Optional)
5. mode: mode either "read", "update" or "create" (Optional, default is create mode)
6. view: view to render "default", "horizontal" or "wizard" (Optional, default view is horizontal view)
7. token: if you want to add token in your form, you can add it here (Optional, but recommended)
8. internal: When we want to add internal only fileds, if any fields that has `options.internal = true` will only get render if this flag set to true. (Optional, default value is false)
9. formEvents: custom events JS code that will need to run in form render scope. (Optional)
10. hideButtons: Force FormRender not to render any buttons. (Optional)

Example:

	<script type="text/javascript">
		var language = "en"
		, formSchema = {}
		, formActionUrl = '/action'
		, formData = {}
		, mode = ""
		, view = ""
		, token = ""
		, internal = boolean
		, formEvents = { event : function }
		, hideButtons = false;
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
Note: Require to have field type = 'step' at the beginning of fields array in formSchema.

Ex:

	{
		"Type": "Step",
		"Icon": "icon-user",
		"Description": "Step 1"
	}

For Icon, we are using [Font-Awesome](http://fortawesome.github.io/Font-Awesome/).

### Build

Automatic Build
1. run this command in terminal `perl compile.pl` form app root.

Manual Build

1. Under js/libs path will have `build.js` and `parsetmpl.pl` file.
2. If this project need to call from another domain, will need to use `perl js/libs/parsetmpl.pl` from app root.
3. run with this command at the app root `r.js -o js/libs/build.js`

Note:
If calling this script from different domain will need to run this build script `perl js/libs/parsetmpl.pl` from the app root.
This script will parse html into requireJS in order to work around XHR restrictions.

### Events

Every events in our form render will follow this namespace `"form_id.event_name"`. Simply listen to these events.

* Form render completed Event: `form_id.renderCompleted`
* Form before submit Event: `form_id.preSubmit`
* Form when received respond back Event: `form_id.postSubmit`

Note:

For preSubmit event, the parameters for POST and using AJAX are different,
Using AJAX will be function (e, formData, jqForm, options)
Normal Form POST will be function (e, submitEvent, $form)

Then you need to pass your custom event into

	var formEvents = {
		'renderCompleted' : function(e, view) {
			console.log('Render Form Completed.');
		},
		'preValidation': function (e, originalEvent, $form, form) {
			console.log('Before Validating this form.');
		},
		'preSubmit' : function(e, formData, jqForm, options) {
			console.log('Before Submitting this form.');
		},
		'postSubmit' : function (e, responseText, _jsonText, statusText, xhr, $form) {
			console.log('Let\'s check the respond.');
		}
	};

Or we can add this key to the FormSchema as well.

	{
		Events: {
			'renderCompleted' : "function(e, view) {
				console.log('Render Form Completed.');
			}",
			'preValidation': function (e, originalEvent, $form, form) {
				console.log('Before Validating this form.');
			},
			'preSubmit' : "function(e, formData, jqForm, options) {
				console.log('Before Submitting this form.');
			}",
			'postSubmit' : "function (e, responseText, _jsonText, statusText, xhr, $form) {
				console.log('Let\'s check the respond.');
			}"
		}
	}

### Multi-Languages Support

If we define Languages key with [ISO 639-1](http://loc.gov/standards/iso639-2/php/code_list.php), it will render language when you pass in the language parameter. Now we can render different text for each languages.

By default will render with Description in en mode.

	{
		"Name" : "Lang",
		"Type" : "TextBox",
		"Description" : "What Language is this?",
		"Languages": {
			"sp": "¿Qué idioma habla?"
		}
	}


### Fields

These are the list of fields that currently support.

+ Html: any custom html
+ Hidden:
+ TextBox:
+ Password:
+ Telephone:
+ Textarea:
+ Number:
+ Email:
+ Date:
+ BirthDate:
+ Select:
+ CheckBox:
+ Radio:
+ Timestamp:
+ UserAccount:
+ Fraction:
+ File:
+ MultiFiles:
+ FullName:
+ Address:
+ State:
+ Zipcode:
+ Country:
+ BooleanInput:
+ Button:
+ ButtonGroup:
+ ButtonClipboard:
+ List:

### Submit Form

By default, the submit event will use Ajax call to submit data. When passing `Options.AjaxSubmit = false` in Submit field type, it will use normal post form without Ajax.

Example: Setting Button type option to prevent Ajax form submit

	{
		"Name" : "SubmitBtn",
		"Type" : "Submit",
		"Description" : "Submit Button",
		"Url" : "/controller/action",
		"Attributes" : {
			"Class" : "btn btn-primary"
		},
		"Options" : {
			"AppendId" : true,
			"AjaxSubmit": false
		}
	}

### Button

In order to build form when user click a button can be done by adding class "btn-render-form" in any button type.

	{
		"Type" : "Button",
		"Description" : "Build Hidden Form On Click",
		"Url" : "/anyurl",
		"Attributes" : {
			"Class" : "btn btn-primary btn-render-form"
		}
	}

To add confirmation before click simply add the Options.Confirmed = true.

To look up the User can Options.ShowOnUser as an array of string.

	{
		"Type": "Button",
		"Description": "Mark as Testing",
		"Url": "{Valid URL Logic}",
		"Attributes": {
			"Class": "btn btn-success"
		},
		"Options": {
			"Internal": true,
			"AppendId": true,
			"ShowOnStatus": [
				"Status One"
			],
			"ShowOnMode": [
				"read"
			],
			"ShowOnUser": [
				"user one"
			],
			"Confirmed": true
		}
	}

### UserId Field

This is the user id from user collection. This will link to user collection to check the claim for each form.

	{
        "Name" : "UserName",
        "Type" : "UserId",
        "Description" : "Username",
        "Options" : {
        	"Url" : "/your_end_point"
        }
    }

### BooleanInput

This will be used as Yes and No input group. You can override this by changing the text. The value will be either "true" and "false".
To override the default text simply add Options.Text.Yes = "Yes !" or Options.Text.No = "No !"


### Radio

This will be used to render radio input.

To change to render as a Bootstrap Inline Button can be done by adding Options.Render = "btn-group"

To add button class simply add Options.BtnClass = "btn-primary"
Note: "btn" class already include by default

Example,

    {
        "Name": "TestRadio1",
        "Type": "Radio",
        "Description": "Test 1",
        "Values": [
            "Test 1", "Test 2", "Test 3"
        ]
    }, {
        "Name": "TestRadio2",
        "Type": "Radio",
        "Description": "Test 2",
        "Values": {
            "Test One": "Test 1",
            "Test Two": "Test 2",
            "Test Three": "Test 3"
        }
    }, {
        "Name": "TestRadio3",
        "Type": "Radio",
        "Description": "Test 3",
        "Values": [
            "Test 1", "Test 2", "Test 3"
        ],
        "Options": {
            "Render": "btn-group",
            "BtnClass": "btn-primary"
        }
    }, {
        "Name": "TestRadio4",
        "Type": "Radio",
        "Description": "Test 4",
        "Values": {
            "Test One": "Test 1",
            "Test Two": "Test 2",
            "Test Three": "Test 3"
        },
        "Options": {
            "Render": "btn-group"
        }
    }


### FullName Field

By default, will render three textboxes as "First Name", "Middle Initial" and "Last Name"
if we don't want to render "Middle Initial" simply set in "Options.MiddleName = false".
If we want to accept Middle Name instead of Middle Initial simply set "Options.FullMiddleName = true". This option will change the placeholder text to "Middle Name".

### Address Field

By default, Address Field will render "Street, City, State, ZipCode and Country"

If you want to hide Country simply pass "HideCountry" to true in options.

	{
		"Name" : "ShippingAddress",
		"Type" : "Address",
		"Description" : "Shipping Address",
		"Options" : {
			"HideCountry" : true
		}
	}

If we want to perform ajax call to auto populate data for the user. We can pass `Options.Url` to point to the endpoint
that we want. Also, the JSON result must match this format.

	{
		"status": "ok",
		"data": {
			"field_name_1": "value_1",
			"field_name_2": "value_2",
			"field_name_3": "value_3"
		}
	}


If we want to use ZIP+4 from [USPS](https://tools.usps.com/go/ZipLookupAction_input "Look Up a ZIP Code")
This will enable ZIP+4 (By default, it will only allowed to have 5 digits)

	{
        "Name" : "BusinessAddress",
        "Type" : "Address",
        "Description" : "Business Address",
        "Options": {
            "ZipCodeFormat": "ZIP+4"
        }
    },


### Select Field

To change the default select text, simply set `Options.DefaultText: any text`

	{
		"Name" : "TestSelect",
		"Type" : "Select",
		"Description" : "How do you like my website?",
		"Values" : [
			"Nice",
			"Ok",
			"N/A"
		],
		"Options" : {
			"DefaultText" : "select one of these options"
		}
	}

To change languages for Select field add "Values-language" like,

	{
		"Name" : "TestSelect",
		"Type" : "Select",
		"Description" : "How do you like my website?",
		"Values" : [
			"Nice",
			"Ok",
			"N/A"
		],
		"Values-sp" : {
			"Nice": "Bueno"
			"Ok": "Satisfactorio"
			"N/A": "N/A"
		},
		"Options" : {
			"DefaultText" : {
				"en": "select one of these options",
				"sp": "seleccione una de estas opciones"
			}
		}
	}

To order the select value, you can simply set Options.OrderBy = "alphabetical"

To Enabled, multiple select. Set Attributes.multiple = true

	{
		"Name": "OpenBy",
		"Type": "Select",
		"Description": "Box Opened By",
		"Featured": true,
		"Attributes": {
			"multiple": true
		}
	}

To loaded look up value dynamically need to set up LookUp Object in Options key

	{
		"Name": "By",
		"Type": "Select",
		"Description": "By",
		"Featured": true,
		"Options": {
			"LookUp": {
				"Url": "/users/searchforuser?query={{this}}&internalOnly=true"
			}
		}
	}

LookUp Object expected the JSON data to be an array that contain objects.

By default will use "id" as the value and "text" as a text to display in that object key.
If we want to change the key, simply Set LookUp Object as,

	{
		"LookUp": {
			"Url": "/users/searchforuser?query={{this}}&internalOnly=true",
			"Value": "YourValueKey",
			"Text": "YourTextKey"
		}
	}

To Create Tag, simply set Options.Tags = true


### CheckBox Field

will be the same set up as Select Field

To render multiple columns, simply set 'Options.NumColumns' = 4 (Any number max at 4, default is 1)

To add "Select All" and "Clear All" for checkbox simply add Options.AddSelectAll = true or Options.AddClearAll = true

To order the checkbox values, you can simply set Options.OrderBy = "alphabetical"

Example,

    {
        "Name": "Questions",
        "Type": "CheckBox",
        "Description": "Test CheckBox",
        "Values": [
            "Question 1",
            "Question 2",
            "Question 3",
            "Question 4",
        ],
        "Options": {
            "NumColumns": 3,
            "AddSelectAll": true,
            "AddClearAll": true,
            "OrderBy": ""
        }
    }


### Number Field

Number field will limit only the number input. We can use this field to store currency as well.
We will store the currency as integer and then pass the `Options.Decimals: any_number`
It will set the number of decimal points when render.

	{
		"Name" : "PaymentAmount",
		"Type" : "Number",
		"Description" : "Payment Amount",
		"Options" : {
			"Decimals" : 2
		}
	}

By Default, Type Number will store as integer.
If we pass options "NumberType" as Currency, Integer, or Double. We will store as that.
Note: for Currency will save as integer then will display as decimal.

	"Options": {
		"NumberType": "Double"
	}

If you want to display spinner, simply pass `Options.Spinner: true`. Please add css `<link rel="stylesheet" href="css/spinner.css">` as well.

Sometime you want to be able to control what number types that user can put in. Setting `Options.LimitInputValue: "type"`.
"type" that we can use will be (By default it will be "natural")

1. "natural": 1, 2, 3, 4, 5, ... (default behavior)
2. "whole": 0, 1, 2, 3, 4, 5, ...
3. "integers": ..., -3, -2, -1, 0, 1, 2, 3, ...
4. "rational": ..., -1.00, 0, 1.00, ...
5. "number": Any floating point number

Note: we can use this class to limited input from client


### Telephone

If user wants to capture US telephone simply, this will render telephone type with (XXX) XXX-XXXX
To turn on Provider, simply pass in "Options.ShowProvider" = true;

	{
        "Name" : "MobileNumber",
        "Type" : "Telephone",
        "Description" : "Business Mobile Number",
        "Options" : {
            "ShowProvider" : true
        }
    }


### VisibleOn Options

There are sometime that the value from another field will effect the flow of the form. In this case, we will use `Options.VisibleOn = { Name: 'Name of other field', Values: 'Array of that field values that will trigger this field' };` to handle this situation.
To specific the ParentContainer please pass in the css selector.

Example: If a user select on a value in select area, this will trigger the Depend field.

Select Type (Value of this field will trigger the event of Depend Field)

	{
		"Name" : "SelectMe",
		"Type" : "Select",
		"Description" : "Please select me to trigger another field",
		"Values": [
			"Option 1",
			"Option 2",
			"Option 3",
			"Option 4"
		]
	}

VisibleOn Options

	{
		"Name" : "OptionOne",
		"Type" : "TextBox",
		"Description" : "If user selected 'Option 1' and 'Option 3' in 'SelectMe' I will show!",
		"Options": {
			"VisibleOn": {
				"Name": "SelectMe",
				"Values": [
					"Option 1",
					"Option 3"
				],
				"ParentContainer": ".parent"
			}
		}
	},
	{
		Name: "Test",
		Type: "HTML",
		Description: "<div>Hello to 'Option 2' or 'Option 4'</div>",
		"Options": {
			"VisibleOn": {
				"Name": "SelectMe",
				"Values": [
					"Option 2",
					"Option 4"
				]
			}
		}
	}

Validation FormSchema

	{
		Validation: {
			SelectMe: {
				required: true
			},
			OptionOne: {
				required: true
			}
		}
	}

### CopyValuesFrom Options

Sometime we might run into billing address and shipping address that a user might have the same values in this field. We want to provide the nice UX for our user by adding a button to ask them either this has the same values as previous field.
By passing, `Options.CopyValuesFrom = "Name of the field that we want to copy data from"`.
Note: in order to make this work, it must be the same field type.

	{
		Name: "MyBillingAddress",
		Type: "Address",
		Description: "Your Billing Address"
	},
	{
		Name: "MyShippingAddress",
		Type: "Address",
		Description: "Your Shipping Address",
		Options: {
			CopyValuesFrom: {
				Name: "MyBillingAddress",
				Description: "Is your shipping same as billing address?"
			}
		}
	}

### File Field

If we want to include the Java File Upload we can simple add "Options.JavaUpload" to "true". This will give the user ability to user either normal
input file or Java Upload (File will be send as ZIP by default)

	{
        "Description" : "File to Upload",
        "Name" : "FileUpload",
        "Type" : "File",
        "Options" : {
            "JavaUpload" : true
        }
    }

In order to validate file type, we can add "filetype" in the "Validation" field.

	"Validation" : {
		"FileUpload" : {
        	"required" : true,
        	"filetype" : ["zip", "jpg"]
		}
	}

Note: Since JavaPowUpload will send all the post data as AJAX, we then need to pass in jRedirect global variable in order to redirect after upload completed.


### Date Field

By default `Type = "Date"` will render as DatePicker, However sometime it is very difficult to select birthday with Datepicker, so if you set `Options.Render = "Select"`. This will render the date field as select box.

To render time, pass option "Render": "DateTime"

	{
		Name: "MyDate",
		Type: "Date",
		Description: "Your DatePicker",
		Options: {
			Render: "Datepicker"
		}
	}

	{
		Name: "MySecondDate",
		Type: "Date",
		Description: "Your Birthday",
		Options: {
			Render: "Select"
		}
	}

Validation FormSchema

	{
		Validation: {
			MyDate: {
				required: true,
				maxDate: "today",
				minDate: "01/01/1950"
			},
			MySecondDate: {
				required: true,
				maxDate: "08/14/1995"
			}
		}
	}

### Fraction

When we want to render Fraction we can use this field type, example can be used as Blood Pressure Fields
To set placeholder for numerator uses Options.Numerator and denominator uses Options.Denominator.

Example,

    {
        "Name": "BloodPressure",
        "Type": "Fraction",
        "Description": "BP (mmHg):",
        "Attributes": {
            "class": "number"
        },
        "Options": {
            "Numerator": "Systolic",
            "Denominator": "Diastolic"
        }
    }

### ButtonDecision

When we want to control the flow of the form, we can have the button to look up the result with Ajax and has the options to render the data and let the user select what information is corrected.

Return JSON Format (Required)

	{
		value: "any value that will return, this will trigger the button decision"
	}

FormSchema:

	{
		"Name" : "ButtonDecisionLookUp",
		"Type" : "ButtonDecision",
		"Description" : "Look Up Information",
		"Url" : "/route/url",
		"Data" : [
			{
				"firstname" : "Your_fullname_first_name",
				"lastname" : "Your_fullname_last_name",
				"birthdate" : "YourDob"
			}
		],
		"Options": {
			"RenderResult" : true
		}
	}

Data: This data will send as get data in the query string
In some case, some data field can be empty. We need to set "Options.DataCanEmpty = ['fieldName']"

FormSchema:

	{
		"Name" : "ButtonDecisionLookUp",
		"Type" : "ButtonDecision",
		"Description" : "Look Up Information",
		"Url" : "/route/url",
		"Data" : [
			{
				"firstname" : "Your_fullname_first_name",
				"middlename" : "Your_fullname_middle_name",
				"lastname" : "Your_fullname_last_name",
				"birthdate" : "YourDob"
			}
		],
		"Options": {
			"RenderResult" : true,
			"DataCanEmpty" : ["middlename"]
		}
	}

Options.RenderResult: If there might some chance that the data might return more than just 1 data. It will need to supply this options to enable dynamic data rendering with this JSON protocol

Return JSON Format (Required)

	{
		value: "any value that will return, if data existed in the JSON result. This will be ignored.",
		data: {
			caption: "Table Caption",
			thead: {
				key: value
			},
			data: {
				data1 : {
					key: value
				},
				data2 : {
					key: value
				}
			},
			hiddenfields: [
				'key1', 'key2'
			]
		}
	}


### ButtonClipboard

Sometime in read mode, you want to provide the easy way for copy multiple text area to the user in just one click.
This Field Type will only work in read mode and when user "click" the button. It will automatic copy into their clipboard.

	{
		Name : "CopyShippingInfo",
		Type : "ButtonClipboard",
		Description : "Copy Shipping Information",
		Values : [ "ShippingName", "ShippingAddress" ]
	}

### List Type (Sub Form)

This is the sub form fields type. You can nested form with in the form.

To render existing data, will use description to render as the heading in the result table.

To Render Custom Table Header simply pass in Options.TableTitle in Fields.
This will get generate the table header with that text and simply hover over to see the full detail of description.

Example,

    {
        "Name": "SubFormExample",
        "Description": "Add a To Do",
        "Type": "List",
        "View": "table",
        "Options": {
            "Btn-Align": "Right",
            "ReadModeDescription": "To Do"
        },
        "Fields": [{
            "Name": "ToDo",
            "Type": "TextBox",
            "Description": "What do you want to do?"
        }]
    }


(Read mode) By Default, it will sort by string.
If we want to change the way it sorted, we need to specify either ["int", "string", "string-ins", "float", "date"]
Note: for date, will convert to int and sort by int.
Thank you for this awesome project, [Stupid Table Plugin](http://joequery.github.io/Stupid-Table-Plugin/)

Example,

    {
        "Name": "SubFormExample",
        "Description": "Add a To Do",
        "Type": "List",
        "View": "table",
        "Options": {
            "Btn-Align": "Right",
            "ReadModeDescription": "To Do"
        },
        "Fields": [{
            "Name": "ToDo",
            "Type": "TextBox",
            "Description": "What do you want to do?",
            "Options": {
            	"SortBy": "int"
            }
        }]
    }

## Internal Only Options

These options will be used in internal only mode.

### InternalCanUpdate Options

Sometime there are some fileds that internal should not be able to update these fields. In order to implement this use case, we will need to set `Options.InternalCanUpdate = false`. This will prevent the user to update this field. The FormRender will just render as hidden field.

	{
		"Name" : "ImageId",
		"Type" : "Image",
		"Description" : "Your Image",
		"Options" : {
			"InternalCanUpdate": false
		}
	}

## Version

* 0.1.6
	- For "UserPermissions" SubForm name will only allowed that user to edit their own information, (Options.Permission field need to be set)
	- Will Render Error upon the AJAX submission.
	- Fix the Modal View when having the Options.Url in TextBox
	- Meaningful Text when render for BooleanInput
	- Adding SubButtons Schema in Button Type, will render as Popovers
	- When Clear Form button pressed, should not clear some of the fields like Status and other radio values
	- Adding Array.prototype.forEach for old browser
	- Add ShowOnUser for button field type
	- Add Modules Feature, currently support "FormReloadWhenStatusChange"
    - Improve VisibleOn Options to be able to handle checkbox and radio with nested values
    - Will render VisibleOn from Top Down

* 0.1.5
	- Fix the List to be able to render Select2
	- Force All UpperCase Field Value with "touppercase" class name
	- Allowed only one space not multiple space with "allowedonespace" class name

* 0.1.4
	- Adding Tag in Select Type as a options
	- Set autocomplete off by default
	- Visible On with Radio Field Type
	- Render Decimal in read mode with list type
	- Radio can now render multilple language
	- Date Field can now render Date and Time
	- Fix the Checkbox Model binder

* 0.1.3
	- Add ability to sort by column in List field type
	- Add Events Key in FormSchema
	- Support render $date in Date Field

* 0.1.2

	- Add "DeleteEnabled" featured. This will check against "FieldExists" and "AfterXDays" properties.
	- IE 8 issued when using .class in template. (fraction.html)
	- Add ability to create custom text by setting ConfirmedText (button)
	- Fixed Date format turn into 00:xx:xx PM when at noon
	- Fix the attributes to be able to parse the JavaScript code
	- Submit Button not require to have url attr
	- Fix validation for require on checkbox field type
	- Add ability for SubForm to pull remote select values from AJAX
	- Add VisibleOn options to set the parent container to render the html


* 0.1.1

	- Bug for buttonclipboard in model binder.
	- Bug for telephone in model binder.
	- Bug in Address Field Template (missing div)
	- Adding ability to render the Select and Radio by Name (Alphabetical)
	- In edit mode, checkbox value is not showing need to fixed.
	- Adding the CheckBox option to be able to handle other.
	- Adding ZIP+4 option in address field.
	- Adding Telephone to be able to show Provider. (Options.ShowProvider = true)
	- Upgrade jQuery to v1.10.2
	- Adding Error Exception to render if run into error.
	- Fixed bug on Confirmed Button when having the AppendId = true
	- Fixed bug on VisibleOn Validation
	- Fixed Validation Render Error in IE
	- Fixed ModelBinder throw exception in SubForm Type
	- Fixed Validation issued in MultiFiles Type



* 0.1.0

	- Adding Spinner Options to be able to set min and default values.
	- Adding Options in Button to be able to ask for confirmation before redirect the form.
	- Adding Sub Form (List Type) Options to be able to perform more function.
	- Remove Bug in Model when binding the Model with ModelBinder.
	- Date Picker not render with visible on.
	- Adding Options.NumColumns to render how many columns for checkbox.
	- Adding Select All and Clear All for checkbox simply add Options.AddSelectAll = true and Options.AddClearAll = true
	- Adding New Type "Fraction" will render as textbox / textbox
	- Adding Radio Type with option to render as Bootstrap button group

* 0.0.9

	- Adding JavaPowUpload from http://www.element-it.com/multiple-file-upload-applet/java-uploader.aspx (require serial number)

* 0.0.8

	- Support International Address.

* 0.0.7

	- Fix Button Decision on Read Mode.
	- Add Decimals Options for Number Type.
	- Button Decision can render data if found more than one.
	- Fix Image Type when render, if it can render using lighbox will do that else will link to the new page.
	- Adding Ajax Call to auto populate data

* 0.0.6

	- Add Copy to Clipboard button, Button Decision type and fix ie 7 Styles.

* 0.0.5

	- Adding MultiFiles Upload and Fix minor bug.

* 0.0.4

	- SubForm can render the data in all the mode now. Fixed minor bug for validation methods and schema.

* 0.0.3

	- Fix IE when render List Type. Fix validation in special field type.

* 0.0.2

	- Add Wizard View.

* 0.0.1

	- Init Project.
