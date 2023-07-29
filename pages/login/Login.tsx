import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, } from 'react-native'
import { Formik } from 'formik'
import styles from './loginStyles'
import Oauth from '../../components/auth/Oauth'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import SInfo from "react-native-sensitive-info";

type Props = {navigation:any}

const Login = (props: Props) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const [secure, setSecure] = useState<boolean>(true)
  const IMAGE = require('../../assets/images/logo_sm.png')
  const {navigation} = props

  const onAuthStateChanged = (user:any) => {
    setUser(user)
    if(initializing) setInitializing(false)
  }

  useEffect(()=> {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])
  
  useEffect(()=> {
    // console.log(user, 'in useEffect')
    if(user) {()=> navigation.navigate('Home')}
  else if(!user) {() => navigation.navigate('Login')}
  }, [])

  if (initializing) {
    return(
      <View>
        <Text>Initializing...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Image source={IMAGE} style={{height: 100, width: 100, marginTop: 20}}/>
      <Text style={styles.sub_heading}>Log in to get Munching!</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          const {email, password} = values

          const logIn = await 
          auth()
            .signInWithEmailAndPassword( email, password )
            .then((userCredential:any)=> {
              const user = userCredential.user
              // navigation.navigate('Home', {user: user})
              const token = user.getIdToken().then(idToken => idToken)
              return token
            })
            .then((token) => {
              console.log(token, 'token')
            })
            .catch(error => {
              // display errors
              console.log(error.code, error.message)
              if(error.code === 'auth/wrong-password'){
                console.log('Password incorrect.')
              } 
              if(error.code === 'auth/user-not-found'){
                console.log('User does not exist')
              }
            })
            // .finally(()=> {
            //   values.email = ''
            //   values.password = ''
            // })
            .finally(()=> {
              
            })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <Text style={{color: 'white', marginLeft: 10}}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Text style={{color: 'white', marginLeft: 10}}>Password</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={secure}
              />
              <Icon 
                style={styles.eye}
                name={secure? 'eye' : 'eye-slash'}
                onPress={()=> setSecure(!secure)}
              />
            </View>
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submit_text}>SUBMIT</Text>
            </TouchableOpacity>
            <View style={styles.links_cont}>
              <TouchableOpacity 
                style={styles.links} 
                onPress={() => {navigation.navigate('Register')}}
              >
                <Text style={styles.links_txt}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.links} 
                onPress={() => navigation.navigate('Forgot_Password')}
              >
                <Text style={styles.links_txt}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        )}
      </Formik>
      {/* Google  */}
      <Oauth text={'Or login with'}/>
    </ScrollView>
  )
}

export default Login