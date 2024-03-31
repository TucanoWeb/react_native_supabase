import { ReadDataAsync } from "../readData"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeleteDataAsync = async (keyAsync, movieID) => {

    // Pega itens salvos no AsyncStorage
    const jsonValue = await ReadDataAsync(keyAsync)

    // Percorre a array jsonValue e filtra, retornando apenas os itens que não são iguais ao MovieID
    let resultList = jsonValue.filter(item => {
        return (item.id !== movieID)
    })


    try {
        // Converte o objeto jsonValue em string para posteriormente salvar no AsyncStorage
        const dataValue = JSON.stringify(resultList)
        await AsyncStorage.setItem(keyAsync, dataValue)
    } catch (e) {
        console.log("Erro ao salvar em AsyncStorage: ", e)
    }
}