/**
 * This is the SideMenu component used in the navbar
 **/

// React native and others libraries imports
import React, {Component} from 'react';
import {ScrollView, LayoutAnimation, UIManager, Linking, Image, AsyncStorage} from 'react-native';
import {
    View,
    List,
    ListItem,
    Body,
    Left,
    Right,
    Icon,
    Item,
    Input,
    Button,
    Grid,
    Col,
    Toast,
    Container
} from 'native-base';
import {Actions} from 'react-native-router-flux';

// Our custom files and classes import
import SideMenuSecondLevel from './SideMenuSecondLevel';
import Text from './Text';
import Colors from "../Colors";

import Spinner from 'react-native-loading-spinner-overlay';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchError: false,
            subMenu: false,
            subMenuItems: [],
            clickedItem: '',
            sessionKey: null,
            isReload: true,
            isLoading: false,
            menuItems: []
        };

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // componentDidMount() {
    //     AsyncStorage.getItem("cookieUserFromApi", (err, res) => {
    //         console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //         console.log("res : " + res);
    //         this.setState({sessionKey: res});
    //         console.log("state : " + this.state.sessionKey);
    //     });
    // }

    componentWillMount() {
        AsyncStorage.getItem("cookieUserFromApi", (err, res) => {
            console.log("get cookieUserFromApi in menu ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("res : " + res);
            this.setState({sessionKey: res});
            console.log("state : " + this.state.sessionKey);
            this._fetchCategorieData();
        });
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
                    // console.log(data);
                    var items = [];
                    data.map((item, i) => {
                        if (item.parent != '0') {
                            items.push(item);
                        }
                    });
                    // console.log(items);
                    this.setState({menuItems: items, isLoading: false});
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

    fetchProductByCategoryId(categoryId, categoryName){
        global.WooCommerceAPI.get('products', {
            //per_page: 20,
            //page: 1,
            category: categoryId
        })
            .then(data => {
                this.setState({items: data, loading: false});
                Actions.category({id: categoryId, title: categoryName, data: data});
            }).catch(error => {
            // error will return any errors that occur
            console.log(error);
        });
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.isLoading}
                    //Text with the Spinner
                    textContent={'Đang lấy dữ liệu...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
                {this.renderMenu()}
            </ScrollView>
        );
    }

    renderContentMenu() {
        console.log("render renderContentMenu");
        AsyncStorage.getItem("cookieUserFromApi", (err, res) => {
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("res : " + res);
            if (res != null) {
                return this.renderSecondaryList();
            } else {
                return this.renderSecondaryListNologin();
            }
        });
    }

    renderMenu() {
        console.log("render SideMenu");
        console.log("this.props.sessionLoginKey " + this.props.sessionLoginKey);
        if (!this.state.subMenu) {
            return (
                <View>
                    {/*<View style={{paddingLeft: 15, paddingRight: 15}}>*/}
                    {/*<Item error={this.state.searchError}>*/}
                    {/*<Input*/}
                    {/*placeholder='Tìm kiếm...'*/}
                    {/*onChangeText={(text) => this.setState({search: text, searchError: false})}*/}
                    {/*onSubmitEditing={() => this.search()}*/}
                    {/*/>*/}
                    {/*<Icon active name='ios-search-outline' onPress={() => this.search()} />*/}
                    {/*</Item>*/}
                    {/*</View>*/}
                    <View style={{marginTop: 15, marginBottom: 15, width: '100%', alignItems: 'center'}}>
                        <Image style={{height: 100, width: 100}} source={require('../images/logo_jstore.png')}/>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%',
                            color: Colors.navbarBackgroundColor
                        }}>ONNI </Text>
                        {/*<Text style={{fontSize: 12, textAlign: 'left', width: '100%', color: '#687373'}}>Thực phẩm sạch Nhật Bản </Text>*/}
                    </View>
                    <View style={{paddingRight: 15}}>
                        <List>
                            <ListItem
                                icon
                                key={0}
                                button={true}
                                onPress={()=> this._gotoHomepage(0)}

                            >
                                <Body>
                                <Text>Trang chủ</Text>
                                </Body>
                                {/*<Right>*/}
                                {/*<Icon name="ios-arrow-forward"/>*/}
                                {/*</Right>*/}
                            </ListItem>
                            {this.renderMenuItems()}
                        </List>
                    </View>
                    {/*<View style={styles.line}/>*/}
                    <View style={{paddingRight: 15}}>
                        <List>
                            {/*{this.state.sessionKey == null ? this.renderSecondaryListNologin() : this.renderSecondaryList()}*/}
                            {this.props.sessionLoginKey != null || this.state.sessionKey != null ? this.renderSecondaryList() : this.renderSecondaryListNologin()}
                            {/*{this.renderSecondaryList()}*/}
                            {/*{this.renderContentMenu()}*/}
                        </List>
                    </View>
                    <View style={styles.line}/>
                    <View style={{paddingRight: 15, paddingLeft: 15}}>
                        <Text style={{marginBottom: 7}}>Follow us</Text>
                        <Grid>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-facebook'
                                                                      onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-instagram'
                                                                      onPress={() => Linking.openURL('http://www.instagram.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-twitter'
                                                                      onPress={() => Linking.openURL('http://www.twitter.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-youtube'
                                                                      onPress={() => Linking.openURL('http://www.youtube.com/').catch(err => console.error('An error occurred', err))}/></Col>
                            <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-snapchat'
                                                                      onPress={() => Linking.openURL('http://www.snapchat.com/').catch(err => console.error('An error occurred', err))}/></Col>
                        </Grid>
                    </View>
                </View>
            );
        } else {
            return (
                <SideMenuSecondLevel back={this.back.bind(this)} title={this.state.clickedItem}
                                     menu={this.state.subMenuItems}/>
            );
        }
    }

    _gotoHomepage(id) {
        Actions.home({id: id});
    }

    unflatten(arr) {
        var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;

        // First map the nodes of the array to an object -> create a hash table.
        for (var i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['subMenu'] = [];
        }


        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid) {
                    mappedArr[mappedElem['parent']]['subMenu'].push(mappedElem);
                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;
    }

    renderMenuItems() {
        if (this.state.menuItems != null && this.state.menuItems.length > 0) {
            // console.log("___________________________________________this.state.menuItems");
            let items = [];
            try {
                var treeList = this.unflatten(this.state.menuItems);

                // console.log(treeList);

                treeList.map((item, i) => {
                    var key = new Date().valueOf();
                    items.push(
                        <ListItem
                            last={menuItems.length === i + 1}
                            icon
                            key={key + "-" + item.id}
                            button={true}
                            onPress={() => this.itemClicked(item)}
                        >
                            <Body>
                            <Text>{item.name}</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward"/>
                            </Right>
                        </ListItem>
                    );
                });
            } catch (e) {
                console.log(e);
            }
            return items;
        }

    }

    itemClicked(item) {
        if (!item.subMenu || item.subMenu.length <= 0) {
            Actions.category({id: item.id, title: item.name, reload: '1'});
            // this.fetchProductByCategoryId(item.id, item.name);
            return;
        }
        var animationConfig = {
            duration: 150,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        };
        LayoutAnimation.configureNext(animationConfig);
        this.setState({subMenu: true, subMenuItems: item.subMenu, clickedItem: item.title});
    }

    back() {
        var animationConfig = {
            duration: 150,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        };
        LayoutAnimation.configureNext(animationConfig);
        this.setState({subMenu: false, subMenuItems: [], clickedItem: ''})
    }

    search(text) {
        if (this.state.search.length <= 2)
            this.setState({searchError: true, search: ""});
        else
            Actions.search({searchText: this.state.search});
    }

    renderSecondaryList() {
        let secondaryItems = [];

        menusSecondaryItems.map((item, i) => {
            secondaryItems.push(
                <ListItem
                    last
                    icon
                    key={item.id}
                    button={true}
                    onPress={Actions[item.key]}
                >
                    <Left>
                        <Icon style={{fontSize: 18}} name={item.icon}/>
                    </Left>
                    <Body style={{marginLeft: -15}}>
                    <Text style={{fontSize: 16}}>{item.title}</Text>
                    </Body>
                </ListItem>
            );
        });
        return secondaryItems;
    }

    renderSecondaryListNologin() {
        let secondaryItems = [];
        secondaryItems.push(
            <ListItem
                last
                icon
                button={true}
                onPress={Actions['login']}
            >
                <Left>
                    <Icon style={{fontSize: 18}} name={'ios-log-in'}/>
                </Left>
                <Body style={{marginLeft: -15}}>
                <Text style={{fontSize: 16}}>Đăng nhập</Text>
                </Body>
            </ListItem>
        );
        return secondaryItems;
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(189, 195, 199, 0.6)',
        marginTop: 10,
        marginBottom: 10
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontWeight: 'bold'
    },
};

var menuItems = [

    {
        id: 3,
        title: 'Rau củ quả'
    },
    {
        id: 4,
        title: 'Hải sản'
    }
];


const menusSecondaryItems = [
    {
        id: 20,
        title: 'Quản lý đơn hàng',
        icon: 'ios-basket',
        key: 'orders'
    },
    {
        id: 19,
        title: 'Danh sách yêu thích',
        icon: 'heart',
        key: 'wishlist'
    },
    // {
    //   id: 20,
    //   title: 'Địa chỉ cửa hàng',
    //   icon: 'ios-pin',
    //   key: 'map'
    // },
    {
        id: 21,
        title: 'Liên hệ',
        icon: 'md-phone-portrait',
        key: 'contact'
    },
    {
        id: 24,
        title: 'Đăng xuất',
        icon: 'ios-log-out',
        key: 'login'
    },

];
