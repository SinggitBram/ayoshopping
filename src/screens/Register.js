import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Feather'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'

const { height, width } = Dimensions.get('window')

export default function Register({ navigation }) {
    // ini untuk nampilin modal
    const [isVisible, setIsVisible] = useState(false)
    // ini untuk kondisi kamera belakang atau depan 
    const [type, setType] = useState('back')
    // ini untuk nyimpen foto hasil jepretan
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const toggleCamera = () => {
        setType(type === 'back' ? 'front' : 'back')
    }

    const takePicture = async () => {
        const options = { quality: 0.5, base64: true }
        if (camera) {
            const data = await camera.takePictureAsync(options)
            setPhoto(data)
            setIsVisible(false)
        }
    }

    const uploadImage = (uri) => {
        const sessionId = new Date().getTime()
        return storage()
            .ref(`images/${sessionId}`)
            .putFile(uri)
            .then(response => {
                alert('Upload Success')
            })
            .catch(error => {
                alert('error')
            })
    }

    const renderCamera = () => {
        return (
            <Modal visible={isVisible} onRequestClose={() => setIsVisible(false)}>
                <View style={{ flex: 1 }}>
                    <RNCamera
                        style={{ flex: 1 }}
                        ref={ref => {
                            camera = ref
                        }}
                        type={type}
                    >
                        <View style={styles.cameraContainer}>
                            <TouchableOpacity style={styles.buttonFlip} onPress={() => toggleCamera()}>
                                <MaterialCommunity name='rotate-3d-variant' size={15} />
                            </TouchableOpacity>
                            <View style={styles.round} />
                            <View style={styles.rectangle} />
                            <TouchableOpacity style={styles.buttonTake} onPress={() => takePicture()}>
                                <Icon name='camera' size={30} />
                            </TouchableOpacity>
                        </View>
                    </RNCamera>
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.partAtas}>
                <Image source={photo === null ? require('../assets/images/Singgit_Bramantha.jpg') : { uri: photo.uri }} style={{ width: 80, height: 80, borderRadius: 300, marginBottom: 15 }} />
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Change Picture</Text>

                </TouchableOpacity>
            </View>
            <View style={styles.partBawah}>
                <View style={styles.boxData}>
                    <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 15 }}>Name</Text>
                    <View style={styles.inputText}>
                        <TextInput value={name} onChangeText={(name) => setName(name)} placeholder="Name" style={{ fontSize: 13 }}></TextInput>
                    </View>
                    <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 15 }}>Email</Text>
                    <View style={styles.inputText}>
                        <TextInput value={email} onChangeText={(email) => setEmail(email)} placeholder="Email" style={{ fontSize: 13 }}></TextInput>
                    </View>
                    <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', marginTop: 10, fontSize: 15 }}>Password</Text>
                    <View style={styles.inputText}>
                        <TextInput secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} placeholder="Password" style={{ fontSize: 13 }}></TextInput>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => uploadImage(photo.uri)} style={styles.buttonKeluar}>
                            <Text style={{ backgroundColor: "#6c5ce7", color: "white", height: 30, paddingHorizontal: 25, paddingVertical: 5, borderRadius: 10, width: width * 0.85, textAlign: 'center' }}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {renderCamera()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
    },
    partAtas: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#a29bfe",
        height: height * 0.33
    },
    partsBawah: {
        backgroundColor: "white",
    },
    boxData: {
        backgroundColor: "white",
        display: "flex",
        elevation: 5,
        width: width * 0.9,
        borderRadius: 10,
        alignSelf: "center",
        paddingHorizontal: 15,
        marginTop: -25,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    tulisan: {
        fontSize: 13,
        marginVertical: 7
    },
    baris: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    buttonKeluar: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center'
    },
    inputText: {
        width: width * 0.8,
        borderWidth: 3,
        borderColor: "#6c5ce7",
        flexDirection: "row",
        borderRadius:20
    },
    buttonFlip: {
        height: 40,
        width: 40,
        borderRadius: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline',
        marginTop: 20,
        marginLeft: 20
    },
    buttonTake: {
        height: 60,
        width: 60,
        borderRadius: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    round: {
        height: 250,
        width: 180,
        borderWidth: 1,
        borderColor: 'white',
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        marginTop: 15,
        marginBottom: 50
    },
    rectangle: {
        height: 110,
        width: 180,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 30
    }
});
