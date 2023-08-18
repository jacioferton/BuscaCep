import { StatusBar } from 'expo-status-bar';
import { useState,useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, Keyboard } from 'react-native';
import api from './src/Services/api';

export default function App() {

  function apagar() {
    setCep('')
    InputRef.current.focus()
  }
  async function buscar() {
    if(cep =='' || cep.length != 8){
      alert('Insira um CEP')
      setCep('')
      return
    }
    try{
      const response = await api.get(`/${cep}/json`)
      setDados(response.data)
      Keyboard.dismiss()
    }catch(error){
      setDados('')
      alert('CEP não encontrado!')
    }
  }

  const [cep,setCep] = useState('')
  const [dados,setDados] = useState('')
  const InputRef = useRef('')

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>
        Busca CEP
      </Text>
      <TextInput style={styles.input}
        placeholder='Insira seu CEP aqui'
        placeholderTextColor={'#555555'}
        value={cep}
        color='#ffffff'
        onChangeText={setCep}
        keyboardType='numeric'
        ref={InputRef}
      />
      <View style={styles.areaBtn}>
        <Pressable style={styles.btnBsc} onPress={buscar}>
          <Text style={styles.textBtn}>Buscar</Text>
        </Pressable>
        <Pressable style={styles.btnApg} onPress={apagar}>
          <Text style={styles.textBtn}>Apagar</Text>
        </Pressable>
      </View>
      { dados &&
      <View style={styles.areaResultado}>
        <Text style={styles.itemApi}>{dados.cep != ''? `CEP: ${dados.cep}`:''}</Text>
        <Text style={styles.itemApi}>{dados.cep != ''? `logradouro: ${dados.logradouro}`:''}</Text>
        <Text style={styles.itemApi}>{dados.cep != ''? `Bairro: ${dados.bairro}`:''}</Text>
        <Text style={styles.itemApi}>{dados.cep != ''? `Cidade: ${dados.localidade}`:''}</Text>
        <Text style={styles.itemApi}>{dados.cep != ''? `Estado: ${dados.uf}`:''}</Text>
        <Text style={styles.itemApi}>{dados.cep != ''? `DDD: ${dados.ddd}`:''}</Text>
      </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
  },
  titulo: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 75,
  },
  input: {
    marginTop: 75,
    borderColor: '#eeeeee',
    borderWidth:1,
    borderRadius: 10,
    width: '70%',
    height: 40,
    padding: 8,
    marginBottom: 20,
  },
  areaBtn: {
    flexDirection: 'row',
    width: '70%',
    justifyContent:'space-around',
    marginBottom: 75,
  },
  btnBsc:{
    backgroundColor: '#5555aa',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#eeeeee',
    borderWidth: 1,
  },
  btnApg: {
    backgroundColor: '#aa5555',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#eeeeee',
    borderWidth: 1,

  },
  textBtn: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  areaResultado: {
    marginTop: 50,
  },
  itemApi: {
    color: '#ffffff',
    fontSize: 18,
  },
});
