import React, {useEffect,useState} from 'react'
import Search from "./components/search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";

const API_BASE_Url = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers:{
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,

    }
}
const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deBouncedSearchTerm, setDeBouncedSearchTerm] = useState('')

    //Debounce the search term to prevent making too many API requests
    useDebounce(() => setDeBouncedSearchTerm(searchTerm), 1000,[searchTerm]);
    const fetchMovies = async (query ='') => {
        setIsLoading(true);
        setErrorMessage('');
        try{
            const endpoint = query
                ? `${API_BASE_Url}/search/movie?query=${encodeURI(query)}`
                : `${API_BASE_Url}/discover/movie?sort_by=popularity.desc`

            const response = await fetch(endpoint, API_OPTIONS);

           if (!response.ok) {
               throw new Error("Failed to fetch movies");
           }

           const data = await response.json();
           console.log(data);

           if (!data.results || data.results.length === 0) {
               setErrorMessage('No movies found');
               setMovieList([]);
               return;
           }
           setMovieList(data.results);
        } catch (error){
            console.error(`Error fetching movies ${error}`);
            setErrorMessage('Error fetching movies,Please try again later');
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchMovies(deBouncedSearchTerm);
    },[deBouncedSearchTerm])

    return (
       <main>
           <div className={"pattern"} />
           <div className={"wrapper"}>
               <img className={'w-10 h-2.5 flex items-center'} src={"./logo.png"} />
               <header>
                   <img src={"./hero.png"} alt="hero banner"/>
                    <h1> Find <span className={"text-gradient"}>Movies </span> Youll enjoy without Hassel</h1>
                    <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
               </header>
               <section className="all-movies">
                   <h2 className={'mt-[40px] text-center text-gradient text-[60px]'}>All Movies</h2>

                   {isLoading ? (
                       <p className={"text-white"}>
                           <Spinner/>
                       </p>
                   ) : errorMessage ? (
                       <p className={"text-red-500"}>{errorMessage}</p>
                   ):(
                       <ul>
                           {movieList.map((movie) => (
                              <MovieCard key={movie.id} movie={movie}/>
                               )
                           )}
                       </ul>
                   )}
               </section>
           </div>

       </main>
    )
}
export default App

