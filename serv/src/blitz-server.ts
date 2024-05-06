import { setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth"
import { BlitzLogger } from "blitz"
import db from "db/db"
import { authConfig } from "./blitz-client"

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db as any),
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  logger: BlitzLogger({}),
})
