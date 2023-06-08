import { signOut } from "next-auth/react";
import { OutlineButton } from "@/components/ui/buttons";
import { GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "@/types/util";
import { ReactElement } from "react";
import MainLayout from "@/components/layouts/main.layout";
import { hasToken } from "@/helpers/hasToken";
import { ROUTES } from "@/utils/constants/routes";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello</div>
      <div>
        <OutlineButton
          onClick={() => signOut({ callbackUrl: ROUTES.LOGIN_PAGE })}
        >
          Sign out
        </OutlineButton>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = await hasToken(context.req);
  if (!token) {
    return {
      redirect: {
        destination: ROUTES.LOGIN_PAGE,
        permanent: true,
      },
    };
  }
  return { props: {} };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
