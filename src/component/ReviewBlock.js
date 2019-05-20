/**
 * This is the category component used in the home page
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Image, Dimensions, TouchableOpacity} from 'react-native';
import {Body, ListItem, Right, View} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Text from './Text';
import ReviewItem from "./ReviewItem";

export default class ReviewBlock extends Component {
    render() {
        return (
            <View style={{flex: 1, paddingTop: 5}}>
                {this.rendetListComment()}
            </View>
        );
    }

    rendetListComment() {
        let items = [];
        console.log("===========================");
        items.push(<Text style={{fontSize: 18, marginLeft: 10, fontWeight: 'bold'}}>Đánh giá của người dùng</Text>);
        if (this.props.product.one_call != null) {
            this.props.product.one_call.comments_list.map((comment, i) => {
                var key = new Date().valueOf();
                items.push(
                    <ListItem
                        key={key + '-' + i}
                        style={{marginLeft: 0}}
                    >
                        <ReviewItem review={comment}></ReviewItem>
                    </ListItem>
                );
            });
        }
        if (items.length <= 1) {
            items.push(<Text>Chưa có bình luận cho sản phẩm này</Text>);
        }

        return items;
    }

}

const styles = {
    text: {
        width: Dimensions.get('window').width,
        height: 200,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        color: '#fdfdfd',
        fontSize: 32
    },
    subtitle: {
        textAlign: 'center',
        color: '#fdfdfd',
        fontSize: 16,
        fontWeight: '100',
        fontStyle: 'italic'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(30, 42, 54, 0.4)'
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
    image: {
        height: 200,
        width: null,
        flex: 1
    }
};
