import React, { useState, useEffect, useContext } from 'react';
import { TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import DatePicker from '@react-native-community/datetimepicker';

import * as ImagePicker from 'expo-image-picker';
import { userContext } from '../context/userContext';

import useUsersClient from '../services/supabaseStore/users/userStore';

const EditProfilePage = () => {
    const navigation = useNavigation();
    const { update } = useUsersClient()

    const user = useContext(userContext)

    const [showSchoolPicker, setShowSchoolPicker] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePickerArrival, setShowDatePickerArrival] = useState(false);
    
    const [dataForm, setDataForm] = useState({
        id: user.id,
        name: user.name,
        birthdate: user.birthdate,
        destination_city: user.destination_city,
        destination_country: user.destination_country,
        date_arrival: user.date_arrival,
        origin_city: user.origin_city,
        origin_country: user.origin_country,
        whatsapp: user.whatsapp,
        school_id: user.school_id,
        airlines_id: user.airlines_id,
        photo: user.photo
    })

    const saveProfile = async () => {

        await update(dataForm)
            .then(() => navigation.navigate("Home"))
            .catch((err) => {
                alert(`Error: ${err.message}`)
            })


    };

    function onChangeForm(key, value) {
        setDataForm(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            onChangeForm("photo", result.assets[0].base64);
        }
    }

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        onChangeForm("birthdate", selectedDate || dataForm.birthdate);
    };

    const handleDateArrivalChange = (event, selectedDate) => {
        setShowDatePickerArrival(Platform.OS === 'ios');
        onChangeForm("date_arrival", selectedDate || dataForm.date_arrival);
    };

    useEffect(() => {

    }, []);

    const handleSelectSchool = (schoolName) => {
        setSelectedSchool(schoolName);
        setShowSchoolPicker(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>

            <ScrollView contentContainerStyle={styles.contentContainer}>

                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
                    <ArrowLeftIcon size="25" color="black" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={dataForm.name}
                    onChangeText={e => onChangeForm("name", e)}
                />

                <TouchableOpacity
                    style={[styles.input, styles.datePickerInput]}
                    onPress={() => setShowDatePicker(true)}
                >

                    <Text style={[styles.dateText, { color: dataForm.birthdate ? 'black' : '#A9A9A9' }]}
                    >
                        {dataForm.birthdate ? dataForm.birthdate : 'Birthdate'}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DatePicker
                        value={dataForm.birthdate || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Destination City"
                    value={dataForm.destination_city}
                    onChangeText={e => onChangeForm("destination_city", e)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Destination Country"
                    value={dataForm.destination_country}
                    onChangeText={e => onChangeForm("destination_country", e)}
                />

                <TouchableOpacity
                    style={[styles.input, styles.datePickerInput]}
                    onPress={() => setShowDatePickerArrival(true)}
                >
                    <Text style={[styles.dateText, { color: dataForm.date_arrival ? 'black' : '#A9A9A9' }]}>
                        {dataForm.date_arrival ? dataForm.date_arrival : 'Date Arrival'}
                    </Text>
                </TouchableOpacity>

                {showDatePickerArrival && (
                    <DatePicker
                        value={dataForm.date_arrival || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateArrivalChange}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Origin City"
                    value={dataForm.origin_city}
                    onChangeText={e => onChangeForm("origin_city", e)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Origin Country"
                    value={dataForm.origin_country}
                    onChangeText={e => onChangeForm("origin_country", e)}
                />

                <TextInput
                    style={styles.whatsappInput}
                    placeholder="WhatsApp number"
                    value={dataForm.whatsapp}
                    onChangeText={e => onChangeForm("whatsapp", e)}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity onPress={() => setShowSchoolPicker(true)} style={styles.input}>
                    <Text style={[styles.dateText2, { color: selectedSchool ? 'black' : '#A9A9A9' }]}>
                        {selectedSchool || "School"}
                    </Text>
                </TouchableOpacity>
                <Modal
                    visible={showSchoolPicker}
                    animationType="slide"
                    onRequestClose={() => setShowSchoolPicker(false)}>
                    <FlatList
                        data={dataForm.school}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectSchool(item.name)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Modal>


                <TextInput
                    style={styles.input}
                    placeholder="Airlines"
                    value={dataForm.airlines}
                    onChangeText={e => onChangeForm("airlines", e)}
                />

                <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
                    <Text style={styles.uploadButtonText}>{dataForm.photo ? 'Photo Selected' : 'Upload your photo'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveProfile} style={styles.button}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = {
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center', // Alinha os filhos do ScrollView no centro do eixo transversal (horizontal)
        justifyContent: 'center', // Justifica o conteúdo no centro do eixo principal (vertical)
        backgroundColor: '#30FFAE',
        padding: 20,
    },
    buttonBack: {
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        top: 20,
    },
    input: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    button: {
        width: '50%', // Button width is half of the container width
        height: 37,
        backgroundColor: '#2B8B5D',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15, // Add space above the button
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    datePickerInput: {
        justifyContent: 'center', // Center the text inside the input
        height: 43, // Set the input height
        marginTop: 15, // Add space between inputs
    },
    dateText: {
        fontSize: 15,
        paddingLeft: 0,
        justifyContent: 'center'
    },
    dateText2: {
        fontSize: 15,
        paddingLeft: 0,
        justifyContent: 'center',
        marginTop: 8
    },
    phoneSection: {
        flexDirection: 'row',
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: '#fff',
        paddingLeft: 10,
    },
    countryPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flex: 1,
        height: '100%',
    },
    countryCodeText: {
        fontSize: 15,
        marginLeft: 10,
        color: 'black',
    },
    whatsappInput: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    uploadButton: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        justifyContent: 'center', // Centraliza o texto verticalmente
        backgroundColor: '#fff',
    },
    uploadButtonText: {
        fontSize: 15,
        color: '#A9A9A9',
        paddingLeft: 10,
    },
};

export default EditProfilePage;
