import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuth from '../components/auth/login';
import { userContext } from '../context/userContext';

export default function HomePage() {
    const user = useContext(userContext)
    const { logout } = useAuth()
    
    const navigation = useNavigation();
    
    const [userData, setUserData] = useState(user);

    console.log("home ", user)


    const handleLogout = async () => {
        logout()
        navigation.navigate("Login")
    }

    useEffect(() => {
        const getDataUser = async () => {
            // const userRef = doc(db, "users", auth.currentUser.uid);
            // const docSnap = await getDoc(userRef);
            // if (docSnap.exists()) {
            //     const userDoc = docSnap.data();
            //     setUserData({
            //         name: userDoc.Name,
            //         age: calculateAge(userDoc.Birthdate),
            //         city: userDoc.Destination_city,
            //         country: userDoc.Destination_country,
            //         arrivalDate: new Date(userDoc.Date_arrival.toDate()).toLocaleDateString(),
            //         school: userDoc.School,
            //         airlines: userDoc.Airlines,
            //         originCity: userDoc.Origin_city,
            //         originCountry: userDoc.Origin_country,
            //         photo: userDoc.Photo,
            //     });
            // } else {
            //     console.log("No such document!");
            // }
        };

        getDataUser();
    }, []);

    function calculateAge(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - user.birthdate.getFullYear();
        const m = today.getMonth() - user.birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < user.birthdate.getDate())) {
            age--;
        }
        return age;
    }

    const handleEditProfile = () => {
        navigation.navigate('Profile');
    };

    const handleNavigateToSchool = () => {
        navigation.navigate('School');
    };

    const handleNavigateToAirline = () => {
        navigation.navigate('Airline');
    };

    const openWhatsAppChat = () => {
        let phoneNumber = user.whatsapp;
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

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={styles.logout}>
                <Text style={styles.editButtonText}>LOGOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                <Text style={styles.editButtonText}>MY PROFILE</Text>
            </TouchableOpacity>
            {userData && userData.photo ? (
                <Image source={{ uri: userData.photo }} style={styles.userPhoto} />
            ) : (
                <Image source={require('../../assets/profile.png')} style={styles.userPhoto} />
            )}
            <Text style={[styles.userName, styles.userAge]}>{userData?.name} - {userData?.age}</Text>
            <View style={styles.separator}></View>
            <Image source={require('../../assets/flag.png')} style={styles.userCountry} />
            <Text style={styles.userCity}>{userData?.destination_city}</Text>
            <Text style={styles.userArrivalDate}>Arrival Date: {userData?.date_arrival}</Text>
            <View style={styles.schoolContainer}>
                <Text style={styles.userSchool}>School: </Text>
                <TouchableOpacity onPress={handleNavigateToSchool}>
                    <Text style={styles.linkText}>{userData?.school_id}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.airlineContainer}>
                <Text style={styles.userAirlines}>Airline: </Text>
                <TouchableOpacity onPress={handleNavigateToAirline}>
                    <Text style={styles.linkText}>{userData?.airlines_id}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator2}></View>
            <Text style={styles.userOriginCity}>{userData?.origin_city}</Text>
            <Text style={styles.userOriginCountry}>{userData?.origin_country}</Text>
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
        top: 600,
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