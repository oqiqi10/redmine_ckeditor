/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.font_names = config.font_names + ';宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑';

    config.clipboard_handleImages = false;
    config.image_previewText = ' ';
    config.uploadUrl = '/ckeditor/upload';
    config.filebrowserUploadUrl = '/ckeditor/upload';
    config.filebrowserHtml5videoUploadUrl = '/ckeditor/upload';

    config.mathJaxLib = '//10.18.7.34:8080/js/mathjax/2_7_4/MathJax.js?config=TeX-AMS_CHTML';

    config.mentions = [
    {
        feed: '/ckeditor/user_autocomplete?q={encodedQuery}',
        marker: '@',
        itemTemplate: '<li data-id="{id}">' +
                      '<img class="avatar" src="{avatar}" height="14" width="14" />' +
                      '<strong class="username">{username}</strong>' +
                      '<span class="fullname">{fullname}</span>' +
                      '</li>',
        outputTemplate: '<a href="/users/{id}">@{fullname}</a><span>&nbsp;</span>',
        minChars: 1
    },
    {
        feed: '/ckeditor/issue_autocomplete?q={encodedQuery}',
        marker: '#',
        itemTemplate: '<li data-id="{id}">' +
                      '<strong class="label">{label}</strong>' +
                      '<span class="subject">{subject}</span>' +
                      '</li>',
        outputTemplate: '<a href="/issues/{id}">{fulldesc}</a><span>&nbsp;</span>',
        minChars: 1
    },
    {
        feed: '/ckeditor/wiki_page_autocomplete?q={encodedQuery}',
        marker: '[[',
        itemTemplate: '<li data-id="{id}">' +
                      '<strong class="label">{label}</strong>' +
                      '</li>',
        outputTemplate: '<a href="{url}">{title}</a><span>&nbsp;</span>',
        minChars: 2
    }
    ];

    config.codemirror = {

        // Set this to the theme you wish to use (codemirror themes)
        theme: 'default',
    
        // Whether or not you want to show line numbers
        lineNumbers: true,
    
        // Whether or not you want to use line wrapping
        lineWrapping: true,
    
        // Whether or not you want to highlight matching braces
        matchBrackets: true,
    
        // Whether or not you want tags to automatically close themselves
        autoCloseTags: true,
    
        // Whether or not you want Brackets to automatically close themselves
        autoCloseBrackets: true,
    
        // Whether or not to enable search tools, CTRL+F (Find), CTRL+SHIFT+F (Replace), CTRL+SHIFT+R (Replace All), CTRL+G (Find Next), CTRL+SHIFT+G (Find Previous)
        enableSearchTools: true,
    
        // Whether or not you wish to enable code folding (requires 'lineNumbers' to be set to 'true')
        enableCodeFolding: true,
    
        // Whether or not to enable code formatting
        enableCodeFormatting: true,
    
        // Whether or not to automatically format code should be done when the editor is loaded
        autoFormatOnStart: true,
    
        // Whether or not to automatically format code should be done every time the source view is opened
        autoFormatOnModeChange: true,
    
        // Whether or not to automatically format code which has just been uncommented
        autoFormatOnUncomment: true,
    
        // Define the language specific mode 'htmlmixed' for html including (css, xml, javascript), 'application/x-httpd-php' for php mode including html, or 'text/javascript' for using java script only
        mode: 'htmlmixed',
    
        // Whether or not to show the search Code button on the toolbar
        showSearchButton: true,
    
        // Whether or not to show Trailing Spaces
        showTrailingSpace: true,
    
        // Whether or not to highlight all matches of current word/selection
        highlightMatches: true,
    
        // Whether or not to show the format button on the toolbar
        showFormatButton: true,
    
        // Whether or not to show the comment button on the toolbar
        showCommentButton: true,
    
        // Whether or not to show the uncomment button on the toolbar
        showUncommentButton: true,
    
        // Whether or not to show the showAutoCompleteButton button on the toolbar
        showAutoCompleteButton: true,
        // Whether or not to highlight the currently active line
        styleActiveLine: true
    };
};

