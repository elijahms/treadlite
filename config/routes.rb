Rails.application.routes.draw do
  namespace :api do
    resources :userrecords
    resources :userdata
    get '/users', to: 'users#index'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    get '/dashboard', to: 'userrecords#show'
    patch '/treadliter', to: 'userrecords#update'
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
