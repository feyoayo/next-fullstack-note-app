import React, {ReactElement, useEffect} from 'react';
import {TOKEN_LOCALSTORAGE_KEY} from "@/utils/constants";
import {useRouter} from "next/router";
import {HOME_PAGE} from "@/utils/constants/routes";
import AuthHeaderComponent from "@/components/ui/headers/auth-header.component";

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
        <div className={'h-[100vh] dark:bg-black'}>
            <AuthHeaderComponent/>
                {children}
        </div>
    );
};

export default AuthLayout;