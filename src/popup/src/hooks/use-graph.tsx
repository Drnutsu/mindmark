import React, { createContext, useContext, useEffect, useCallback, useState, ReactNode } from 'react'
import Graph from '../utils/graph'

export interface GraphContextType {
  addKeyword: () => void
  submitURL: () => void
  submitBrief: () => void
}

const GraphContext = createContext<GraphContextType>({
  addKeyword: () => {},
  submitURL: () => {},
  submitBrief: () => {}
})

function GraphProvider({ children }: { children: ReactNode }) {
  // TODO: change any to graph type.
  const [graph, setGraph] = useState<Graph | null>(null)
  useEffect(() => {
    // TODO: need to get graph from indexed DB and setTo initial model.
    const graph = new Graph(null)
    if (!graph.getGraph()) graph.init()
    setGraph(graph)
  }, [])

  const addKeyword = useCallback(
    () => (keyword: string) => {
      // [TODO] change to antd modal alert.
      if (!graph) {
        alert('graph is not defined, please try again')
      }
      graph?.addNewNode({ keyword })
    },
    [graph]
  )

  const submitURL = useCallback(
    (keyword: string, url: string) => {
      // [TODO] change to antd modal alert.
      if (!graph) {
        alert('graph is not defined, please try again')
      }
      graph?.addNodePayload({ keyword, url })
    },
    [graph]
  )

  const submitBrief = useCallback(
    (keyword: string, brief: string) => {
      // [TODO] change to antd modal alert.
      if (!graph) {
        alert('graph is not defined, please try again')
      }
      graph?.addNodePayload({ keyword, brief })
    },
    [graph]
  )

  const addLink = useCallback()

  const context: GraphContextType = {
    addKeyword,
    submitURL,
    submitBrief
  }

  return <GraphContext.Provider value={context}>{children}</GraphContext.Provider>
}

const useGraph = () => useContext(GraphContext)

export { GraphProvider, useGraph }
