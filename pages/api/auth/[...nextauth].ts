import NextAuth, { RequestInternal } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import LoginService from 'services/login.service';

export default NextAuth({
  providers: [
    credentialsProvider({
      name: 'LoginApp',
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
        }
      },
      authorize: async function (
        credentials: Record<'email' | 'password', string> | undefined,
        req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>
      ) {
        let res:any;
        const payload = {
          email: credentials?.email,
          password: credentials?.password
        }
        if(credentials) {
          res = await LoginService.login(payload);
        }

        console.log('next user', res.data);
        const user = res.data;
        if (res.status === 200 && user) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', user.accessToken);
          }
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.secret,
  pages: {},
});
