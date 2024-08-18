Rails.application.routes.draw do
  get "home/index"
  root to: 'home#index'

  get '/favicon.ico', to: ->(env) { [204, {}, []] }
end
