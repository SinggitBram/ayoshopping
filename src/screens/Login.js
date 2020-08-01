import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
const { height, width } = Dimensions.get('window')
import Axios from 'axios'
import Asyncstorage from '@react-native-community/async-storage'
import api from '../api/api'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-community/google-signin'
import TouchID from 'react-native-touch-id'

const fingerprintConfig = {
    title: 'Authentication Required',
    imageColor: "#191970",
    imageErrorColor: "red",
    sensorDescription: 'Touch sensor',
    sensorErrorDescription: 'Failed',
    cancelText: 'Cancel'
}

function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const saveToken = async (token) => {
        try {
            await Asyncstorage.setItem("token", token)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        configureGoogleSignIn()
    }, [])

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '713244706516-j11poqarf7otcq8knfi73ddqp6b8kpsu.apps.googleusercontent.com'
        })
    }

    const signInWithGoogle = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn()
            // ini supaya google sign in integrasi dengan firebase 
            const credential = auth.GoogleAuthProvider.credential(idToken)
            auth().signInWithCredential(credential)
            navigation.navigate('Biodata')

        } catch (error) {
            Alert.alert(
                'Something Went Wrong',
                'Please try again',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }
    }

    const onRegisterPress = () => {
        navigation.navigate('Register')
    }

    const onLoginPress = () => {
        let data = {
            email: email,
            password: password
        }
        Axios.post(`${api}/login`, data)
            .then(res => {
                saveToken(res.data.token)
                navigation.navigate('TestApi')
            })
            .catch(err => {
                console.log(email, password)
                Alert.alert(
                    'Wrong Email/Password',
                    'Please try again',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            })
    }

    const signInWithFingerprint = () => {
        TouchID.authenticate('', fingerprintConfig)
            .then(success => {
                navigation.navigate('Biodata')
            })
            .catch(error => {
                alert("Authentication Failed")
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <Image source={require('../assets/images/monitor.png')} style={{ width: 200, height: 200, marginTop: 30, marginBottom: 10 }} />
            <Text style={{ alignSelf: 'flex-start', marginLeft: 20, fontWeight: 'bold', fontSize: 20 }}>Email</Text>
            <View style={styles.inputText}>
                <TextInput textContentType='emailAddress' value={email} onChangeText={(email) => setEmail(email)} placeholder="Email" style={{ fontSize: 13 }}></TextInput>
            </View>
            <Text style={{ alignSelf: 'flex-start', marginLeft: 20, fontWeight: 'bold', marginTop: 10, fontSize: 20 }}>Password</Text>
            <View style={styles.inputText}>
                <TextInput secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} placeholder="Password" style={{ fontSize: 13 }}></TextInput>
            </View>
            <TouchableOpacity onPress={() => onLoginPress()} style={styles.buttonMasuk}>
                <Text style={{ backgroundColor: "#6c5ce7", color: "white", paddingHorizontal: 25, paddingVertical: 5, borderRadius: 10, width: width * 0.9, textAlign: 'center', elevation: 5 }}>LOGIN</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 5 }}>
                <GoogleSigninButton
                    onPress={() => signInWithGoogle()}
                    style={{ width: 330, height: 40 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                />
            </View>
            <TouchableOpacity onPress={() => signInWithFingerprint()} style={{ marginTop: 5 }}>
                <Text style={{ elevation: 5, backgroundColor: "#191970", color: "white", paddingHorizontal: 25, paddingVertical: 5, borderRadius: 5, width: width * 0.9, textAlign: 'center' }}>SIGN IN WITH FINGERPRINT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRegisterPress()} style={{ marginTop: 'auto' }}>
                <Text style={{ marginBottom: 20 }}>Belum mempunyai akun ? <Text style={{ color: "blue" }}>Buat Akun</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a29bfe',
        alignItems: 'center',
        display: 'flex',
    },
    inputText: {
        width: width * 0.9,
        borderWidth: 3,
        borderColor: "#6c5ce7",
        flexDirection: "row",
        borderRadius: 20
    },
    buttonMasuk: {
        marginTop: 20,
        height: 30,
        alignItems: 'center',
    },
    buttonKeGoogle: {
        marginTop: 15,
        height: 30,
        alignItems: 'center',
    }
});

export default Login;