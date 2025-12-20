import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// meme logique que pour usersApi
// pour chaque requete le token est en header
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:3000/tweet",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const tweetApi = createApi({
  reducerPath: "tweetApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    // récupération de tous les tweets (GET)
    getTweets: builder.query({
      query: () => ({
        url: "/", // correspond à /tweet côté backend
        method: "GET",
      }),
    }),

    // création d'un nouveau tweet (POST)
    // addTweet = mutation, + param newTweet
    addTweet: builder.mutation({
      query: (newTweet) => ({
        url: "/",
        method: "POST",
        body: newTweet,
      }),
    }),

    likeTweet: builder.mutation({
      query: (tweetId) => ({
        url: `/${tweetId}/like`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetTweetsQuery, useAddTweetMutation, useLikeTweetMutation } = tweetApi;
