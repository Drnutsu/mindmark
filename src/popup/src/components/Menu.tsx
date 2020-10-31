import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import AddNewKeyword from './AddNewKeyword'

const useKeyword = () => {
  const getKeyword = () => {
    const keyword = window.localStorage.getItem('keyword') as any
    return JSON.parse(keyword)
  }
  const [keyword, setKeyword] = useState<any>(getKeyword())
  return {
    keyword,
    setKeyword, 
  }
}

const useGetUrl = () => {
  const getURL = () => {
    const url = window.localStorage.getItem('url') as any
    return JSON.parse(url)
  }
  const [url, setUrl] = useState<any>(getURL())
  const handleSaveBookmark = () => {
    chrome.tabs.query({ active: true, currentWindow: true },
      function(tabs){
        setUrl(tabs[0].url)
      }
    )
  }
  window.localStorage.setItem('url', JSON.stringify(url))
  return {
    url,
    handleSaveBookmark,
  }
}

const useAddingKeyword = () => {
  const getFlagAddingKeyword = () => {
    const isAddingKeyword = window.localStorage.getItem('addingKeyword') as any
    return JSON.parse(isAddingKeyword)
  }
  const [isAddKeyword, setIsAddKeyword] = useState<any>(getFlagAddingKeyword())
  return {
    isAddKeyword,
    setIsAddKeyword
  }

}

const Menu = () => {
  const {keyword, setKeyword} = useKeyword()
  const {url, handleSaveBookmark} = useGetUrl()
  const {isAddKeyword, setIsAddKeyword} = useAddingKeyword()

  const handleAddKeyword = () => {
    setIsAddKeyword(true)
    window.localStorage.setItem('addingKeyword', JSON.stringify(true))
    handleSaveBookmark()
  }
  
  const handleStorage = () => {
    window.localStorage.clear()
    setIsAddKeyword(false)
    setKeyword('')
  }

  if(keyword) {
    return <div> {keyword} with {url}
    <Button onClick={handleStorage}>clear</Button>
    </div>
  }

  return <div>
    {!isAddKeyword ?<Button onClick={handleAddKeyword}>Add new keyword</Button>: <AddNewKeyword setKeyword={setKeyword} /> }
    <Button onClick={handleStorage}>clear</Button>
  </div>
}

export default Menu
