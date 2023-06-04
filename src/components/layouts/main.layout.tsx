import React from 'react';
import {LayoutProps} from "@/types/util";
const MainLayout = ({children}: LayoutProps) => {
    return (
        <>
            {children}
        </>
    );
};

export default MainLayout;