import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../slices/userSlice";

// V2 chaque query dispose du token en entête
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:3000/users",
  prepareHeaders: (headers, { getState }) => {
// on récupère le token stocké dans Redux (getState du slice user)
    const token = getState().user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const usersApi = createApi({
  reducerPath: "usersApi",
  // fetch endpoint
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    // à partir du backend
    signIn: builder.mutation({
      // envoie la requête de "credentials" ({ username: '...', password: '...' })
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
      // callback déclenché automatiquement à l'envoi de la requête
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // on attend la réponse du backend
          const { data } = await queryFulfilled;

          // si l'API OK :
          if (data.result) {
            // on stocke username + token dans Redux via le slice user
            dispatch(setUser({ username: data.username, token: data.token }));
          }
          // gestion erreur à l'arrache
        } catch (err) {
          alert("Erreur lors de la connexion");
        }
      },
    }),

    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/signup",
        method: "POST",
        body: userInfo,
      }),
      // même logique que pour signIn
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.result) {
            dispatch(setUser({ username: data.username, token: data.token }));
          }
        } catch (err) {
          alert("Erreur lors de l’inscription");
        }
      },
    }),
  }),
});

// export de mes hooks
export const { useSignInMutation, useSignUpMutation } = usersApi;