require 'faker'

20.times do 
    # username = Faker::Name.first_name
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    score = rand(1..100)
    email = Faker::Internet.email
    user = User.create(username: first_name, first_name: first_name, last_name: last_name, password: last_name, password_confirmation: last_name, email: email)
    Userrecord.create(user_id: user.id, score: score, trend_num: rand(1..16))
end