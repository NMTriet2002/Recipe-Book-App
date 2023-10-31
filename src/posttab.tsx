import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { NavigationProp, ParamListBase } from '@react-navigation/native'; // Import necessary types

type PostsTabProps = {
  navigation: NavigationProp<ParamListBase>; // Define navigation prop type
};

const PostsTab: React.FC<PostsTabProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<{ id: string; dishName: string; image: string; briefDescription: string; recipe: string }[]>(
    []
  );

  useEffect(() => {
    const db = getFirestore();

    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'recipe'));

      const fetchedPosts: { id: string; dishName: string; image: string; briefDescription: string; recipe: string }[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        fetchedPosts.push({
          id: doc.id,
          dishName: data.dishName,
          image: data.image, // Assuming image is a URL
          briefDescription: data.briefDescription,
          recipe: data.recipe,
        });
      });

      setPosts(fetchedPosts);
    };

    fetchPosts().catch((error) => {
      console.error('Error fetching posts:', error);
    });
  }, []);

  const formatDescription = (description: string) => {
    if (description.length > 150) {
      return description.slice(0, 150) + '...';
    }
    return description;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Full Article', { post: item });
            }}
          >
            <View style={styles.postContainer}>
              <Image source={{ uri: item.image }} style={styles.postImage} />
              <Text style={styles.postTitle}>{item.dishName}</Text>
              <Text style={styles.postDescription}>{formatDescription(item.briefDescription)}</Text>
            </View>
          </TouchableOpacity>
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
    fontWeight: 'bold', // Add fontWeight to make it bold
  },
  postDescription: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default PostsTab;
