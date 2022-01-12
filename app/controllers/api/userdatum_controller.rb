class Api::UserdatumController < ApplicationController


    def create
        user = User.find_by(id: session[:user_id])
        userdata = UserData.create!(userdata_params)
        render json: userdata, status: :created
      end

  private

  def userdata_params
    params.permit(
      :miles_per_week,
      :miles_per_gallon
    )
  end      
end
