/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // TODO: the logic to return a token
    console.log('Trying to get token');
    const tokenResponse = {
        "storefront_access_token": {
          "access_token": "{token}",
          "access_scope": "unauthenticated_read_content,unauthenticated_read_customer_tags,unauthenticated_read_product_tags,unauthenticated_read_product_listings,unauthenticated_write_checkouts,unauthenticated_read_checkouts,unauthenticated_write_customers,unauthenticated_read_customers",
          "created_at": "2019-05-09T17:05:22-04:00",
          "id": 22143565880,
          "admin_graphql_api_id": "gid://shopify/StorefrontAccessToken/22143565880",
          "title": "Test"
        }
      };
    res.send(tokenResponse);
};