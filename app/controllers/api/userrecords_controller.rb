class Api::UserrecordsController < ApplicationController
    
    def create
      user = User.find_by(id: session[:user_id])
      userrecord = user.userrecord
      userrecord.update!(userrecord_params)
      userrecord.calc_transportation_score
      userrecord.calc_living_score
      userrecord.calc_total_score
      render json: userrecord, status: :accepted
    end

    def transport
      user = User.find_by(id: session[:user_id])
      userrecord = user.userrecord
      userrecord.update!(userrecord_params)
      userrecord.calc_transportation_score
      render json: userrecord, status: :accepted
    end

    def living
      user = User.find_by(id: session[:user_id])
      userrecord = user.userrecord
      userrecord.update!(userrecord_params)
      userrecord.calc_living_score
      render json: userrecord, status: :accepted
    end

    def shopping
      user = User.find_by(id: session[:user_id])
      userrecord = user.userrecord
      userrecord.update!(userrecord_params)
      userrecord.calc_shopping_score
      render json: userrecord, status: :accepted
    end

    def food
      user = User.find_by(id: session[:user_id])
      userrecord = user.userrecord
      userrecord.update!(userrecord_params)
      userrecord.calc_food_score
      userrecord.calc_total_score
      render json: userrecord, status: :accepted
    end

    def show
      userrecord = Userrecord.find_by(user_id: session[:user_id])
      if userrecord
        render json: userrecord, status: :ok
      else
        render json: { errors: ['No user found'] }, status: :not_found
      end 
    end

    def update
      userrecord = Userrecord.find_by(id: params[:id])
      userrecord.update!(userrecord_params)
      userrecord.save!
      render json: userrecord, status: :ok
    end

    def trendupdate
      userrecord = Userrecord.find_by(user_id: session[:user_id])
      if userrecord.calc_update_permission
        userrecord.update!(userrecord_params)
        render json: userrecord, status: :ok
      else 
        render json: { errors: ['Sorry, You recently updated your trend. See FAQ for more details.'] }, status: :unauthorized
      end
    end

    def userscore
      userrecord = Userrecord.find_by(user_id: session[:user_id])
      render json: userrecord, status: :ok
    end

  private

  def userrecord_params
    params.permit(
      :miles_per_week,
      :miles_per_gallon,
      :score,
      :household_size,
      :zip_code,
      :elec_cost,
      :water_cost,
      :gas_cost,
      :oil_cost,
      :total_shop_freq,
      :shop_time_freq,
      :online_shop_freq,
      :return_shop_freq,
      :new_shop_freq,
      :food_habit,
      :own_ev,
      :own_car,
      :public_transport,
      :trend_num,
      :trend_update,
      :primary_heating,
    )
  end

end
