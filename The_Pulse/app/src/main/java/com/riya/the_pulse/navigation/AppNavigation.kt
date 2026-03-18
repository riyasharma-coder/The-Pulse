package com.riya.the_pulse.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.*
import com.riya.the_pulse.ui.ChatScreen
import com.riya.the_pulse.ui.HomeScreen

@Composable
fun AppNavigation() {

    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "home"
    ) {

        composable("home") {
            HomeScreen(navController)
        }

        composable("chat") {
            ChatScreen()
        }
    }
}