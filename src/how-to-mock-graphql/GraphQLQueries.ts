export const PRODUCTS_QUERY = `
query ProductsData($preferredContentType: ImageContentType) {
    products(first: 10) {
      edges {
        node {
          id
          title
          images(first: 3) {
            edges {
              node {
                id
                transformedSrc(
                  maxWidth: 150
                  maxHeight: 100
                  preferredContentType: $preferredContentType
                )
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_F1_LEAGUE_TABLES = `query ???`;
export const QUERY_CRICKET_LEAGUE_TABLES = `query ???`;