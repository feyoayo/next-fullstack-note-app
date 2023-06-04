import {signOut} from "next-auth/react";
import {OutlineButton} from "@/components/ui/buttons";
import {LOGIN_PAGE} from "@/utils/constants/routes";
import {GetServerSidePropsContext} from "next";
import {NextPageWithLayout} from "@/types/util";
import {ReactElement} from "react";
import MainLayout from "@/components/layouts/main.layout";
import {hasToken} from "@/helpers/hasToken";

const  Home: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello</div>
        <div>
            <OutlineButton onClick={() => signOut({callbackUrl: LOGIN_PAGE})}>Sign out</OutlineButton>
        </div>
    </>
  );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = await hasToken(context.req)
    if(!token) {
        return {
            redirect: {
                destination: LOGIN_PAGE,
                permanent: true
            }
        }
    }
    return {props: {}}
}


Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default Home



