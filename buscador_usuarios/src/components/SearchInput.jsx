import { useState, useEffect } from "react"
export default function SearchInput({onSearch}) {

    const [query, setQuery] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(query)
        },500)
        return () => clearTimeout(timeout)
    }, [query, onSearch])
    return (
        <div>
            <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            type="text" 
            placeholder="Buscar por  Nombre, perfil o intereses"
            className="w-full rounded border border-gray-300 shadow-md transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
        </div>
    )
}