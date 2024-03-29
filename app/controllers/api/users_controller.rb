class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: %i[create show]

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      Userrecord.create!(user_id: user.id, score: 0, trend_num: 8, trend_update: Time.new.prev_month, primary_heating: 'elec', gas_cost: 1, oil_cost: 1, elec_cost: 100, miles_per_gallon: 20, miles_per_week: 275, own_ev: false, own_car: true, public_transport: 2, household_size: 1, total_shop_freq: 2, shop_time_freq: 52, online_shop_freq: 1, return_shop_freq: 3, new_shop_freq: 2, food_habit: 3, monthly_bill: 1)
      render json: user, status: :created
    end
  end

  def show
    user = User.find_by!(id: session[:user_id])
    render json: user, status: :ok
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

  def get_followers
    user = User.find_by(id: session[:user_id])
    if user
      followers = user.followers.map {|f| f.id}
      render json: followers, status: :ok
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
