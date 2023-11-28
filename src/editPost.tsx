import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

type PostEditingProps = {
  navigation: NavigationProp<ParamListBase>;
};

const PostEditing: React.FC<PostEditingProps> = ({ navigation }) => {
  const [dishName, setDishName] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  const route = useRoute();
  const postId = (route.params as { post: { id: string } }).post.id;

  useEffect(() => {
    const fetchPostData = async () => {
      const db = getFirestore();
      const postRef = doc(db, 'recipe', postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postData = postSnapshot.data();
        setDishName(postData.dishName);
        setCountryOfOrigin(postData.countryOfOrigin);
        setBriefDescription(postData.briefDescription);
        setImage(postData.image);
        setIngredients(postData.ingredients || []);
        setInstructions(postData.instructions || []);
      }
    };

    fetchPostData().catch((error) => {
      console.error('Error fetching post data:', error);
    });
  }, [postId]);

  const handleUpdatePost = async () => {
    const db = getFirestore();
    const postRef = doc(db, 'recipe', postId);

    try {
      await updateDoc(postRef, {
        dishName,
        countryOfOrigin,
        briefDescription,
        image,
        ingredients,
        instructions,
      });
      // Optional: Add a success message or navigate back to the post list page
      navigation.goBack();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async () => {
    const db = getFirestore();
    const postRef = doc(db, 'recipe', postId);

    try {
      await deleteDoc(postRef);
      // Optional: Add a success message or navigate back to the post list page
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: handleDeletePost },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>Dish Name:</Text>
        <TextInput
          style={styles.input}
          value={dishName}
          onChangeText={setDishName}
        />

        <Text style={styles.label}>Country of Origin:</Text>
        <TextInput
          style={styles.input}
          value={countryOfOrigin}
          onChangeText={setCountryOfOrigin}
        />

        <Text style={styles.label}>Brief Description:</Text>
        <TextInput
          style={styles.inputMultiline}
          value={briefDescription}
          onChangeText={setBriefDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Image URL:</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
        />

        <Text style={styles.label}>Ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <TextInput
            key={`ingredient-${index}`}
            style={styles.input}
            value={ingredient}
            onChangeText={(text) => {
              const updatedIngredients = [...ingredients];
              updatedIngredients[index] = text;
              setIngredients(updatedIngredients);
            }}
          />
        ))}
        <Button title="Add Ingredient" onPress={() => setIngredients([...ingredients, ''])} />

        <Text style={styles.label}>Instructions:</Text>
        {instructions.map((instruction, index) => (
          <TextInput
            key={`instruction-${index}`}
            style={styles.inputMultiline}
            value={instruction}
            onChangeText={(text) => {
              const updatedInstructions = [...instructions];
              updatedInstructions[index] = text;
              setInstructions(updatedInstructions);
            }}
            multiline
            numberOfLines={4}
          />
        ))}
        <Button title="Add Instruction" onPress={() => setInstructions([...instructions, ''])} />

        <View style={styles.buttonContainer}>
          <Button title="Update Post" onPress={handleUpdatePost} />
          <Button title="Delete Post" onPress={confirmDelete} color="#FF0000" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B0000',
    padding: 10,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 40,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputMultiline: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostEditing;
