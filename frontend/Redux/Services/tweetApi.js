
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tweets from '../../../backend/models/tweets';

export const tweetApi = createApi({
  reducerPath: 'tweetApi',
// fetch endpoint Backend
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/tweet' }),
  //
  // revoir avec le code de Victor pour la gestion du token
  //
  // //    prepareHeaders: (headers, { getState }) => {
  //     const token = (getState() as RootState).user.token

  //     if (token) {
  //       headers.set('authorization', `Bearer ${token}`)
  //     }

  //     return headers
  //   },

  endpoints: (builder) => ({
    
    tweets: builder.mutation({
      
        query: (credentials) => ({
      
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