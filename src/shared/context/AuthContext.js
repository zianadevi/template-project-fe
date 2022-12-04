import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hook/UseLocalStorage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token', null);
    const [user, setUser] = useLocalStorage('user', null);
    const [userOTP, setUserOTP] = useState()

    const onLogin = (useCred) => {
        setUser(useCred)
        navigate('home', { replace: true });
    };
    const onLogout = () => {
        setUser(null)
        navigate('/', { replace: true });
    };

    // If Using Cookie
    const setCookie = (cName, cValue, expMinutes) => {
        let date = new Date();
        date.setTime(date.getTime() + (expMinutes*60*1000));
        const expires = "expires=" + date.toUTCString();
        cValue=JSON.stringify(cValue)
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
        setUserOTP(cName, cValue, expMinutes)
        navigate('/main', {replace: true})
    }

    const getCookie = (cname) => {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    const eraseCookie =() =>{
        try {
            document.cookie = "user= ; Path = /; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        } catch (e) {
            console.log(e);
        } finally{
            navigate("/");
        }
    }

    // If using Cookie, value must be declared
    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout}}>
            {children}
        </AuthContext.Provider>
    );
};