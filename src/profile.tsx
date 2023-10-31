import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProfileTab = () => {
  // Mock user data for illustration
  const user = {
    name: 'Welcome, User',
    avatar: require('../assets/avatar.jpg'), // You can replace this with the actual avatar image source
  };

  // Placeholder functions for post-related actions
  const writePost = () => {
    // Implement logic for writing a post
  };

  const updatePost = () => {
    // Implement logic for updating a post
  };

  const deletePost = () => {
    // Implement logic for deleting a post
  };

  const signOut = () => {
    // Implement logic for signing out
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userIcon}>
          <Image source={user.avatar} style={styles.avatar} />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <TouchableOpacity style={styles.option} onPress={writePost}>
        <Text style={styles.optionText}>Write Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={updatePost}>
        <Text style={styles.optionText}>Update Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={deletePost}>
        <Text style={styles.optionText}>Delete Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={signOut}>
        <Text style={styles.optionText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  userContainer: {
    width: '100%',
    backgroundColor: '#8B0000',
    alignItems: 'center',
    paddingTop: 60,
  },
  userIcon: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  option: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 20,
    alignItems: 'center',
  },
  optionText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ProfileTab;
