import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GridView, Header } from '../../../components';
import { DETAILS_VIEW_SCREEN } from '../../../constants/constant';
import { useNavigation } from '@react-navigation/native';
import useMovies from '../../../hooks/movieHook';
import { ApiContext } from '../../../provider/ApiProvider';
import AppLoading from '../../../components/AppLoading';

export default function MainDiscoveryScreen() {
    const apiContextData = useContext(ApiContext);
    const config = apiContextData?.apiConfig?.images;
    const navigation = useNavigation()
    const {movies, nextPage} = useMovies(1)

    if (config == undefined || movies == undefined) {
        return <AppLoading />;
    }
  return (
    <SafeAreaView style={{flex:1}}>
     <Header title='Pop Movies' hasOptionButton
     />
      <GridView
      data={movies?.results}
      imageUrl={config?.secure_base_url}
      poster_size={config?.poster_sizes.includes("w185") ? "w185" : config?.poster_sizes[0]}
      onEndReached={() => nextPage()}
      onPress={(item)=> 
        navigation.navigate(DETAILS_VIEW_SCREEN, { 
          item: item,
          imageUrl: config?.secure_base_url,
          poster_size: config?.poster_sizes.includes("w780") ? "w780" : "original"
        })
    }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})