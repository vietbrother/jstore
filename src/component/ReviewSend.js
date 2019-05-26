import React, {Component} from 'react';
import {
    Container,
    Content,
    View,
    Grid,
    Row,
    Col,
    Left,
    Right,
    Button,
    Text,
    Icon,
    List,
    ListItem,
    Body,
    Radio,
    Input,
    Item,
    Card, CardItem,
    InputGroup,
    Textarea
} from 'native-base';

import StarRating from 'react-native-star-rating';
import {Alert, AsyncStorage} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from "react-native-router-flux";
import WooCommerceAPI_ from 'react-native-woocommerce-api';
import Config from "../Config";

export default class ReviewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            generalStarCount: 0,
            name: '',
            description: '',
            sessionKey: '',
            userInfo: '',
            isLoading: false,
            api: new WooCommerceAPI_({
                // url: 'http://103.94.18.249/jstore', // Your store URL
                //ssl: false,
                // consumerKey: 'ck_155068b58dd6614b3ace920437df62399bb94503', // Your consumer secret
                // consumerSecret: 'cs_9fb0b186ea0024bd6d9d497715e88e43b1bf2b6e', // Your consumer secret
                url: Config.url, // Your store URL
                ssl: Config.ssl,
                consumerKey: Config.consumerKey, // Your consumer secret
                consumerSecret: Config.consumerSecret, // Your consumer secret
                //consumerKey: 'ck_29b281d2af61df58dadbeead327b06dd9a53f1be', // Your consumer secret
                //consumerSecret: 'cs_a6d53b6572240d483749ee0123d48c76332c0e0d', // Your consumer secret
                wpAPI: true, // Enable the WP REST API integration
                version: 'wc/v3', // WooCommerce WP REST API version
                queryStringAuth: true
            })
        };

    }

    componentWillMount() {
        AsyncStorage.getItem("cookieUserFromApi", (err, res) => {
            console.log("get cookieUserFromApi ReviewItem ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("res : " + res);
            console.log("this.props.sessionLoginKey : " + this.props.sessionLoginKey);
            this.setState({sessionKey: res});
            console.log("state : " + this.state.sessionKey);
        });
        AsyncStorage.getItem('userInfo', (err, res) => {
            console.log("userInfo " + res);
            if (res) {
                var userInfo = JSON.parse(res);
                this.setState({userInfo: userInfo});
                //
            }
        });
    }

    onGeneralStarRatingPress(rating) {
        this.setState({
            generalStarCount: rating,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.isLoading}
                    //Text with the Spinner
                    //textContent={'Đang gửi bình luận ...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
                <Grid style={{width: '100%', padding: 10,}}>
                    <Row>
                        <Text style={styles.label}>Điểm đánh giá của bạn </Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.generalStarCount}
                            // reversed
                            starSize={20}
                            starStyle={{color: '#ffbf43'}}
                            selectedStar={rating => this.onGeneralStarRatingPress(rating)}
                        />
                    </Row>
                    {/*<Row>*/}
                        {/*<Input placeholder='Tên (*)' onChangeText={(text) => this.setState({name: text})}*/}
                               {/*placeholderTextColor="#99b5bb"/>*/}
                    {/*</Row>*/}
                    <Row>
                        <Textarea style={{width: '100%'}} rowSpan={5} bordered
                                  placeholder="Nhập nội dung nhận xét ở đây, tối thiểu 10 ký tự"
                                  onChangeText={(text) => this.setState({description: text})}
                                  placeholderTextColor="#99b5bb"/>
                    </Row>
                    <Row style={{textAlign: 'center', paddingTop: 5}}>
                        {this.state.sessionKey == null || this.state.sessionKey == '' ?
                            <Button onPress={() => this.sendReviewProduct()}
                                    disabled block iconLeft>
                                <Icon name='ios-send'/>
                                <Text style={{color: '#fdfdfd'}}> Gửi bình luận </Text>
                            </Button>
                            :
                            <Button onPress={() => this.sendReviewProduct()}
                                    style={{backgroundColor: '#c40521'}} block iconLeft>
                                <Icon name='ios-send'/>
                                <Text style={{color: '#fdfdfd'}}> Gửi bình luận </Text>
                            </Button>
                        }

                    </Row>
                </Grid>

            </View>
        );
    }

    sendReviewProduct() {
        var msgErr = '';
        // if (this.state.name == null || this.state.name == '') {
        //     msgErr = 'Chưa nhập tên người đánh giá';
        // }
        if (this.state.description == null || this.state.description == '') {
            msgErr = 'Chưa nhập nội dung đánh giá';
        }
        if (this.state.generalStarCount == null || this.state.generalStarCount == '') {
            msgErr = 'Chưa chọn điểm đánh giá';
        }

        if (msgErr != '') {
            this.setState({hasError: true, errorText: msgErr});
            // alert(msgErr);
            Alert.alert(
                'Thông tin chưa chính xác',
                msgErr,
                [
                    {text: 'Đóng', onPress: () => console.log('No Pressed'), style: 'cancel'},
                ]
            )
            return;
        }
        console.log('===================' + this.state.generalStarCount);
        this.setState({isLoading: true});
        this.state.api.post('products/reviews', {
            product_id: this.props.product.id,
            review: this.state.description,
            reviewer: this.state.userInfo.displayname,
            reviewer_email: this.state.userInfo.email,
            rating: this.state.generalStarCount,
        })
            .then(data => {
                console.log("API create review-----------------");
                console.log(data);
                global.WooCommerceAPI.get('products/' + this.props.product.id, {
                    //per_page: 20,
                    //page: 1,
                    // category: id
                })
                    .then(data => {
                        console.log("Product Fetch API-----------------");
                        console.log(data);
                        this.setState({generalStarCount : 0, description: ''});
                        this.setState({isLoading: false});
                        Actions.product({product: data});
                    }).catch(error => {
                    // error will return any errors that occur
                    console.log(error);
                });

            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }
}

const styles = {
    container: {
        width: '100%',
        backgroundColor: "white",
        // borderTopColor: '#b2b2b2',
        // borderTopWidth: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#b2b2b2',
    },
    require: {
        fontWeight: 'bold',
        color: 'red'
    },
    item: {
        paddingBottom: 5,
        paddingTop: 10,
        fontSize: 16
    },
    name: {
        fontSize: 17,
        margin: 10,
        color: "#2e97e5"
    },
    review: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        color: "gray"
    },
    date_created: {
        margin: 10,
        fontSize: 15,
        color: "#b2b2b2"
    },
    rating: {
        margin: 10,
    },
    separator: {
        height: 0.5,
        backgroundColor: "#CED7DD"
    },
    boxWithShadow: {
        marginVertical: 0,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#ccc",
        flexWrap: "nowrap",
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontWeight: 'bold'
    },
};
