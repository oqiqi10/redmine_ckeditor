require 'rake'
require 'rails/generators'

module RedmineCkeditor
  class RichAssetsGenerator < Rails::Generators::Base
    source_root File.expand_path('../templates', __FILE__)
    desc "Generate rich asset files for Redmine"
    def create_assets
      rake "redmine_ckeditor:assets:copy"

      gsub_file RedmineCkeditor.root.join("assets/ckeditor-contrib/plugins/richfile/plugin.js"),
        "/assets/rich/", "../images/"

      application_js = RedmineCkeditor.root.join("assets/javascripts/application.js")
      
      gsub_file application_js, /var CKEDITOR_BASEPATH.+$/, ""

      gsub_file application_js, /CKEDITOR.plugins.addExternal.+$/, ""

      browser_js = RedmineCkeditor.root.join("assets/javascripts/rich/filebrowser.js")

      gsub_file browser_js, "opt=opt.split(',');", "opt=opt ? opt.split(',') : [];"

      inject_into_file browser_js,
        "\t\turl = $(item).data('relative-url-root') + url;\n",
        :after => "data('uris')[this._options.currentStyle];\n"

      gsub_file RedmineCkeditor.root.join("assets/javascripts/rich/uploader.js"), '"/rich/files/"+', ""

      gsub_file RedmineCkeditor.root.join("assets/stylesheets/rich/application.css"),
        'image-url("rich/', 'url("../../images/'

      append_to_file RedmineCkeditor.root.join("assets/stylesheets/rich/editor.css"),
        "\nhtml, body {\n  height: 100%;\n}\n"
    end
  end
end
