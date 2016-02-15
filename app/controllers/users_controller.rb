class UsersController < ApplicationController

	def index
    respond_with User.all
  end

  def create
    respond_with User.create(user_params)
  end

  def show
    respond_with User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
