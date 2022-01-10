class Api::NotesController < ApplicationController
  def index
    render json: @current_user.notes
  end

  def destroy
    note = Note.find_by(id: params[:id])
    note.destroy!
    render json: { message: 'Your note was deleted' }, status: :gone
  end

  def update
    note = Note.find_by(id: params[:id])
    new_note = note.update!(note_params)
    render json: new_note, status: :accepted
  end

  def create
    if Event.find_event_by_time(@current_user)
      event = Event.find_event_by_time(@current_user)
    else
      event = @current_user.events.find_or_create_by(name: 'Other')
    end
    note = event.notes.create!(note_params)
    render json: note, status: :created
  end

  private

  def note_params
    params.permit(:content)
  end
end
