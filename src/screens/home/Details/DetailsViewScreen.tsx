import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Button, Header, TextComponent} from '../../../components';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';
import { RouteProp } from '@react-navigation/native';
interface ListRenderItemInfo<ItemT> {
  item: ItemT;
}

type ItemType = {
  title: string;
};

type RootStackParamList = {
    Details: {  item: PosterItemModel, imageUrl: string, poster_size: string };
  };
  
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
  
interface DetailsScreenProps {
    route: DetailsScreenRouteProp
}

export default function DetailsViewScreen(props: DetailsScreenProps) {
  /** Renderers **/
  const { item, imageUrl, poster_size } = props.route.params
  /**
   * @return {JSX.Element}
   */
  const renderFlatListItem = (
    info: ListRenderItemInfo<ItemType>,
  ): JSX.Element => {
    return (
      <View style={[styles.flexRow, styles.flatListItemContainer]}>
        <EvilIcons name={'play'} size={30} />
        <TextComponent color="rgb(117,117,117)" size={16} marginx={10}>
          {`Play ${info.item.title}`}
        </TextComponent>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Movie Details" backable hasOptionButton />
      <Header
        title={item?.title}
        styles={{backgroundColor: 'rgb(114,107,100)'}}
      />
      <View style={styles.paddedView}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: imageUrl + poster_size + '/' + item?.poster_path,
            }}
            style={styles.poster}
          />
          <View
            style={{
              height: 180,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <View>
              <TextComponent size={16} color="black">
              {moment(item?.release_date, 'DD-MM-YYYY').format('YYYY')}
              </TextComponent>
              <TextComponent size={14} color="black" marginy={10}>
              {item?.vote_count} votes
              </TextComponent>
            </View>
            <View>
              <TextComponent size={14} color="black" bold marginy={15}>
                {item?.vote_average}/10
              </TextComponent>

              <Button title={'Add to Favorite'} onPress={() => {}} />
            </View>
          </View>
        </View>
        <TextComponent size={14} color="black" marginy={30}>{item?.overview}</TextComponent>

        <TextComponent size={16} color="rgb(117,117,117)" marginy={10} bold>
          TRAILERS
        </TextComponent>
        <View style={styles.divider} />

        <FlatList
          data={[{title: 'Trailer 1'}, {title: 'Trailer 2'}]}
          renderItem={renderFlatListItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  paddedView: {
    padding: 20,
  },
  poster: {
    height: 180,
    width: 150,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  flatListItemContainer: {
    padding: 20,
    backgroundColor: 'rgb(250,250,250)',
    marginTop: 10,
    alignItems: 'center',
  },
});
