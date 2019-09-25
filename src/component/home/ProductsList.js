/**
 * This is the Product component
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {View, Col, Icon, Card, CardItem, Body, Button, Grid} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../../Colors';
import Config from '../../Config';
import Text from '../Text';
import Product from './ProductsItem';

export default class ProductsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: false
        }
    }

    componentDidMount(): void {
    }

    componentWillMount(): void {
        this._fetchProductsData();
    }

    _fetchProductsData() {
        this.setState({loading: true});
        global.WooCommerceAPI.get('products', {

        })
            .then(data => {
                console.log("=============================ProductsList Fetch API-----------------");
                // console.log(data);
                this.setState({products: data, loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

    render() {
        return (
            <Card>
                <CardItem header active>
                    <Text>Sản Phẩm </Text>
                </CardItem>
                <ActivityIndicator
                    animating = {this.state.loading}
                    color = '#bc2b78'
                    size = "large" />
                {this._renderCategories()}

            </Card>
        );
    }

    renderFeatureProducts() {
        let items = [];
        if (this.state.products != null && this.state.products.length > 0) {
            let stateItems = this.state.products;
            for (var i = 0; i < stateItems.length; i++) {
                if (stateItems[i].categories != null && stateItems[i].categories.length > 0) {
                    items.push(
                        <View style={style.item}>
                            <Product key={stateItems[i].id} product={stateItems[i]}
                                     categoryId={stateItems[i].categories[0].id}
                                     categoryName={stateItems[i].categories[0].name}/>
                        </View>
                    );
                }
            }
        }
        return (
            <View style={style.container}>
                {items}
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
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    },
}
