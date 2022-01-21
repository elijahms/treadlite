class Api::FriendshipsController < ApplicationController
    def create
        user = User.find_by(id: session[:user_id])
        followed_user = User.find_by(username: params[:username])
        is_following = Friendship.find_by(follower_id: user.id, followed_user_id: followed_user.id)
        if is_following
            is_following.destroy!
            render json: { errors: 'Unfollowed' }, status: :gone
        else
            friendship = Friendship.create!(follower_id: user.id, followed_user_id: followed_user.id)
            render json: friendship, status: :created
        end
    end

end
