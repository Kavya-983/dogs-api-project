import axios from "axios";
import { NextResponse } from "next/server";
import { DOGS_API, DOGS_API_KEY } from "../lib/constants";

export async function GET(request) {
  try {
    const { nextUrl } = request;
    const searchParams = nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const breed = searchParams.get("breed");

    const params = {
      limit,
      breed_ids: breed,
      order: "ASC",
      page,
      has_breeds: true,
      api_key: DOGS_API_KEY,
    };

    const response = await axios.get(DOGS_API, { params });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data`);
    }
    const totalCount = response.headers['pagination-count'] || 0;
    return NextResponse.json({ images: response.data, total: totalCount });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
