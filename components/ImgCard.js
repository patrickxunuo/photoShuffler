import React from 'react';
// import {CachedImage} from 'react-native-cached-image'
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

const ImgCard = (props) => {
    //take the props (item)
    const item = props.item
    const orderDisplay = props.orderDisplay

    return (
        <View style={styles.imgCard}>
            <Image style={styles.img} source={{uri: item.thumbnailUrl, cache: 'force-cache'}} alt=''/>
            <Text style={styles.titleText}>{item.title}
                {orderDisplay === true && <> {item.id} </>}
            </Text>
        </View>
    )
}

//styles for ImgCard component
const styles = StyleSheet.create({
    imgCard: {
        // height: '50vh',
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#b8c1ec',
        borderWidth: 2,
        dropShadow: true,
        shadowColor: '#232946',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        evaluation: 10,
        backgroundColor: '#fff',
        marginHorizontal: 60,
    },
    titleText: {
        position: 'absolute',
        textAlign: 'center',
        color: '#232946',
        transform: [{rotate: '45deg'}],
        width: '100%',
    },
    orderText: {
        position: 'absolute',
        textAlign: 'center',
        color: '#232946',
        width: '100%',
        JustifySelf: 'flex-end',
    },
    img: {
        width: 250,
        height: 250,
        borderRadius: 10,
        borderColor: '#b8c1ec',
        borderWidth: 2,
    }
})

export default ImgCard
