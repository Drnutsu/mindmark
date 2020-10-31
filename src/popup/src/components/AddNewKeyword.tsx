import React, { useState } from 'react'
import { Button, Input } from 'antd'

interface AddNewKeywordProps {
  setKeyword: any
}

const AddNewKeyword = (props: AddNewKeywordProps) => {
  const [value, setvalue] = useState<string>('')
  const { setKeyword } = props 
  const handleValue = (e:any) => {
    setvalue(e.target.value)
    window.localStorage.setItem('keyword', JSON.stringify(value))
  }
  return <>
    <Input placeholder="Please Insert new keyword" onChange={handleValue} />
    <Button onClick={() => setKeyword(value)}>Add</Button>
  </>
}

export default AddNewKeyword
