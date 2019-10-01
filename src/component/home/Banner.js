/**
 * This is the Product component
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {View, Col, Card, CardItem, Body, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../../Colors';
import Text from '../Text';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {IS_IOS, itemHorizontalMargin, itemWidth, sliderWidth, bannerHeight} from "../../Config";
import Config from "../../Config";

export default class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
    }

    componentDidMount(): void {
        // this.setState({images: this.props.lstBanner});
    }

    componentWillMount(): void {
        this._fetchCategorieData();
    }

    _fetchCategorieData() {
        //Have a try and catch block for catching errors.
        try {
            //this.getSessionKey();
            this.setState({loading: true});
            global.WooCommerceAPI.get('products/categories', {
                per_page: 100, status: 'processing', search: 'banner'
            })
                .then(data => {
                    // data will contain the body content from the request
                    console.log("get banner");
                    this.setState({categories: data, loading: false});

                    if (data != null && data.length > 0) {
                        var temp = [];
                        var urlNotFound = Config.url + Config.imageDefaul;
                        for (var i = 0; i < categories.length; i++) {
                            if (categories[i].parent != '0' && categories[i].name.indexOf('banner') > 0) {
                                if (categories[i].image == null) {
                                    categories[i].image = {src: urlNotFound};
                                }
                                temp.push(categories[i].image);
                            }

                        }
                    }
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
            this.setState({loading: false});
        }
    }

    render() {
        return (
            this._renderImageSlider()
        );
    }


    _renderImageSlider() {
        return (
            <View style={{backgroundColor: 'white', paddingVertical: 5}}>
                <Carousel
                    data={this._getSliderItems()}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    containerCustomStyle={style.slider}
                    contentContainerCustomStyle={style.sliderContentContainer}
                    // layout={type}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={1500}
                />
                <ActivityIndicator
                    animating={this.state.loading}
                    color='#bc2b78'
                    size="large"/>
            </View>
        );
    }

    _getSliderItems() {
        let images = [];
        this.state.images.map((img, i) => {
            var entity = {};
            entity['title'] = img.name;
            entity['subtitle'] = img.name;
            entity['illustration'] = img.src;
            images.push(entity);
        });
        return images;
    }
}

const style = {
    button: {flex: 1, height: 250, paddingLeft: 4, paddingRight: 4},
    image: {height: 220, width: null, flex: 1, borderRadius: 10,},
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
        backgroundColor: '#fdfdfd'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#7f8c8d',
        position: 'absolute',
        top: '52%'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible', // for custom animations
        height: bannerHeight,
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
}
