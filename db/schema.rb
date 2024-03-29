# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_27_005048) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendships", force: :cascade do |t|
    t.integer "followed_user_id"
    t.integer "follower_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "userrecords", force: :cascade do |t|
    t.integer "user_id"
    t.integer "miles_per_gallon"
    t.integer "miles_per_week"
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "food_habit"
    t.integer "household_size"
    t.string "zip_code"
    t.float "elec_cost"
    t.float "water_cost"
    t.float "gas_cost"
    t.float "oil_cost"
    t.integer "total_shop_freq"
    t.integer "shop_time_freq"
    t.integer "online_shop_freq"
    t.integer "return_shop_freq"
    t.integer "new_shop_freq"
    t.boolean "own_ev"
    t.boolean "own_car"
    t.integer "public_transport"
    t.integer "trend_num"
    t.datetime "trend_update", precision: 6
    t.string "primary_heating"
    t.integer "living_score"
    t.integer "transportation_score"
    t.integer "food_score"
    t.integer "shopping_score"
    t.float "monthly_bill"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
