RedmineApp::Application.routes.draw do
  mount Rich::Engine => '/rich', :as => 'rich'
  get 'ckeditor/user_autocomplete', :to => 'ckeditor#user_autocomplete'
  get 'ckeditor/issue_autocomplete', :to => 'ckeditor#issue_autocomplete'
  get 'ckeditor/wiki_page_autocomplete', :to => 'ckeditor#wiki_page_autocomplete'
  post 'ckeditor/uploadfrompaste', :to => 'ckeditor#upload'
  post 'ckeditor/upload', :to => 'ckeditor#upload'
end
