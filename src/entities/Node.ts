import { v4 as uuid } from "uuid";

export class Node<T> {
  private id: string;
  private value: T;
  private edges: {
    value: number;
    node: Node<T>;
  }[];

  constructor(value: T, id: string = uuid()) {
    this.id = id;
    this.value = value;
    this.edges = [];
  }

  addEdge(node: Node<T>, value: number) {
    const existingNode = this.edges.find(
      (edge) => edge.node.getId() === node.getId()
    );
    if (existingNode) {
      return;
    }
    this.edges.push({
      node,
      value,
    });
  }

  removeEdge(nodeId: string) {
    this.edges = this.edges.filter((edge) => edge.node.getId() !== nodeId);
  }

  getEdges() {
    return this.edges;
  }

  getValue() {
    return this.value;
  }

  getId() {
    return this.id;
  }
}
