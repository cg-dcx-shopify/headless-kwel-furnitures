export const GET_PRODUCTS = `
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;
export const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
        variants(first: 10) {
        edges {
          node {
            id
            title
            image{
              url
              altText
            }
            price {
                amount
                currencyCode
            }

          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = `
  query getCollections {
    collections(first: 20) {
      edges {
        node {
          id
          title
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  query getCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      image {
        url
        altText
      }
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    totalQuantity
    checkoutUrl

    cost {
      subtotalAmount {
        amount
      }

      totalAmount {
        amount
      }
    }

    lines(first: 20) {
      edges {
        node {
          id
          quantity

          attributes{
            key
            value
          }
          cost {
            totalAmount {
              amount
            }
          }

          merchandise {
            ... on ProductVariant {
              title

              product {
                title

                featuredImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`;