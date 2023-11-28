import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../App'; // Import your Firebase configuration
import { useNavigation } from '@react-navigation/native';

const WritePost = () => {
  const navigation = useNavigation();
  const [dishName, setDishName] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [instructions, setInstructions] = useState(['', '', '']);

  const addPost = async () => {
    const postRef = collection(db, 'recipe');
    const newPost = {
      dishName,
      countryOfOrigin,
      briefDescription,
      image,
      ingredients,
      instructions,
      timestamp: serverTimestamp(),
    };
    await addDoc(postRef, newPost);
    navigation.navigate('Home' as never);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Recipe Name:</Text>
        <TextInput
          value={dishName}
          onChangeText={(text) => setDishName(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.textContainer}>
        <Text>Country of Origin:</Text>
        <TextInput
          value={countryOfOrigin}
          onChangeText={(text) => setCountryOfOrigin(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.textContainer}>
        <Text>Brief Description:</Text>
        <TextInput
          value={briefDescription}
          onChangeText={(text) => setBriefDescription(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.textContainer}>
        <Text>Image URL:</Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.textContainer}>
        <Text>Ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <TextInput
            key={index}
            value={ingredient}
            onChangeText={(text) => {
              const newIngredients = [...ingredients];
              newIngredients[index] = text;
              setIngredients(newIngredients);
            }}
            style={styles.input}
          />
        ))}
        <Button title="Add Ingredient" onPress={addIngredient} />
      </View>

      <View style={styles.textContainer}>
        <Text>Instructions:</Text>
        {instructions.map((instruction, index) => (
          <TextInput
            key={index}
            value={instruction}
            onChangeText={(text) => {
              const newInstructions = [...instructions];
              newInstructions[index] = text;
              setInstructions(newInstructions);
            }}
            style={styles.input}
          />
        ))}
        <Button title="Add Instruction" onPress={addInstruction} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add Post" onPress={addPost} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
    backgroundColor: '#8B0000',
  },
  textContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 30, // Add some space at the bottom
  },
});

export default WritePost;
