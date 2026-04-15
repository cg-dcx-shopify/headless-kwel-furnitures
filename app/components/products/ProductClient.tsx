"use client";

import { useState } from "react";
import VariantsBtn from "@/app/components/products/VariantsBtn";
import QuantityBtn from "@/app/components/products/QuantityBtn";
import SpecialInstruction from "@/app/components/products/SpecialInstructions";
import AddToCartButton from "@/app/components/cart/AddToCartButton";
import styles from "@/app/products/[handle]/product-page.module.css";

export default function ProductClient({ variants }: { variants: any[] }) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  return (
    <>
     
      <VariantsBtn
        variants={variants}
        selectedVariant={selectedVariant}
        onVariantSelect={setSelectedVariant}
      />

      
      <p className={styles.selectedVariant}>
        Selected variant:&nbsp;
        <strong>{selectedVariant.title}</strong>
      </p>

      <SpecialInstruction note={note} setNote={setNote} />

      <div className={styles.quantityAndCart}>
        <QuantityBtn quantity={quantity} setQuantity={setQuantity} />

        
        <AddToCartButton
          variantId={selectedVariant.id}
          quantity={quantity}
          note={note}
          buttonText={`Add ${selectedVariant.title} to Cart`}
        />
      </div>
    </>
  );
}