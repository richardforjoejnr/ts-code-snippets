
export const QUERY_DATA = `
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

