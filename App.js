import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Alert, View, Button, StyleSheet, Image, ScrollView  } from "react-native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import  { Calendar } from 'react-native-calendars';
import { useNavigation } from "@react-navigation/native";
 

 

const Route = ({ navigation }) => {

        const  [calendars, setCalendars] = useState("");
        
        
        const bouttonPress = async (status) => {
             
            if  (!calendars) {
                Alert.alert("Error", "Selectionnez une date");
                return;
            }
            try{
                const response = await axios.post(`http://192.168.1.10:5000/day`, { calendars, status  });
                console.log(response.data);
                setCalendars('');
                
                

                await AsyncStorage.setItem(calendars, JSON.stringify(status));
                Alert.alert("Succès", "Donnée enregistrée !");
            }
            catch (error) {
                console.error(error);
            }
        }
         

            return(
                
              <ScrollView style={styles.container}>
                <View style={{ padding: 20 }}>
                <Entete style={{ padding : 0 }}/>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Sélectionne un jour :</Text>
                <Calendar onDayPress={(day) => setCalendars(day.dateString)} />
    
                <Button title="✔️ Jour sans masturbation" onPress={() => bouttonPress("clean")} />
                <Button title="❌ Jour avec masturbation" onPress={() => bouttonPress("relapse")} />
                <TotalCleanDays navigation={navigation} />
                
            </View>
            </ScrollView>
            );
};



const TotalCleanDays = ({navigation}) => {
    const [cleanDays, setCleanDays] = useState(0);
     

    const fetchClean = async () => {
        try {
          const response = await axios.get(`http://192.168.1.10:5000/clean-day`);
          setCleanDays(response.data.total_clean_day);
        } catch (error) {
          console.error("Erreur lors de la récupération des days :", error);
        }
      };
      useEffect(() => {
        fetchClean();
      }, []);

      
     
    return (
        <View style = {styles.cleanView}>
            <Text style = {styles.cleanText}>Jours sans masturbation : </Text>
            <Text style = {styles.count}>{cleanDays} 🚀</Text>
            <TouchableOpacity 
            style= {styles.opacity} 
            onPress={() => navigation.navigate('Details') }>     
            <Text style = {styles.details}>Details➡️</Text>
            </TouchableOpacity>
        </View>
    );
};


const Entete = () => {
   
  return (
      <View style = {styles.logoView}>
           <Image
        source={require('./assets/logo.jpg')}
        style={styles.logoImage}
      />
      </View>
  );
};
 

export default Route;

const styles = StyleSheet.create({
    cleanView: {
        marginTop : 25,
        backgroundColor: '#F4CFDF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        height : 240,
    },
    cleanText: {
        color: 'black',
        fontSize: 40,
    },
    count: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
        backgroundColor : '#7AA95C',
        padding: 10,
        borderRadius: 25,
        width : 100,
        marginLeft : 110,
        marginBottom: 25,
       
    },
    logoView : {
        backgroundColor : "#F5DF4D",
        height: 100,
         
    },
    logoImage: {
        height: 100,
        width: 100,
        marginLeft: 125,
    },
    details : {
     textAlign: "right",
      fontSize: 15,
      color : "black",
    },
    container: {
      flex: 1,
       
    },
     
});

