import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const WorldMapTab = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleMarkerPress = (countryName: string) => {
    // You can implement the recipe recommendation logic here
    // For now, let's just update the selected country
    setSelectedCountry(countryName);
  };

  const markers = [
    { name: 'Vietnam', coordinates: { latitude: 21.0285, longitude: 105.8542 } },
    { name: 'Philippines', coordinates: { latitude: 14.599512, longitude: 120.984222 } },
    { name: 'China', coordinates: { latitude: 39.9042, longitude: 116.4074 } },
    { name: 'Malaysia', coordinates: { latitude: 3.1390, longitude: 101.6869 } },
    { name: 'Indonesia', coordinates: { latitude: -6.2088, longitude: 106.8456 } },
    { name: 'Thailand', coordinates: { latitude: 13.7563, longitude: 100.5018 } },
    { name: 'Singapore', coordinates: { latitude: 1.3521, longitude: 103.8198 } },
    { name: 'France', coordinates: { latitude: 48.8566, longitude: 2.3522 } },
    { name: 'Germany', coordinates: { latitude: 52.5200, longitude: 13.4050 } },
    { name: 'Spain', coordinates: { latitude: 40.4168, longitude: -3.7038 } },
    { name: 'Russia', coordinates: { latitude: 55.7558, longitude: 37.6176 } },
    { name: 'Italy', coordinates: { latitude: 41.9028, longitude: 12.4964 } },
    { name: 'Portugal', coordinates: { latitude: 38.7223, longitude: -9.1393 } },
    { name: 'England', coordinates: { latitude: 51.5074, longitude: -0.1278 } },
    { name: 'Scotland', coordinates: { latitude: 55.9533, longitude: -3.1883 } },
    { name: 'Ireland', coordinates: { latitude: 53.3498, longitude: -6.2603 } },
    { name: 'Poland', coordinates: { latitude: 52.2297, longitude: 21.0122 } },
    { name: 'Greece', coordinates: { latitude: 37.9838, longitude: 23.7275 } },
    { name: 'Turkey', coordinates: { latitude: 39.9334, longitude: 32.8597 } },
    { name: 'USA', coordinates: { latitude: 38.8951, longitude: -77.0369 } },
    { name: 'Mexico', coordinates: { latitude: 19.4326, longitude: -99.1332 } },
    { name: 'Canada', coordinates: { latitude: 45.4215, longitude: -75.6919 } },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 21.0285,
          longitude: 105.8542,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.name}
            onPress={() => handleMarkerPress(marker.name)}
          />
        ))}
      </MapView>
      <Text style={{ textAlign: 'center', padding: 10 }}>
        Selected Country: {selectedCountry}
      </Text>
    </View>
  );
};

export default WorldMapTab;