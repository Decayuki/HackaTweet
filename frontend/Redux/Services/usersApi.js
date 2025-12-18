
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
// fetch endpoint Backend + fetchBase = methode 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/users' }),
  endpoints: (builder) => ({
    // à partir du backend
    signIn: builder.mutation({
      //envoie la requete de "credentials" ({ username: '...', password: '...' }) 
        query: (credentials) => ({
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