class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: %i[create show]

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      Userrecord.create!(user_id: user.id, score: 0, trend_num: 8, trend_update: Time.new.prev_month)
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
    user = User.find_by(id: session[:user_id])
    users = User.all.where.not(id: user.id)
    userrecords = users.map {|u| {username: u.username, score: u.userrecord.score, avatar: u.username[0], id: u.id, trend: u.userrecord.trend_num }}
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
