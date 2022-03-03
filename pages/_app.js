import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
//CSS Modules are useful for component-level styles. But if you want some CSS to be loaded by every page, we can create global CSS file which is _app.js
// App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages
// reason that global CSS can't be imported outside of pages/_app.js is that global CSS affects all elements on the page.