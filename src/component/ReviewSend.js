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
import {Alert} from "react-native";

export default class ReviewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            generalStarCount: 0,
            name: '',
            description: ''
        };
    }

    onGeneralStarRatingPress(rating) {
        this.setState({
            generalStarCount: rating,
        });
    }

    render() {
        let {review} = this.props.product;
        return (
            <View style={styles.container}>
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
                    <Row>
                        <Input placeholder='Tên (*)' onChangeText={(text) => this.setState({name: text})}
                               placeholderTextColor="#99b5bb"/>
                    </Row>
                    <Row>
                        <Textarea style={{width: '100%'}} rowSpan={5} bordered
                                  placeholder="Nhập nội dung nhận xét ở đây, tối thiểu 10 ký tự"
                                  onChangeText={(text) => this.setState({description: text})}
                                  placeholderTextColor="#99b5bb"/>
                    </Row>
                    <Row style={{textAlign:'center', paddingTop: 5}}>
                        <Button onPress={() => this.sendReviewProduct()}
                                style={{backgroundColor: '#c40521'}} block iconLeft>
                            <Icon name='ios-send'/>
                            <Text style={{color: '#fdfdfd'}}> Gửi bình luận </Text>
                        </Button>
                    </Row>
                </Grid>

            </View>
        );
    }

    sendReviewProduct() {
        var msgErr = '';
        if (this.state.name == null || this.state.name == '') {
            msgErr = 'Chưa nhập tên người đánh giá';
        }
        if (this.state.description == null || this.state.description == '') {
            msgErr = 'Chưa nhập nội dung đánh giá';
        }
        if (this.state.generalStarCount == null || this.state.address == '') {
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
    }
}

const styles = {
    container: {
        width: '100%',
        backgroundColor: "white",
        borderTopColor: '#b2b2b2',
        borderTopWidth: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
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
};
