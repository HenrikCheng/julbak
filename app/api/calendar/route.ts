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

export async function POST(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db("Christmas_bake");

		const newItem = await request.json();
		const { name, date, position } = newItem;

		if (!name || !date || !position) {
			return NextResponse.json(
				{ error: "Missing required fields: name, date, or position" },
				{ status: 400 },
			);
		}

		const result = await db.collection("time_slot_booking").insertOne(newItem);
		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db("Christmas_bake");

		const url = new URL(request.url);
		const _id = url.searchParams.get("_id");

		if (!_id) {
			return NextResponse.json(
				{ error: "Missing required field: _id" },
				{ status: 400 },
			);
		}

		const result = await db
			.collection("time_slot_booking")
			.deleteOne({ _id: new ObjectId(_id) });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Item deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
