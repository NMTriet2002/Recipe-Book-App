import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { getFirestore, collection, onSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';

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
  'England': '🇬🇧',
  'Poland': '🇵🇱',
  'Greece': '🇬🇷',
  'Turkey': '🇹🇷',
  'USA': '🇺🇸',
  'Mexico': '🇲🇽',
  'Canada': '🇨🇦',
};

const getCountryFlagEmoji = (countryName: string) => {
  return countryFlags[countryName] || '';
};

type PostsListProps = {
  navigation: NavigationProp<ParamListBase>;
};

const PostsList: React.FC<PostsListProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<{ id: string; dishName: string; image: string; briefDescription: string; ingredients: string; instructions: string; countryOfOrigin: string }[]>(
    []
  );
  const [searchText, setSearchText] = useState('');
  const route = useRoute();
  const selectedCountry = (route.params as { searchCountry: string })?.searchCountry;

  useEffect(() => {
    const db = getFirestore();
    const postCollection = collection(db, 'recipe');

    const unsubscribe = onSnapshot(postCollection, (querySnapshot) => {
      const fetchedPosts: { id: string; dishName: string; image: string; briefDescription: string; ingredients: string; instructions: string; countryOfOrigin: string }[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        fetchedPosts.push({
          id: doc.id,
          dishName: data.dishName,
          image: data.image,
          briefDescription: data.briefDescription,
          ingredients: data.ingredients,
          instructions: data.instructions,
          countryOfOrigin: data.countryOfOrigin,
        });
      });

      setPosts(fetchedPosts);
    });

    return () => {
      // Unsubscribe from real-time updates when the component unmounts
      unsubscribe();
    };
  }, []);

  const formatDescription = (description: string) => {
    if (description.length > 150) {
      return description.slice(0, 150) + '...';
    }
    return description;
  };

  // Filter posts based on search text and selected country
  const filteredPosts = posts.filter(
    (post) =>
      (post.dishName.toLowerCase().includes(searchText.toLowerCase()) ||
        post.countryOfOrigin.toLowerCase().includes(searchText.toLowerCase())) &&
      (selectedCountry ? post.countryOfOrigin === selectedCountry : true)
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by dish or country"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditPost', { post: item });
            }}
          >
            <View style={styles.postContainer}>
              <Image source={{ uri: item.image }} style={styles.postImage} />
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{item.dishName}</Text>
                <Text style={styles.postDescription}>{formatDescription(item.briefDescription)}</Text>
                <View style={styles.countryRow}>
                  <Text style={styles.countryFlag}>
                    {getCountryFlagEmoji(item.countryOfOrigin)}
                  </Text>
                  <Text style={styles.countryName}>{item.countryOfOrigin}</Text>
                </View>
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
    padding: 10,
    marginTop: 30,
    marginBottom: -10,
    backgroundColor: '#8B0000', // Reddish brown background color
  },
  searchInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop:10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10, // Rounded edges for the search bar
    backgroundColor: '#fff', // White background for the search bar
  },
  postContainer: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postContent: {
    padding: 10,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1, // Add a thin black border
    borderBottomColor: 'black', // Border color
    paddingBottom: 5, // Padding at the bottom to separate from the content
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


export default PostsList;
