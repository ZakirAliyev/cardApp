import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://card.buyontech.net/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('userToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (username) => ({
                url: `/get/${username}`,
            }),
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: `/post`,
                method: 'POST',
                body: (data)
            }),
        }),
    }),
})

export const {
    useGetUserQuery,
    useCreateUserMutation
} = userApi
