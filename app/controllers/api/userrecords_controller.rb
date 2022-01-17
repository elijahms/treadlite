class Api::UserrecordsController < ApplicationController
    
    def create
      user = User.find_by(id: session[:user_id])
      userrecord = user.userrecord
      userrecord.update!(userrecord_params)
      userrecord.calc_score
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
      render json: userrecord, status: :ok
    end

  private

  def userrecord_params
    params.permit(
      :miles_per_week,
      :miles_per_gallon,
      :score
    )
  end 
end
