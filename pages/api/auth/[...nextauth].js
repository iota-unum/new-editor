import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
//   jwt: {
//     encryption: false,
//   },
  secret: process.env.SECRET,
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // console.log({ profile });
      if (account?.accessToken) {
        token.accessToken = account.oauth_token
        token.accessTokenSecret = account.oauth_token_secret
        token.account = account
      }
      return token
    },
  },
})