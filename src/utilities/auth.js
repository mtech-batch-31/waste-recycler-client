import Cookies from 'js-cookie';
import {redirect} from 'react-router-dom'

export function isLogin()
{
    let token = Cookies.get('access_token') ;
    if(!token)
        return redirect('/');
    return null;
}