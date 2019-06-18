/**
 * This is the Home page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Container,
    Content,
    View,
    Button,
    Left,
    Right,
    Icon,
    Card,
    CardItem,
    cardBody,
    Row,
    Grid,
    Col
} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';
import CategoryRootBlock from '../component/CategoryRootBlock';
import Colors from "../Colors";
import Config from "../Config";
import Product from '../component/Product';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            isLoading: true,
            error: null,
            sessionKey: null
        };
    }

    componentWillMount() {
        this.getSessionKey();
    }


    async getSessionKey() {
        try {
            const value = await AsyncStorage.getItem('cookieUserFromApi');
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(value);
            this.setState({sessionKey: value});
            console.log("state : " + this.state.sessionKey);
            this._fetchCategorieData();
            this._fetchProductsData();
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

    _fetchCategorieData() {
        //Have a try and catch block for catching errors.
        try {
            //this.getSessionKey();
            this.setState({isLoading: true});
            global.WooCommerceAPI.get('products/categories', {
                per_page: 100, status: 'processing', page: 1
            })
                .then(data => {
                    // data will contain the body content from the request
                    console.log("get category");
                    this.setState({categories: data, loading: false});
                })
                .catch(error => {
                    // error will return any errors that occur
                    console.log(error);
                    this.setState({
                        error: error.toString(),
                        isLoading: false
                    });
                });
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _fetchProductsData() {
        this.setState({loading: true});
        global.WooCommerceAPI.get('products', {
            featured: true
        })
            .then(data => {
                console.log("=============================Home Fetch API-----------------");
                // console.log(data);
                this.setState({products: data, loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button onPress={() => this._sideMenuDrawer.open()} transparent>
                    <Icon name='ios-menu-outline'/>
                </Button>
            </Left>
        );
        var right = (
            <Right style={{flex: 1}}>
                <Button onPress={() => Actions.search()} transparent>
                    <Icon name='ios-search-outline'/>
                </Button>
                <Button onPress={() => Actions.cart()} transparent>
                    <Icon name='ios-cart'/>
                </Button>
            </Right>
        );
        const {categories, loading} = this.state;
        if (this.state.loading == false) {
            return (
                <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref} key={new Date().valueOf()}
                                fetchData={'1'}
                                sessionLoginKey={this.props.sessionLoginKey}>
                    <Container>
                        <Navbar left={left} right={right} title="ONNI"/>
                        <Content>
                            <View style={styles.titleView}>
                                <Text style={styles.title}> DANH MỤC SẢN PHẨM </Text>
                            </View>
                            {this._renderCategoriesRoot(this.state.categories)}

                            <View style={styles.titleView}>
                                <Text style={styles.title}> SẢN PHẨM NỔI BẬT </Text>
                            </View>
                            {this.renderFeatureProducts()}
                        </Content>
                    </Container>
                </SideMenuDrawer>);
        } else {
            return <ActivityIndicator/>
        }

    }

    renderCategories(categories) {
        let cat = [];
        console.log("render category");
        var urlNotFound = Config.url + '/wp-content/uploads/woocommerce-placeholder.png';
        for (var i = 0; i < categories.length; i++) {
            console.log(categories[i].id + "----parent " + categories[i].parent);
            // if (categories[i].parent != '0' &&  categories[i].parent == '15') {
            if (categories[i].parent == '0') {
                if (categories[i].image == null) {
                    categories[i].image = {src: urlNotFound};
                }
                cat.push(
                    <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image.src}
                                   title={categories[i].name}/>
                );
            }

        }
        return cat;
    }

    _renderCategoriesRoot(categories) {
        let cat = [];
        console.log("render category");

        var urlNotFound = Config.url + Config.imageDefaul;
        for (var i = 0; i < categories.length; i++) {
            // console.log(categories[i].id + "----parent " + categories[i].parent);
            // if (categories[i].parent != '0' &&  categories[i].parent == '15') {
            if (categories[i].parent == '0') {
                if (categories[i].image == null) {
                    categories[i].image = {src: urlNotFound};
                }
                cat.push(
                    <CategoryRootBlock key={categories[i].id} id={categories[i].id} image={categories[i].image.src}
                                       title={categories[i].name}/>
                );
            }

        }
        return (
            <View
                style={styles.scrollContainer}
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

    renderFeatureProducts() {
        let items = [];
        if (this.state.products != null && this.state.products.length > 0) {
            let stateItems = this.state.products;
            for (var i = 0; i < stateItems.length; i++) {
                if (stateItems[i].categories != null && stateItems[i].categories.length > 0) {
                    items.push(
                        <Grid key={i}>
                            <Product key={stateItems[i].id} product={stateItems[i]}
                                     categoryId={stateItems[i].categories[0].id}
                                     categoryName={stateItems[i].categories[0].name}/>
                        </Grid>
                    );
                }
            }
        }
        return items;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    scrollContainer: {
        // height: 150,
        marginTop: 5,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 20
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginRight: 5,
        borderColor: '#dfe3ee',
        borderWidth: 0.5
    },

    line: {
        width: '47%',
        height: 3,
        backgroundColor: '#7f8c8d',
        position: 'absolute',
        bottom: '0%',
        marginLeft: 5
    },
    titleView: {
        flex: 1, width: '97%',
        backgroundColor: Config.mainColor,
        borderRadius: 5,
        borderWidth: 0.5,
        margin: 5,
    },
    title: {
        fontSize: 16, fontFamily: 'Roboto',
        fontWeight: '200',
        color: 'white',
        margin: 10,
    }
});

