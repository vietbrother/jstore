/**
 * This is the Search file
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import {
    Container,
    Content,
    View,
    Header,
    Icon,
    Button,
    Left,
    Right,
    Body,
    Title,
    List,
    ListItem,
    Thumbnail,
    Grid,
    Col
} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Product from '../component/Product';
import Navbar from '../component/Navbar';

export default class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }


    componentWillMount() {
        AsyncStorage.getItem('userId', (err, res) => {
            if (res) {
                //if user is existed
                let userId = res;
                AsyncStorage.getItem("WISHLIST", (err, res) => {
                    if (!res) this.setState({items: []});
                    else {
                        var itemArr = JSON.parse(res);
                        var temp = itemArr.filter(function (cartItem) {
                            return cartItem.userId == userId;
                        });
                        this.setState({items: temp});
                    }
                });
            }
        });
    }

    render() {
        var left = (
            <Left style={{flex: 1}}>
                <Button transparent onPress={() => Actions.pop()}>
                    <Icon name="ios-close" size={38} style={{fontSize: 38}}/>
                </Button>
            </Left>
        );
        return (
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar left={left} title="Danh sách yêu thích"/>
                {this.state.items.length <= 0 ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="heart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}}/>
                        <Text style={{color: '#95a5a6'}}>Bạn chưa chọn danh sách yêu thích</Text>
                    </View>
                    :
                    <Content padder>
                        {this.renderItems()}
                    </Content>
                }
            </Container>
        );
    }

    renderItems() {
        let items = [];
        this.state.items.map((item, i) => {
            items.push(
                <ListItem
                    key={i}
                    last={this.state.items.length === i + 1}
                    onPress={() => this.itemClicked(item)}
                >
                    <Thumbnail square style={{width: 110, height: 90}} source={{uri: item.images[0].src}}/>
                    <Body style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 18}}>
                        {item.name}
                    </Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>{item.price}</Text>
                    {/*<Text style={{fontSize: 14 ,fontStyle: 'italic'}}>{item.category}</Text>*/}
                    </Body>
                    <Right>
                        <Button style={{marginLeft: -25}} transparent onPress={() => this.removeItemPressed(item)}>
                            <Icon size={30} style={{fontSize: 30, color: '#95a5a6'}} name='ios-remove-circle-outline'/>
                        </Button>
                    </Right>
                </ListItem>
            );
        });
        return items;
    }

    itemClicked(item) {
        Actions.product({product: item});
    }

    removeItemPressed(item) {
        Alert.alert(
            'Xóa ' + item.name,
            'Bạn có muốn xóa sản phẩm này khỏi danh sách yêu thích ?',
            [
                {text: 'Không', onPress: () => console.log('No Pressed'), style: 'cancel'},
                {text: 'Có', onPress: () => this.removeItem(item)},
            ]
        )
    }

    removeItem(itemToRemove) {
        let items = [];
        this.state.items.map((item) => {
            if (JSON.stringify(item) !== JSON.stringify(itemToRemove))
                items.push(item);
        });
        this.setState({items: items});
        AsyncStorage.setItem("WISHLIST", JSON.stringify(items));
    }


}
