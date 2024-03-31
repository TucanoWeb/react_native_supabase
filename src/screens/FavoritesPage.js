import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesPage = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      // const storedFavoritesIds = await AsyncStorage.getItem('favorites');
      // if (storedFavoritesIds) {
      //   const favoritesIds = JSON.parse(storedFavoritesIds);
      //   const favoritesData = await Promise.all(
      //     favoritesIds.map(async (id) => {
      //       const docRef = doc(db, "users", id);
      //       const docSnap = await getDoc(docRef);
      //       return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      //     })
      //   );
      //   setFavorites(favoritesData.filter(Boolean)); // Filtra qualquer valor nulo que possa ocorrer se um documento não existir
      // }
    };

    loadFavorites();
  }, []);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserHome', { userId: item.id })}>
      <View style={styles.user}>
        <Image source={require('../../assets/profile.png')} style={styles.userImage} />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userDetails}>Origem: {item.originCity}</Text>
          <Text style={styles.userDetails}>Destino: {item.destinationCity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FAVORITES</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30FFAE', // Adjust the color to match the provided image
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#30FFAE', // Adjust the color to match the provided image
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#30ff91',
    left: 25,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    paddingHorizontal: 10,
  },
  userDetails: {
    color: 'black',
    paddingHorizontal: 10,
  },
});

const Footer = ({ navigation }) => {
  const handleHomePage = () => {
    // Navegar para a homepage
    navigation.navigate('Home');
  };

  const handleSearchPage = () => {
    // Navegar para a página de busca
    navigation.navigate('Search');
  };

  const handleFavoritesPage = () => {
    // Navegar para a página de favoritos
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

export default FavoritesPage;