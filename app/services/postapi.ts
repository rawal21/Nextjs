import { PostbaseApi } from "./postbas";
import type { Post } from "../types/post";

interface PostRequest {
    title : string ,
    content : string
}

interface  updateRequest {
    slug : string
    data :  PostRequest
}

interface PostResponse {
    posts : Post[]
}


export const postApi = PostbaseApi.injectEndpoints({
    endpoints : (buiilder)=>({
        fetchPost : buiilder.query<PostResponse , void>({
            query : ()=>({
                url : '/posts',
                method : 'GET'
            })
            ,
            providesTags : ['Post']
        }) ,
     
        getPostById : buiilder.query<Post , string>({
            query : (slug)=>({
                url : `/posts/${slug}`,
                method : "GET"
            })
            ,
            providesTags : ['Post']
        }),

    

       createPost  : buiilder.mutation<PostRequest , PostResponse>({
         query : (credential) =>({
            url : '/posts',
            method : "POST",
            body : credential
         }),
         invalidatesTags : ['Post']
       }),
       updatePost  : buiilder.mutation<PostResponse , updateRequest>({
        query : ({slug , data})=>({
            url : `/posts/${slug}`,
            body : data
        })
        , invalidatesTags  : ['Post']
       }) ,

       deletePost : buiilder.mutation<{sucess : boolean} , {slug : string}>({
        query : ({slug})=>({
          url : `/posts/${slug}`,
        }),
        invalidatesTags  : ["Post"]
       }),
    }) 
})

export const {
    useCreatePostMutation ,
    useFetchPostQuery ,
    useGetPostByIdQuery,
    useDeletePostMutation,
    useUpdatePostMutation
} = postApi