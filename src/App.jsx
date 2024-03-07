import { useCallback, useState } from 'react'
import './App.css'
import { Mvoies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  // FORMA DESCONTROLADA
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const fields = Object.fromEntries(new window.FormData(event.target))
  //  const query = fields.get('query')
  //   console.log(fields)
  // }

  const debounceGetMovie = useCallback(
    debounce(search => {
      console.log('Search')
      getMovies({ search })
    }, 300)
    , []
  )

  // FORMA CONTROLADA
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovie(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='search' type='text' placeholder='Avengers, Star Wars, ...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando ...</p> : <Mvoies movies={movies} />}
      </main>

    </div>
  )
}

export default App
