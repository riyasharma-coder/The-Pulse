package com.riya.the_pulse.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.riya.the_pulse.R

@Composable
fun AboutScreen() {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Header Logo + Gradient Banner (Matching Img 1 Branding)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(160.dp)
                .shadow(8.dp, RoundedCornerShape(24.dp))
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(Color(0xFF6200EE), Color(0xFFBB86FC))
                    ),
                    shape = RoundedCornerShape(24.dp)
                ),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {

                Image(
                    painter = painterResource(id = R.drawable.ic_pulse_logo),
                    contentDescription = "About Logo",
                    modifier = Modifier
                        .size(90.dp)
                        .padding(8.dp)
                        .clip(CircleShape),
                    contentScale = ContentScale.Fit
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "The Pulse",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White
                )
                Text(
                    text = "Your Emotionally Intelligent Companion",
                    style = MaterialTheme.typography.bodySmall,
                    color = Color.White.copy(alpha = 0.9f)
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Our Mission Section
        AboutCard(
            containerColor = Color(0xFFEDE7F6),
            title = "Our Mission",
            titleColor = Color(0xFF4A148C)
        ) {
            Text(
                text = "Making emotional support accessible to everyone through AI. We aim to reduce loneliness and stress for students and professionals by providing a judgment-free space to express emotions.",
                style = MaterialTheme.typography.bodyMedium,
                color = Color(0xFF311B92), // High contrast dark purple
                lineHeight = 20.sp
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Core Capabilities - FIXED VISIBILITY
        AboutCard(
            containerColor = Color(0xFFF3E5F5),
            title = "Core Capabilities",
            titleColor = Color(0xFF7B1FA2)
        ) {
            FeatureItem("🧠 Emotion Detection", "Analyzes sentiment to understand your true emotional state, not just words.")
            FeatureItem("🤝 Empathetic Responses", "Generates supportive guidance and cognitive reframing based on your mood.")
            FeatureItem("🛡️ Safe Space", "A 24/7 digital companion designed to lighten your emotional load anytime.")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Privacy Section
        AboutCard(
            containerColor = Color(0xFFFFEBEE),
            title = "🔒 Privacy & Security",
            titleColor = Color(0xFFC62828)
        ) {
            Text(
                text = "We prioritize your data privacy. Your emotional insights are stored securely and used only to improve your experience.",
                style = MaterialTheme.typography.bodyMedium,
                color = Color(0xFFB71C1C), // High contrast dark red
                fontWeight = FontWeight.Medium
            )
        }

        Spacer(modifier = Modifier.height(32.dp))
        Divider(thickness = 1.dp, color = Color.Gray.copy(alpha = 0.2f))
        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Developed by Power Girls",
            style = MaterialTheme.typography.labelLarge,
            color = Color.White.copy(alpha = 0.5f),
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(40.dp))
    }
}

@Composable
fun AboutCard(
    containerColor: Color,
    title: String,
    titleColor: Color,
    content: @Composable () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        elevation = CardDefaults.cardElevation(4.dp),
        colors = CardDefaults.cardColors(containerColor = containerColor)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.ExtraBold,
                color = titleColor
            )
            Spacer(modifier = Modifier.height(8.dp))
            content()
        }
    }
}

@Composable
fun FeatureItem(title: String, description: String) {
    Column(modifier = Modifier.padding(vertical = 6.dp)) {
        Text(
            text = title,
            style = MaterialTheme.typography.bodyLarge,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF4A148C) // High contrast
        )
        Text(
            text = description,
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF6A1B9A), // Explicit dark purple
            lineHeight = 18.sp
        )
    }
}