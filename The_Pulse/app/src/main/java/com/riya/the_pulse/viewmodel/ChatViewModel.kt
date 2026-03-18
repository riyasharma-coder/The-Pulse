package com.riya.the_pulse.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.riya.the_pulse.model.Message
import com.riya.the_pulse.repository.ChatRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ChatViewModel : ViewModel() {

    private val repository = ChatRepository()

    // Chat messages
    private val _messages = MutableStateFlow(
        listOf(
            Message(
                "Hi 👋 I'm The Pulse AI. Ask me anything about health or wellness!",
                false
            )
        )
    )
    val messages: StateFlow<List<Message>> = _messages

    // Typing indicator
    private val _isTyping = MutableStateFlow(false)
    val isTyping: StateFlow<Boolean> = _isTyping

    // Send message
    fun sendMessage(text: String) {
        if (text.isBlank()) return

        viewModelScope.launch {

            // Add user message
            _messages.value = _messages.value + Message(text, true)

            // Start typing indicator
            _isTyping.value = true

            try {
                val reply = repository.sendMessage(text)

                // Stop typing
                _isTyping.value = false

                // Add AI reply
                _messages.value = _messages.value + Message(reply, false)

            } catch (e: Exception) {
                _isTyping.value = false

                _messages.value = _messages.value + Message(
                    "Something went wrong. Please try again 💛",
                    false
                )
            }
        }
    }
}