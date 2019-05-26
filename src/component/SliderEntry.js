import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import Config from '../Config'
import { sliderWidth, itemWidth, IS_IOS, slideHeight, itemHorizontalMargin }  from '../Config'
import {Actions} from "react-native-router-flux";
export default class SliderEntry extends Component {

    // static propTypes = {
    //     data: PropTypes.object.isRequired,
    //     even: PropTypes.bool,
    //     parallax: PropTypes.bool,
    //     parallaxProps: PropTypes.object
    // };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
                source={{ uri: illustration }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
                source={{ uri: illustration }}
                style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => this.openGallery(0, this.props.data.illustration)}
            >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>

            </TouchableOpacity>
        );
    }

    openGallery(pos, images) {
        let imgs = [];
        imgs.push({src : images});
        console.log(imgs);
        Actions.imageGallery({images: imgs, position: pos});
    }
}

const styles = {
    slideInnerContainer: {
        width: itemWidth,
        height: 250,
        paddingHorizontal: itemHorizontalMargin,
        // paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        // bottom: 18,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: 0
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    imageContainerEven: {
        backgroundColor: 'black'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? 0 : 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: 'black'
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 10 - 0,
        paddingBottom: 5,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    textContainerEven: {
        backgroundColor: 'black'
    },
    title: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },

    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
};