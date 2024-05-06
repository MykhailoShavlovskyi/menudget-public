import { BlitzPage, Routes } from "@blitzjs/next"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import React, { ReactNode } from "react"
import CmsLayout from "../../../components/cms/layout/CmsLayout"

const ProfilePage: BlitzPage = () => null

ProfilePage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

  return {
    redirect: {
      destination: Routes.SettingsPage().href,
      permanent: false,
    },
  }
})

export default ProfilePage
