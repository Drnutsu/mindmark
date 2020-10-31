import React from 'react'
import ReactFlow from 'react-flow-renderer'
import 'antd/dist/antd.css';
import logo from './logo.svg'
import './App.css'

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
  return (
    <div>
      <div style={{ height: 300 }}>
        <ReactFlow elements={elements} />
      </div>
      <button onClick={openWindow}>OPEN WINDOW</button>
    </div>
  )
}

export default App
