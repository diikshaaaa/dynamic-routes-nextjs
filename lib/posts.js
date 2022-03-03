import fs from 'fs'
// fs (File System)
// features of the fs module are:
// readFile to read data from a file,
// writeFile to write data to a file (also replaces the file if it already exists),
// watchFile to watch a file and get notified about changes, and.
// appendFile to append data to a file
import path from 'path'
import matter from 'gray-matter'
// gray-matter npm package for parsing front matter
// Front matter is the first portion of the report and contains the title page, abstract, table of contents, list of figures, list of tables, forward, preface, and list of abbreviations and symbols.
import { remark } from 'remark'
// remark is a markdown processor 
import html from 'remark-html'
// remark-html to compile Markdown to HTML

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
// getAllPostIds function will return the list of file names (excluding .md) in the posts directory
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  // returned list is not just an array of strings — it must be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
// We added the async keyword to getPostData because we need to use await for remark
// getPostData function will return the post data based on id.
const fullPath = path.join(postsDirectory, `${id}.md`)
const fileContents = fs.readFileSync(fullPath, 'utf8')

// Use gray-matter to parse the post metadata section
const matterResult = matter(fileContents)

// Use remark to convert markdown into HTML string
const processedContent = await remark()
  .use(html)
  // use() function is used to mount the specific thing
  .process(matterResult.content)
const contentHtml = processedContent.toString()

// Combine the data with the id and contentHtml
return {
  id,
  contentHtml,
  ...matterResult.data
}
}