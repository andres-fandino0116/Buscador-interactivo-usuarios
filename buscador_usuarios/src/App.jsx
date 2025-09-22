import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import SearchInput from './components/SearchInput.jsx'
import Card from './components/Card.jsx'
import { ToastContainer, toast } from 'react-toastify'
import { useAuth } from './context/AuthContext.jsx'

export default function App() {
  const { logout } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null) 

  const API_URL = 'http://localhost:8000'

  const obtenerUsuarios = async () => {
    try {
      setLoading(true) // mostrar cargando
      const response = await axios.get(`${API_URL}/usuarios`) 
      setUsuarios(response.data)
      setFiltrados(response.data)
    } catch (error) {
      console.error("Error al obtener usuarios", error)
      setError('Error al obtener usuarios')
      toast.error('Error al obtener usuarios')
    } finally {
      setLoading(false) // detener cargando
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const filtrarUsuarios = useCallback(
    (query) => {
      const q = query.trim().toLowerCase()
      const resultados = usuarios.filter((u) =>
        [u.nombre, u.apellidos, u.perfil, u.intereses, u.correo].some((campo) => 
          String(campo).toLowerCase().includes(q)
        )
      )
      setFiltrados(resultados)
    }, 
    [usuarios]
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-4">
      <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded float-right ">Logout</button>
      <h1 className="text-3xl font-bold text-center mb-4"> 🔎 Buscador de Usuarios</h1>
      <SearchInput onSearch={filtrarUsuarios} />

      {/* Loader al buscar */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map((usuario) => (
          <div key={usuario.id} onClick={() => setUsuarioSeleccionado(usuario)}>
            <Card usuario={usuario} />
          </div>
        ))}
      </div>
      {/* Modal */}
      {usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button 
              onClick={() => setUsuarioSeleccionado(null)} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <img className="w-32 h-32 rounded-full mx-auto" src={usuarioSeleccionado.foto} alt="avatar" />
            <h2 className="text-xl font-bold text-center mt-2">
              {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellidos}
            </h2>
            <p className="text-gray-600 text-center">{usuarioSeleccionado.perfil}</p>
            <p className="text-gray-500 text-center italic">{usuarioSeleccionado.intereses}</p>
            <p className="text-blue-600 text-center">{usuarioSeleccionado.correo}</p>
          </div>
        </div>
      )}

    </div>
  )
}
