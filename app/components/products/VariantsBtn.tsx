import styles from "@/app/products/[handle]/product-page.module.css";

export default function VariantsBtn({
  variants,
  selectedVariant,
  onVariantSelect,
}: any) {
  return (
    <div className={styles.btnDiv}>
      {variants.map((variant: any) => (
        <button
          key={variant.id}
          onClick={() => onVariantSelect(variant)}
          className={`${styles.button} ${
            selectedVariant.id === variant.id ? styles.active : ""
          }`}
        >
          {variant.title}
        </button>
      ))}
    </div>
  );
}