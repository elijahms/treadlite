Rails.application.routes.draw do
  namespace :api do
    resources :friendships
    resources :userrecords
    get '/users', to: 'users#index'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    get '/dashboard', to: 'userrecords#show'
    get '/following', to: 'users#following'
    post '/newfollow', to: 'friendships#create'
    post '/trendupdate', to: 'userrecords#trendupdate'
    post '/transport', to: 'userrecords#transport'
    post '/living', to: 'userrecords#living'
    post '/shopping', to: 'userrecords#shopping'
    post '/food', to: 'userrecords#food'
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
