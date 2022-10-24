function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function nameToImageName(entityName) {
  // Convert entity name to image name
  // Example : "fast-transport-belt" -> "Fast_transport_belt.png"

  const exceptions = {
    "fast-transport-belt": "Fast_transport_belt.png",
    "long-handed-inserter": "Long-handed_inserter.png"
  }

  if (exceptions[entityName]) return exceptions[entityName];

  return capitalizeFirstLetter(entityName.replace(/-/g, '_')) + ".png";
}

function getAnalysedBlueprintNetwork(blueprint) {
  if (!blueprint.entities) throw new Error('No entities in blueprint');

  const positionRatioIncrement = 50;
  const transportedItemsOffset = 15;
  const imageBaseUrl = "https://wiki.factorio.com/images/"

  // Expected node : {id: '', label: 'entityName'}
  // Expected edge : {from: 'id1', to: 'id2'}
  const nodes = [];
  const edges = [];

  blueprint.entities.forEach(entity => {
    // Add node
    if (!entity.name) throw new Error('No name in entity');
    if (!entity.entity_number) throw new Error('No entity_number in entity');
    if (!entity.position) throw new Error('No position in entity');

    nodes.push({
      id: entity.entity_number,
      // label: entity.name,
      x: entity.position.x * positionRatioIncrement,
      y: entity.position.y * positionRatioIncrement,
      image: imageBaseUrl + nameToImageName(entity.name),
      size: entity.name.includes("assembling-machine") ? 50 : 20,
    });

    // Add edges
    if (entity.children && entity.children.length > 0) {
      entity.children.forEach(childNumber => {
        edges.push({
          from: entity.entity_number,
          to: childNumber
        });
      })
    }

    // Add one node and one per tranposted item
    if (entity.transpoted_items) {
      Object.keys(entity.transpoted_items).forEach((itemName, i) => {
        const nodeId = entity.entity_number + "-transported-" + i
        nodes.push({
          id: nodeId,
          x: entity.position.x * positionRatioIncrement + transportedItemsOffset,
          y: entity.position.y * positionRatioIncrement + transportedItemsOffset * (i + 1),
          image: imageBaseUrl + nameToImageName(itemName),
          size: 10,
        });
        edges.push({
          from: entity.entity_number,
          to: nodeId
        });
      })
    }
  })



  return { nodes, edges };
}

export default {
  getAnalysedBlueprintNetwork,
}