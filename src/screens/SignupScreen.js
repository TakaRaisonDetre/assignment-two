import React, {useState, useContext} from 'react'
import styled from "styled-components"


import {AntDesign} from '@expo/vector-icons'
import {FirebaseContext} from '../context/FirebaseContext'
import {UserContext} from '../context/UserContext'

// Custom Components 
import Text from '../components/text'

const SignupScreen=({navigation})=> {
   
    const [username, setUsername] = useState();
    const [email, setEmail]=useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
   // Context 
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);
   
     // Signup
     
     const signUp = async ()=>{
         setLoading(true)
         const user = {username, email, password }

         try {
             const createdUser = await firebase.createUser(user)
             setUser({...createdUser, isLoggedIn:true})
         } catch(err) {
             console.log("error identified @ signup ", err)
         } finally {
             setLoading(false)
         }
     }



    return (
<Container>
        <Main>
        <Text center large black color="#A9A9A9">
               　サインアップ
                </Text>
        </Main>

       

<Auth>

  <AuthContainer>
      <AuthTitle> 人事部担当者名
      </AuthTitle>
      <AuthField 
      autoCapitalize="none" 
      autoCorrect={false}
      autoFocus={true}
      onChangeText = {username => setUsername(username.trim())}
      value={username}
      />
   </AuthContainer>

   <AuthContainer>
      <AuthTitle> メールアドレス</AuthTitle>
      <AuthField 
      autoCapitalize="none" 
      autoCompleteType="email" 
      autoCorrect={false}
      keyboardType="email-address"
      onChangeText = {email => setEmail(email.trim())}
      value={email}
      />
   </AuthContainer>

   <AuthContainer>
      <AuthTitle> パスワード</AuthTitle>
      <AuthField 
      autoCapitalize="none" 
      autoCompleteType="password"
      autoCorrect={false}
      autoFocus={true}
      secureTextEntry={true}
      onChangeText ={password => setPassword(password)}
      value={password}
     />
   </AuthContainer>
</Auth>

    <SignUpContainer onPress={signUp} disabled={loading}>
        {loading? (<Loading/>):(
            <Text bold center color="#ffffff">
            サインアップ
            </Text>
        )}
    </SignUpContainer>

    <SignIn onPress={()=>navigation.navigate("SignIn")}>
       <Text　center small light color="#121212" > 
           既にアカウントをお持ちの方は ?<Text center small bold color="#121212"> こちらから</Text>
        </Text>

    </SignIn>

        <HeaderGraphic>
            <RightCircle/>
            <LeftCircle/>
        </HeaderGraphic>
        <StatusBar barStyle="light-content"/>
    </Container>
 
)
}
export default SignupScreen


const Container = styled.View`
flex:1;
`;

const Main = styled.View`
margin-top:168px;
`;


const Auth = styled.View`
  margin: 64px 32px 32px;
`;

const AuthContainer = styled.View`
   margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
   color:#8e93a1;
   font-size: 12px;
   text-transform:uppercase;
   font-weight:300;
`;

const AuthField = styled.TextInput`
   border-bottom-color:#8e93a1;
   border-bottom-width:0.5px;
   height: 40px
`;

const SignUpContainer = styled.TouchableOpacity`
   margin: 0 32px;
   height: 40px;
   align-items:center;
   justify-content:center;
   background-color: #8bd5cd;
   border-radius:6px;
`;


const SignIn = styled.TouchableOpacity`
   margin-top:16px;
`;


const Loading = styled.ActivityIndicator.attrs(props=>({
    color:"#ffffff",
    size : "small",
}))``;

const HeaderGraphic = styled.View`
position:absolute;
width:100%;
top:-50px;
z-index:-100;
`;

const RightCircle = styled.View`
background-color: #2e856e;
 position: absolute;
 width:400px;
 height:400px;
 border-radius:200px;
 right:-100px;
 top: -200px;
`;

const LeftCircle =styled.View`
 background-color: #8abaae;
 position: absolute;
 width:200px;
 height:200px;
 border-radius:100px;
 left:-50px;
 top: -50px;
`;

const StatusBar = styled.StatusBar``;