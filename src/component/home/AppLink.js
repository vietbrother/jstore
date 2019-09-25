/**
 * This is the Product component
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {View, Col, Icon, Card, CardItem, Body, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../../Colors';
import Config from '../../Config';
import Text from '../Text';
import CategoryRootBlock from "../../page/Home";

export default class AppLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }
    }

    componentDidMount(): void {
        var categories = [];
        categories.push({name: 'Link 1', icon: 'ios-apps', color: '#ba2c57'});
        categories.push({name: 'Link 2', icon: 'ios-compass', color: '#148267'});
        categories.push({name: 'Link 3', icon: 'ios-partly-sunny', color: '#76bdc9'});
        categories.push({name: 'Link 4', icon: 'ios-pricetags', color: '#3f8879'});
        categories.push({name: 'Link 5', icon: 'ios-clipboard', color: '#0b5d85'});
        this.setState({categories: categories});
    }

    render() {

        return (
            this._renderMainContent()
        );
    }

    _renderMainContent() {
        let cat = [];
        for (var i = 0; i < this.state.categories.length; i++) {
            var item = this.state.categories[i];
            cat.push(
                <View style={{
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))}
                        // activeOpacity={0.9}
                    >
                        <Icon name={item.icon} style={{fontSize: 40, fontWeight: 'bold',  color: item.color}}/>
                        <Text style={style.title}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View
                style={style.scrollContainer}
            >
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                >
                    {cat}
                </ScrollView>
            </View>
        );
    }
}

const style = {
    button: {flex: 1, height: 250, paddingLeft: 4, paddingRight: 4},
    title: {
        textAlign: 'center', width: 150
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginRight: 5,
        borderColor: '#93b1c7',
        borderWidth: 0.5
    },
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
        flexDirection: "row",
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    scrollContainer: {
        // height: 150,
        marginTop: 5,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 20
    },
}
