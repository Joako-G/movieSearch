import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  // NORMALMENTE UN useEect ES UN CUSTOM HOOK
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar peliculas vacias')
      return
    }

    if (search.length < 3) {
      setError('El nombre de la pelicula debe tener mas de 3 letras')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
