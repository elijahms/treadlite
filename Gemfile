source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.3"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.2.3"

# Use postgresql as the database for Active Record
gem "pg", "~> 1.5"

gem "bcrypt", "~> 3.1"

gem "pry", "~> 0.14"

# gem "active_model_serializers"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 8.0"

gem "faker", "~> 2.23"

# Keep Minitest on 5.x; 6.x is a major API break for Rails test helpers.
gem "minitest", "~> 5.25"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem "rack-cors"


group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end
