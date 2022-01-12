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
      userrecord.update!(score: params[:score])
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
