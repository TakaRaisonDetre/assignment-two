import React, {createContext} from 'react'

import firebase from 'firebase'

import "firebase/auth"
import "firebase/firestore"
import config from '../config/firebase'


const FirebaseContext = createContext()

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

var db = firebase.firestore();

const Firebase ={

 getCurrentUser : ()=>{
   return firebase.auth().currentUser
 },
 
  createUser: async (user) =>{
      try {
       await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
         const uid = Firebase.getCurrentUser().uid;

         let profilePhotoUrl = "default";

         await db.collection("users").doc(uid).set({
           username: user.username,
           email: user.email,
           profilePhotoUrl,
         })

         if(user.profilePhoto){
              profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto)
         }

         delete user.password

         return {...user, profilePhotoUrl, uid}

      } catch(error) {
        console.log("Error @ createUser:", error.message)
      }
 },

 getUserInfo : async (uid)=>{
   try{
     const user = await db.collection("users").doc(uid).get()
     if(user.exists){
       return user.data()
     }
   } catch(error) {
     console.log("error @GetUserInfo", error)
   }
 },

 logOut : async () =>{
   try {
      await firebase.auth().signOut()
      return true;
   }catch(error) {
     console.log("error @logout", error)
   }
   return false;
 },

 signIn : async (email, password)=>{
   return firebase.auth().signInWithEmailAndPassword(email, password);
  
  
},

getCandidates : async () =>{
  return db.collection('registration').onSnapshot(querySnapShot=>{
    const candidates =[]
    querySnapShot.docs.forEach(doc=>{
     const {fullName, email, age, departmentId, gender, isPermanent, reason} = doc.data()
     candidates.push({
      id:doc.id, fullName, email, age, departmentId, gender, isPermanent, reason
     });
    });

  });
},

getCandbyId : async (id) =>{
 try{
  const doc = await db.collection('registration').doc(id).get();
  
  const candidate = doc.data();
  if(doc.exists){
    return {...candidate, id:doc.id}
  }
} catch(error) {
  console.log("error @GetUserInfo", error)
}
}


}
const FirebaseProvider = (props)=>{
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FirebaseProvider, firebase, db}