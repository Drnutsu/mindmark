import React, { useState, useReducer } from 'react'
import { Button } from 'antd'
import AddNewKeyword from './AddNewKeyword'
import AddMoreUrl from './AddMoreUrl'

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

const initialState = {keyword: '', url: '', isAddKeyword: false};

function reducer(state: any, action:any) {
  switch (action.type) {
    case 'clearKeyword':
      return initialState;
    default:
      throw new Error();
  }
}

const Menu = () => {
  const {keyword, setKeyword} = useKeyword()
  const {url, handleSaveBookmark} = useGetUrl()
  const {isAddKeyword, setIsAddKeyword} = useAddingKeyword()
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  const handleAddKeyword = () => {
    setIsAddKeyword(true)
    window.localStorage.setItem('addingKeyword', JSON.stringify(true))
    handleSaveBookmark()
  }
  
  const handleStorage = () => {
    window.localStorage.clear()
    dispatch({type: 'clearKeyword'})
  }

  if(keyword) {
    return <AddMoreUrl handleStorage={handleStorage} keyword={keyword} url={url}/>
  }

  return <div>
    {!isAddKeyword ?<Button onClick={handleAddKeyword}>Add new keyword</Button>: <AddNewKeyword setKeyword={setKeyword} /> }
    <Button onClick={handleStorage}>clear</Button>
  </div>
}

export default Menu
