import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { NavigationProp, ParamListBase } from '@react-navigation/native'; // Import necessary types

// Function to get the flag emoji based on the country name
const countryFlags: Record<string, string> = {
  'Vietnam': '🇻🇳',
  'Philippines': '🇵🇭',
  'China': '🇨🇳',
  'Malaysia': '🇲🇾',
  'Indonesia': '🇮🇩',
  'Thailand': '🇹🇭',
  'Singapore': '🇸🇬',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Spain': '🇪🇸',
  'Russia': '🇷🇺',
  'Italy': '🇮🇹',
  'Portugal': '🇵🇹',
  'United Kingdom': '🇬🇧',
  'Ireland': '🇮🇪',
  'Poland': '🇵🇱',
  'Greece': '🇬🇷',
  'Turkey': '🇹🇷',
  'USA': '🇺🇸',
  'Mexico': '🇲🇽',
  'Canada': '🇨🇦',
  // Add more countries and their emoji flags as needed
};


// Function to get the flag emoji based on the country name
const getCountryFlagEmoji = (countryName: string) => {
  return countryFlags[countryName] || ''; // Return the flag emoji or an empty string
};

type PostsTabProps = {
  navigation: NavigationProp<ParamListBase>; // Define navigation prop type
};

const PostsTab: React.FC<PostsTabProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<{ id: string; dishName: string; image: string; briefDescription: string; ingredients: string; instructions: string; countryOfOrigin: string }[]>(
    []
  );

  useEffect(() => {
    const db = getFirestore();

    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'recipe'));

      const fetchedPosts: { id: string; dishName: string; image: string; briefDescription: string; ingredients: string; instructions: string; countryOfOrigin: string }[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        fetchedPosts.push({
          id: doc.id,
          dishName: data.dishName,
          image: data.image, // Assuming image is a URL
          briefDescription: data.briefDescription,
          ingredients: data.ingredients,
          instructions: data.instructions,
          countryOfOrigin: data.countryOfOrigin, // Add the countryOfOrigin field
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
              <View style={styles.countryRow}>
                <Text style={styles.countryFlag}>
                  {getCountryFlagEmoji(item.countryOfOrigin)}
                </Text>
                <Text style={styles.countryName}>{item.countryOfOrigin}</Text>
              </View>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 14,
    marginTop: 8,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  countryFlag: {
    fontSize: 20,
  },
  countryName: {
    fontSize: 14,
    marginLeft: 4,
  },
});

export default PostsTab;
