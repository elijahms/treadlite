class Event < ApplicationRecord
  # validates :start_date,
  #           :end_date,
  #           :weekday,
  #           :start_hour,
  #           :end_hour,
  #           :user_id,
  #           presence: true
  validates :name, presence: true
  belongs_to :user
  has_many :notes, dependent: :destroy

  @@weekday_to_str = %w[
    Sunday
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
  ]

  # def minuteTest(startTime, currentTime)
  #   if startTime.hour == currentTime.hour && startTime.min < currentTime.min
  #     return false
  #   else
  #     return true
  #   end
  # end

  def self.find_event_by_time(user)
    current_time = Time.new
    weekday = @@weekday_to_str[current_time.wday]
    user.events.find do |event|
      event.weekday == weekday && event.start_hour.hour <= current_time.hour &&
        event.end_hour.hour >= current_time.hour &&
        current_time.yday <= event.end_date.yday &&
        current_time.yday >= event.start_date.yday &&
        event.start_hour.min <= current_time.min &&
        event.end_hour >= current_time.min
    end
  end
end
