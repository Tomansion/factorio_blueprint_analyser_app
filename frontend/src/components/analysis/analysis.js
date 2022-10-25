function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function nameToImageName(entityName) {
  // Convert entity name to image name
  // Example : "fast-transport-belt" -> "Fast_transport_belt.png"
  // Example : "long-handed-inserter" -> "Long-handed_inserter.png"

  const exceptions = {
    "long-handed-inserter": "Long-handed_inserter.png",
    "small-lamp": "Lamp.png",
    "logistic-chest-passive-provider": "Passive_provider_chest.png",
    "logistic-chest-active-provider": "Active_provider_chest.png",
    "logistic-chest-buffer": "Buffer_chest.png",
    "logistic-chest-requester": "Requester_chest.png",
    "logistic-chest-storage": "Storage_chest.png",
  }

  if (exceptions[entityName]) return exceptions[entityName];
  const result = capitalizeFirstLetter(entityName.replace(/-/g, '_')) + ".png";
  return result
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

    const nodeId = entity.entity_number.toString();
    const newNode = {
      id: nodeId,
      group: "entity",
      // label: entity.name,
      x: entity.position.x * positionRatioIncrement,
      y: entity.position.y * positionRatioIncrement,
      image: imageBaseUrl + nameToImageName(entity.name),
      size: entity.name.includes("assembling-machine") ? 60 : 20,
      opacity: entity.transpoted_items ? 1 : 0.3,
      color: {
        background: "transparent",
        border: "transparent",
      }
    }

    // Deal with input and output
    if (entity.input)
      newNode.color.border = "blue";
    if (entity.output)
      newNode.color.border = "green";

    nodes.push(newNode);

    // Add edges
    if (entity.children && entity.children.length > 0) {
      entity.children.forEach(childNumber => {
        edges.push({
          from: nodeId,
          to: childNumber,
          arrows: "to"
        });
      })
    }

    // Add one node and one per tranposted item
    if (entity.transpoted_items) {
      Object.keys(entity.transpoted_items).forEach((itemName, i) => {
        const transportedNodeId = nodeId + "/transported/" + itemName
        nodes.push({
          group: "tranpostedItem",
          id: transportedNodeId,
          label: {
            unselected: "./unselected.svg",
            selected: "./BROKEN_LINK/selected.svg",
          },
          x: entity.position.x * positionRatioIncrement + transportedItemsOffset,
          y: entity.position.y * positionRatioIncrement + transportedItemsOffset * (i + 1),
          image: imageBaseUrl + nameToImageName(itemName),
          shape: "circularImage",
          size: 10,

        });
      })
    }

    // Add assembly machines recipes
    if (entity.recipe) {
      const recipeNodeId = nodeId + "/recipe"
      nodes.push({
        id: recipeNodeId,
        group: "recipe",
        shape: "circularImage",
        x: entity.position.x * positionRatioIncrement,
        y: entity.position.y * positionRatioIncrement,
        image: imageBaseUrl + nameToImageName(entity.recipe),
        size: 30,
      });
    }
  })



  return { nodes, edges };
}

function getHoverLabel(node, blueprint) {
  // Possible id : 
  //    1,                         : entity
  //    1/transported/iron-plate,  : transported item
  //    1/recipe                   : recipe

  // What to display :
  //    entity : Use rate
  //    transported item : items per second
  //    recipe : nothing

  if (node.includes("/transported/")) {
    const entityNumber = node.split("/")[0];
    const itemName = node.split("/")[2];
    const entity = blueprint.entities.find(entity => entity.entity_number == entityNumber);
    const transportedItemsPerSecond = entity.transpoted_items[itemName];
    return itemName + " : " + transportedItemsPerSecond + " items/s";
  }

  if (node.includes("/recipe")) {
    const entityNumber = node.split("/")[0];
    const entity = blueprint.entities.find(entity => entity.entity_number == entityNumber);
    return entity.recipe;
  }

  const entityNumber = node;
  const entity = blueprint.entities.find(entity => entity.entity_number == entityNumber);
  if (entity.usage_rate) return "Use rate :\n " + (entity.usage_rate * 100) + "%";
  else return entity.name;
}

export default {
  getAnalysedBlueprintNetwork,
  getHoverLabel,
  nameToImageName
}