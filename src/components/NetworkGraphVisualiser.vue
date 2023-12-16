<template>
  <div class="w-full flex flex-col gap-2">
    <div class="flex justify-center">
      <p class="font-serif text-2xl font-medium">Travelling Salesman Problem</p>
    </div>
    <el-alert title="To select multiple nodes, Shift+click" type="info" />
    <div
      class="flex items-center flex-wrap gap-2 bg-blue-50 px-4 py-2 border-blue-100"
    >
      <el-input v-model="newNodeValue" placeholder="Node Value">
        <template #append>
          <el-button :icon="Plus" @click="onAddNode" />
        </template>
      </el-input>
      <el-button
        type="primary"
        plain
        @click="onRemoveSelectedNodes"
        :disabled="selectedNodes.length === 0"
        >Remove Selected Nodes</el-button
      >
      <el-button
        type="primary"
        plain
        :disabled="selectedNodes.length != 2"
        @click="onAddEdge"
        >Add Edge</el-button
      >
      <el-input-number v-model="newEdgeValue" placeholder="Edge Value">
      </el-input-number>
    </div>
    <div class="w-full h-96 border-blue-100 border-2">
      <v-network-graph
        :configs="configs"
        :nodes="nodes"
        :edges="edges"
        v-model:selected-nodes="selectedNodes"
      >
        <template #edge-label="{ edge, ...slotProps }">
          <v-edge-label
            :text="`${edge.cost}`"
            align="center"
            vertical-align="below"
            v-bind="slotProps"
          />
        </template>
      </v-network-graph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { ref, defineProps, watch, reactive } from "vue";
import { VNetworkGraph, defineConfigs, VEdgeLabel } from "v-network-graph";
import "v-network-graph/lib/style.css";
import type { Graph } from "@/entities/Graph";
import type { Edges, Nodes } from "v-network-graph";

type Props = {
  graph: Graph<string>;
  addNode: (value: string) => void;
  removeNode: (id: string) => void;
  addEdge: (from: string, to: string, value: number) => void;
};
const props = defineProps<Props>();

const nodes = ref<Nodes>({});
const edges = ref<Edges>({});
const selectedNodes = ref<string[]>([]);

const configs = reactive(
  defineConfigs({
    node: {
      selectable: true,
    },
    path: {
      visible: true,
      curveInNode: true,
      path: {
        width: 14,
        color: "#ff000088",
      },
    },
  })
);

watch(props.graph, (newGraph) => {
  nodes.value = {};
  edges.value = {};

  newGraph.getNodes().forEach((node) => {
    nodes.value[node.getId()] = {
      name: node.getValue(),
      id: node.getId(),
    };
  });

  newGraph.getEdges().forEach((edge) => {
    const [source, target] = edge;
    edges.value[
      `${source.node.getId()}-${target.node.getId()}-${source.value}`
    ] = {
      source: source.node.getId(),
      target: target.node.getId(),
      cost: source.value,
    };
  });
});

const newNodeValue = ref("");

const onAddNode = () => {
  props.addNode(newNodeValue.value);
  newNodeValue.value = "";
};

const onRemoveSelectedNodes = () => {
  selectedNodes.value.forEach((nodeId) => {
    delete nodes.value[nodeId];
    props.removeNode(nodeId);
  });

  selectedNodes.value = [];
};

const newEdgeValue = ref(0);

const onAddEdge = () => {
  const value = newEdgeValue.value;

  if (selectedNodes.value.length === 2) {
    const [source, target] = selectedNodes.value;
    props.addEdge(source, target, value);
    newEdgeValue.value = 0;
  }
};
</script>
