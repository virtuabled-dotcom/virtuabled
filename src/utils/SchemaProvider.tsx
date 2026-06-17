import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    category?: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

export interface HowToSchemaProps {
  name: string;
  description: string;
  steps: {
    name: string;
    text: string;
    image?: string;
    url?: string;
  }[];
  totalTime?: string;
}

export interface SchemaData {
  type: "Product" | "HowTo" | "Custom";
  productData?: ProductSchemaProps;
  howToData?: HowToSchemaProps;
  customData?: Record<string, any>;
}

interface SchemaContextType {
  setSchema: (schema: SchemaData | null) => void;
}

const SchemaContext = createContext<SchemaContextType | undefined>(undefined);

export function useSchema() {
  const context = useContext(SchemaContext);
  if (!context) {
    throw new Error("useSchema must be used within a SchemaContextProvider");
  }
  return context;
}

export function SchemaContextProvider({ children }: { children: React.ReactNode }) {
  const [currentSchema, setCurrentSchema] = useState<SchemaData | null>(null);

  useEffect(() => {
    const existingScript = document.getElementById("virtuabled-jsonld-schema");
    if (existingScript) {
      existingScript.remove();
    }

    if (!currentSchema) return;

    let jsonLd: Record<string, any> = {};

    if (currentSchema.type === "Product" && currentSchema.productData) {
      const p = currentSchema.productData;
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": p.name,
        "description": p.description,
        ...(p.image && { "image": p.image }),
        "brand": {
          "@type": "Brand",
          "name": p.brand || "Virtuabled"
        },
        ...(p.offers && {
          "offers": {
            "@type": "Offer",
            "price": p.offers.price,
            "priceCurrency": p.offers.priceCurrency,
            "category": p.offers.category || "B2B Solutions"
          }
        }),
        ...(p.aggregateRating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": p.aggregateRating.ratingValue,
            "reviewCount": p.aggregateRating.reviewCount
          }
        })
      };
    } else if (currentSchema.type === "HowTo" && currentSchema.howToData) {
      const h = currentSchema.howToData;
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": h.name,
        "description": h.description,
        ...(h.totalTime && { "totalTime": h.totalTime }),
        "step": h.steps.map((step, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": step.name,
          "itemListElement": [
            {
              "@type": "HowToDirection",
              "text": step.text
            }
          ],
          ...(step.image && { "image": step.image }),
          ...(step.url && { "url": step.url })
        }))
      };
    } else if (currentSchema.type === "Custom" && currentSchema.customData) {
      jsonLd = {
        "@context": "https://schema.org",
        ...currentSchema.customData
      };
    }

    if (Object.keys(jsonLd).length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "virtuabled-jsonld-schema";
      script.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.getElementById("virtuabled-jsonld-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [currentSchema]);

  return (
    <SchemaContext.Provider value={{ setSchema: setCurrentSchema }}>
      {children}
    </SchemaContext.Provider>
  );
}
