import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_PATH } from '../utilities/constants';
import React from "react"

const RegistrationConfirm = () =>{
    const [queryParams] = useSearchParams();
    const token = queryParams.get('token');
    console.log(queryParams.get('token'));

    const [verified, setVerified] = useState(false);
    useEffect(() => {
        //call API to verify token
        axios
        .post(process.env.REACT_APP_RECYCLE_API_URL+API_PATH.REG_CONFIRM+"?token="+token)
        .then(() => setVerified(true))
        .catch((error) => console.log(error));

    }, [token]);
    return <main>
            <p></p>
            <center>
            {verified && <h1>You have been successfully registered</h1>}
            {!verified && <h1>Verification fails</h1>}
            {verified && <p>Goto <Link to="/">Login</Link></p>}
            </center>
        </main>

}

export default RegistrationConfirm
