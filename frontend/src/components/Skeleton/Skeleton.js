import React from 'react'

import ContentLoader from 'react-content-loader'

export const Skeleton = (props) => {
  return (
    <ContentLoader
      width={270}
      height={273}
      viewBox="0 0 270 273"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="272" height="160" />
      <rect x="10" y="170" rx="4" ry="4" width="230" height="18" />
      <rect x="10" y="200" rx="3" ry="3" width="200" height="9" />
      <rect x="10" y="220" rx="3" ry="3" width="119" height="6" />
    </ContentLoader>
  )
}
