/**
 * This is the Home page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, ActivityIndicator, AsyncStorage} from 'react-native';
import {Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
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
            global.WooCommerceAPI.get('products/categories', {})
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
                            {this.renderCategories(this.state.categories)}
                        </Content>
                    </Container>
                </SideMenuDrawer>);
        } else {
            return <ActivityIndicator/>
        }

    }

    renderCategories(categories) {
        let cat = [];
        console.log("render category")
        for (var i = 0; i < categories.length; i++) {
            //console.log(categories[i]);
            if (categories[i].parent != '0' &&  categories[i].parent == '15') {
                cat.push(
                    <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image.src}
                                   title={categories[i].name}/>
                );
            }

        }
        return cat;
    }

}

// var categories = [
//   // {
//   //   id: 1,
//   //   title: 'MEN',
//   //   image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_489/v1500284127/pexels-photo-497848_yenhuf.jpg'
//   // },
//   // {
//   //   id: 2,
//   //   title: 'WOMEN',
//   //   image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_460/v1500284237/pexels-photo-324030_wakzz4.jpg'
//   // },
//   {
//     id: 3,
//     title: 'Rau củ quả',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhXMSlJykAZMO8Um0ymIvY-tWMDHLqwrhyb5pSnl7FDWOvkHrQ'
//   },
//   {
//     id: 4,
//     title: 'Hải sản',
//     image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg'
//   }
// ];
