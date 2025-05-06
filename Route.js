import React from "react";
import Route from "./App";
import Details from "./Details";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
 

const Stack = createStackNavigator();

 export default function Sira () {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="App" component={Route}  />
                <Stack.Screen name="Details" component={Details}   />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

 