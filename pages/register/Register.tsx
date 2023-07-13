import React from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'

type Props = {}

export default function Register({}: Props) {
  return (
    <View>
      {/* ICON */}
      <Text >Create and account to get munching!</Text>
      <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>UserName</Text>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      {/* Google  */}
    </View>
  )
}