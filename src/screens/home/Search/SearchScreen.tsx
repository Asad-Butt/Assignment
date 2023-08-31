import { View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import useMovies from '../../../hooks/movieHook';
import SearchGrid from '../../../components/SearchGrid';
import { useNavigation } from '@react-navigation/native';
import { ApiContext } from '../../../provider/ApiProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { DETAILS_VIEW_SCREEN } from '../../../constants/constant';


const screenWidth = Dimensions.get('window').width;
const numColumns = 3;


export default function SearchScreen() {

    const { movies, nextPage } = useMovies(1, 'popular');
    const apiContextData = useContext(ApiContext);
    const config = apiContextData?.apiConfig?.images;
    const navigation = useNavigation();
    const [searchVal, setSearchVal] = useState('');
    const [searchedMovies, setSearchedMovies] = useState({});

    const searchMovie = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4250dba2bae9acff805b4ed96affc30e&query=${searchVal}`);
        console.log('Search res is : - ', res.data);
        setSearchedMovies(res.data);
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <View className="flex-1 w-full p-4">
                <Text className="text-start font-medium text-xl">Search Movies</Text>
                <View className="mb-4 flex flex-row items-center border border-gray-400 p-3 rounded-xl mt-2">
                    <TextInput className="ml-2 flex-1" placeholder='Search ...' value={searchVal} onChangeText={setSearchVal} />
                    <TouchableOpacity className="ml-auto" onPress={searchMovie}>
                        <Icon name="search" color="gray" size={20} />
                    </TouchableOpacity>
                </View>
                <SearchGrid
                    data={searchedMovies?.results}
                    imageUrl={config?.secure_base_url}
                    poster_size={
                        config?.poster_sizes.includes('w185')
                            ? 'w185'
                            : config?.poster_sizes[0]
                    }

                    onEndReached={() => nextPage()}
                    onPress={item =>
                        navigation.navigate(DETAILS_VIEW_SCREEN, {
                            item: item,
                            imageUrl: config?.secure_base_url,
                            poster_size: config?.poster_sizes.includes('w780')
                                ? 'w780'
                                : 'original',
                        })
                    }
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {

    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        backgroundColor: 'orange',
        marginTop: 20
    },
});