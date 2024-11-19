import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Video } from 'expo-av'; // Ensure you have expo-av installed

const ArticleScreen = ({ route }) => {
  const { article } = route.params;

  // Log the article for debugging
  console.log(article);

  return (
    <ScrollView style={styles.container}>
      {/* Displaying the article image */}
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No image available</Text>
      )}
      
      {/* Article Title */}
      <Text style={styles.title}>{article.title || 'No title available'}</Text>

      {/* Article Description */}
      <Text style={styles.description}>
        {article.description || 'No description available'}
      </Text>
      
      {/* Article Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          {article.content || 'No content available'}
        </Text>
      </View>

      {/* Displaying Video if available */}
      {article.videoUrl ? (
        <Video
          source={{ uri: article.videoUrl }} // Provide the video URL
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      ) : (
        <Text style={styles.noVideoText}>No video available</Text>
      )}
      
      {/* Author and Published Date */}
      {article.author && (
        <Text style={styles.author}>By: {article.author}</Text>
      )}
      {article.publishedAt && (
        <Text style={styles.publishedAt}>
          Published on: {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  contentContainer: {
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
  },
  publishedAt: {
    fontSize: 14,
    color: '#888',
  },
  noImageText: {
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  noDescriptionText: {
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  noContentText: {
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  noVideoText: {
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ArticleScreen;
