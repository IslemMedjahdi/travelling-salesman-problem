import { Node } from "./Node";

export class Graph<T> {
  private nodes: Node<T>[];

  constructor() {
    this.nodes = [];
  }

  addNode(value: T, id?: string) {
    const newNode = new Node(value, id);
    this.nodes.push(newNode);
    return newNode;
  }

  addEdge(node1Id: string, node2Id: string, value: number) {
    const node1 = this.nodes.find((node) => node.getId() === node1Id);
    const node2 = this.nodes.find((node) => node.getId() === node2Id);

    if (!node1 || !node2) {
      throw new Error("Invalid node IDs");
    }
    node1.addEdge(node2, value);
    node2.addEdge(node1, value);
  }

  getNodes() {
    return this.nodes;
  }

  getEdges(): [
    {
      value: number;
      node: Node<T>;
    },
    {
      value: number;
      node: Node<T>;
    }
  ][] {
    const edges: [
      {
        value: number;
        node: Node<T>;
      },
      {
        value: number;
        node: Node<T>;
      }
    ][] = [];

    this.nodes.forEach((node) => {
      node.getEdges().forEach((edge) => {
        const alreadyAdded = edges.find((e) => {
          return (
            e[0].node.getId() === edge.node.getId() &&
            e[1].node.getId() === node.getId()
          );
        });
        if (!alreadyAdded)
          edges.push([
            {
              node,
              value: edge.value,
            },
            {
              node: edge.node,
              value: edge.value,
            },
          ]);
      });
    });

    return edges;
  }

  removeNode(nodeId: string) {
    const nodeToRemove = this.nodes.find((node) => node.getId() === nodeId);
    if (!nodeToRemove) {
      throw new Error("Invalid node ID");
    }

    this.nodes = this.nodes.filter((node) => node.getId() !== nodeId);

    this.nodes.forEach((node) => {
      node.removeEdge(node.getId());
    });
  }

  clone(): Graph<T> {
    const cloneGraph = new Graph<T>();
    this.nodes.forEach((node) => {
      cloneGraph.addNode(node.getValue(), node.getId());
    });

    this.getEdges().forEach(([edge1, edge2]) => {
      cloneGraph.addEdge(edge1.node.getId(), edge2.node.getId(), edge1.value);
    });

    return cloneGraph;
  }
}
