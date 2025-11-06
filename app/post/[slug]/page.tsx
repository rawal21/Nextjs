"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { fetchBySingle } from "@/app/redux/slices/SinglePostSlice"
import { useAppDispatch , useAppSelector } from "@/app/redux/hooks"



export default function PostPage() {
  const params = useParams()
  console.log("Slug:", params.slug)
  const dispatch = useAppDispatch();
  const {loading , error , post} = useAppSelector((state)=> state.singlePost)

  const fetchSinglePost = async () => {
    dispatch(fetchBySingle(params?.slug))
  }

  useEffect(() => {
    if (params?.slug) {
      fetchSinglePost()
    }
  }, [params.slug]) // ✅ Only re-run when slug changes

  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-400">Loading post...</div>
  }

  if (!post) {
    return <div className="text-center py-20 text-lg text-gray-400">Post not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to Posts
        </Link>

        <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>

        <div className="flex gap-4 text-muted-foreground mb-8 border-b border-border pb-8">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span> {/* ✅ Fixed date */}
          <span>·</span>
          <span>{post.author?.name || "Unknown Author"}</span>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">{post.content}</div>
        </div>
      </article>
    </div>
  )
}
