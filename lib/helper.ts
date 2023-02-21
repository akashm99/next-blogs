
import fs from 'fs'
import path from "path";
import matter from "gray-matter";
import { PostsApiResponse } from '../utils/types';

export const readPostsContent = () : PostsApiResponse => {
    const dirs = fs.readdirSync(path.join(process.cwd(),  'posts'))
    const data = dirs.map((filename) => {
        const fContent = fs.readFileSync(path.join(process.cwd(), 'posts/' + filename), 
                                        {encoding: 'utf-8'})  
        // console.log(matter(fContent).data)
        return matter(fContent).data
    })
    
    return data as PostsApiResponse;
}