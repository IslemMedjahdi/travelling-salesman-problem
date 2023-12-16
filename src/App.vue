<template>
  <div class="w-full flex justify-center">
    <div class="max-w-screen-lg p-4 w-full flex flex-col gap-y-2">
      <network-graph-visualiser
        :graph="(graph as Graph<string>)"
        :add-node="addNode"
        :add-edge="addEdge"
        :remove-node="removeNode"
      />
      <div class="bg-blue-50 text-sm px-4 py-2 border-blue-100 shadow-sm">
        <p class="underline">This work is done By:</p>
        <ul>
          <li>
            Islem Medjahdi
            <a
              href="mailto:ki_medjahdi@esi.dz"
              class="text-blue-600 hover:text-blue-700 hover:underline"
              >ki_medjahdi@esi.dz</a
            >
          </li>
          <li class="text-sm">
            Khaled Abderrahmene Habouche
            <a
              href="mailto:kk_habouche@esi.dz"
              class="text-blue-600 hover:text-blue-700 hover:underline"
              >kk_habouche@esi.dz</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Graph } from "./entities/Graph";
import NetworkGraphVisualiser from "./components/NetworkGraphVisualiser.vue";

const graph = ref<Graph<string>>(new Graph());

console.log(graph.value);

//print the graph in every change
watch(graph.value, (newGraph) => {
  console.log("Nodes:");
  console.log(newGraph.getNodes());
  console.log("Edges:");
  console.log(newGraph.getEdges());
});

const addNode = (value: string) => {
  graph.value.addNode(value);
};

const addEdge = (node1Id: string, node2Id: string, value: number) => {
  graph.value.addEdge(node1Id, node2Id, value);
};

const removeNode = (id: string) => {
  graph.value.removeNode(id);
};
</script>
