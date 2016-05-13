class UsersController < ApplicationController
  before_filter :authenticate_user!, only: [:index, :show]
  
	def index
    respond_with User.all
  end

  def create
    respond_with User.create(user_params)
  end

  def update
    @user = User.find(params[:id])
    
    respond_with @user.update(user_params)
  end

  def show
    respond_with User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :empresa_id)
  end
end
