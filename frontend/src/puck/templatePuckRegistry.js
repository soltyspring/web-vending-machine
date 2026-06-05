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
import {
  createNeonPuckDataFromTemplate,
  initialNeonPuckData,
  neonPuckConfig,
} from "./neonPuckConfig";
import {
  createPreparedPuckDataFromTemplate,
  initialBlogPuckData,
  initialBusinessPuckData,
  initialReservationPuckData,
  preparedPuckConfig,
} from "./preparedPuckConfig";

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
  neon: {
    config: neonPuckConfig,
    initialData: initialNeonPuckData,
    createData: createNeonPuckDataFromTemplate,
    isLegacyData: () => false,
  },
  business: {
    config: preparedPuckConfig,
    initialData: initialBusinessPuckData,
    createData: createPreparedPuckDataFromTemplate,
    isLegacyData: () => false,
  },
  reservation: {
    config: preparedPuckConfig,
    initialData: initialReservationPuckData,
    createData: createPreparedPuckDataFromTemplate,
    isLegacyData: () => false,
  },
  blog: {
    config: preparedPuckConfig,
    initialData: initialBlogPuckData,
    createData: createPreparedPuckDataFromTemplate,
    isLegacyData: () => false,
  },
};

export function getPuckTemplate(templateType = "shopping") {
  return registry[templateType] || registry.shopping;
}
