import React, { useContext, } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { GridView, Header } from '../../../components';
import { FavoriteMoviesProvider, useFavoriteMovies } from '../../../context/FavoriteMoviesContext';
import { ApiContext } from '../../../provider/ApiProvider';
import AppLoading from '../../../components/AppLoading';
import { DETAILS_VIEW_SCREEN } from '../../../constants/constant';
type RootStackParamList = {
  Details: { allMovies: PosterItemModel, };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp
}

export default function FavoritesScreen(props: DetailsScreenProps) {
  const apiContextData = useContext(ApiContext);
  const config = apiContextData?.apiConfig?.images;
  const { favoriteMovies } = useFavoriteMovies();
  const navigation = useNavigation();

  if (config == undefined) {
    return <AppLoading />;
  }

  return (
    <FavoriteMoviesProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title='Favorites' backable />
        <GridView
          data={favoriteMovies}
          imageUrl={config?.secure_base_url}
          poster_size={
            config?.poster_sizes.includes('w185')
              ? 'w185'
              : config?.poster_sizes[0]
          }
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
      </SafeAreaView>
    </FavoriteMoviesProvider>
  );
}

const styles = StyleSheet.create({});
