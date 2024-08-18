module Api
  module V1
    class QuestionsController < ApplicationController
      def create
        openai_client = OpenAI::Client.new(
          api_key: ENV['OPENAI_API_KEY'],
        )
        question_text = params[:question]

        # Generate embedding for the question using OpenAI
        embedding_response = openai_client.embeddings(parameters: {
          model: "text-embedding-3-large",
          input: question_text
        })

        embedding = embedding_response.dig("data", 0, "embedding")

        if embedding.present?
          pinecone_service = PineconeService.new
          result = pinecone_service.query(embedding)

          # Generic response regardless of matches found
          render json: { question: question_text, result: result }, status: :ok
        else
          render json: { error: "Failed to generate embedding." }, status: :unprocessable_entity
        end
      end
    end
  end
end
