import { passportAuth } from "@blitzjs/auth"
import { api } from "src/blitz-server"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { Strategy as FacebookStrategy } from "passport-facebook"
import { Strategy as AppleStrategy } from "passport-apple"
import jwt, { JwtPayload } from "jsonwebtoken"

import db from "../../../../db/db"
import { Role } from "../../../definitions/Role"

export default api(
  passportAuth({
    successRedirectUrl: "/cms",
    errorRedirectUrl: `${process.env.SERVER_URL}/cms/auth/login-failed`,
    strategies: [
      {
        authenticateOptions: { scope: "email" },
        strategy: new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
            passReqToCallback: true,
          },
          async function (request, accessToken, refreshToken, profile, done) {
            // Get email
            const email = profile.email ?? (profile.emails && profile.emails[0]?.value)
            if (!email) return done(new Error("Google Auth response doesn't have email."))

            // Get user
            const user = await db.user.findFirst({
              where: { email },
              select: { id: true, role: true },
            })
            if (user == null) return done(new Error("User is not registered"))
            if (user?.role === Role.User) return done(new Error("User is not allowed"))

            // Create session
            const publicData = {
              userId: user?.id,
              role: user?.role,
              source: "google",
            }
            return done(undefined, { publicData })
          }
        ),
      },
      {
        authenticateOptions: { scope: "email" },
        strategy: new FacebookStrategy(
          {
            clientID: process.env.FACEBOOK_APP_ID as string,
            clientSecret: process.env.FACEBOOK_APP_SECRET as string,
            callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/callback`,
            profileFields: ["emails"],
          },
          async function (accessToken, refreshToken, profile, done) {
            // Get email
            const email = profile.emails && profile.emails[0]?.value
            if (!email) return done(new Error("Facebook Auth response doesn't have email."))

            // Get user
            const user = await db.user.findFirst({
              where: { email },
              select: { id: true, role: true },
            })
            if (user == null) return done(new Error("User is not registered"))
            if (user?.role === Role.User) return done(new Error("User is not allowed"))

            // Create session
            const publicData = {
              userId: user?.id,
              role: user?.role,
              source: "facebook",
            }
            return done(undefined, { publicData })
          }
        ),
      },
      {
        authenticateOptions: { scope: "email" },
        strategy: new AppleStrategy(
          {
            clientID: process.env.APPLE_CLIENT_ID as string,
            teamID: process.env.APPLE_TEAM_ID as string,
            callbackURL: `${process.env.SERVER_URL}/api/auth/apple/callback`,
            // callbackURL: `https://d31t95zge1f2me.cloudfront.net/api/auth/apple/callback`,
            keyID: process.env.APPLE_KEY_ID as string,
            privateKeyLocation: process.env.APPLE_KEY_LOCATION as string,
            passReqToCallback: true,
          } as any,
          async function (req, accessToken, refreshToken, idToken, profile, done) {
            const decoded = jwt.decode(idToken)
            const email = (decoded as JwtPayload | null)?.email
            if (email == null) return done(new Error("No email present in decoded token"))

            // Get user
            const user = await db.user.findFirst({
              where: { email },
              select: { id: true, role: true },
            })
            if (user == null) return done(new Error("User is not registered"))
            if (user?.role === Role.User) return done(new Error("User is not allowed"))

            // Create session
            const publicData = {
              userId: user?.id,
              role: user?.role,
              source: "apple",
            }

            return done(undefined, { publicData })
          }
        ),
      },
    ],
  })
)
