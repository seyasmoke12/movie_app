import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'



interface props {
    placeholder: string;
    onPress?: ()=>void;
}


const SearchBar = ({placeholder,onPress}:props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5 resizeMode=' resizeMode='contain' tintColor="#ab8bff"/>
      <TextInput
      onFocus={onPress}
      placeholder={placeholder}
      value=''
      onChangeText={()=>{}}
      placeholderTextColor="#a8b5db"
      className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar