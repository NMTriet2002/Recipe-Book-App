// HomeScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons from react-native-vector-icons
import PostsTab from './posttab';
import WorldMapTab from './worldmap';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        component={PostsTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} /> // Example icon using FontAwesome
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="World Map"
        component={WorldMapTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="globe" color={color} size={size} /> // Example icon using FontAwesome
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
