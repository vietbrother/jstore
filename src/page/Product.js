/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, Dimensions, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import {
    View,
    Container,
    Content,
    Button,
    Left,
    Right,
    Icon,
    Picker,
    Item,
    Grid,
    Col,
    Toast,
    Text as NBText
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Carousel, {Pagination} from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import {default as ProductComponent} from '../component/Product';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            activeSlide: 0,
            quantity: 1,
            selectedColor: '',
            selectedSize: ''
        };
    }

    componentWillMount() {
        //get the product with id of this.props.product.id from your server
        this.setState({product: dummyProduct});
    }

    componentDidMount() {
        /* Select the default color and size (first ones) */
        let defColor = this.state.product.colors[0];
        let defSize = this.state.product.sizes[0];
        this.setState({
            selectedColor: defColor,
            selectedSize: defSize
        });
    }

    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button onPress={() => Actions.pop()} transparent>
                    <Icon name='ios-arrow-back'/>
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
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} right={right} title={this.props.product.title}/>
                <Content>
                    {/*<Carousel*/}
                        {/*ref={(carousel) => {*/}
                            {/*this._carousel = carousel;*/}
                        {/*}}*/}
                        {/*sliderWidth={Dimensions.get('window').width}*/}
                        {/*itemWidth={Dimensions.get('window').width}*/}
                        {/*onSnapToItem={(index) => this.setState({activeSlide: index})}*/}
                        {/*enableSnap={true}*/}
                    {/*>*/}
                        {/*{this.renderImages()}*/}
                    {/*</Carousel>*/}
                    {this.renderImages()}
                    <Carousel
                        ref={c => this._slider1Ref = c}
                        data={this.renderImages()}
                        //renderItem={this._renderItemWithParallax}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width}
                        hasParallaxImages={true}
                        firstItem={1}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        // inactiveSlideShift={20}
                        //containerCustomStyle={styles.slider}
                        //contentContainerCustomStyle={styles.sliderContentContainer}
                        loop={true}
                        loopClonesPerSide={2}
                        autoplay={true}
                        autoplayDelay={500}
                        autoplayInterval={3000}
                        onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                    >
                        {this.renderImages()}
                    </Carousel>
                    {/*<Pagination*/}
                        {/*dotsLength={ENTRIES1.length}*/}
                        {/*activeDotIndex={slider1ActiveSlide}*/}
                        {/*containerStyle={styles.paginationContainer}*/}
                        {/*dotColor={'rgba(255, 255, 255, 0.92)'}*/}
                        {/*dotStyle={styles.paginationDot}*/}
                        {/*inactiveDotColor={colors.black}*/}
                        {/*inactiveDotOpacity={0.4}*/}
                        {/*inactiveDotScale={0.6}*/}
                        {/*carouselRef={this._slider1Ref}*/}
                        {/*tappableDots={!!this._slider1Ref}*/}
                    {/*/>*/}
                    <Pagination
                        dotsLength={this.state.product.images.length}
                        activeDotIndex={this.state.activeSlide}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            paddingTop: 0,
                            paddingBottom: 0,
                            marginTop: -15
                        }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.92)'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                    <View style={{
                        backgroundColor: '#fdfdfd',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 12,
                        paddingRight: 12,
                        alignItems: 'center'
                    }}>
                        <Grid>
                            <Col size={3}>
                                <Text style={{fontSize: 18}}>{this.state.product.title}</Text>
                            </Col>
                            <Col>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.product.price}</Text>
                            </Col>
                        </Grid>
                        <Grid style={{marginTop: 15}}>
                            <Col>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text>Màu:</Text>
                                </View>
                            </Col>
                            <Col size={3}>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select a color"
                                    note={true}
                                    selectedValue={this.state.selectedColor}
                                    onValueChange={(color) => this.setState({selectedColor: color})}
                                >
                                    {this.renderColors()}
                                </Picker>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text>Cỡ:</Text>
                                </View>
                            </Col>
                            <Col size={3}>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Chọn kích cỡ"
                                    note={true}
                                    selectedValue={this.state.selectedSize}
                                    onValueChange={(size) => this.setState({selectedSize: size})}
                                >
                                    {this.renderSize()}
                                </Picker>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text>Số lượng:</Text>
                                </View>
                            </Col>
                            <Col size={3}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Button style={{flex: 1}} icon light
                                            onPress={() => this.setState({quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1})}>
                                        <Icon name='ios-remove-outline'/>
                                    </Button>
                                    <View style={{
                                        flex: 4,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: 30,
                                        paddingRight: 30
                                    }}>
                                        <Text style={{fontSize: 18}}>{this.state.quantity}</Text>
                                    </View>
                                    <Button style={{flex: 1}} icon light
                                            onPress={() => this.setState({quantity: this.state.quantity + 1})}>
                                        <Icon name='ios-add'/>
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                        <Grid style={{marginTop: 15}}>
                            <Col size={3}>
                                <Button block onPress={this.addToCart.bind(this)}
                                        style={{backgroundColor: Colors.navbarBackgroundColor}}>
                                    <Text style={{color: "#fdfdfd", marginLeft: 5}}> Thêm vào giỏ </Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button block onPress={this.addToWishlist.bind(this)} icon transparent
                                        style={{backgroundColor: '#fdfdfd'}}>
                                    <Icon style={{color: Colors.navbarBackgroundColor}} name='ios-heart'/>
                                </Button>
                            </Col>
                        </Grid>
                        <View style={{
                            marginTop: 15,
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 3,
                            borderColor: 'rgba(149, 165, 166, 0.3)'
                        }}>
                            <Text style={{marginBottom: 5}}>Mô tả</Text>
                            <View style={{
                                width: 50,
                                height: 1,
                                backgroundColor: 'rgba(44, 62, 80, 0.5)',
                                marginLeft: 7,
                                marginBottom: 10
                            }}/>
                            <NBText note>
                                {this.state.product.description}
                            </NBText>
                        </View>
                    </View>
                    <View style={{marginTop: 15, paddingLeft: 12, paddingRight: 12}}>
                        <Text style={{marginBottom: 5}}>Sản phẩm khác </Text>
                        <View style={{
                            width: 50,
                            height: 1,
                            backgroundColor: 'rgba(44, 62, 80, 0.5)',
                            marginLeft: 7,
                            marginBottom: 10
                        }}/>
                        {this.renderSimilairs()}
                    </View>
                </Content>
            </Container>
        );
    }

    renderImages() {
        let images = [];
        this.state.product.images.map((img, i) => {
            images.push(
                <TouchableWithoutFeedback
                    key={i}
                    onPress={() => this.openGallery(i)}
                >
                    <Image
                        source={{uri: img}}
                        style={{width: Dimensions.get('window').width, height: 350}}
                        resizeMode="cover"
                    />
                </TouchableWithoutFeedback>
            );
        });
        return images;
    }

    renderColors() {
        let colors = [];
        this.state.product.colors.map((color, i) => {
            colors.push(
                <Item key={i} label={color} value={color}/>
            );
        });
        return colors;
    }

    renderSize() {
        let size = [];
        this.state.product.sizes.map((s, i) => {
            size.push(
                <Item key={i} label={s} value={s}/>
            );
        });
        return size;
    }

    renderSimilairs() {
        let items = [];
        let stateItems = this.state.product.similarItems;
        for (var i = 0; i < stateItems.length; i += 2) {
            if (stateItems[i + 1]) {
                items.push(
                    <Grid key={i}>
                        <ProductComponent key={stateItems[i].id} product={stateItems[i]}/>
                        <ProductComponent key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight/>
                    </Grid>
                );
            } else {
                items.push(
                    <Grid key={i}>
                        <ProductComponent key={stateItems[i].id} product={stateItems[i]}/>
                        <Col key={i + 1}/>
                    </Grid>
                );
            }
        }
        return items;
    }

    openGallery(pos) {
        Actions.imageGallery({images: this.state.product.images, position: pos});
    }

    addToCart() {
        var product = this.state.product;
        product['color'] = this.state.selectedColor;
        product['size'] = this.state.selectedSize;
        product['quantity'] = this.state.quantity;
        AsyncStorage.getItem("CART", (err, res) => {
            if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
            else {
                var items = JSON.parse(res);
                items.push(product);
                AsyncStorage.setItem("CART", JSON.stringify(items));
            }
            Toast.show({
                text: 'Đã thêm đồ vào giỏ hàng !',
                position: 'bottom',
                type: 'success',
                buttonText: 'Ẩn',
                duration: 3000
            });
        });
    }

    addToWishlist() {
        var product = this.state.product;
        var success = true;
        AsyncStorage.getItem("WISHLIST", (err, res) => {
            if (!res) AsyncStorage.setItem("WISHLIST", JSON.stringify([product]));
            else {
                var items = JSON.parse(res);
                if (this.search(items, product)) {
                    success = false
                } else {
                    items.push(product);
                    AsyncStorage.setItem("WISHLIST", JSON.stringify(items));
                }
            }
            if (success) {
                Toast.show({
                    text: 'Product added to your wishlist !',
                    position: 'bottom',
                    type: 'success',
                    buttonText: 'Dismiss',
                    duration: 3000
                });
            } else {
                Toast.show({
                    text: 'This product already exist in your wishlist !',
                    position: 'bottom',
                    type: 'danger',
                    buttonText: 'Dismiss',
                    duration: 3000
                });
            }
        });
    }

    search(array, object) {
        for (var i = 0; i < array.length; i++)
            if (JSON.stringify(array[i]) === JSON.stringify(object))
                return true;
        return false;
    }

}

const dummyProduct = {
    id: 2,
    title: 'Cá hồi',
    description: "Thịt cá hồi vừa ngon, vừa không sợ béo. các loại axit béo omega-3 chứa trong cá hồi mang lại nhiều lợi ích cho sức khỏe như: chống các dấu hiệu lão hóa, giảm mức cholesterol và huyết áp, kéo giảm nguy cơ bị đột quỵ, giúp giảm đau và cứng khớp gây ra bởi viêm khớp",
    image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg',
    images: [
        'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg',
        // 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
        // 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
        // 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
    ],
    price: '120$',
    colors: ['Red', 'Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Hải sản',
    similarItems: [
        {
            id: 10,
            title: 'Cá thu',
            price: '29$',
            image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg'
        },
        // {
        //     id: 11,
        //     title: 'V NECK T-SHIRT',
        //     price: '29$',
        //     image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
        // },
        // {
        //     id: 12,
        //     title: 'V NECK T-SHIRT',
        //     price: '29$',
        //     image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
        // }
    ]
};
