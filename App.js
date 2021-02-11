import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
import * as firebase from 'firebase';
import apiKeys from './src/firebase/config';
import { Alert, Text, View } from 'react-native';


export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type){
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
          
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() =>{
     // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await firebase.auth().currentUser.getIdTokenResult();
      }catch(err){
        Alert.alert("Restoring token failed");
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);
 
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        let userToken;
        try {
          await firebase
             .auth()
             .signInWithEmailAndPassword(data.email, data.password)
             .then((userCredential) => {
               //signed in 
               userToken = firebase.auth().currentUser.getIdToken();
               
              
               console.log(userToken);
             })
             
             
         } catch (err) {
           Alert.alert("There is something wrong!", err.message);
         }

        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT'}),
      signUp: async data => {
        let userToken;
        try {
          await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
          const currentUser = firebase.auth().currentUser;
      
          const db = firebase.firestore();
          db.collection("users")
            .doc(currentUser.uid)
            .set({
              email: currentUser.email,
              firstName: data.fullName,
            });
            userToken = firebase.auth().currentUser.getIdToken();
            console.log(userToken);
        } catch (err) {
          Alert.alert("There is something wrong!!!!", err.message);
        }
        dispatch({ type: 'SIGN_IN', token: userToken });
      }
    })
  );
  


  


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
        { state.isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userToken == null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}