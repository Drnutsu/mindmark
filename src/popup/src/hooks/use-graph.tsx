import React, { createContext, useContext, useEffect, useCallback, useState, ReactNode } from 'react'
import Graph from '../utils/graph'

export interface GraphContextType {
  addKeyword: (keyword: string) => void
  submitURL: (keyword: string, url: string) => void
  submitBrief: (keyword: string, brief: string) => void
  addLink: (origin: string, target: string) => void
  onCompleteLink: (origin: string, target: string) => void
  // TODO: need to check any to graph type.
  printGraph: () => any
}

const GraphContext = createContext<GraphContextType>({
  addKeyword: () => {},
  submitURL: () => {},
  submitBrief: () => {},
  addLink: () => {},
  onCompleteLink: () => {},
  printGraph: () => {}
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

  const printGraph = useCallback(() => {
    // [TODO] change to antd modal alert.
    if (!graph) {
      alert('graph is not defined, please try again')
    }
    return graph?.getGraph()
  }, [])

  const addKeyword = useCallback(
    (keyword: string) => {
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

  const addLink = useCallback(
    (origin: string, target: string) => {
      // [TODO] change to antd modal alert.
      if (!graph) {
        alert('graph is not defined, please try again')
      }
      // TODO: need to find a way to check, does link is already created or not.
      graph?.addLink(origin, target)
    },
    [graph]
  )

  const onCompleteLink = useCallback((origin: string, target: string) => {
    // [TODO] change to antd modal alert.
    if (!graph) {
      alert('graph is not defined, please try again')
    }
    // TODO: need to find a way to check, does link is already created or not.
    graph?.completeBackLink(origin, target)
  }, [])

  const context: GraphContextType = {
    addKeyword,
    submitURL,
    submitBrief,
    addLink,
    onCompleteLink,
    printGraph
  }

  return <GraphContext.Provider value={context}>{children}</GraphContext.Provider>
}

const useGraph = () => useContext(GraphContext)

export { GraphProvider, useGraph }
