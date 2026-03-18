package com.riya.the_pulse.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.riya.the_pulse.model.Message

@Composable
fun MessageBubble(message: Message) {

    val isUser = message.isUser
    val isError = message.text.startsWith("Error:")

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start
    ) {

        Surface(
            shape = RoundedCornerShape(
                topStart = 18.dp,
                topEnd = 18.dp,
                bottomStart = if (isUser) 18.dp else 4.dp,
                bottomEnd = if (isUser) 4.dp else 18.dp
            ),
            color = when {
                isError -> Color(0xFFFFE5E5)
                isUser -> Color(0xFF7B2CBF) // soft purple gradient feel
                else -> Color(0xFF2A2A3B)   // dark bubble for AI
            },
            tonalElevation = 2.dp,
            shadowElevation = 4.dp,
            modifier = Modifier
                .widthIn(max = 280.dp) // 👈 prevents too wide messages
        ) {
            Text(
                text = message.text,
                modifier = Modifier.padding(14.dp),
                color = when {
                    isError -> Color(0xFFD32F2F)
                    isUser -> Color.White
                    else -> Color(0xFFEAEAEA)
                },
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}