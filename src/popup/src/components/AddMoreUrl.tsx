import React from 'react'
import { Button } from 'antd'

interface AddMoreUrlProps {
  keyword?: string
  url?: string
  handleStorage: () => void
}

const AddMoreUrl = (props: AddMoreUrlProps) => {
  const { keyword, url, handleStorage} = props
  return <div> {keyword} with {url}
  <Button onClick={handleStorage}>clear</Button>
  </div>
}

export default AddMoreUrl
