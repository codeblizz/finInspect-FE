import NextAuth, { RequestInternal } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import LoginService from 'services/login.service';

export default NextAuth({
  providers: [
    credentialsProvider({
      name: 'FinInspect',
      type: 'credentials',
      credentials: {
        email: {
          type: 'email',
          label: '',
          placeholder: '',
        },
        password: {
          type: 'password',
          label: '',
          placeholder: '',
        },
        isLoggedIn: {
          label: 'IsLoggedIn',
          type: 'checkbox',
        },
        status: {
          label: 'Status',
          type: 'checkbox',
        },
        accessToken: {
          label: 'Access Token',
          type: 'token',
        },
        message: {
          label: 'Message',
          type: 'message',
        },
      },
      async authorize(credentials, req) {
        let res: any;
        try {
          const payload = {
            email: credentials?.email,
            password: credentials?.password
          }
          if (credentials) {
            res = await LoginService.login(payload);
          }
          const user = res.data;
          if (res.status === 200 && user) {
            if (typeof window !== 'undefined') {
              localStorage.setItem('accessToken', user.accessToken);
            }
            return user;
          }
          return null;
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  secret: process.env.SECRET_KEY,
  pages: {
    signIn: '/',
    signOut: '/'
  },
  session: {
    strategy: 'jwt',
    maxAge: 60000
  },
  callbacks: {
    async jwt({ token, account, user, isNewUser }:any) {
      if (account && token) {
        return {
          ...token,
          ...account,
          ...user,
          ...isNewUser
        };
      }
      return token;
    },

    async session({ session, token, user }:any) {
      session.token = token.accessToken;
      session.user = token.userProfile;
      session.message = token.message;
      session.status = token.status;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
