Rails.application.routes.draw do
  namespace :api do
    get '/users', to: 'users#index'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    get '/dashboard', to: 'userrecords#show'
    get '/following', to: 'users#following'
    get '/getfollowers', to: 'users#get_followers'
    post '/newfollow', to: 'friendships#create'
    patch '/trendupdate', to: 'userrecords#trendupdate'
    patch '/transport', to: 'userrecords#transport'
    patch '/living', to: 'userrecords#living'
    patch '/shopping', to: 'userrecords#shopping'
    patch '/food', to: 'userrecords#food'
    get '/userscore', to: 'userrecords#userscore'
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
