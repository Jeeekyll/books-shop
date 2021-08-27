import React from "react"
import ContentLoader from "react-content-loader"

const SidebarPreloader = (props) => (
  <ContentLoader
    speed={2}
    width={250}
    height={60}
    viewBox="0 0 250 60"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="120" height="6" />
    <rect x="0" y="1" rx="6" ry="6" width="250" height="35" />
  </ContentLoader>
)

export default SidebarPreloader;