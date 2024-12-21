import React from 'react'
import { Title } from '../Title/Title'

export const NotFound = () => {
  return (
    <main style={{ padding: '1rem' }}>
      <Title backTo={'/'} title={'Page Not Found :('} />
      <p>We haven't find the page you disired!</p>
    </main>
  )
}
