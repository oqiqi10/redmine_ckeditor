class CkeditorController < ApplicationController

  protect_from_forgery except: :upload

  def upload
    now = Time.now
    dir = Rails.root.join('public', 'uploads', now.strftime("%Y"), now.strftime("%m"), now.strftime("%d"))
    FileUtils.mkdir_p(dir) unless Dir.exist?(dir)
    uploaded_io = params[:upload]
    #File.open(dir.join(uploaded_io.original_filename), 'wb') do |file|
    saved_filename = SecureRandom.urlsafe_base64 + File.extname(uploaded_io.original_filename)
    File.open(dir.join(saved_filename), 'wb') do |file|
      file.write(uploaded_io.read)
    end
    url = URI::join(request.base_url.to_s, now.strftime("/uploads/%Y/%m/%d/"), saved_filename).to_s
    render json: { "uploaded": 1, "fileName": saved_filename, "url": url }
  end

  def user_autocomplete
    q = params[:q].to_s.strip
    users = User.all.active.visible.sorted.like(q).to_a
    render :json => format_users_json(users)
  end

  def issue_autocomplete
    issues = []
    q = params[:q].to_s.strip

    scope = Issue.visible

    if q.present?
      if q =~ /\A#?(\d+)\z/
        issues << scope.find_by(:id => $1.to_i)
      end
      issues += scope.like(q).order(:id => :desc).limit(10).to_a
      issues.compact!
    else
      issues += scope.order(:id => :desc).limit(10).to_a
    end

    render :json => format_issues_json(issues)
  end

  def wiki_page_autocomplete
    wiki_pages = []
    q = params[:q].to_s.strip

    projects = Project.active.visible.sorted.to_a
    projects.each do |project| 
      wiki = Wiki.find_by(project: project)
      if !wiki.nil? && User.current.allowed_to?(:view_wiki_pages, project)
        scope = wiki.pages.reorder(id: :desc)
        pages =
          if q.present?
            scope.where("LOWER(#{WikiPage.table_name}.title) LIKE LOWER(?)", "%#{q}%").limit(10).to_a
          else
            scope.limit(10).to_a
          end
        wiki_pages += pages
      end
    end

    wiki_pages.compact!
    render json: format_wiki_pages_json(wiki_pages)
  end

  private

  def format_users_json(users)
    users.map do |user|
      {
        id: user.id,
        fullname: user.name,
        email: user.mail,
        username: user.login,
        avatar: user.avatar ? (url_for :only_path => false, :controller => "account", :action => "get_avatar", :id => user.id, :size => 14) : "/plugin_assets/redmine_local_avatars/images/default.png"
      } 
    end
  end

  def format_issues_json(issues)
    issues.map do |issue|
      {
        'id' => issue.id,
        'label' => "#{issue.tracker} ##{issue.id}",
        'subject' => ": #{issue.subject.to_s.truncate(60)}",
        'fulldesc' => "#{issue.tracker} ##{issue.id}: #{issue.subject.to_s.truncate(60)}"
      }
    end
  end

  def format_wiki_pages_json(wiki_pages)
    wiki_pages.map do |page|
      {
        'id' => page.id,
        'label' => page.title.to_s.truncate(60),
        'title' => page.title,
        'url' => url_for(:only_path => true, :controller => "wiki", :action => "show", :project_id => page.project, :id => page.title)
      }
    end
  end
end
