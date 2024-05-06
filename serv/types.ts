import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "db/db"

export type Role = "Admin" | "Manager" | "Waiter" | "User"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
