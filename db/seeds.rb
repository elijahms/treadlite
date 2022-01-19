require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
20.times do 
    # username = Faker::Name.first_name
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    score = rand(1..100)
    email = Faker::Internet.email
    user = User.create(username: first_name, first_name: first_name, last_name: last_name, password: last_name, password_confirmation: last_name, email: email)
    Userrecord.create(user_id: user.id, score: score, trend_num: 8)
end