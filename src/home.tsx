// HomeScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsTab from './posttab';
import WorldMapTab from './worldmap';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={PostsTab} />
      <Tab.Screen name="World Map" component={WorldMapTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
