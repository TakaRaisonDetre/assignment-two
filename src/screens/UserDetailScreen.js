
import React, {useEffect, useState} from 'react'
import { View, TextInput, ScrollView, StyleSheet, Button ,ActivityIndicator, Alert} from 'react-native'
import {firebase} from '../context/FirebaseContext'

import styled from 'styled-components'

// Custom Components 
import Text from '../components/text'

import {FontAwesome5, MaterialIcons, AntDesign} from '@expo/vector-icons'


const UserDetailScreen=(props)=> {
 console.log(props.route.params.userId)
 const id= props.route.params.userId
  
const initialState={ id:'', fullName:'',email:'', age:'', gender:'',departmentId:'',reason:''}

const [candidate, setCandidate] = useState(initialState)
const [loading, setloading] = useState(true)


useEffect(()=>{
  let mounted = true
  getCandidateById(props.route.params.userId);
  console.log("useEffect Fire! and id is", id)
  return function cleanup() {
    mounted = false
}
},[id])

const getCandidateById =async(id) =>{
  const dbRef =  firebase.firestore().collection("registration").doc(id)
  const doc =  await dbRef.get();
  const candidate = doc.data();
  console.log(candidate, doc.id ,'fire useEffect')
  setCandidate({
      ...candidate,
      id:doc.id
  })
  setloading(false)
}

  const handleChangeText =(name, value)=>{
    setCandidate({...candidate, [name]:value});
    console.log(candidate.id)
  };

  const deleteCandidate = async () =>{
   const dbRef= firebase.firestore().collection('registration').doc(props.route.params.userId)
  await dbRef.delete();
  props.navigation.navigate('List')
  }
  // confirmation check prior to the deletion
  const openConfirmationAlear =()=>{
    Alert.alert('候補者を削除します。', 'よろしいですか？',[
      {text: 'はい', onPress: ()=> deleteCandidate()},
      {text: 'いいえ', onPress: ()=> console.log(false)}
    ])
  }

  // update candidate info
  const updateCandidate = async()=>{
    const dbRef = firebase.firestore().collection('registration').doc(candidate.id)
    await dbRef.set({fullName:candidate.fullName, email:candidate.email,age:candidate.age, gender:candidate.gender, departmentId:candidate.departmentId, reason:candidate.reason,
    }) 
    props.navigation.navigate('List')

   console.log(candidate.id)
    
  }

  if(loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e"/>
      </View>
    )
  }
  
  return (


    <Container>

    
      <Main>
        <Text center medium black color="#A9A9A9" >
       応募者リスト
     </Text>
    </Main>

    <View style={styles.container}>
    



    <ScrollView style={styles.container}>
        {/* Name Input */}
        <UpdateContainer >
        <AntDesign name="user" size={15} color="#121212"/> 
        <UpdateTextField
            placeholder="名前"
            value={candidate.fullName}
            onChangeText={(value) => handleChangeText( "fullName", value)}
        />
        </UpdateContainer>

        {/* Email Input */}
        <UpdateContainer >
        <AntDesign name="mail" size={15} color="#121212"/> 
        <UpdateTextField
            placeholder="メール"
            value={candidate.email}
            onChangeText={(value) => handleChangeText( "email",value)}  
        />
        </UpdateContainer>

        {/* Input */}
        <UpdateContainer >
        <FontAwesome5 name="history" size={15} color="#121212"/> 
        <UpdateTextField
            placeholder="年齢"
            value={candidate.age}
            onChangeText={(value) => handleChangeText( "age", value)}
        />
        </UpdateContainer>

        {/* Input */}
       <UpdateContainer >
       <FontAwesome5 name="people-arrows" size={15} color="#121212"/> 
   
        <UpdateTextField
            placeholder="性別"
            value={candidate.gender}
            onChangeText={(value) => handleChangeText( "gender", value)}
        />
        </UpdateContainer>

           {/* Input */}
       <UpdateContainer >
       <FontAwesome5 name="building" size={15} color="#121212"/> 
        <UpdateTextField
            placeholder="部署ID"
            value={candidate.departmentId}
            onChangeText={(value) => handleChangeText( "departmentId", value)}

        />
        </UpdateContainer>

            {/* Input */}
       <UpdateContainer >
       <MaterialIcons name="notes" size={15} color="#121212" />
        <UpdateTextField
            placeholder="求職理由"
            value={candidate.reason}
            multiline={true}
            numberOfLines={10}
            onChangeText={(value) => handleChangeText( "reason", value)}
           
        />
        </UpdateContainer>

        <View >
        <Update 
        title="Update User" onPress={() => updateCandidate()} >
          <MaterialIcons name="system-update" size={18} color="#fff" />
          <Text> アップデート</Text>
        </Update>
        
        </View>

        <View >
       
        <Delete 
        title="Delete User" onPress={() => openConfirmationAlear()} >
         <AntDesign name="deleteuser" size={18} color="#fff" />
         <Text> 削除</Text>
        </Delete>
        </View>
    </ScrollView>
    </View>

    </Container>


    )



}
export default UserDetailScreen



const styles = StyleSheet.create({
   
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
    loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  

  const Container = styled.View`
  flex:1;
  background-color:#ebecf3;
  padding-top: 64px;
  
`;


  const Main = styled.View`
margin-top:15px;
`;


const UpdateContainer = styled.View`
background-color:#fff;
flex-direction:row;
align-items:center;
padding: 3px 3px 3px 3px;
margin-top:15px;
margin-left: 10px;
margin-right:10px;
margin-bottom:8px;
border-radius:6px;

`;

const UpdateTextField = styled.TextInput`
flex:1;
padding: 8px 16px;
font-family:"Avenir";
font-size:13px;
color:#121212;
`;



const Update = styled.TouchableOpacity`
flex-direction:row;
margin: 0 10px 16px;
height: 40px;
align-items:center;
justify-content:center;
background-color: #8bd5cd;
border-radius:6px;

`;



const Delete = styled.TouchableOpacity`
flex-direction:row;
margin: 0 10px 16px;
height: 40px;
align-items:center;
justify-content:center;
background-color: #8bd5cd;
border-radius:6px;

`;