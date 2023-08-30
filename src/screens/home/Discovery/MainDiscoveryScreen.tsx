import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { GridView, Header } from '../../../components';
import {
  DETAILS_VIEW_SCREEN,
  FAVORITE_SCREEN,
} from '../../../constants/constant';
import { useNavigation } from '@react-navigation/native';
import useMovies from '../../../hooks/movieHook';
import { ApiContext } from '../../../provider/ApiProvider';
import AppLoading from '../../../components/AppLoading';
import { FavoriteMoviesContext } from '../../../context/FavoriteMoviesContext';

export default function MainDiscoveryScreen() {
  const apiContextData = useContext(ApiContext);
  const config = apiContextData?.apiConfig?.images;
  const navigation = useNavigation();
  const { movies, nextPage } = useMovies(1, 'popular');
  const trendingMovies = useMovies(1, 'trending');

  const [isShowOption, setOption] = useState(false);

  // console.log(' ................ config ', config);
  // console.log(' image url  ', config?.secure_base_url);
  // console.log(' data ', movies?.results);

  if (config == undefined || movies == undefined) {
    return <AppLoading />;
  }
  const handleFavorite = () => {
    navigation.navigate(FAVORITE_SCREEN, {
      allMovies: movies,
    });

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Popular Movies"
        hasOptionButton
        onPressOption={() => {
          setOption(!isShowOption);
        }}
      />

      <View className="flex-1">
        <GridView
          data={movies?.results}
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
      <Header
        title="Trending Movies"
        hasOptionButton
        onPressOption={() => {
          setOption(!isShowOption);
        }}
      />
      <View className="flex-1">
        <GridView
          data={trendingMovies?.movies?.results}
          imageUrl={config?.secure_base_url}
          poster_size={
            config?.poster_sizes.includes('w185')
              ? 'w185'
              : config?.poster_sizes[0]
          }
          onEndReached={() => trendingMovies.nextPage()}
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
      {isShowOption ? (
        <Pressable
          onPress={() => {
            handleFavorite()
            setOption(false)
          }}
          style={styles.moreView}>
          <Text style={styles.favText}>Favorites</Text>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  moreView: {
    height: 30,
    width: 100,
    position: 'absolute',
    backgroundColor: "white",
    top: 100,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favText: {
    fontSize: 18,
    fontFamily: 'bold'
  }
});
