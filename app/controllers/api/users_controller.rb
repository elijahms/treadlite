class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: %i[create show index]

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: { errors: ['No user found'] }, status: :not_found
    end 
  end

  def index
    users = User.all
    userrecords = users.map {|u| [u.username, u.userrecord.score]}
    render json: userrecords
  end

  private

  def user_params
    params.permit(
      :username,
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
    )
  end
end
