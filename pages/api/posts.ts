import { NextApiHandler } from "next";
import fs from 'fs'
import path from "path";
import matter from "gray-matter";

const posts: NextApiHandler = (req, res) => {

    console.log(req.method)

    switch (req.method) {
        case "GET":
            const data = readPostsContent()
            // console.log({postInfo: data})
            return res.json({postInfo: data})
        default:
            return res.status(404).send("Page Not Found");
    }

}

const readPostsInfo = () => {
    return fs.readdirSync(path.join(process.cwd(), 'posts'))
}

const readPostsContent = () => {
    const dirs = fs.readdirSync(path.join(process.cwd(),  'posts'))
    const data = dirs.map((filename) => {
        const fContent = fs.readFileSync(path.join(process.cwd(), 'posts/' + filename), 
                                        {encoding: 'utf-8'})  
        // console.log(matter(fContent).data)
        return matter(fContent).data
    })
    return data
}

export default posts