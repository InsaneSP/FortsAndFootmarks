// import { rootApi } from "../api/rootApi";

// export const commentsApi = rootApi.injectEndpoints({

//     endpoints: (builder) => ({
//         fetchComments: builder.query({
//             query: (fortname) => `/${fortname}/comments`,
//             providesTags: ['Comment']
//         }),

//         addComment: builder.mutation({
//             query: ({ fortname, data }) => ({
//                 url: `/${fortname}/createComment`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['Comment']
//         }),

//         addReply: builder.mutation({
//             query: ({ commentId, username, reply }) => ({
//                 url: `/comments/${commentId}/reply`,
//                 method: 'PUT',
//                 body: { username, reply }
//             }),            
//             invalidatesTags: ['Comment']
//         }),

//         deleteReply: builder.mutation({
//             query: ({ commentId, replyId }) => ({
//                 url: `/comments/${commentId}/replies/${replyId}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Comment']
//         }),


//     })

// })

// export const { useFetchCommentsQuery, useAddCommentMutation, useAddReplyMutation, useDeleteReplyMutation } = commentsApi

