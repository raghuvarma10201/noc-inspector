import React, { createContext, useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import axios from 'axios';
// import { FCM } from '@capacitor-community/fcm';
import { Geolocation } from '@capacitor/geolocation';
import axiosInstance from '../interceptors/ApiInterceptor';
//import { getServices } from '../shared/common';
import { registerPushHandlers } from '../utils/pushNotifications';
import { PushNotifications } from '@capacitor/push-notifications';

const AuthContext = createContext<any>({});

export const AuthProvider: React.FC<any> = ({ children }) => {
  const history = useHistory();
  const apiUrl: any = import.meta.env.VITE_API_URL;
  const initialLoggedInState = !!localStorage.getItem('token');
  const initialLoggedInUser = localStorage.getItem('userData') || '';
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
  const [userData, setUserData] = useState(initialLoggedInUser ? JSON.parse(initialLoggedInUser) : '');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [treatmentID, setTreatmentID] = useState<any>('');


  useEffect(() => {
    registerPushHandlers();
  }, []);

  useEffect(() => {
    console.log("latlong", lat, long);
  }, [lat, long]);



  const login = async (loginFormValue: any, app_name: any, app_version: any) => {
    let deviceToken: any = localStorage.getItem('device_token');
    console.log("apiUrl", apiUrl);
    console.log("loginFormValue", loginFormValue);
    try {
      if (deviceToken === null) {
        const noti = await PushNotifications.register();
        console.log(noti);
        deviceToken = localStorage.getItem('device_token') || 'querty';
      }
      let payload = {
        "username": loginFormValue.email,
        "password": loginFormValue.password,
        "device_id": deviceToken,
        "app_version": app_version, // should be max length of 10
        "app_name": app_name   // should be max length of 50, app name: mosquito_control or pest_control
      }
      const response = await axios.post(apiUrl + 'v1/training-authenticate', payload, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } });
      console.log('API Response:', response.data);
      localStorage.setItem('token', response.data.data.api_token);
      localStorage.setItem('userData', JSON.stringify(response.data.data));
      localStorage.setItem('userPermissions', JSON.stringify(response.data.data.permission_types));
      setUserData(response.data.data);
      setIsLoggedIn(true);
      return response.data;
    }
    catch (error: any) {
      return error.response.data;
      // console.log(error);
    }
  };
  const register = async (formValue: any, app_name: any, app_version: any) => {
    let deviceToken: any = localStorage.getItem('device_token');
    console.log("apiUrl", apiUrl);
    console.log("formValue", formValue);
    try {
      if (deviceToken === null) {
        await PushNotifications.register();
        deviceToken = localStorage.getItem('device_token');
      }
      let payload = formValue;
      payload.device_id = deviceToken;
      payload.app_version = app_version; // should be max length of 10
      payload.app_name = app_name;  // should be max length of 50, app name: mosquito_control or pest_control

      const response = await axios.post(apiUrl + 'v1/training-register', payload, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } });
      console.log('API Response:', response);
      if(response.data.status == 200 ){
        setUserData(response.data.data);
        setIsLoggedIn(true);
      }
      return response.data;
    }
    catch (error: any) {
      console.log(error);
      return error.response.data;
      
    }
  };
  const resetPassword = async (payload : any) => {
    try {
      const response = await axiosInstance.post(apiUrl + 'v1/reset-password', payload, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } });
      console.log('API Response:', response);
      if(response.data.status == 200 ){
        logout();
      }
      return response.data;
    }
    catch (error: any) {
      console.log(error);
      return error.response.data;
      
    }
  };
  const changePassword = async (payload : any) => {
    try {
      const response = await axiosInstance.post(apiUrl + 'v1/training-change-password', payload, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } });
      console.log('API Response:', response);
      if(response.data.status == 200 ){
        logout();
      }
      return response.data;
    }
    catch (error: any) {
      console.log(error);
      return error.response.data;
      
    }
  };
  const forgotPassword = async (payload : any) => {
    try {
      const response = await axiosInstance.post(apiUrl + 'v1/training-forget-password', payload, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } });
      console.log('API Response:', response);
      if(response.data.status == 200 ){
        logout();
      }
      return response.data;
    }
    catch (error: any) {
      console.log(error);
      return error.response.data;
      
    }
  };
  const logout = async () => {
    try {
      //const response = await axiosInstance.post(apiUrl + 'api/v1/logout', {}, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } });
      //console.log('API Response:', response.data);
      const keysToKeep = ['device_token', 'rememberedUserName', 'rememberedPassword', 'app_name', 'app_version'];
      const savedValues = keysToKeep.map(key => ({ key, value: localStorage.getItem(key) }));
      localStorage.clear();
      savedValues.forEach(({ key, value }) => {
        if (value !== null) {
          localStorage.setItem(key, value);
        }
      });
      setIsLoggedIn(false);
      history.push("/home");
      //return response;
    }
    catch (error: any) {
      return error.response
      // console.log(error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: false, maximumAge: 30000 }); // cached location till 30 seconds 
      console.log("geoLocation ", position.coords);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      return position;
    } catch (e) {
      console.log("Geolocation Error or user not logged in.");
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login,register, logout,resetPassword,forgotPassword,changePassword, deviceInfo, getCurrentLocation, lat, long, treatmentID, userData }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext);



