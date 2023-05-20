/* eslint-disable no-unused-labels */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apikey = import.meta.env.VITE_RAPID_API_KEY;


export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://article-extractor-and-summarizer.p.rapidapi.com/`,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', apikey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // eslint-disable-next-line no-unused-vars
            query: (params) =>  `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

export const {useLazyGetSummaryQuery} = articleApi;