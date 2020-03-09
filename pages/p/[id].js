import {useRouter} from 'next/router';
import Layout from '../../comps/MyLayout';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
    {props.show.image ? <img src={props.show.image.medium} /> : null}
  </Layout>
)

function Post_old() {
  const router = useRouter();

  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <h2>this uses query params via `/p/[id].js`for dynamic routing</h2>
      <p>This is the blog post content.</p>
    </Layout>
  )
}

Post.getInitialProps = async function(context) {
  const { id} = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();
  console.log(`Fetched show : ${show.name}`);
  return {show}
}

const StyleTut = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <div className="markdown">
        <Markdown source={`
          This is our blog post. 
          Yes we can have a [link](/link).
          And we can have a title as well.

          # WTF

          ### This is a title indeed.

          And here's the content
          `}
        />
        <style jsx global>{`
          .markdown {
            font-family: 'Arial';
          }

          .markdown a {
            text-decoration: none;
            color: blue;
          }

          .markdown a:hover {
            opacity: 0.6;
          }

          .markdown h3 {
            margin : 0;
            padding : 0;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    </Layout>
  )


}
export default () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <div className="markdown">
        <Markdown
          source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
      `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};

//export default Post;
