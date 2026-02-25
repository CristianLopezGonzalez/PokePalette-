import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Compass, BookMarked, Sun, Moon, User, LogOut } from 'lucide-react'
import logo from '../assets/logo.png'

const Navbar = () => {
    const { darkMode, toggleDark, navOpen: isOpen, setNavOpen } = useTheme()
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleNavigate = (path) => {
        navigate(path)
    }

    const navItems = [
        { icon: <Home size={20} />, label: 'Inicio', path: '/' },
        { icon: <Compass size={20} />, label: 'Explorar', path: '/explore' },
        { icon: <BookMarked size={20} />, label: 'Mis Paletas', path: '/profile' },
    ]

    return (
        <motion.aside
            animate={{ width: isOpen ? 240 : 64 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 h-full z-50 flex flex-col py-6 overflow-hidden shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
        >
            <div className="flex items-center px-4 mb-8 gap-3">
                <img
                    src={logo}
                    alt="logo"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 cursor-pointer"
                    onClick={() => setNavOpen(!isOpen)}
                />
                <AnimatePresence>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="font-bold text-base whitespace-nowrap"
                        >
                            PokéPalette
                        </motion.span>
                    )}
                </AnimatePresence>
                {isOpen && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setNavOpen(false)}
                        className="ml-auto text-gray-400 hover:text-gray-600"
                    >
                        ‹
                    </motion.button>
                )}
            </div>

            <nav className="flex flex-col gap-1 flex-1 px-3">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                ))}
            </nav>

            <div className="flex flex-col gap-1 px-3">
                <button
                    onClick={toggleDark}
                    className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                    <span className="flex-shrink-0">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </span>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-sm font-medium whitespace-nowrap"
                            >
                                {darkMode ? 'Modo claro' : 'Modo oscuro'}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>

                {user ? (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all hover:bg-red-50 text-red-500"
                    >
                        <span className="flex-shrink-0"><LogOut size={20} /></span>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm font-medium whitespace-nowrap"
                                >
                                    Cerrar sesión
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                ) : (
                    <button
                        onClick={() => handleNavigate('/login')}
                        className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    >
                        <span className="flex-shrink-0"><User size={20} /></span>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm font-medium whitespace-nowrap"
                                >
                                    Iniciar sesión
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                )}
            </div>
        </motion.aside>
    )
}

export default Navbar