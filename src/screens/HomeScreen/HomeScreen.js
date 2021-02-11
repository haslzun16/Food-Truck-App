import React from 'react'
import { Text, View, TouchableOpacity  } from 'react-native'
import {AuthContext} from '../../../App'



export default function HomeScreen(props) {
    const { signOut } = React.useContext(AuthContext);

    const onSignPress = () => {
        signOut();

    };


    return (
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity
                    
                    onPress={() => onSignPress()}>
                    <Text >Sign Out</Text>
            </TouchableOpacity>

        </View>
    )
}