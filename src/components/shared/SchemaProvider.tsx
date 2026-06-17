import React, { useEffect } from "react";
import { useSchema, ProductSchemaProps, HowToSchemaProps } from "@/utils/SchemaProvider";

export type { ProductSchemaProps, HowToSchemaProps };

interface SchemaProviderProps {
  type: "Product" | "HowTo" | "Custom";
  productData?: ProductSchemaProps;
  howToData?: HowToSchemaProps;
  customData?: Record<string, any>;
}

export function SchemaProvider({ type, productData, howToData, customData }: SchemaProviderProps) {
  const { setSchema } = useSchema();

  useEffect(() => {
    setSchema({ type, productData, howToData, customData });
    return () => {
      setSchema(null);
    };
  }, [type, productData, howToData, customData, setSchema]);

  return null;
}
