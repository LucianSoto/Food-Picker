import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

function useAccessToken() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Retrieve access token from AsyncStorage
    async function getAccessToken() {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token !== null) {
          setAccessToken(token);
        }
      } catch (error) {
        console.log(`Error retrieving access token: ${error}`);
      }
    }
    getAccessToken();
  }, []);

  async function setToken(token) {
    // Store access token in AsyncStorage
    try {
      await AsyncStorage.setItem('access_token', token);
      setAccessToken(token);
    } catch (error) {
      console.log(`Error storing access token: ${error}`);
    }
  }

  async function clearToken() {
    // Remove access token from AsyncStorage
    try {
      await AsyncStorage.removeItem('access_token');
      setAccessToken(null);
    } catch (error) {
      console.log(`Error clearing access token: ${error}`);
    }
  }

  return [accessToken, setToken, clearToken];
}