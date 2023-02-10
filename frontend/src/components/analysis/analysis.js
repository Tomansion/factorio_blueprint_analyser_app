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
    "effectivity-module": "Efficiency_module.png",
    "effectivity-module-2": "Efficiency_module_2.png",
    "effectivity-module-3": "Efficiency_module_3.png",
  }

  if (exceptions[entityName]) return exceptions[entityName];
  const result = capitalizeFirstLetter(entityName.replace(/-/g, '_')) + ".png";
  return result
}

function getMostLeftNode(nodes) {
  return nodes.reduce((mostLeftNode, node) => {
    if (node.x < mostLeftNode.x) return node;
    return mostLeftNode;
  }, nodes[0]);
}
function getMostTopNode(nodes) {
  return nodes.reduce((mostTopNode, node) => {
    if (node.y < mostTopNode.y) return node;
    return mostTopNode;
  }, nodes[0]);
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
      },
      font: {
        color: "#ffffff",
      },
    }

    // Deal with input and output
    if (entity.input)
      newNode.color.border = "blue";
    if (entity.output)
      newNode.color.border = "green";
    if (entity.usage_rate && entity.usage_rate >= 0.5) {
      newNode.color.border = "yellow";
      newNode.font.color = "yellow";
    }
    if (entity.usage_rate && entity.usage_rate >= 1) {
      newNode.color.border = "red";
      newNode.font.color = "red";
    }

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

  // Add legends
  const mostLeftNode = getMostLeftNode(nodes);
  const mostTopNode = getMostTopNode(nodes);
  nodes.push({
    id: "legend/inputLegend",
    group: "legend",
    label: "Materials input",
    x: mostLeftNode.x - 150,
    y: mostTopNode.y,
    color: {
      background: "transparent",
      border: "blue",
      hover: {
        background: "transparent", border: "blue"
      },
    }
  }, {
    id: "legend/outputLegend",
    group: "legend",
    label: "Materials output",
    x: mostLeftNode.x - 150,
    y: mostTopNode.y + 60,
    color: {
      background: "transparent",
      border: "green",
      hover: {
        background: "transparent", border: "green"
      },
    }
  }, {
    id: "legend/usageRateLegend",
    group: "legend",
    label: "Usage rate > 50%",
    x: mostLeftNode.x - 150,
    y: mostTopNode.y + 120,
    color: {
      background: "transparent",
      border: "yellow",
      hover: {
        background: "transparent", border: "yellow"
      },
    }
  }, {
    id: "legend/bottleneckLegend",
    group: "legend",
    label: "Usage rate = 100%\n(Bottleneck)",
    x: mostLeftNode.x - 150,
    y: mostTopNode.y + 180,
    color: {
      background: "transparent",
      border: "red",
      hover: {
        background: "transparent", border: "red"
      },
    }
  });

  return {
    nodes,
    edges,
  }
}

function getHoverLabel(node, blueprint) {
  // Possible id : 
  //    legend/...                 : legend
  //    1,                         : entity
  //    1/transported/iron-plate,  : transported item
  //    1/recipe                   : recipe

  // What to display :
  //    entity : Use rate
  //    transported item : items per second
  //    recipe : nothing

  if (node.includes("legend/")) return null;

  if (node.includes("/transported/")) {
    const entityNumber = node.split("/")[0];
    const itemName = node.split("/")[2];
    const entity = blueprint.entities.find(entity => entity.entity_number == entityNumber);
    const transportedItemsPerSecond = beautifulNumber(entity.transpoted_items[itemName]);
    return itemName + " : " + transportedItemsPerSecond + " items/s";
  }

  if (node.includes("/recipe")) {
    const entityNumber = node.split("/")[0];
    const entity = blueprint.entities.find(entity => entity.entity_number == entityNumber);
    return entity.recipe;
  }

  const entityNumber = node;
  const entity = blueprint.entities.find(entity => entity.entity_number == entityNumber);
  if (entity.usage_rate) return "Use rate :\n " + beautifulNumber(entity.usage_rate * 100) + "%";
  else return entity.name;
}

function beautifulNumber(number) {
  // Reduce number with a lot of decimals to a more readable format
  // 2.2666666666666666 => 2.27
  if (number == 0) return 0
  if (number < 0.001) return number.toFixed(6);
  if (number < 0.01) return number.toFixed(5);
  if (number < 0.1) return number.toFixed(4);
  if (number < 10) return number.toFixed(1);
  return Math.round(number);
}

export default {
  getAnalysedBlueprintNetwork,
  getHoverLabel,
  nameToImageName,
  beautifulNumber
}