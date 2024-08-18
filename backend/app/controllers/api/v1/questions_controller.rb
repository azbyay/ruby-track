# app/controllers/api/v1/questions_controller.rb
module Api
    module V1
      class QuestionsController < ApplicationController
  
        def index
          @questions = Question.all
          render json: @questions
        end
  
        def create
          openai_client = OpenAI::Client.new(
            api_key: ENV['OPENAI_API_KEY'],
            organization: ENV['OPENAI_ORG']
          )
          question_text = params[:question]
  
          response = openai_client.chat(parameters: {
            model: "gpt-4o-mini",
            messages: [{role: "system", content: "You are a helpful and empathetic virtual assistant specializing in resolving complaints. When a user presents a complaint or issue, your primary goal is to understand the problem fully, express empathy, and then offer a clear, actionable solution. You should provide concise, accurate information and suggest practical steps that the user can take to resolve their issue. If necessary, ask clarifying questions to better understand the situation. Always aim to leave the user feeling satisfied and reassured."},{ role: "user", content: question_text }],
            temperature: 0.5
          })
  
          answer = response.dig("choices", 0, "message", "content")
  
          if answer.present?
            render json: { question: question_text, answer: answer }, status: :created
          else
            render json: { error: "Failed to get a response from OpenAI." }, status: :unprocessable_entity
          end
        end
      end
    end
  end
  