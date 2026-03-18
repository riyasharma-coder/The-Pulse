package com.riya.the_pulse.repository

import com.riya.the_pulse.network.ChatRequest
import com.riya.the_pulse.network.RetrofitClient

class ChatRepository {
    suspend fun sendMessage(message: String): String {
        return try {
            val response = RetrofitClient.api.sendMessage(
                ChatRequest(message)
            )
            response.response ?: "I'm here for you. Tell me more."
        } catch (e: Exception) {
            e.printStackTrace()

            // Professional fallback
            "I'm having trouble connecting right now. Please try again in a moment 💛"
        }
    }
}
