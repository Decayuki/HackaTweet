
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
// fetch endpoint Backend
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/users' }),
  endpoints: (builder) => ({
    // à partir du backend
    signIn: builder.mutation({
      //envoie la requete de "credentials" si c'etait des tweet j'aurai mis tweet ? D'ou vient credentials ?
        query: (credentials) => ({
            // la requete demande via la route /sign in les "credentials"
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: '/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = usersApi;