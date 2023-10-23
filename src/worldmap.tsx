// WorldMapTab.tsx
import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

const WorldMapTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 0, // Initial map center latitude
          longitude: 0, // Initial map center longitude
          latitudeDelta: 30, // Zoom level (adjust as needed)
          longitudeDelta: 30, // Zoom level (adjust as needed)
        }}
        // Implement map interaction here (e.g., markers, region change)
      />
    </View>
  );
};

export default WorldMapTab;
