import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import TopicDescription from '../screens/TopiDescription';
import Quiz from '../screens/Quiz';
import QuizSummary from '../screens/QuizSummary';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Login" 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6646ee'
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 22
                },
                headerTitle: "Quiz Assignment"
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TopicDescription" component={TopicDescription} />
            <Stack.Screen name="Quiz" component={Quiz} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="QuizSummary" component={QuizSummary} />
        </Stack.Navigator>
    );
}