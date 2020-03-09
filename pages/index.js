import Link from 'next/link';
import Layout from '../comps/MyLayout';
import Header from '../comps/Header';
import fetch from 'isomorphic-unfetch';

const PostLink = props => (
  <>
    <li> regular link :</li>
    <li>
      <Link href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
    <li> dynamic link : </li>
    <li>
      <Link href="/p/[id]" as={`/p/${props.id}`}>
        <a>{props.id}</a>
      </Link>
    </li>
  </>
);


const Index = props => {
  return (
    <Layout>
      <h1>My Blog</h1>
        <ul>
          <PostLink id="hello-nextjs" title={"Hello Next.js"}/>
          <PostLink id="learn-nextjs" title={"Learn nextjs is awesome"}/>
          <PostLink id="deploy-nextjs" title={"Maybe deploy apps with Zeit"}/>
        </ul>
      <div>
        <p>Hello next.js</p>
        {['lol'].map((el) => <p>{el}</p>)}
        <a href="/about">Server Side Route to About?</a><br/>
        <Link href="/about" title="About Page"><a>Client Side Route to About</a></Link>
      </div>
      <h2>Batman TV Shows</h2>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();
  console.log(`show data fetched. Count ${data.length}`);
  return {
    shows: data.map(entry => entry.show)
  }
}

function getPosts() {
  return [
    {id : 'hello-nextjs', title: 'Hello Nextjs'},
    {id : 'learn-nextjs', title: 'Learn Next.js is awesome'},
    {id : 'deploy-nextjs', title: 'Deploy apps with Zeit'},
  ]
}

const NewPostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
  </li>
)

const Blog = () => {
  return (
    <Layout>
      <h1>My Blog</h1>
      <h2>Blog Component</h2>
      <ul>
        {getPosts().map(post => {
          return (
            <NewPostLink key={post.id} post={post}/>
          )
        })}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        `}
      </style>
    </Layout>
  )
}

export default Blog;

