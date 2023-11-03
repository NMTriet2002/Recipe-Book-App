import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const FullArticle = ({ route }: { route: any }) => {
  const { post } = route.params;
  const countryFlags: { [key: string]: string } = {
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
    'United Kingdom': '🇬🇧', // UK emoji flag
    'Poland': '🇵🇱',
    'Greece': '🇬🇷',
    'Turkey': '🇹🇷',
    'USA': '🇺🇸',
    'Mexico': '🇲🇽',
    'Canada': '🇨🇦',
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.postTitle}>{post.dishName}</Text>
      <View style={styles.countrySection}>
        <Text style={styles.countryFlag}>{countryFlags[post.countryOfOrigin]}</Text>
        <Text style={styles.countryOfOrigin}>{post.countryOfOrigin}</Text>
      </View>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text style={styles.postDescription}>{post.briefDescription}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {post.ingredients?.map((ingredient: string, index: number) => (
          <View key={`ingredient-${index}`} style={styles.listItem}>
            <Text style={styles.circleDot}>●</Text>
            <Text style={styles.ingredientText}>{ingredient.split('\n')[0]}</Text>
            {ingredient.split('\n').length > 1 ? (
              <Text style={styles.ingredientText}>{ingredient.split('\n').slice(1).join('\n')}</Text>
            ) : null}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {post.instructions?.map((instruction: string, index: number) => (
          <View key={`instruction-${index}`} style={styles.listItem}>
            <Text style={styles.circleDot}>●</Text>
            <Text style={styles.instructionText}>{instruction}</Text>
          </View>
        ))}
      </View>
      {/* You can also add nationality and more content here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
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
  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 30,
    marginRight: 5,
  },
  countryOfOrigin: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  circleDot: {
    fontSize: 14,
    marginRight: 5,
    alignSelf: 'flex-start',
  },
  ingredientText: {
    fontSize: 16,
  },
  instructionText: {
    fontSize: 16,
  },
});

export default FullArticle;
