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
import WaitersPage from "../waiters"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { SettingsForm } from "../../../containers/cms/profile/SettingsForm"
import { getTitSettings } from "../../../messages/profile"
import { localeKey } from "../../../components/cms/IntlProvider"
import { Lang } from "../../../components/cms/profile/SettingsForm"

const SettingsPage: BlitzPage = ({
  notAllowed,
  user,
}: {
  notAllowed?: boolean
  user?: Pick<User, "id" | "name" | "email" | "role">
}) => (
  <CmsNav title={getTitSettings()} notAllowed={notAllowed} role={user?.role}>
    <Grid
      id={"profile"}
      asideWidth={27.25}
      aside={user && <ProfileMenu page={"settings"} userName={user.name} />}
      main={
        user && (
          <SettingsForm
            userId={user.id}
            userEmail={user.email}
            lang={(localStorage.getItem(localeKey) ?? "eng") as Lang}
          />
        )
      }
    />
  </CmsNav>
)

SettingsPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

export default SettingsPage
