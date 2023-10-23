// PostsTab.tsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const DATA = [
  // Sample data for recipe posts
  { id: '1', title: 'Recipe 1', image: require('../assets/pasta.jpg') },
  { id: '2', title: 'Recipe 2', image: require('../assets/pizza.jpg') },
  // Add more recipe posts here
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
