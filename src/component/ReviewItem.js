import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';


export default class ReviewItem extends Component {

    render() {
        console.log('..........................................................');
        // console.log(this.props.review);
        return (
            <View style={styles.container}>
                {/*<View style={[false && {alignItems: 'flex-end'}]}></View>*/}
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.name}>{this.props.review.comment_author}</Text>
                    <Text style={styles.date_created}>{this.dateFormat(this.props.review.comment_date)}</Text>
                    {/*<Rating rating={review.rating} style={styles.rating}/>*/}
                </View>
                <View style={[false && {alignItems: 'flex-end'}]}><Text
                    style={styles.review}>{this.props.review.comment_content}</Text></View>
                {/*<View style={styles.separator}/>*/}
            </View>
        );
    }

    dateFormat(dateStr) {
        var arr = dateStr.split(/-|\s|:/);// split string and create array.
        var date = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]); // decrease month value by 1
        // return  ' ' + arr[2] + '/' + arr[1] + '/' + arr[0] + ' ' + arr[3] + '' + arr[4] + '/' + arr[5];
        return (new Date(date).toLocaleDateString()) + ' ' + (new Date(date).toLocaleTimeString());
    }
}

const styles = {
    container: {
        width: '100%',
        backgroundColor: "white"
    },
    name: {
        // fontSize: 17,
        margin: 5,
        color: "#2e97e5"
    },
    review: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 16,
        color: "gray"
    },
    date_created: {
        margin: 5,
        // fontSize: 15,
        color: "#b2b2b2"
    },
    rating: {
        margin: 10,
    },
    separator: {
        height: 0.5,
        backgroundColor: "#CED7DD"
    }
};
