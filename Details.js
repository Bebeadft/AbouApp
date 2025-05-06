import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList  } from "react-native";
import axios from 'axios';
 
 
 
const Details = () => {

    const [list, setList] = useState([]);

    const fetchliste = async () => {
        try {
          const response = await axios.get(`http://192.168.1.10:5000/list`);
          setList(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des days :", error);
        }
      };
      useEffect(() => {
        fetchliste();
      }, []);

      const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitre}>day date result</Text> 
          <Text style={styles.itemText}>{item.id_day} {item.date_selectionnes} {item.status}</Text> 
        </View>
      );

return(
  <View style={{ padding: 20 }}>
                   
                  <Text style={{ fontSize: 18, marginBottom: 10, color:'#317AC1', }}>Listes des jours clean</Text>
                 
                  <FlatList
                  data={list}
                  keyExtractor={(item) => item.id_day.toString()} // Utilise une clé unique appropriée si possible
                  renderItem={renderItem}
                  contentContainerStyle={styles.listContainer}
                  
                  
                  />
                  
                  
              </View>

);







};
export default Details

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    color : 'black',
    marginRight : 30,
  },
  itemTitre:{
      marginRight: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
