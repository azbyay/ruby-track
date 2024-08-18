# app/services/pinecone_service.rb
require 'http'

class PineconeService
  PINECONE_BASE_URL = "https://ruby-track-8abi2f4.svc.aped-4627-b74a.pinecone.io" # Replace with your Pinecone URL
  PINECONE_API_KEY = ENV[PINECONE_API_KEY]

  def initialize
    @headers = {
      "Content-Type" => "application/json",
      "Api-Key" => PINECONE_API_KEY
    }
  end

  def query(vector, top_k = 10)
    payload = {
      "vector" => vector,
      "topK" => top_k,
      "includeValues" => false,
      "includeMetadata" => true
    }

    response = HTTP.headers(@headers).post("#{PINECONE_BASE_URL}/vectors/query", json: payload)

    Rails.logger.debug("#{@headers}")


    if response.status.success?
      JSON.parse(response.body)
    else
      { error: "Error querying Pinecone: #{response.status} - #{response.body}" }
    end
  end
end
