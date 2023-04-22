import Cookies from 'js-cookie';
import {redirect} from 'react-router-dom'
import {ACCESS_TOKEN} from '../utilities/constants.js'

export function isLogin()
{
    let token = Cookies.get(ACCESS_TOKEN) ;
    console.log('Route protection: '+token);
    if(!token)
        return redirect('/');
    return null;
}