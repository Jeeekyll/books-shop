import React from "react"
import ContentLoader from "react-content-loader"

const BooksPreloader = (props) => (
  <ContentLoader
    speed={2}
    width={700}
    height={190}
    viewBox="0 0 700 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="353" y="140" rx="0" ry="0" width="2" height="0" />
    <rect x="1" y="1" rx="9" ry="9" width="413" height="29" />
    <rect x="1" y="50" rx="7" ry="7" width="592" height="64" />
    <rect x="1" y="125" rx="9" ry="9" width="145" height="24" />
  </ContentLoader>
)

export default BooksPreloader;

