import Blogcard from '../../components/Blogcard';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { readPostsContent } from '../../lib/helper';
import { PostsApiResponse } from '@/utils/types';



export const getStaticProps = async() => {
//   const {postInfo} : postsApiResponse = await fetch("http://localhost:3000/api/posts").then((data) => data.json())

const postInfo: PostsApiResponse = readPostsContent();

return {
    props: {posts: postInfo},
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({ posts }) => {

  return (
  <div className='max-w-3xl mx-auto p-2 space-y-5 my-10'>
    {
    posts.map(post => 
        <Blogcard key={post.slug}
        title={post.title} 
        desc ={post.meta}
        slug = {post.slug}/>)
    }
  </div>)

}

export default Blogs;