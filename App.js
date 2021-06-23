import {StatusBar} from 'expo-status-bar'
import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ImgCard from './components/ImgCard'


export default function App() {
    //Image Array
    const [imgArray, setImgArray] = useState([])

    //FlatList refresher
    const [refresh, setRefresh] = useState(false)

    //Order display toggle for convenience
    const [orderDisplay, setOrderDisplay] = useState(false)

    //fetch data
    useEffect(() => {
            fetch('https://jsonplaceholder.typicode.com/photos?_limit=2000')
                .then(res => res.json())
                .then(data => {
                    setImgArray(data)
                })
                .catch(err =>
                    console.error(err))
        }
        , [])

    //Array shuffling
    const reorderList = (photoArray = imgArray, currentIndex = 0) => {
        if (currentIndex >= photoArray.length) {
            // console.log(imgArray)
            return photoArray
        } else {
            let randomIndex = Math.floor(Math.random() * currentIndex)
            let temp = photoArray[currentIndex]
            photoArray[currentIndex] = photoArray[randomIndex]
            photoArray[randomIndex] = temp
            let newIndex = currentIndex += 1;
            return reorderList(photoArray, newIndex)
        }
    }

    //Call the array shuffle function and toggle the state for FlatList rerendering
    const callReorderList = () => {
        reorderList()
        setRefresh(!refresh)
    }

    return (
        <View style={styles.container}>

            {/*render simple loader when loading is in progress*/}
            {imgArray.length === 0 &&
            <Text style={styles.textLoading}>Loading photos...</Text>
            }

            {/*render image scroll when loading is done*/}
            {imgArray.length !== 0 &&
            <FlatList contentContainerStyle={styles.scrollWrap} data={imgArray}
                      extraData={[refresh, orderDisplay]}
                      renderItem={({item}) => (
                          <ImgCard item={item} orderDisplay={orderDisplay}/>
                      )}
                      keyExtractor={(item) => item.id}
                      horizontal={true}
            >
            </FlatList>
            }

            {/*shuffle button*/}
            {imgArray.length !== 0 &&
            <View style={styles.btnWrap}>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    callReorderList()
                }}>
                    <Text>
                        Shuffle
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>setOrderDisplay(!orderDisplay)}>
                    <Text>Show order</Text>
                </TouchableOpacity>
            </View>
            }

        </View>
    );
}

//style sheet for main component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLoading: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    scrollWrap: {
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
    },
    btnWrap:{
        position: 'fixed',
        bottom: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btn: {
        width: 100,
        backgroundColor: '#eebbc3',
        padding: 10,
        borderRadius: 5,
        color: '#232946',
        alignItems: 'center',
        marginHorizontal: 20,
    },
});
