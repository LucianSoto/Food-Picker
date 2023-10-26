import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, } from 'react-native'
import { Formik } from 'formik'
import styles from './loginStyles'
import Oauth from '../../components/auth/Oauth'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as yup from 'yup'

Icon.loadFont().catch((error) => { console.info(error); });

type Props = {navigation:any}

const Login = (props: Props) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const [secure, setSecure] = useState<boolean>(true)
  const [err, setErr] = useState<string>('')
  const IMAGE = require('../../assets/images/logo_sm.png')
  const {navigation} = props

  // const onAuthStateChanged = (user:any) => {
  //   setUser(user)
  //   if(initializing) setInitializing(false)
  //   if(user) {()=> navigation.navigate('Home')}
  // }

  // useEffect(()=> {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
  //   return subscriber
  // }, [])

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })


  useEffect(()=> {
    if(user) {navigation.navigate('Home')}
  },[user])
    
  // if (initializing) {
  //   return(
  //     <View>
  //       <Text>Initializing...</Text>
  //     </View>
  //   )
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Image source={IMAGE} style={{height: 100, width: 100, marginTop: 20}}/>
      <Text style={styles.sub_heading}>Log in to get Munching!</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          const {email, password} = values

          auth()
            .signInWithEmailAndPassword( email, password )
            .then((userCredential:any)=> {
              const userCreds = userCredential.user
              const token = userCredential.user.getIdToken()
              return token
            })
            .then((idToken:any)=> {
              EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                  token : idToken,
                  email : email,
                })
                )
            })
            .then (
                ()=> navigation.navigate('Home')
            )
            .catch(error => {
              console.log(error.code, error.message)
              if(error.code === 'auth/wrong-password'){
                console.log('Password incorrect.')
                setErr('Password incorrect.')
              } 
              if(error.code === 'auth/user-not-found'){
                console.log('User does not exist')
                setErr('User does not exist.')
              }
            })
            // luxi
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <View style={styles.form}>
            <Text style={{color: 'white', marginLeft: 10}}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='email@email.com'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              placeholderTextColor={'gray'}

            />
            {(errors.email && touched.email) &&
              <Text style={styles.errorText}>{errors.email}</Text>
            }
            <Text style={{color: 'white', marginLeft: 10}}>Password</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={secure}
                placeholder='********'
                placeholderTextColor={'gray'}
              />
              <Icon 
                style={styles.eye}
                name={secure? 'eye' : 'eye-slash'}
                onPress={()=> setSecure(!secure)}
              />
              {(errors.password && touched.password) &&
              <Text style={styles.errorText}>{errors.password}</Text>
            } 
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
            {err && 
              <Text style={styles.err}>{err}</Text>
            }
  
                       
          </View>
        )}
        
      </Formik>
      {/* Google  */}
      {/* figure out how to pass navigation to oauth as well or just import it????????????? */}
      <Oauth {...props} />
    </ScrollView>
  )
}

export default Login