import { ProfileMenu as Menu, ProfileMenuProps } from "../../../components/cms/profile/ProfileMenu"
import { useMutation } from "@blitzjs/rpc"
import logout from "../../../db/auth/mutations/logout"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"

export const ProfileMenu = (props: Omit<ProfileMenuProps, "onLogout">) => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()
  const handleLogout = async () => {
    await logoutMutation()
    void router.push(Routes.LoginPage().href)
  }

  return <Menu onLogout={handleLogout} {...props} />
}
