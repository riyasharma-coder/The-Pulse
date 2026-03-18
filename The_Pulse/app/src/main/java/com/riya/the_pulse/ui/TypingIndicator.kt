package com.riya.the_pulse.ui

import androidx.compose.animation.core.*
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.background
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width

@Composable
fun TypingIndicator() {

    val infiniteTransition = rememberInfiniteTransition(label = "")

    val dot1 by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(600),
            repeatMode = RepeatMode.Reverse
        ), label = ""
    )

    val dot2 by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(600, delayMillis = 200),
            repeatMode = RepeatMode.Reverse
        ), label = ""
    )

    val dot3 by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(600, delayMillis = 400),
            repeatMode = RepeatMode.Reverse
        ), label = ""
    )

    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
        Dot(dot1)
        Dot(dot2)
        Dot(dot3)
    }
}

@Composable
fun Dot(alpha: Float) {
    androidx.compose.foundation.layout.Box(
        modifier = Modifier
            .size(8.dp)
            .background(
                color = Color.LightGray.copy(alpha = alpha),
                shape = CircleShape
            )
    )
}
