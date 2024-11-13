import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useRef, useState } from 'react'
import { VideoCardType } from 'src/types'
import * as Animatable from "react-native-animatable"
import icons from '@constants/icons'

type VideoCardPropType = {
  trendingVideos: VideoCardType[]
}

type TrendingItemPropType = {
  activeItem: string,
  item: VideoCardType
}

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  },
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  },
}

const TrendingItem = ({activeItem, item}: TrendingItemPropType) => {
const [play, setPlay] = useState(false)
  return (
    <Animatable.View
      className='mr-5'
      // @ts-ignore
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text className='text-white'>Playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className='relative justify-center items-center'
        >
          <ImageBackground 
            source={{uri: item.thumbnail}}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />
          <Image 
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='cover'
          />
        </TouchableOpacity>

      )}
    </Animatable.View>
  )
}

const Trending = ({trendingVideos}: VideoCardPropType) => {
  const [activeItem, setActiveItem] = useState<string>(trendingVideos[0]?.$id);
  
  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged: viewableItemsChanged },
  ]);

  return (
    // @ts-ignore
    <FlatList 
      data={trendingVideos}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      viewabilityConfigCallbackPairs={
        viewabilityConfigCallbackPairs.current
      }
      viewabilityConfig={{
        itemVisiblePercentThreshold: 300
      }}
      contentOffset={{x: 200}}
      horizontal
    />
  )
}

export default Trending