/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Container, Content, View, Left, Right, Button, Icon, Grid, Col} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Product from '../component/Product';


export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount() {
        var products = [
            {
                id: 1,
                title: 'Sashimi',
                categoryId: 5,
                categoryTitle: 'Rau củ quả',
                price: '22$',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhXMSlJykAZMO8Um0ymIvY-tWMDHLqwrhyb5pSnl7FDWOvkHrQ',
                description: "Hello there, i'm a cool product with a heart of gold."
            },
            {
                id: 2,
                title: 'Cá hồi',
                categoryId: 2,
                categoryTitle: 'Hải sản',
                price: '12$',
                image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg',
                description: "Hello there, i'm a cool product with a heart of gold."
            },
            // {id: 10, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
            // {id: 15, title: 'Long Sleeves T-Shirt', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_100,y_50/v1500465308/pexels-photo-500034_uvxwcq.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
            {
                id: 11,
                title: 'Rong biển',
                categoryId: 5,
                categoryTitle: 'Rau củ quả',
                price: '22$',
                image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe-300x188.jpg',
                description: "Hello there, i'm a cool product with a heart of gold."
            },
            {
                id: 22,
                title: 'Cá thu',
                categoryId: 2,
                categoryTitle: 'Hải sản',
                price: '12$',
                image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe-300x188.jpg',
                description: "Hello there, i'm a cool product with a heart of gold."
            },
            // {id: 100, title: 'Black Pearl Earrings', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_center,h_250/v1500465307/pexels-photo-262226_kbjbl3.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
            // {id: 215, title: 'Grey Blazer', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
            // {id: 12, title: 'Mirror Sunglasses', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250/v1500465307/pexels-photo-488541_s0si3h.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
            // {id: 29, title: 'White Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
            // {id: 16, title: 'Tie', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
        ];
        global.WooCommerceAPI.get('products', {})
            .then(data => {
                // data will contain the body content from the request
                console.log("get data");
                console.log(data);
            })
            .catch(error => {
                // error will return any errors that occur
                console.log(error);
            });
        global.WooCommerceAPI.get('products/categories', {})
            .then(data => {
                // data will contain the body content from the request
                console.log("get category");
                console.log(data);
            })
            .catch(error => {
                // error will return any errors that occur
                console.log(error);
            });
        this.setState({items: products});
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

        return (
            <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
                <Container style={{backgroundColor: '#fdfdfd'}}>
                    <Navbar left={left} right={right} title={this.props.title}/>
                    <Content padder>
                        {this.renderProducts()}
                    </Content>
                </Container>
            </SideMenuDrawer>
        );
    }

    renderProducts() {
        let items = [];
        let stateItems = this.state.items
        for (var i = 0; i < stateItems.length; i += 2) {
            if (stateItems[i + 1]) {
                items.push(
                    <Grid key={i}>
                        <Product key={stateItems[i].id} product={stateItems[i]}/>
                        <Product key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight/>
                    </Grid>
                );
            } else {
                items.push(
                    <Grid key={i}>
                        <Product key={stateItems[i].id} product={stateItems[i]}/>
                        <Col key={i + 1}/>
                    </Grid>
                );
            }
        }
        return items;
    }
}
