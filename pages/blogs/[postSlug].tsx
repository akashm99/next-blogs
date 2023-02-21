import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'
import { NOTFOUND } from 'dns';


type Props = InferGetStaticPropsType<typeof getStaticProps>

type Post = {
  post: {
    title: string,
    content: MDXRemoteSerializeResult
  }
}

const SinglePage : NextPage<Props> = (props) => {
  return (<div className='max-w-3xl mx-auto'>
  <h1 className='font-semibold text-2xl py-5'>{ props.post.title }</h1>
    <div className='prose pb-20'>
    <MDXRemote {...props.post.content} />
    </div>
  </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {

  const dirPathToRead = path.join(process.cwd(), "posts")
  const dirs = fs.readdirSync(dirPathToRead)
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd() + "/posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding : "utf-8"});
    return { params : { postSlug: matter(fileContent).data.slug } }
  })

  return {
    paths, 
    fallback: "blocking"
  }
}

interface IGetStaticProps extends ParsedUrlQuery { 
  postSlug: string,
}

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  
  try {
    
    const { params } = context
    const { postSlug } = params as IGetStaticProps
  
    const filePathToRead = path.join(process.cwd() + '/posts/' + postSlug + '.md')
    const fileContent = fs.readFileSync(filePathToRead, {encoding: "utf-8"})
  
    // const {content, data} = matter(fileContent)
  
    const source: any = await(serialize(fileContent, {parseFrontmatter: true}))
    
    return {
      props: { 
              post : {
                content: source,
                title: source.frontmatter.title
              }
            }
    }

  } catch (error) {
    return {
      notFound: true
    }
  }
  
}

export default SinglePage;