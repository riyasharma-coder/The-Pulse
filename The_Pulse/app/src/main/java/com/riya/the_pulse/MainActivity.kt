package com.riya.the_pulse

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.riya.the_pulse.navigation.AppNavigation
import com.riya.the_pulse.navigation.NavRoutes
import com.riya.the_pulse.ui.ChatScreen
import com.riya.the_pulse.ui.HomeScreen
import com.riya.the_pulse.ui.AboutScreen
import com.riya.the_pulse.ui.theme.ThePulseTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                AppNavigation()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen() {
    val navController = rememberNavController()

    // 1. Observe the current navigation route
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        bottomBar = { BottomNavigationBar(navController) },
        floatingActionButton = {
            // 2. ONLY show the FAB if we are on the Home route
            if (currentRoute == NavRoutes.Home.route) {
                FloatingActionButton(
                    onClick = { navController.navigate(NavRoutes.Chat.route) },
                    containerColor = Color(0xFFE1BEE7), // That soft pink/purple from your UI
                    contentColor = Color(0xFF4A148C),   // Dark purple icon for contrast
                    elevation = FloatingActionButtonDefaults.elevation(defaultElevation = 8.dp)
                ) {
                    Icon(
                        Icons.Default.Add,
                        contentDescription = "Start Chat",
                        modifier = Modifier.size(28.dp)
                    )
                }
            }
        },
        floatingActionButtonPosition = FabPosition.Center,
        content = { innerPadding ->
            NavHost(
                navController = navController,
                startDestination = NavRoutes.Home.route,
                modifier = Modifier.padding(innerPadding)
            ) {
                composable(NavRoutes.Home.route) { HomeScreen() }
                composable(NavRoutes.Chat.route) { ChatScreen() }
                composable(NavRoutes.About.route) { AboutScreen() }
            }
        }
    )
}

@Composable
fun BottomNavigationBar(navController: NavController) {
    val items = listOf(
        NavRoutes.Home to Icons.Default.Home,
        NavRoutes.About to Icons.Default.Info
    )

    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 8.dp,
        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
    ) {
        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = navBackStackEntry?.destination?.route

        items.forEach { (route, icon) ->
            NavigationBarItem(
                icon = {
                    Icon(
                        icon,
                        contentDescription = route.route,
                        modifier = Modifier.size(24.dp)
                    )
                },
                label = { Text(route.route.replaceFirstChar { it.uppercase() }) },
                selected = currentRoute == route.route,
                onClick = {
                    navController.navigate(route.route) {
                        popUpTo(navController.graph.startDestinationId) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                },
                alwaysShowLabel = true,
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = MaterialTheme.colorScheme.primary,
                    selectedTextColor = MaterialTheme.colorScheme.primary,
                    indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                    unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                    unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                )
            )
        }
    }
}
