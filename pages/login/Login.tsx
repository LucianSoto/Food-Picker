import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Formik } from 'formik'
import styles from './loginStyles'
import Oauth from '../../components/auth/Oauth'
import auth from '@react-native-firebase/auth'

type Props = {navigation:any}

const Login: React.FC<{}> = (props: Props) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

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
    console.log(user, 'in useEffect')
  }, [user])

  if(user) {navigation.navigate('Home')}

  return (
    <ScrollView contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Image source={IMAGE} style={{height: 100, width: 100, marginTop: 20}}/>
      <Text style={styles.sub_heading}>Log in to get Munching!</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => console.log(values)}
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
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submit_text}>SUBMIT</Text>
            </TouchableOpacity>
            <View style={styles.links_cont}>
              <TouchableOpacity 
                style={styles.links} 
                onPress={() => navigation.navigate('Register', {})}
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