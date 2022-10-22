function getNodesFromAnalysedBlueprint(blueprint) {
  if (!blueprint.entities) throw new Error('No entities in blueprint');

  // Expected node : {id: '', label: 'entityName'}
  const nodes = [];

  blueprint.entities.forEach(entity => {
    if (!entity.name) throw new Error('No name in entity');
    if (!entity.entity_number) throw new Error('No entity_number in entity');

    nodes.push({
      id: entity.entity_number,
      label: entity.name
    });
  })
  console.log("nodes")
  console.log(nodes)

  return nodes;
}

function getEdgesFromAnalysedBlueprint(blueprint) {
  if (!blueprint.entities) throw new Error('No entities in blueprint');

  // Expected edge : {from: 'id1', to: 'id2'}
  const edges = [];

  blueprint.entities.forEach(entity => {
    if (!entity.children || entity.children.length === 0) return;

    entity.children.forEach(childNumber => {
      edges.push({
        from: entity.entity_number,
        to: childNumber
      });
    })
  })
  console.log("edges")
  console.log(edges)
  return edges;
}

console.log(getNodesFromAnalysedBlueprint);
console.log(getEdgesFromAnalysedBlueprint);

export default {
  getNodesFromAnalysedBlueprint,
  getEdgesFromAnalysedBlueprint
}