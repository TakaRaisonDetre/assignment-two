import React, {useState, useEffect, useContext} from 'react'
import { View,  ScrollView } from 'react-native'

import {FirebaseContext, firebase} from '../context/FirebaseContext'
import {UserContext} from '../context/UserContext'
import { ListItem, Avatar } from 'react-native-elements'
import styled from 'styled-components'

// Custom Components 
import Text from '../components/text'

import {FontAwesome5, MaterialIcons, AntDesign} from '@expo/vector-icons'

const UserListScreen=(props)=> {
   
   const [candidates, setCandidates] = useState([])
   const Firebase = useContext(FirebaseContext);
   const [_, setUser] = useContext(UserContext);
   
   useEffect(()=>{
    let mounted = true
      firebase.firestore().collection('registration').onSnapshot(querySnapShot=>{
        const candidates =[]
        querySnapShot.docs.forEach(doc=>{
         const {fullName, email, age, departmentId, gender, hireDate, isPermanent, reason} = doc.data()
         candidates.push({
          id:doc.id, fullName, email, age, departmentId, gender, hireDate, isPermanent, reason
         });
        });
        setCandidates(candidates)
      }); 
      // clean up useEffect 
      return function cleanup() {
        mounted = false
    }
   },[])


   const Logout = async()=>{
      
       try {
       await Firebase.logOut()
       
       // set Hr user 
       setUser({
        username: '',
        email:'',
        uid:'',
        isLoggedIn:false
    });

       }catch(error){
           alert(error.message)
       }
   }


    return (
   <Container>

     <Main>
        <Text center medium black color="#A9A9A9" >
       応募者リスト
     </Text>
    </Main>

  
          <SearchContainer>
                <AntDesign name="search1" size={18} color="#5196f4"/> 
                <Search placeholder="Search Transactions" />
          </SearchContainer>

          <LogOut onPress={Logout}>
           <Text>サインアウト</Text>
          </LogOut>

        <ScrollView>
            {
                candidates.map(applicant=>{
                    return(
                   
                     <ListItem 
                     key={applicant.id} 
                     bottomDivider 
                     
                     onPress={()=>{
                       props.navigation.navigate('Detail', {
                           userId: applicant.id
                       })
                     }}>
                         <ListItem.Chevron/>


                         <ListItem.Content>
                             <ListItem.Title >
                                 <Text small bold right color="#121212">{applicant.fullName}</Text>
                                 
                             </ListItem.Title>
                             <ListItem.Subtitle >
                             <Text tiny light right color="#72777D">
                                 {applicant.email} | {applicant.gender} | {applicant.age}
                                 </Text>
                             </ListItem.Subtitle>
                         </ListItem.Content>
                        </ListItem>
                        
                    )
                })
            }
        </ScrollView>

       

        </Container>
    )
}
export default UserListScreen



const Container = styled.View`
  flex:1;
  background-color:#ebecf3;
  padding-top: 64px;
  
`;


const Main = styled.View`
margin-top:15px;
`;


const SearchContainer = styled.View`
background-color:#fff;
flex-direction:row;
align-items:center;
padding: 5px 5px 5px 5px;
margin-left: 10px;
margin-right:10px;
margin-bottom:16px;
border-radius:6px;

`;

const Search = styled.TextInput`
flex:1;
padding: 8px 16px;
font-family:"Avenir";
color:#dbdbdb;
`;

const LogOut = styled.TouchableOpacity`
margin: 0 10px 16px;
height: 40px;
align-items:center;
justify-content:center;
background-color: #8bd5cd;
border-radius:6px;

`;