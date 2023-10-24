import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { useState, } from 'react'
import styles from './forgotPwStyles'
import Modal from 'react-native-modal'
import { send } from 'process'
import auth from '@react-native-firebase/auth'

type Props = {
  navigation: any
}

export const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState('')
  const [modal, setModal] = useState(false)
  const {navigation} = props
  const IMAGE = require('../../assets/images/logo_sm.png')

  // modal to say "check your email"
  const sendEmail = (email: string) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(()=> console.log('email sent', email))
      .then(()=> setModal(true))
      .then(()=> setTimeout(()=> {
          setModal(false)
          navigation.navigate('Login')
        }, 2500))
      .catch(err => {
        console.log(err.code, err.message)
        // or open modal with error
      })
      .finally(()=> {
        email = ''
      })
  }

  return (
    <View style={styles.container}>
      <Image source={IMAGE} style={{height: 200, width: 200, marginBottom: 40}}/>
      <Text style={styles.sub_heading}>Forgot your password?</Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />
      <TouchableOpacity 
        style={styles.submit}
        onPress={()=> sendEmail(email)}
      >
        <Text style={styles.submit_text}>Reset Password</Text>
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
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.links_txt}>Register</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text style={{fontSize: 35, color: "#fff"}}>Email has been sent to {email}</Text>
          <Text style={{fontSize: 25, color: "#fff"}}>Redirecting... 🚀</Text>
        </View>
      </Modal>
    </View>
  )
}