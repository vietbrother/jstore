/**
 * This is the Product component
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {View, Col, Card, CardItem, Body, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../../Colors';
import Config from '../../Config';
import Text from '../Text';
import {IS_IOS, itemHorizontalMargin, itemWidth, productItemWidth, bannerHeight} from "../../Config";


export default class ProductsItem extends Component {
    render() {
        if (this.props.product.images.length == 0) {
            this.props.product.images.push({src: Config.url + Config.imageDefaul});
        }
        return (
            <TouchableOpacity style={style.content} onPress={() => this.pressed()}>
                <Image source={{uri: this.props.product.images[0].src}} style={style.image}/>
                <View style={style.border}/>
                <View style={{flex: 1, width: 120, alignItems: 'center'}}>
                    <Text
                        style={{fontSize: 16}}
                        numberOfLines={2}
                    >{this.props.product.name}</Text>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text
                            style={style.price}>{this.props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    pressed() {
        Actions.product({product: this.props.product, categoryId: this.props.categoryId});
    }
}

const style = {
    button: {flex: 1, height: 250, paddingLeft: 4, paddingRight: 4},
    image: {height: 150, width: 145, flex: 1, borderRadius: 10, borderWidth: 0.5, borderColor: 'grey'},
    leftMargin: {
        marginLeft: 7,
        marginRight: 0,
        marginBottom: 7
    },
    rightMargin: {
        marginLeft: 0,
        marginRight: 7,
        marginBottom: 7
    },
    border: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(253, 253, 253, 0.2)'
    },
    price: {
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 5,
        zIndex: 1000,
        backgroundColor: '#fdfdfd',
        color: '#c40521'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#7f8c8d',
        position: 'absolute',
        top: '52%'
    },
    content: {
        // flexDirection: "row",
        // marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10
    },
}
