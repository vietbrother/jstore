/**
 * This is the category component used in the home page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, Dimensions, TouchableOpacity} from 'react-native';
import {View} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Text from './Text';

export default class CategoryRootBlock extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this._onPress.bind(this)}
                    // activeOpacity={0.9}
                >
                    {/*<View>*/}
                    <Image style={styles.image} source={{uri: this.props.image}}/>
                    {/*<View style={styles.overlay} />*/}
                    {/*<View style={styles.border} />*/}
                    {/*<View style={styles.text}>*/}
                    <Text style={styles.title}>{this.props.title}</Text>
                    {/*<Text style={styles.subtitle}>Mua ngay</Text>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                </TouchableOpacity>
            </View>
        );
    }

    _onPress() {
        Actions.category({id: this.props.id, title: this.props.title});
    }
}

const styles = {
    text: {
        // width: Dimensions.get('window').width,
        // height: 200,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        // textAlign: 'center',
        // color: '#164e9c',
        // fontSize: 32,
        textAlign: 'center', width: 150
    },
    subtitle: {
        textAlign: 'center',
        color: '#164e9c',
        fontSize: 16,
        fontWeight: '100',
        fontStyle: 'italic'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(30, 42, 54, 0.4)'
    },
    border: {
        position: 'absolute',
        // top: 10,
        // left: 10,
        // right: 10,
        // bottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(253, 253, 253, 0.2)'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginRight: 5,
        borderColor: '#93b1c7',
        borderWidth: 0.5
    }
};
