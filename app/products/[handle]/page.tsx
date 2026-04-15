import { shopifyFetch } from "@/lib/shopify/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import { notFound } from "next/navigation";
import styles from "./product-page.module.css";
import ProductMainVar from "@/app/components/ProductMainVar";
import ProductClient from "@/app/components/ProductClient";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;

  const result = await shopifyFetch<any>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  const product = result?.data?.productByHandle;
  if (!product) notFound();

  const images = product.images.edges ?? [];
  const variants = product.variants.edges.map((e: any) => e.node);

  if (!variants.length) {
    throw new Error("Product has no variants");
  }

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <ProductMainVar images={images} variants={variants} />

        <div className={styles.content}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>

          <p className={styles.price}>
            {product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>

         
          <ProductClient variants={variants} />
        </div>
      </div>
    </main>
  );
}
