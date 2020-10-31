import React from 'react'
import ReactFlow from 'react-flow-renderer'
import 'antd/dist/antd.css'

import { useGraph } from './hooks/use-graph'
import logo from './logo.svg'
import './App.css'
import Menu from './components/Menu'

const elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 }
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 }
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 }
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' }
]

const openWindow = () => {
  chrome.windows.create(
    {
      url: 'https://www.google.com',
      type: 'popup'
    },
    (win) => {
      console.log(' win : ', win)
    }
  )
}

function App() {
  const { addKeyword, submitURL, addLink, printGraph } = useGraph()
  return (
    <div>
      <div style={{ height: 300 }}>
        <ReactFlow elements={elements} />
      </div>
      <button
        onClick={() => {
          addKeyword('test')
          addKeyword('test2')
        }}
      >
        ADD KEYWORD
      </button>
      <button
        onClick={() => {
          addLink('test', 'test2')
        }}
      >
        ADD LINK
      </button>
      <button
        onClick={() => {
          console.log(' graph: ', printGraph()?.toString())
        }}
      >
        Check Result
      </button>
    </div>
  )
}

export default App
