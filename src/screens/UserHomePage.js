import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UserHomePage() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        console.log("insert logic to logout")
    }
    const user = {
        name: "User2",
        age: 33,
        city: 'Dublin',
        arrivalDate: '01-07-2024',
        school: 'Dorset College',
        airlines: 'KLM',
        originCity: 'Novo Hamburgo',
        originCountry: 'Brazil',
    };

    const handleNavigateToSchool = () => {
         navigation.navigate('School');
    };

    const handleNavigateToAirline = () => {
        navigation.navigate('Airline');
    };

    const openWhatsAppChat = () => {
        let phoneNumber = '+353 89 975 3246';
        let message = 'Hello, I would like to chat with you on WhatsApp!';
        let url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }

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
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/profile.png')} style={styles.userPhoto} />
            <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
                <Icon name="heart" size={40} color={liked ? 'red' : 'grey'} />
            </TouchableOpacity>
            <Text style={[styles.userName, styles.userAge]}>{user.name} - {user.age}</Text>
            <View style={styles.separator}></View>
            <Image source={require('../../assets/flag.png')} style={styles.userCountry} />
            <Text style={styles.userCity}>{user.city}</Text>
            <Text style={styles.userArrivalDate}>Arrival Date: {user.arrivalDate}</Text>
            <View style={styles.schoolContainer}>
                <Text style={styles.userSchool}>School: </Text>
                <TouchableOpacity onPress={handleNavigateToSchool}>
                    <Text style={styles.linkText}>{user.school}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.airlineContainer}>
                <Text style={styles.userAirlines}>Airline: </Text>
                <TouchableOpacity onPress={handleNavigateToAirline}>
                    <Text style={styles.linkText}>{user.airlines}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator2}></View>
            <Text style={styles.userOriginCity}>{user.originCity}</Text>
            <Text style={styles.userOriginCountry}>{user.originCountry}</Text>
            <TouchableOpacity onPress={openWhatsAppChat}>
                <Image source={require('../../assets/whatsapp.png')} style={styles.whatsappLogo} />
            </TouchableOpacity>
            <Footer navigation={navigation} />
        </SafeAreaView>
    )
}

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

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#30FFAE',
    },
    editButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 1,
    },
    editButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    logout: {
        position: 'absolute',
        marginTop: 50,
        right: 20,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 1,
    },
    userPhoto: {
        position: 'absolute',
        width: 390,
        height: 390,
        marginBottom: 2,
        marginTop: 75,
        zIndex: 0,
    },
    userName: {
        position: 'absolute',
        fontSize: 32,
        marginTop: 470,
        marginBottom: 0,
        left: 30,
        color: 'black',
    },
    likeButton: {
        position: 'absolute',
        marginTop: 470,
        right: 30,
    },
    separator: {
        position: 'absolute',
        width: 335,
        height: 1,
        backgroundColor: 'black',
        marginTop: 520,
    },
    userCountry: {
        position: 'absolute',
        width: 80,
        height: 50,
        marginTop: 560,
        left: 40,
    },
    userCity: {
        position: 'absolute',
        marginTop: 530,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    userArrivalDate: {
        position: 'absolute',
        marginTop: 555,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    schoolContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 580,
        left: 150,
    },
    airlineContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 605,
        left: 150,
    },
    linkText: {
        fontWeight: 'bold',
    },
    separator2: {
        position: 'absolute',
        width: 335,
        height: 1,
        backgroundColor: 'black',
        marginTop: 640,
    },
    userOriginCity: {
        position: 'absolute',
        marginTop: 660,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    userOriginCountry: {
        position: 'absolute',
        marginTop: 680,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    whatsappLogo: {
        position: 'absolute',
        width: 50,
        height: 50,
        left: 100,
        marginTop: 630,
    },
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