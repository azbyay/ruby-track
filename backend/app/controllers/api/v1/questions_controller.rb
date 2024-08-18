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

          # Transform the result to include only the required fields
          transformed_results = result["matches"].map do |match|
            metadata = JSON.parse(match["metadata"]["text"])
            complaint_text = metadata["complaint_what_happened"]

            # Rewrite the complaint text using OpenAI
            rewrite_response = openai_client.chat(
              parameters: {
                model: "gpt-4",  # Use chat model here
                messages: [
                  {
                    role: "system",
                    content: "Rewrite the following complaint text to make it clearer and more concise:"
                  },
                  {
                    role: "user",
                    content: complaint_text
                  }
                ],
                max_tokens: 200
              }
            )

            rewritten_complaint = rewrite_response.dig("choices", 0, "message", "content")
            {
              complaint_what_happened: rewritten_complaint || complaint_text,
              issue: metadata["issue"],
              sub_issue: metadata["sub_issue"],
              product: metadata["product"],
              tags: metadata["tags"]
            }
          end
        
          Rails.logger.info "Transformed Result: #{transformed_results.inspect}"
        
          render json: { question: question_text, results: transformed_results }, status: :ok
        else
          render json: { error: "Failed to generate embedding." }, status: :unprocessable_entity
        end
      end
    end
  end
end
