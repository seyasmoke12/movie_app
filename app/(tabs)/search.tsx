import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MoveCard from '@/components/MoveCard'
import { useRouter } from 'expo-router'
import { useFetch } from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {

  const [searchQuery,setSearchQuery] = useState("")


  const { data: movies, loading, error,refetch:loadmovies,reset,} = useFetch(() => fetchMovies({ query: searchQuery }), false
);




useEffect(()=>{
  const func = async ()=>{
    if(searchQuery.trim()){
      await loadmovies()
    }else{
      reset()
    }
  }
  func()
},[searchQuery])


  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

      <FlatList
      data={movies}
      renderItem={({item})=> <MoveCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      className='px-3'
      columnWrapperStyle={{
        justifyContent:"center",
        gap:16,
        marginVertical:16,
      }}
      contentContainerStyle={{paddingBottom:100}}
      ListHeaderComponent={
        <>
        <View className='w-full flex-row justify-center mt-20 items-center'>
          <Image source={icons.logo} className='w-12 h-10'/>
        </View>
        <View className='my-5 '>
          <SearchBar
          placeholder='search movies...'
           value={searchQuery}
           onChangeText={(text:string)=> setSearchQuery(text)}
           />
        </View>
        {loading && (
          <ActivityIndicator size="large" color="0000ff" className='my-3'/>
        )}

{error && (
          <Text className='text-red-500 px-5 my-3'> Error:{error.message}</Text>
        )}



        {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
          <Text className='text-xl text-white font-bold'>
            Search Results for{' '}
            <Text className='text-accent'>{searchQuery}</Text>
          </Text>
        ) }
        </>

      }
      />
    </View>
  )
}

export default search