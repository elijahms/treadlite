class Api::EventsController < ApplicationController
  def create
    event = @current_user.events.create!(event_params)
    render json: event, status: :created
  end

  def index
    render json: @current_user.events
  end

  def destroy
    event = Event.find_by(id: params[:id])
    event.destroy!
    render json: { message: 'Your event was deleted' }, status: :gone
  end

  private

  def event_params
    params.permit(
      :name,
      :start_date,
      :end_date,
      :weekday,
      :start_hour,
      :end_hour,
    )
  end
end
