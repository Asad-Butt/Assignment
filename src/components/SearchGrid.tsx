import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextComponent from './Text';
import moment from 'moment';
interface ListRenderItemInfo<ItemT> {
    item: ItemT;
}

interface GridViewProps {
    data: Array<PosterItemModel>;
    imageUrl: String;
    poster_size: String
    onPress: (item: PosterItemModel) => void;
    onEndReached: () => void;
}

export default function SearchGrid(props: GridViewProps) {

    /** Renderers **/

    /**
     * @return {JSX.Element}
     */
    const renderFlatListItem = (
        info: ListRenderItemInfo<PosterItemModel>
    ): JSX.Element => {
        return (
            <Pressable className=" mr-4 flex-1 mb-4" onPress={() => props.onPress(info?.item)}>
                <Image className="rounded-xl h-[250px] w-full object-contain mb-2" source={{ uri: props?.imageUrl + props?.poster_size + '/' + info?.item?.poster_path }} />
                <View className="p-2">
                    <TextComponent style={styles.title} color='black'>{info?.item?.title}</TextComponent>
                    <TextComponent style={styles.release_date} color='black'>{moment(info?.item?.release_date, 'DD-MM-YYYY').format('DD MMM YYYY')}</TextComponent>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={props.data}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                onEndReached={props?.onEndReached}
                onEndReachedThreshold={0.2}
                renderItem={renderFlatListItem}
                ListEmptyComponent={<View className='flex-1 justify-center items-center'><Text>Nothing to show</Text></View>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    poster: {
        height: Dimensions.get('screen').height * 0.26,
        width: Dimensions.get('screen').width * 0.45
    },

})