import createGraph from 'ngraph.graph'

export interface NodePayloadType {
  // keyword, research topic
  keyword: string
  brief?: string
  // TODO: need to make url support multiple link
  url?: string
}

export interface RelationPayload {
  // summary relation between node.
  relationBrief: string
  // time spend for get the context of releation between topic.
  // it's edged's weight which effected the shortest path traverse.
  timeSpend: number
}

export default class Graph {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  init(): void {
    this.graph = createGraph()
  }

  getGraph(): any {
    return this.graph
  }

  addNewNode(nodePayload: NodePayloadType): NodePayloadType {
    if (!this.graph) throw Error('Please initialize the graph.')
    if (!nodePayload || !nodePayload.keyword) throw Error('payload is not included all required fields')
    // use keyword as a payload key
    this.graph.addNode(nodePayload?.keyword, nodePayload)
    return nodePayload
  }

  addNodePayload({ keyword, ...editedPayload }: NodePayloadType) {
    if (!this.graph) throw Error('Please initialize the graph.')
    if (!keyword) throw Error('payload is not included all required fields')
    // check is node is existed or not.
    const existedNode = this.graph.getNode(keyword)
    if (!existedNode) throw Error('node is not existed please, create node first.')
    const newPayload = {
      ...existedNode,
      ...editedPayload
    }
    // edit is just add to existed node
    this.graph.addNode(keyword, newPayload)
    return newPayload
  }

  addLink(origin: string, target: string) {
    if (!this.graph) throw Error('Please initialize the graph.')
    if (!origin || !target) throw Error('payload is not included all required fields')
    // add edge
    this.graph.addLink(origin, target)
  }
}
