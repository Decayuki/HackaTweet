
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tweets from '../../../backend/models/tweets';

export const tweetApi = createApi({
  reducerPath: 'tweetApi',
// fetch endpoint Backend
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/tweet' }),
  endpoints: (builder) => ({
    // à partir du backend
    tweets: builder.mutation({
      //envoie la requete de "credentials" si c'etait des tweet j'aurai mis tweet ? D'ou vient credentials ?
        query: (credentials) => ({
            // la requete demande via la route /sign in les "credentials"
        url: '/tweet',
        method: 'get',
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