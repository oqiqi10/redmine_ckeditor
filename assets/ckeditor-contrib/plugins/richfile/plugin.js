// Rich CKEditor integration plugin - Bastiaan Terhorst

function addQueryString( url, params ) {
	var queryString = [];
	if (!params) return url;
	else {
		for (var i in params) queryString.push(i + "=" + encodeURIComponent( params[i]));
	}
	return url + ( ( url.indexOf( "?" ) != -1 ) ? "&" : "?" ) + queryString.join( "&" );
}

(function(){

	CKEDITOR.plugins.add('richfile',
	{
		lang: 'en,zh',
	    init: function(editor) {

			// register a callback that actually inserts a selected image
	        editor._.insertImagefn = CKEDITOR.tools.addFunction(function(url, id, name){
				this.insertHtml('<img src="' + url + '" alt="" data-rich-file-id="' + id + '" />');
			}, editor);

			editor._.insertFilefn = CKEDITOR.tools.addFunction(function(url, id, name){
				this.insertHtml('<a href="' + url + '" data-rich-file-id="' + id + '">' + name + '</a>');
			}, editor);
			
			// double click an image to replace it
			editor.on( 'doubleclick', function(evt) {
					var element = evt.data.element;

					if (element.is('img') && !element.data('cke-realelement') && !element.isReadOnly()) {
						editor.execCommand('insertRichImage');
					}
			});

			// clean up the callback
			editor.on( 'destroy', function () { CKEDITOR.tools.removeFunction( this._.insertImagefn ); } );

			editor.addCommand( 'insertRichImage', {
				exec: function(editor) {
					var params = {};
					params.CKEditor = editor.name;
					params.CKEditorFuncNum = editor._.insertImagefn;
					params.alpha = editor.config.alpha || false;
					params.default_style = editor.config.default_style;
					params.allowed_styles = editor.config.allowed_styles;
					params.insert_many = editor.config.insert_many;
					params.type = "image";
					params.scoped = editor.config.scoped || false;
					if(params.scoped == true) {
						params.scope_type = editor.config.scope_type
						params.scope_id = editor.config.scope_id;
					}
					params.viewMode = editor.config.view_mode || "grid";
					var url = addQueryString( editor.config.richBrowserUrl, params );
					editor.popup(url, 860, 500);
				}
			});

			editor.addCommand( 'insertRichFile', {
				exec: function(editor) {
					var params = {};
					params.CKEditor = editor.name;
					params.CKEditorFuncNum = editor._.insertFilefn;
					params.alpha = editor.config.alpha || false;
					params.default_style = "original";
					params.allowed_styles = "original";
					params.insert_many = editor.config.insert_many;
					params.type = "file";
					params.scoped = editor.config.scoped || false;
					if(params.scoped == true) {
						params.scope_type = editor.config.scope_type
						params.scope_id = editor.config.scope_id;
					}
					params.viewMode = editor.config.view_mode || "list";
					var url = addQueryString( editor.config.richBrowserUrl, params );
					editor.popup(url, 860, 500);
				}
			});

			editor.ui.addButton( 'richImage', {
				label : editor.lang.richfile.button_image_label,
				command: 'insertRichImage',
				icon: '../images/images.png'
			});

			editor.ui.addButton( 'richFile', {
				label : editor.lang.richfile.button_file_label,
				command: 'insertRichFile',
				icon: '../images/files.png'
			});

	    }
	});

})();
