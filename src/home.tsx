import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons from react-native-vector-icons
import PostsTab from './posttab';
import WorldMapTab from './worldmap';
import ProfileTab from './profile';
import FullArticle from './fullArticle'; // Import the FullArticle component

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        component={PostsTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="World Map"
        component={WorldMapTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="globe" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Full Article"
        component={FullArticle}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-o" color={color} size={size} /> // You can choose an appropriate FontAwesome icon name
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
