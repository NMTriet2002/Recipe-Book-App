// PostsTab.tsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const DATA = [
  // Sample data for recipe posts
  { id: '1', title: 'Spaghetti', image: require('../assets/pasta.jpg') },
  { id: '2', title: 'Pizza', image: require('../assets/pizza.jpg') },
  { id: '3', title: 'Pho', image: require('../assets/pho.jpg') },
  { id: '4', title: 'Croissants', image: require('../assets/croissants.jpg') },
  { id: '5', title: 'Full English breakfast', image: require('../assets/english_breakfast.jpg') },
  { id: '6', title: 'Cao Lau Noodle', image: require('../assets/cao_lau.jpg') },
 
];

const PostsTab = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={item.image} style={styles.postImage} />
            <Text style={styles.postTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  postContainer: {
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postTitle: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default PostsTab;
