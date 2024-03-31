import React, { useId, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
    const navigation = useNavigation();

    const handleRegisterPage = () => {
        navigation.navigate('Home');
    };

    const [birthdate, setBirthdate] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [dateArrival, setDateArrival] = useState('');
    const [originCity, setOriginCity] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [school, setSchool] = useState('');
    const [airlines, setAirlines] = useState('');
    const [photo, setPhoto] = useState('');

    const saveProfile = async () => {
        // try {
        //     await updateDoc(db, "users", {
        //         Birthdate: birthdate,
        //         Destination_city: destinationCity,
        //         Date_arrival: dateArrival,
        //         Origin_city: originCity,
        //         Whatsapp: whatsapp,
        //         School: school,
        //         Airlines: airlines,
        //         Photo: photo,
        //     });
        //     console.log('Profile saved!')
        //     .then(() => {
        //         navigation.navigate('Home');
        //     });
        // } catch (error) {
        //     console.error('Error saving profile:', error);
        // }
    };

    return (
        
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={handleRegisterPage} style={styles.buttonBack}>
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Birthdate"
                value={birthdate}
                onChangeText={setBirthdate}
            />
            <TextInput
                style={styles.input}
                placeholder="Destination City"
                value={destinationCity}
                onChangeText={setDestinationCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Date Arrival"
                value={dateArrival}
                onChangeText={setDateArrival}
            />
            <TextInput
                style={styles.input}
                placeholder="Origin City"
                value={originCity}
                onChangeText={setOriginCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Whatsapp"
                value={whatsapp}
                onChangeText={setWhatsapp}
            />
            <TextInput
                style={styles.input}
                placeholder="School"
                value={school}
                onChangeText={setSchool}
            />
            <TextInput
                style={styles.input}
                placeholder="Airlines"
                value={airlines}
                onChangeText={setAirlines}
            />
            <TextInput
                style={styles.input}
                placeholder="Upload your photo"
                value={photo}
                onChangeText={setPhoto}
            />
            <TouchableOpacity onPress={saveProfile} style={styles.button}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#30FFAE',
    },
    buttonBack: {
        top: 50,
        width: 40,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        left: -140,
        justifyContent: 'center', // Centraliza o texto verticalmente
        alignItems: 'center', // Centraliza o texto horizontalmente
        borderWidth: 1,
    },
    input: {
        top: 90,
        width: 328,
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
      },
      button: {
        top: 100,
        width: 110,
        height: 37,
        backgroundColor: '#2B8B5D',
        borderRadius: 5,
        justifyContent: 'center', // Centraliza o texto verticalmente
        alignItems: 'center', // Centraliza o texto horizontalmente
        marginBottom: 20,
      },
      buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
      },
};

export default ProfilePage;
