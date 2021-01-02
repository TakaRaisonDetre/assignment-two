
import React, {useState, useContext} from 'react'
import styled from "styled-components"
import {FirebaseContext} from '../context/FirebaseContext'
import {UserContext} from '../context/UserContext'

// Custom Components 
import Text from '../components/text'


const SigninScreen=({navigation})=> {
    const [email, setEmail]= useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);
  

    const signIn = async() =>{
        setLoading(true)

        try{
           await firebase.signIn(email, password)
           // Get HR perssonal info
           const uid = firebase.getCurrentUser().uid
           const userInfo = await firebase.getUserInfo(uid)

          // set Hr user 
          setUser({
              username: userInfo.username,
              email:userInfo.email,
              uid,
              isLoggedIn:true
          });


        }catch(err) {
            alert(error.message)
        }finally {
            setLoading(false)
        }
    }
  
    return (
        <Container>
        <Main>
        <Text center large black color="#A9A9A9">
       ログイン
     </Text>
        </Main>

<Auth>
   <AuthContainer>
      <AuthTitle>メールアドレス</AuthTitle>
     
      <AuthField 
      autoCapitalize="none" 
      autoCompleteType="email" 
      autoCorrect={false}
      autoFocus={true}
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
      secureTextEntry={true}
      onChangeText ={password => setPassword(password)}
      value={password}
     />
   </AuthContainer>
</Auth>

    <SignInContainer onPress={signIn} disabled={loading}>
        {loading? (<Loading/>):(
            <Text >
            ログイン
            </Text>        )}
    </SignInContainer>

    <SignUp onPress={()=>navigation.navigate("SignUp")}>
    <Text　center small light color="#121212" > 
           初めてのご利用の方は<Text center small bold color="#121212"> こちらから</Text>
        </Text>

    </SignUp>

        <HeaderGraphic>
            <RightCircle/>
            <LeftCircle/>
        </HeaderGraphic>
        <StatusBar barStyle="light-content"/>
    </Container>
 
)
}
export default SigninScreen



const Container = styled.View`
flex:1;
`;

const Main = styled.View`
margin-top:192px;
`;



const Auth = styled.View`
  margin: 64px 32px 32px;
`;

const AuthContainer = styled.View`
   margin-bottom: 32px;
`;


const AuthField = styled.TextInput`
   border-bottom-color:#8e93a1;
   border-bottom-width:0.5px;
   height: 40px
`;

const AuthTitle = styled(Text)`
   color:#8e93a1;
   font-size: 12px;
   text-transform:uppercase;
   font-weight:300;
`;


const SignInContainer = styled.TouchableOpacity`
margin: 0 32px;
height: 40px;
align-items:center;
justify-content:center;
background-color: #8bd5cd;
border-radius:6px;
`;


const SignUp = styled.TouchableOpacity`
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