import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MoveCard from "@/components/MoveCard";
import SearchBar from "@/components/SearchBar";

export default function Index() {
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: `` }));
  const router = useRouter();

  

  return (
    <View className="flex-1 bg-primary">
      <Image 
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        
        {moviesLoading ? (
          <ActivityIndicator 
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>ERROR: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            
            <FlatList
              data={movies}
              renderItem={({ item }) => (
                // <Text className="text-white text-sm">{item.title}</Text>
                <MoveCard {...item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap:20,
                paddingRight:5,
                marginBottom:10
              }}
              // scrollEnabled={false}
              className="mt-2 pb-32"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}