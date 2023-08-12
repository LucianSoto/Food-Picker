import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState, } from 'react'
import styles from './forgotPwStyles'

type Props = {
  navigation: any
}

export const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState('')
  const {navigation} = props

console.log('forgotpw')

  // modal to say "check your email"
  return (
    <View style={styles.container}>
      <Text style={styles.sub_heading}>Forgot your password?</Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />
      <TouchableOpacity style={styles.submit}>
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
    </View>
  )
}