/**
 * This is the Main file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    AsyncStorage,
    WebView,
    Alert,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
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
    Row,
    Toast,
    Text as NBText
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HTML from 'react-native-render-html';

// Our custom files and classes import
import Colors from '../Colors';
import Config from '../Config';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import {default as ProductComponent} from '../component/Product';

import Star from 'react-native-star-view';
import ReviewSend from '../component/ReviewSend'
import ReviewBlock from '../component/ReviewBlock'
import SliderEntry from '../component/SliderEntry'
import {sliderWidth, itemWidth, IS_IOS, slideHeight, itemHorizontalMargin} from '../Config'

import ProductRelated from '../component/Product';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            productRelated: {},
            activeSlide: 0,
            quantity: 1,
            selectedColor: '',
            selectedSize: '',
            userId: '',
            isWhislist: Colors.navbarBackgroundColor,
            relatedProduct: [],
            loading: false
        };
    }

    componentWillMount() {
        //get the product with id of this.props.product.id from your server
        this.setState({product: this.props.product});
        AsyncStorage.getItem('userId', (err, res) => {
            console.log("Product userId " + res);
            if (res) {
                this.setState({userId: res});
                //
                AsyncStorage.getItem("WISHLIST", (err, res) => {
                    if (res) {
                        var items = JSON.parse(res);
                        var product = this.state.product;
                        var objIndex = items.findIndex((obj => obj.id == product.id && obj.name == product.name
                            && obj.userId == this.state.userId));
                        if (objIndex != -1) {
                            this.setState({isWhislist: 'green'});
                        }
                    }
                });
            }
        });

    }

    componentDidMount() {
        this.fetchDataRelatedProducts();
    }

    componentWillReceiveProps(nextProps) {
        console.log("====componentWillReceiveProps========================== newProps.product: " + nextProps.product);
        this.setState({product: nextProps.product})
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
                {/*<Button onPress={() => Actions.search()} transparent>*/}
                {/*<Icon name='ios-search-outline'/>*/}
                {/*</Button>*/}
                <Button onPress={() => Actions.cart()} transparent>
                    <Icon name='ios-cart'/>
                </Button>
            </Right>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} right={right} title={this.props.product.name}/>
                <Content>

                    {/*{this.renderImages()}*/}
                    {/*<Carousel*/}
                    {/*ref={c => this._slider1Ref = c}*/}
                    {/*data={this.renderImages()}*/}
                    {/*//renderItem={this._renderItemWithParallax}*/}
                    {/*sliderWidth={Dimensions.get('window').width}*/}
                    {/*itemWidth={Dimensions.get('window').width}*/}
                    {/*hasParallaxImages={true}*/}
                    {/*firstItem={1}*/}
                    {/*inactiveSlideScale={0.94}*/}
                    {/*inactiveSlideOpacity={0.7}*/}
                    {/*// inactiveSlideShift={20}*/}
                    {/*//containerCustomStyle={styles.slider}*/}
                    {/*//contentContainerCustomStyle={styles.sliderContentContainer}*/}
                    {/*loop={true}*/}
                    {/*loopClonesPerSide={2}*/}
                    {/*autoplay={true}*/}
                    {/*autoplayDelay={500}*/}
                    {/*autoplayInterval={3000}*/}
                    {/*onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}*/}
                    {/*>*/}
                    {/*{this.renderImages()}*/}
                    {/*</Carousel>*/}

                    {/*<Pagination*/}
                    {/*dotsLength={this.state.product.images.length}*/}
                    {/*activeDotIndex={this.state.activeSlide}*/}
                    {/*containerStyle={{*/}
                    {/*backgroundColor: 'transparent',*/}
                    {/*paddingTop: 0,*/}
                    {/*paddingBottom: 0,*/}
                    {/*marginTop: -15*/}
                    {/*}}*/}
                    {/*dotStyle={{*/}
                    {/*width: 10,*/}
                    {/*height: 10,*/}
                    {/*borderRadius: 5,*/}
                    {/*marginHorizontal: 2,*/}
                    {/*backgroundColor: 'rgba(255, 255, 255, 0.92)'*/}
                    {/*}}*/}
                    {/*inactiveDotOpacity={0.4}*/}
                    {/*inactiveDotScale={0.6}*/}
                    {/*/>*/}
                    {this._renderImageSlider()}
                    {/*{this.mainExample()}*/}
                    <View style={{
                        backgroundColor: '#fdfdfd',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        // alignItems: 'center'
                    }}>
                        <Grid style={{textAlign: 'left'}}>
                            <Row>
                                <Text style={{
                                    fontSize: 18, fontFamily: 'Roboto',
                                    color: Colors.navbarBackgroundColor
                                }}>{this.state.product.name}</Text>
                            </Row>
                            <Row>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                    color: Colors.navbarBackgroundColor
                                }}>{this.state.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {Config.vnd}</Text>
                            </Row>
                            {/*<Row>*/}
                            {/*{this.renderStar()}*/}
                            {/*</Row>*/}
                        </Grid>

                        <Grid>
                            <Col size={2}>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text>Số lượng:</Text>
                                </View>
                            </Col>
                            <Col size={2}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Button style={{flex: 1}} icon transparent
                                            style={{backgroundColor: '#fdfdfd'}}
                                            onPress={() => this.setState({quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1})}>
                                        <Icon style={{color: Colors.navbarBackgroundColor}}
                                              name='ios-remove-circle-outline'/>
                                    </Button>
                                    <View style={{
                                        flex: 4,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: 15,
                                        paddingRight: 15
                                    }}>
                                        <Text style={{fontSize: 18}}>{this.state.quantity}</Text>
                                    </View>
                                    <Button style={{flex: 1}} icon transparent
                                            style={{backgroundColor: '#fdfdfd'}}
                                            onPress={() => this.setState({quantity: this.state.quantity + 1})}>
                                        <Icon style={{color: Colors.navbarBackgroundColor}}
                                              name='ios-add-circle-outline'/>
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                        <Grid style={{marginTop: 15}}>
                            <Col size={3}>
                                <Button block onPress={this.addToCart.bind(this)}
                                        style={{backgroundColor: '#c40521'}}>
                                    <Text style={{color: "#fdfdfd", marginLeft: 5}}> Thêm vào giỏ </Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button block onPress={this.addToWishlist.bind(this)} icon transparent
                                        style={{backgroundColor: '#fdfdfd'}}>
                                    <Icon style={{color: this.state.isWhislist}} name='ios-heart'/>
                                </Button>
                            </Col>
                        </Grid>
                        <View style={styles.borderView}>
                            <Text style={{
                                marginBottom: 5, marginLeft: 10, fontWeight: 'bold', fontFamily: 'Roboto',
                                color: Colors.navbarBackgroundColor
                            }}>Mô tả</Text>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: 'rgba(44, 62, 80, 0.5)',
                                marginLeft: 7,
                                marginBottom: 10
                            }}/>
                            <HTML
                                html={this.state.product.description == null || this.state.product.description == '' ? '<p>Chưa có mô tả sản phẩm</p>' : this.state.product.description}
                                classesStyles={{
                                    fontFamily: 'Roboto',
                                    color: Colors.navbarBackgroundColor
                                }}
                                imagesMaxWidth={Dimensions.get('window').width}/>
                            {/*<NBText note>*/}
                            {/*{this.state.product.description}*/}

                            {/*</NBText>*/}
                        </View>
                        <View style={styles.borderView}>
                            <Text style={{
                                marginBottom: 5, marginLeft: 10, fontWeight: 'bold', fontFamily: 'Roboto',
                                color: Colors.navbarBackgroundColor
                            }}>SẢN PHẨM LIÊN QUAN</Text>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: 'rgba(44, 62, 80, 0.5)',
                                marginLeft: 7,
                                marginBottom: 10
                            }}/>
                            {this.renderRelatedProducts()}
                        </View>
                        {/*<View style={styles.borderView}>*/}
                        {/*<ReviewBlock product={this.props.product}></ReviewBlock>*/}
                        {/*</View>*/}
                        {/*<View style={styles.borderView}>*/}
                        {/*<ReviewSend product={this.props.product} userId={this.state.userId}*/}
                        {/*categoryId={this.props.categoryId} categoryName={this.props.title}></ReviewSend>*/}
                        {/*</View>*/}
                    </View>
                    {/*<View style={{marginTop: 15, paddingLeft: 12, paddingRight: 12}}>*/}
                    {/*<Text style={{marginBottom: 5}}>Sản phẩm khác </Text>*/}
                    {/*<View style={{*/}
                    {/*width: 50,*/}
                    {/*height: 1,*/}
                    {/*backgroundColor: 'rgba(44, 62, 80, 0.5)',*/}
                    {/*marginLeft: 7,*/}
                    {/*marginBottom: 10*/}
                    {/*}}/>*/}
                    {/*{this.renderSimilairs()}*/}
                    {/*</View>*/}
                </Content>
            </Container>
        );
    }

    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    // mainExample() {
    //     var data = this._getSliderItems();
    //     var slider1ActiveSlide = 1;
    //
    //     return (
    //         <View>
    //             <Carousel
    //                 ref={c => this._slider1Ref = c}
    //                 data={data}
    //                 renderItem={this._renderItemWithParallax}
    //                 sliderWidth={sliderWidth}
    //                 itemWidth={itemWidth}
    //                 hasParallaxImages={true}
    //                 firstItem={1}
    //                 inactiveSlideScale={0.94}
    //                 inactiveSlideOpacity={0.7}
    //                 // inactiveSlideShift={20}
    //                 containerCustomStyle={styles.slider}
    //                 contentContainerCustomStyle={styles.sliderContentContainer}
    //                 loop={true}
    //                 loopClonesPerSide={2}
    //                 autoplay={true}
    //                 autoplayDelay={500}
    //                 autoplayInterval={3000}
    //                 onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
    //             />
    //             {/*<Pagination*/}
    //                 {/*dotsLength={data.length}*/}
    //                 {/*activeDotIndex={slider1ActiveSlide}*/}
    //                 {/*containerStyle={styles.paginationContainer}*/}
    //                 {/*dotColor={'#00a0e5'}*/}
    //                 {/*dotStyle={styles.paginationDot}*/}
    //                 {/*inactiveDotColor={'#00a0e5'}*/}
    //                 {/*inactiveDotOpacity={0.4}*/}
    //                 {/*inactiveDotScale={0.6}*/}
    //                 {/*carouselRef={this._slider1Ref}*/}
    //                 {/*tappableDots={!!this._slider1Ref}*/}
    //             {/*/>*/}
    //         </View>
    //     );
    // }

    _renderImageSlider() {
        return (
            <View style={{backgroundColor: 'white', paddingVertical: 5}}>
                <Carousel
                    data={this._getSliderItems()}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    // layout={type}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={1500}
                />
            </View>
        );
    }

    _getSliderItems() {
        let images = [];
        this.state.product.images.map((img, i) => {
            var entity = {};
            entity['title'] = img.name;
            entity['subtitle'] = img.name;
            entity['illustration'] = img.src;
            images.push(entity);
        });
        return images;
    }

    _renderItem({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0}/>;
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
                        source={{uri: img.src}}
                        style={{width: Dimensions.get('window').width, height: 350}}
                        resizeMode="cover"
                    />
                </TouchableWithoutFeedback>
            );
        });
        return images;
    }

    renderStar() {
        return (
            <View>
                <Grid>
                    <Row>
                        <Star score={this.props.product.average_rating} style={styles.starStyle}/>
                        {/*<Text style={styles.starCountStyle}> ( {this.props.product.rating_count} đánh giá )</Text>*/}
                        <Text style={styles.starCountStyle}> ( {parseInt(this.props.product.average_rating)}/5 )</Text>
                    </Row>
                </Grid>
            </View>);
    }

    // renderColors() {
    //     let colors = [];
    //     this.state.product.colors.map((color, i) => {
    //         colors.push(
    //             <Item key={i} label={color} value={color}/>
    //         );
    //     });
    //     return colors;
    // }
    //
    // renderSize() {
    //     let size = [];
    //     this.state.product.sizes.map((s, i) => {
    //         size.push(
    //             <Item key={i} label={s} value={s}/>
    //         );
    //     });
    //     return size;
    // }
    //
    // renderSimilairs() {
    //     let items = [];
    //     let stateItems = this.state.product.similarItems;
    //     for (var i = 0; i < stateItems.length; i += 2) {
    //         if (stateItems[i + 1]) {
    //             items.push(
    //                 <Grid key={i}>
    //                     <ProductComponent key={stateItems[i].id} product={stateItems[i]}/>
    //                     <ProductComponent key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight/>
    //                 </Grid>
    //             );
    //         } else {
    //             items.push(
    //                 <Grid key={i}>
    //                     <ProductComponent key={stateItems[i].id} product={stateItems[i]}/>
    //                     <Col key={i + 1}/>
    //                 </Grid>
    //             );
    //         }
    //     }
    //     return items;
    // }

    openGallery(pos) {
        Actions.imageGallery({images: this.state.product.images, position: pos});
    }

    addToCart() {
        if (this.state.userId == null || this.state.userId == '') {
            //alert('Bạn cần đăng nhập trước khi thêm đồ vào giỏ hàng!');
            Alert.alert(
                '',
                'Bạn cần đăng nhập trước khi thêm đồ vào giỏ hàng!', // <- this part is optional, you can pass an empty string
                [
                    {text: 'Đóng', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
            return;
        }
        var product = this.state.product;
        // product['color'] = this.state.selectedColor;
        // product['size'] = this.state.selectedSize;
        product['quantity'] = this.state.quantity;
        product['userId'] = this.state.userId;
        AsyncStorage.getItem("CART", (err, res) => {
            if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
            else {
                var items = JSON.parse(res);

                //Find index of specific object using findIndex method.
                //check product name is existed in cart -> increase quatity
                var objIndex = items.findIndex((obj => obj.id == product.id && obj.name == product.name && obj.userId == this.state.userId));
                if (objIndex != -1) {
                    //Log object to Console.
                    console.log("Before update: ", items[objIndex])

                    //Update object's name property.
                    items[objIndex].quantity = items[objIndex].quantity + product.quantity;

                    //Log object to console again.
                    console.log("After update: ", items[objIndex]);
                } else {
                    items.push(product);
                }

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
        if (this.state.userId == null || this.state.userId == '') {
            Alert.alert(
                '',
                'Bạn cần đăng nhập trước khi thêm danh sách yêu thích!', // <- this part is optional, you can pass an empty string
                [
                    {text: 'Đóng', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
            return;
        }
        var product = this.state.product;
        product['userId'] = this.state.userId;
        var success = true;
        AsyncStorage.getItem("WISHLIST", (err, res) => {
            if (!res) AsyncStorage.setItem("WISHLIST", JSON.stringify([product]));
            else {
                var items = JSON.parse(res);
                //search product in whislist
                var objIndex = items.findIndex((obj => obj.id == product.id && obj.name == product.name && obj.userId == this.state.userId));
                if (objIndex != -1) {
                    //if (this.search(items, product)) {
                    success = false
                } else {
                    items.push(product);
                    AsyncStorage.setItem("WISHLIST", JSON.stringify(items));
                }
            }
            if (success) {
                this.setState({isWhislist: 'green'});
                Toast.show({
                    text: 'Đã thêm sản phảm vào danh sách yêu thích!',
                    position: 'bottom',
                    type: 'success',
                    buttonText: 'Ẩn',
                    duration: 3000
                });
            } else {
                Toast.show({
                    text: 'Sản phảm đã có trong danh sách yêu thích!',
                    position: 'bottom',
                    type: 'danger',
                    buttonText: 'Ẩn',
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

    renderRatingReview() {

    }


    fetchDataRelatedProducts() {
        this.setState({relatedProduct: [], loading: true});
        global.WooCommerceAPI.get('products', {
            per_page: 6,
            page: 1,
            category: this.props.categoryId
        })
            .then(data => {
                console.log("================Related Fetch API-----------------");
                console.log(data.size);
                this.setState({relatedProduct: data, loading: false});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }

    renderRelatedProducts() {
        let items = [];

        if (this.state.loading == false) {
            if (this.state.relatedProduct != null && this.state.relatedProduct.length > 0) {
                let stateItems = this.state.relatedProduct;
                var key = new Date().valueOf();
                for (var i = 0; i < stateItems.length; i++) {
                    if (stateItems[i].categories != null && stateItems[i].categories.length > 0 && stateItems[i].id != this.state.product.id) {
                        items.push(
                            <Grid key={i}>
                                <ProductRelated key={key + '-' + stateItems[i].id} product={stateItems[i]}
                                         categoryId={stateItems[i].categories[0].id}
                                         categoryName={stateItems[i].categories[0].name}/>
                            </Grid>
                        );
                    }
                }
            }
            return items;
        } else {
            return <ActivityIndicator/>
        }
    }
}
const styles = {
    invoice: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15
    },
    starStyle: {
        width: 80,
        height: 18,
        // marginBottom: 10,
    },
    starCountStyle: {
        color: '#00a0e5',
        fontSize: 14
    },
    borderView: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 3,
        width: '100%',
        borderColor: 'rgba(149, 165, 166, 0.3)'
    },


    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: 'black'
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: 'black'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible', // for custom animations
        height: 250,
        paddingHorizontal: itemHorizontalMargin,
    },
    sliderContentContainer: {
        // paddingVertical: 10, // for custom animation

        resizeMode: 'cover',
        borderRadius: IS_IOS ? 0 : 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
};

// const dummyProduct = {
//     id: 2,
//     title: 'Cá hồi',
//     description: "Thịt cá hồi vừa ngon, vừa không sợ béo. các loại axit béo omega-3 chứa trong cá hồi mang lại nhiều lợi ích cho sức khỏe như: chống các dấu hiệu lão hóa, giảm mức cholesterol và huyết áp, kéo giảm nguy cơ bị đột quỵ, giúp giảm đau và cứng khớp gây ra bởi viêm khớp",
//     image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg',
//     images: [
//         'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg',
//         // 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
//         // 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
//         // 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
//     ],
//     price: '120$',
//     colors: ['Red', 'Blue', 'Black'],
//     sizes: ['S', 'M', 'L', 'XL', 'XXL'],
//     category: 'Hải sản',
//     similarItems: [
//         {
//             id: 10,
//             title: 'Cá thu',
//             price: '29$',
//             image: 'http://103.94.18.249/jstore/wp-content/uploads/2019/04/recipe2-300x188.jpg'
//         },
//         // {
//         //     id: 11,
//         //     title: 'V NECK T-SHIRT',
//         //     price: '29$',
//         //     image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
//         // },
//         // {
//         //     id: 12,
//         //     title: 'V NECK T-SHIRT',
//         //     price: '29$',
//         //     image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
//         // }
//     ]
// };
