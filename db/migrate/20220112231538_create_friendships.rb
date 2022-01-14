class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.integer :followed_user_id
      t.integer :follower_id

      t.timestamps
    end
  end
end
