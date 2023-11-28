import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Formik } from 'formik'
import styles from './registerStyles'
import Oauth from '../../components/auth/Oauth'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore  from '@react-native-firebase/firestore'
import {nanoid} from 'nanoid'

Icon.loadFont().catch((error) => { console.info(error); });

type Props = {
  navigation: any
}

const Register = (props: Props) => {
  const IMAGE = require('../../assets/images/logo_sm.png')
  const [initializing, setInitializing] = useState(true)
  // const [user, setUser] = useState() not being used
  const [secure, setSecure] = useState<boolean>(true)
  const {navigation} = props
  const collectionRef = firestore().collection('users')

  const createUser = async (email:string, password:string, name:string) => {
    try{
      const credential = await auth().createUserWithEmailAndPassword(email, password)
      const user = await auth().currentUser
      const id = await user?.uid  //this will wait for the user id before making the userCopty

      const addUserToCollection = await collectionRef.add({
        email, 
        name,
        timestamp : firestore.FieldValue.serverTimestamp(),
        favorites: [],
        userRef: id
      })
    } catch(error: any) {
      if(error.code === 'auth/email-already-in-use') {
        console.log('Email / Account already exists.')
      }
      if(error.code === 'auth/invalid-email'){
        console.log('Invalid email address.')
      }
      console.log(error, 'in REGISTER') 
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Image source={IMAGE} style={{height: 100, width: 100, marginTop: 20}}/>
      <Text style={styles.sub_heading}>Create and account to get munching!</Text>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={values => {createUser(values.email, values.password, values.name,)}}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <Text style={{color: 'white', marginLeft: 10}}>UserName</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
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
            <TouchableOpacity style={styles.submit} onPress={()=> handleSubmit()}>
            <Text style={styles.submit_text}>SUBMIT</Text>
            </TouchableOpacity>
            <View style={styles.links_cont}>
              <TouchableOpacity 
                style={styles.links} 
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.links_txt}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.links} 
                onPress={() => navigation.navigate('Terms_Of_Use')}
              >
                <Text style={styles.links_txt}>Terms of Use</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        )}
      </Formik>
      <Oauth text={'Or register with'}/>
    </ScrollView>
  )
}

export default Register