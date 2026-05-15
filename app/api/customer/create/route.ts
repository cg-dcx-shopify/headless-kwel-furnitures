import {
  NextRequest,
  NextResponse,
} from "next/server";

import { shopifyFetch }
from "@/lib/shopify/shopify";

import { CREATE_CUSTOMER }
from "@/lib/shopify/queries";

export async function POST(
  req: NextRequest
) {

  try {

    const {
      firstName,
      email,
      password,
    } = await req.json();

    const res = await shopifyFetch<any>({
      query: CREATE_CUSTOMER,

      variables: {
        input: {
          firstName,
          email,
          password,
        },
      },
    });

    return NextResponse.json(res);

  } catch {

    return NextResponse.json(
      {
        error: "Customer create failed",
      },
      {
        status: 500,
      }
    );
  }
}