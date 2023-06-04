import React, { useEffect} from 'react';
import {TOKEN_LOCALSTORAGE_KEY} from "@/utils/constants";
import {useRouter} from "next/router";
import {HOME_PAGE} from "@/utils/constants/routes";
import AuthHeaderComponent from "@/components/ui/headers/auth-header.component";
import {LayoutProps} from "@/types/util";


const AuthLayout = ({children}: LayoutProps) => {
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