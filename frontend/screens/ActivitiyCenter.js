import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'



 function Array({location  , name}){


  alertItemName = (item) => {
    Alert.alert("Description", item)
  }

     return (


        <View>

                <TouchableOpacity


                     style = {styles.container}
                     onPress = {() => this.alertItemName(location)}>
                     <Text> {name} </Text>
                     
                     
                  </TouchableOpacity>



        </View>
         

     );


 }

 




 let ListView =  () => {


   
   return (
    

    
    <View>

    <Array

     name= {'Hiking the A mountain'}
      location = {'mill avenue' + ' 30th November, 2023'}
    />

    <Array

    name= {'Thanksgiving party at CASA'}
    location = {'univerity dr' + ' 21st November, 2023'}
    />

    <Array

    name= {'Cycling Event'}
    location = {'beach park' + ' 19th Nov, 2023'}
    />

    <Array

      name= {'Park Cleanup Acitivity'}
      location = {'dorsey' + ' 7am Sunday Nov 26, 2023'}
    />
    


    </View>
    
      


    
    
    



    
    
 );
   
   }
   
      
   

export default ListView

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})