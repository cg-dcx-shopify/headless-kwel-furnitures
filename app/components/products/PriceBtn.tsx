import styles from './PriceBtn.module.css';

export default function PriceBtn({variants}: {variants: any[]}) {    
    return(
        <button className={styles.btn}>Add to Cart</button>
    );
}