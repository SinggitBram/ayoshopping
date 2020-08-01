import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Axios from 'axios'
import Asyncstorage from '@react-native-community/async-storage'
import api from '../api/api'
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'

const { height, width } = Dimensions.get('window')

export default function Biodata({ navigation }) {

    const [theVenue, setTheVenue] = useState(null)

    useEffect(() => {
        async function getToken() {
            try {
                const token = await Asyncstorage.getItem("token")
                return getVenue(token)
            } catch (err) {
                console.log(err)
            }
        }
        getToken()
    }, [])

    const getVenue = (token) => {
        Axios.get(`${api}/venues`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setTheVenue(JSON.stringify(res))
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <View style={styles.container}>
            <Text>
            {theVenue}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor:"#a29bfe"
    }
});
