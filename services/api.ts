import search from "@/app/(tabs)/search";

export const TMDB_CONFIG = {
    BASE_URL:`https://api.themoviedb.org/3`,
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}


export const fetchMovies = async({query}:{query:string})=>{
    
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint,{
        method:`GET`,
        headers:TMDB_CONFIG.headers,
    })
    if(!response.ok){
        throw new Error(`failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json()
    
    return data.results
}


// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njk5OWVjODU0ZTI1ODAyM2YwMjkxZGI3YWYzMTNkMyIsIm5iZiI6MTcxNTc5MjAxOS4yMzIsInN1YiI6IjY2NDRlODkzYTUwN2U3MGU2MGNmOTJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6hw7uXOS98mJsI0Rakgvhf9wc22bs4fdMrr75jzF6o0'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));