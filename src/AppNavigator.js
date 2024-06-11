import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './pages/HomePage';
import TaskDetails from './pages/TaskDetails';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomePage} options={{ title: 'Tarefas' }} />
                <Stack.Screen name="TaskDetails" component={TaskDetails} options={{ title: 'Detalhes da Tarefa' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
