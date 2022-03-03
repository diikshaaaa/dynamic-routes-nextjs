-> npx create-next-app dynamic-routes --use-npm </br>
-> npm run dev </br>
-> npm i typescript @types/node @types/react --save-dev </br>
-> npm run build (made folder tsconfig.json)</br>
-> npm install gray-matter --save-dev </br>
-> npm install remark remark-html </br>
-> To format the date, we’ll use the date-fns library.
npm install date-fns </br>
-> npm i sharp

Development v.s. Production
In development (npm run dev or yarn dev), getStaticPaths runs on every request.
In production, getStaticPaths runs at build time.

if we will visit:
http://localhost:3000/posts/ssg-ssr
http://localhost:3000/posts/pre-rendering

-> i am on
Important: We added the async keyword to getPostData because we need to use await for remark. async/await allow you to fetch data asynchronously.