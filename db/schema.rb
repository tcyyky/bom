# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150917175804) do

  create_table "boards", force: :cascade do |t|
    t.string   "image"
    t.text     "caption"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "good"
    t.integer  "bad"
    t.integer  "username_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "back_type"
    t.boolean  "remove_image"
    t.string   "image_cache"
    t.string   "remote_image_url"
  end

  add_index "boards", ["username_id"], name: "index_boards_on_username_id"

  create_table "comments", force: :cascade do |t|
    t.integer  "username_id"
    t.text     "body"
    t.integer  "board_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "comments", ["board_id"], name: "index_comments_on_board_id"
  add_index "comments", ["username_id"], name: "index_comments_on_username_id"

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
