class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: :json_request?

  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?
	
  def angular
    render 'layouts/application'
  end

  protected
    def json_request?
      request.format.json?
    end
  #def verified_request?
  #  super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  #end
    # In Rails 4.1 and below
    def verified_request?
      super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
    end
    
  private
    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) << :username
    end

  
end
