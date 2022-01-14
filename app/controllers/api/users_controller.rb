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

  def following
    user = User.find_by(id: session[:user_id])
    if user
      followings = user.followings
      followings = followings.map {|f| [f.id]}
      render json: followings, status: :ok
    else
      render json: { errors: ['No user found'] }, status: :not_found
    end 
  end

  def index
    users = User.all
    userrecords = users.map {|u| {username: u.username, score: u.userrecord.score, avatar: u.username[0], id: u.id}}
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
