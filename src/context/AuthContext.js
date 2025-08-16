import React, { createContext, useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userID, setUserID] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [previlege,setPrevilege] = useState(null);
    const navigate = useNavigate();

    //configure o axios para enviar cookies com as requisicoes
    axios.defaults.withCredentials = true;
     // Effect to check for token in localStorage on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUserID = localStorage.getItem('userId');
        const storedUser = localStorage.getItem('previlege');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            setUserID(storedUserID);
            setPrevilege(storedUser);
        }
    }, []);

    const loginData = (newToken, newUserId, newUser)=>{
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('userId', newUserId);
        localStorage.setItem('previlege',newUser);
        setToken(newToken);
        setUserID(newUserId);
        setPrevilege(newUser);
        setIsLoggedIn(true);
    }

    const login = async (username, password) => {
            await axios.post('https://api-provida.vercel.app/api/auth/login', { username, password })
            .then((res) =>{
                if(res.data.user.token){
                    loginData(res.data.user.token, res.data.user.userId, res.data.user.username);
                    navigate('/principal'); // Redirect to home page after successful login
                }else{
                    navigate('/'); // Redirect to home page if no token is returned
                }
            }).catch ((error)=>{ 
                console.error('Login failed:', error);
        });
    };

    const logout = async () => {
        try {
            await axios.post('https://api-provida.vercel.app/api/auth/logout');
                localStorage.removeItem('authToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('previlege');
                setToken(null);
                setUserID(null);
                setPrevilege(null);
                setIsLoggedIn(false);
                navigate('/');

        } catch (error) {
            console.error('Error logging out:', error);
            return { success: false, message: error.response ? error.response.data.message : 'Logout failed' };
        }
    };

    // const logout = () => {
    //     localStorage.removeItem('authToken');
    //     localStorage.removeItem('userId');
    //     setToken(null);
    //     setUserID(null);
    //     setIsLoggedIn(false);
    //     console.log('User logged out and localStorage cleared');
    // };

    const register = async (username, password) => {
        try {
            const response = await axios.post('https://api-provida.vercel.app/api/auth/register', { username, password });
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Error registering:', error);
            return { success: false, message: error.response ? error.response.data.message : 'Registration failed' };
        }
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, token, userID,previlege,login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
}; 
export const useAuth = () => {
    return useContext(AuthContext);
};
