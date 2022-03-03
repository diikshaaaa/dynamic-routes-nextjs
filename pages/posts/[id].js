import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
// post page is now using the getPostData function in getStaticProps to get the post data and return it as props.
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  // paths contains the array of known paths returned by getAllPostIds()
  return {
    paths,
    fallback: false
    // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

    // If fallback is true, then the behavior of getStaticProps changes:

    // The paths returned from getStaticPaths will be rendered to HTML at build time.
    // The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
    // In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.
    // If fallback is blocking, then new paths will be server-side rendered with getStaticProps, and cached for future requests so it only happens once per path.
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        {/* using dangerouslySetInnerHTML , you can set HTML directly from React */}
        {/* dangerouslySetInnerHTML is React's replacement for using innerHTML  */}
      </article>
    </Layout>
  )
}