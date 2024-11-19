import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general'); // Default category

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            category: category,
            apiKey: '472038d5cede460b9906f557d01469a0' // Replace with your actual API key
          }
        });
        console.log(response.data); // Log response for debugging
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, [category]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Article', { article: item })}
      style={styles.articleItem}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2}>{item.description}</Text>
    </TouchableOpacity>
  );

  // Function to render category buttons
  const renderCategoryButton = (title) => (
    <TouchableOpacity
      style={[styles.button, category === title && styles.selectedButton]} // Highlight selected category
      onPress={() => setCategory(title)}
    >
      <Text style={[styles.buttonText, category === title && styles.selectedButtonText]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {renderCategoryButton('General')}
        {renderCategoryButton('Sports')}
        {renderCategoryButton('Technology')}
        {renderCategoryButton('Health')}
      </View>
      {articles.length === 0 ? (
        <Text>No articles found.</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0', // Default button color
  },
  selectedButton: {
    backgroundColor: '#6200ea', // Highlighted color
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedButtonText: {
    color: '#fff', // Color for selected button text
  },
  articleItem: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
