import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const FullArticle = ({ route }: { route: any }) => {
  const { post } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.postTitle}>{post.dishName}</Text>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text style={styles.postDescription}>{post.briefDescription}</Text>
      <Text style={styles.postDescription}>{post.recipe}</Text>
      {/* You can also add nationality and more content here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20, // Add padding at the top
    paddingHorizontal: 16, // Add horizontal padding
    paddingBottom: 10, // Increase this value to increase the distance from the bottom
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postTitle: {
    fontSize: 40,
    marginTop: 16,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 16,
    marginTop: 8,
  },
  // Add styles for nationality and recipe if needed
});

export default FullArticle;
