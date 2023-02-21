import Link from 'next/link';
import { FC } from 'react';

interface Props {
    title: String;
    desc: String;
    slug: String;
}

const Blog: FC<Props> = ({title, desc, slug}): JSX.Element => {
  return (
  <Link legacyBehavior href = {'/blogs/' + slug}>
  <a className='block'>
  <div className='bg-green-100 p-2 rounded '>
    <h1 className='text-gray-900 text-3xl font-semibold'>
        {title}</h1>
    <p className='text-gray-500'>
        {desc}
    </p>
  </div>
  </a>
  </Link>
  )};

export default Blog;