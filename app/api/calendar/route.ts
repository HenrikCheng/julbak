import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("Christmas_bake");

		const ingredients = await db
			.collection("time_slot_booking")
			.find({})
			.sort({ date: 1 })
			.limit(10)
			.toArray();

		return NextResponse.json(ingredients);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
