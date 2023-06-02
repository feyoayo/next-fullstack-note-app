import React, {ReactElement, useEffect} from 'react';
import {TOKEN_LOCALSTORAGE_KEY} from "@/utils/constants";
import {useRouter} from "next/router";
import {HOME_PAGE} from "@/utils/constants/routes";

interface Props {
    children: ReactElement
}
const AuthLayout = ({children}: Props) => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
        if(token) {
            router.push(HOME_PAGE).catch(e => console.log(e))
        }
    }, [router])
    return (
        <>
            <div>Auth Layout</div>
            {children}
        </>
    );
};

export default AuthLayout;