import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SchoolPage = () => {
  const navigation = useNavigation();
  // Substitua isso pelo seu estado e lógica de comentários
  const comments = [
    { id: '1', name: 'Kristin Watson', comment: 'blablablablabla', rating: 4 },
    // ...outros comentários
  ];

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={require('../../assets/profile.png')} style={styles.profilePic} />
      <View style={styles.commentText}>
        <Text style={styles.commentName}>{item.name}</Text>
        <Text>{item.comment}</Text>
      </View>
      <FontAwesome name="star" size={20} color="gold" style={styles.star2} />
      <FontAwesome name="star" size={20} color="gold" style={styles.star2} />
      <FontAwesome name="star" size={20} color="gold" style={styles.star2} />
      <FontAwesome name="star" size={20} color="gold" style={styles.star2} />
      <FontAwesome name="star" size={20} color="gold" style={styles.star2} />
    </View>
  );

  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      };
    }
    loadFavorites();
  }, []);

  const toggleLike = async () => {
    setLiked(!liked);

    const updatedFavorites = liked
      ? favorites.filter((favorite) => favorite !== user.id)
      : [...favorites, user];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/dorset.jpeg')} style={styles.userImage} />
      <View style={styles.rsr}>
        <Text style={styles.rating}>4.5
          <FontAwesome name="star" size={24} color="gold" /></Text>
        <Text style={styles.reviews}>273 Reviews</Text>
      </View>
      <Text style={styles.schoolTitle}>School</Text>
      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Icon name="heart" size={40} color={liked ? 'red' : 'grey'} />
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <Text style={styles.location}>CITY, COUNTRY</Text>
      <View style={styles.separator2}></View>
      <Text style={styles.commentsTitle}>Comments</Text>
      <View style={styles.commentSection}>
        <TextInput style={styles.commentInput} placeholder="Write a comment" />
        <FontAwesome name="star" size={20} color="gold" style={styles.star} />
        <FontAwesome name="star" size={20} color="gold" style={styles.star} />
        <FontAwesome name="star" size={20} color="gold" style={styles.star} />
        <FontAwesome name="star" size={20} color="gold" style={styles.star} />
        <FontAwesome name="star" size={20} color="gold" style={styles.star} />
      </View>
      <View style={styles.separator3}></View>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const Footer = ({ navigation }) => {
  const handleHomePage = () => {
    navigation.navigate('Home');
  };

  const handleSearchPage = () => {
    navigation.navigate('Search');
  };

  const handleFavoritesPage = () => {
    navigation.navigate('Favorites');
  };

  return (
    <View style={footerStyles.container}>
      <TouchableOpacity onPress={handleHomePage} style={footerStyles.footerItem}>
        <Text style={footerStyles.footerText}>Home</Text>
      </TouchableOpacity>

      <View style={footerStyles.divider} />

      <TouchableOpacity onPress={handleSearchPage} style={footerStyles.footerItem}>
        <Text style={footerStyles.footerText}>Search</Text>
      </TouchableOpacity>

      <View style={footerStyles.divider} />

      <TouchableOpacity onPress={handleFavoritesPage} style={footerStyles.footerItem}>
        <Text style={footerStyles.footerText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30FFAE',
  },
  userImage: {
    alignSelf: 'center',
    marginTop: 59,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#cccccc',
  },
  rsr: {
    position: 'absolute',
    top: 70,
    right: 20,
    alignItems: 'center',
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  reviews: {
    color: 'grey',
  },
  schoolTitle: {
    position: 'absolute',
    marginTop: 270,
    fontWeight: 'bold',
    fontSize: 32,
    marginHorizontal: 20,
  },
  likeButton: {
    position: 'absolute',
    marginTop: 270,
    right: 30,
  },
  separator: {
    position: 'absolute',
    width: 335,
    height: 1,
    backgroundColor: 'black',
    marginTop: 320,
    marginLeft: 20,
  },
  location: {
    position: 'absolute',
    color: 'black',
    marginHorizontal: 25,
    marginTop: 355,
    fontSize: 18,
  },
  separator2: {
    position: 'absolute',
    width: 335,
    height: 1,
    backgroundColor: 'black',
    marginTop: 410,
    marginLeft: 20,
  },
  commentsTitle: {
    position: 'absolute',
    marginTop: 420,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  commentSection: {
    position: 'absolute',
    marginTop: 460,
    flexDirection: 'row',
  },
  commentInput: {
    height: 43,
    width: 250,
    borderColor: '#2B8B5D',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
  star: {
    right: 10,
    top: 10,
  },
  separator3: {
    position: 'absolute',
    width: 335,
    height: 1,
    backgroundColor: 'black',
    marginTop: 510,
    marginLeft: 20,
  },
  commentContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 260,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentText: {
    marginHorizontal: 10,
  },
  commentName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  star2: {
    position: 'absolute',
    right: 20,
  },
});

const footerStyles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2b8b5d',
    marginBottom: 0,
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: 'white',
    opacity: 0.6,
  },
};

export default SchoolPage;
