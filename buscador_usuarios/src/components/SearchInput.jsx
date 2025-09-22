import { useState, useEffect } from "react"

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      onSearch(query)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [query, onSearch])

  return (
    <div className="relative w-full">
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        type="text" 
        placeholder="Buscar por Nombre, perfil o intereses"
        className="w-full rounded border border-gray-300 shadow-md transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pr-10"
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
