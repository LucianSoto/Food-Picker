import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { Formik } from 'formik'
import styles from './registerStyles'

type Props = {}

const Register: React.FC<{}> = () => {
  const IMAGE = require('../../assets/images/logo_sm.png')

  return (
    <View style={styles.container}>
      <Image source={IMAGE} style={{height: 100, width: 100, marginTop: 20}}/>
      <Text style={styles.sub_heading}>Create and account to get munching!</Text>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={values => console.log(values)}
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
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.submit_text}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* Google  */}
    </View>
  )
}

export default Register