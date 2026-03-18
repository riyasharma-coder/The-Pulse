package com.riya.the_pulse.network

import retrofit2.http.Body
import retrofit2.http.POST

data class ChatRequest(val message: String)

data class ChatResponse(val response: String)

interface ApiService {

    @POST("chat")
    suspend fun sendMessage(
        @Body request: ChatRequest
    ): ChatResponse
}
