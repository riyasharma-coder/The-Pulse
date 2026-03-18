package com.riya.the_pulse.navigation

sealed class NavRoutes(val route: String) {
    object Home : NavRoutes("home")
    object Chat : NavRoutes("chat")
    object About : NavRoutes("about")
}