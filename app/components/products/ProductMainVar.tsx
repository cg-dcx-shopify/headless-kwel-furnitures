"use client";

import { useState } from "react";
import styles from "@/app/products/[handle]/product-page.module.css";

export default function ProductImageGallery({
images,
variants,
}: {
images: any[];
variants: any[];
}) {
const [mainImage, setMainImage] = useState(
images?.[0]?.node?.url || variants?.[0]?.node?.image?.url
);

return (
<div className={styles.imageGallery}>

<img  
    src={mainImage}  
    alt="Main product image"  
    className={`${styles.productImage} ${styles.mainImage}`}  
  />  

  {images.map((img, index) => (  
    <img  
      key={index}  
      src={img.node.url}  
      alt={img.node.altText || ""}  
      className={styles.productImage}  
      onClick={() => setMainImage(img.node.url)}  
    />  
  ))}  
</div>

);
}

