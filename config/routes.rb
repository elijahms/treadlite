Rails.application.routes.draw do
  namespace :api do
    resources :notes, only: %i[index update destroy create]
    resources :events, only: %i[index create destroy]
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
