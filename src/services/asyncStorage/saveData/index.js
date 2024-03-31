import { ReadDataAsync } from "../readData"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveDataAsync = async (key, data) => {

    // Pega itens salvos no AsyncStorage
    const jsonValue = await ReadDataAsync(key)
    jsonValue.push(data)

    try {
        // Converte o objeto jsonValue em string para posteriormente salvar no AsyncStorage
        const dataValue = JSON.stringify(jsonValue)
        await AsyncStorage.setItem(key, dataValue)
    } catch (e) {
        console.log("Erro ao salvar em AsyncStorage: ", e)
    }


}