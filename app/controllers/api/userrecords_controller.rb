class Api::UserrecordsController < ApplicationController
    
    def create
        user = User.find_by(id: session[:user_id])
        if Userrecord.find_by(user_id: user)
            userrecord = Userrecord.find_by(user_id: user)
            weekly_co_em = params[:miles_per_week] / params[:miles_per_gallon]
            ## zi = (xi – min(x)) / (max(x) – min(x)) * 100
            score = 100 - ((weekly_co_em - 0.35) / (48 - 0.35) * 100)
            userrecord.update(score: score)
            user
            render json: userrecord, status: :created
        else
            userrecord = Userrecord.create!(userrecord_params)
            userrecord.update(user_id: user.id)
            weekly_co_em = params[:miles_per_week] / params[:miles_per_gallon]
            ## zi = (xi – min(x)) / (max(x) – min(x)) * 100
            score = 100 - ((weekly_co_em - 0.35) / (48 - 0.35) * 100)
            userrecord.update(score: score)
            user
            render json: userrecord, status: :created
        end

    end

  private

  def userrecord_params
    params.permit(
      :miles_per_week,
      :miles_per_gallon
    )
  end 
end
