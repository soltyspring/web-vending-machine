import {
  createShoppingPuckDataFromTemplate,
  initialShoppingPuckData,
  isLegacyShoppingPuckData,
  shoppingPuckConfig,
} from "./shoppingPuckConfig";
import {
  createWeddingPuckDataFromTemplate,
  initialWeddingPuckData,
  weddingPuckConfig,
} from "./weddingPuckConfig";

const registry = {
  shopping: {
    config: shoppingPuckConfig,
    initialData: initialShoppingPuckData,
    createData: createShoppingPuckDataFromTemplate,
    isLegacyData: isLegacyShoppingPuckData,
  },
  wedding: {
    config: weddingPuckConfig,
    initialData: initialWeddingPuckData,
    createData: createWeddingPuckDataFromTemplate,
    isLegacyData: () => false,
  },
};

export function getPuckTemplate(templateType = "shopping") {
  return registry[templateType] || registry.shopping;
}
