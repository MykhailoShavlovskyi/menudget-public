import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "src/components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import React, { ReactNode } from "react"
import { User } from "@prisma/client"
import { Grid } from "../../../components/cms/common/Grid"
import { ProfileMenu } from "../../../containers/cms/profile/ProfileMenu"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { SupportPanel } from "../../../components/cms/profile/SupportPanel"
import { getTitSupport } from "../../../messages/profile"

const SupportPage: BlitzPage = ({
  notAllowed,
  user,
}: {
  notAllowed?: boolean
  user?: Pick<User, "id" | "name" | "email" | "role">
}) => (
  <CmsNav title={getTitSupport()} notAllowed={notAllowed} role={user?.role}>
    <Grid
      id={"support"}
      asideWidth={27.25}
      aside={user && <ProfileMenu page={"support"} userName={user.name} />}
      main={<SupportPanel />}
    />
  </CmsNav>
)

SupportPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps: GetServerSideProps = gSSP(async ({ ctx }) => {
  const role = getRole(ctx)

  // Anon
  if (role == null)
    return {
      redirect: {
        destination: Routes.LoginPage().href,
        permanent: false,
      },
    }

  // User
  if (role === Role.User) return { props: { notAllowed: true } }

  // Waiter, Manager, Admin
  return {
    props: { user: await getUser(ctx) },
  }
})

export default SupportPage
