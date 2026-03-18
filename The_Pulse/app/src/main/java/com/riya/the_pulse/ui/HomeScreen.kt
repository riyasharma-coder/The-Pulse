package com.riya.the_pulse.ui

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.*
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.riya.the_pulse.R

@Composable
fun HomeScreen(navController: NavController) {

    val scrollState = rememberScrollState()
    var selectedMood by remember { mutableStateOf<String?>(null) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(
                        Color(0xFF0F0F1A),
                        Color(0xFF1A1A2E),
                        Color(0xFF2C2C54)
                    )
                )
            )
    ) {

        Column(
            modifier = Modifier
                .verticalScroll(scrollState)
                .padding(16.dp)
        ) {

            // 🔷 HEADER
            Row(verticalAlignment = Alignment.CenterVertically) {

                Image(
                    painter = painterResource(id = R.drawable.ic_pulse_logo),
                    contentDescription = "Logo",
                    modifier = Modifier
                        .size(48.dp)
                        .clip(RoundedCornerShape(12.dp)),
                    contentScale = ContentScale.Crop
                )

                Spacer(modifier = Modifier.width(12.dp))

                Text(
                    text = "The Pulse",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF9D7BFF) // softer purple (better visibility)
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            Text(
                text = "Welcome back 👋",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(20.dp))

            // 😊 MOOD SECTION
            Text(
                text = "How are you feeling?",
                style = MaterialTheme.typography.titleMedium,
                color = Color(0xFFB0B0B0)
            )

            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                MoodEmoji("😔", "Sad", selectedMood) { selectedMood = "Sad" }
                MoodEmoji("😐", "Neutral", selectedMood) { selectedMood = "Neutral" }
                MoodEmoji("😊", "Happy", selectedMood) { selectedMood = "Happy" }
                MoodEmoji("🔥", "Stress", selectedMood) { selectedMood = "Stress" }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // 💬 AI CARD
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xFF1E1E2E)
                ),
                elevation = CardDefaults.cardElevation(10.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {

                    Text(
                        text = "💬 Emotional Support AI",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF9D7BFF)
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = "Talk freely. Safe, private, judgment-free.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color(0xFFCFCFCF)
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = { navController.navigate("chat") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFF7B5CFF)
                        )
                    ) {
                        Text("Start Chat", color = Color.White)
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // 📊 STATS
            Text(
                text = "Your Wellness Journey",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(16.dp))

            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                StatCard("Sentiment", "Positive", Modifier.weight(1f))
                StatCard("Check-ins", "12 Days", Modifier.weight(1f))
            }

            Spacer(modifier = Modifier.height(24.dp))

            // 💡 TIP
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xFF2A2A3B) // FIXED: no light bg
                )
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("💡", fontSize = 22.sp)
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = "Take a short walk. It helps reduce stress.",
                        color = Color(0xFFE0E0E0)
                    )
                }
            }

            Spacer(modifier = Modifier.height(100.dp))
        }
    }
}

@Composable
fun MoodEmoji(x0: String, x1: String, x2: String?, content: @Composable () -> Unit) {
    TODO("Not yet implemented")
}

@Composable
fun StatCard(x0: String, x1: String, x2: Modifier) {
    TODO("Not yet implemented")
}