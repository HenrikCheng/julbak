// app/api/christmas/route.ts

import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("Christmas_bake");

		const ingredients = await db
			.collection("bake_content")
			.find({})
			.sort({ metacritic: -1 })
			.limit(10)
			.toArray();

		return NextResponse.json(ingredients);
	} catch (e) {
		console.error(e);

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

		if (!newItem.name || !newItem.desired_amount || !newItem.unit) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		const result = await db.collection("bake_content").insertOne(newItem);

		return NextResponse.json(result, { status: 201 });
	} catch (e) {
		console.error(e);

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
		const id = url.searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
		}

		const result = await db
			.collection("bake_content")
			.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Item deleted successfully" },
			{ status: 200 },
		);
	} catch (e) {
		console.error(e);

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function PATCH(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db("Christmas_bake");

		// Extract the ID from the request URL
		const url = new URL(request.url);
		const id = url.searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
		}

		const updatedData = await request.json();

		const result = await db
			.collection("bake_content")
			.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Item updated successfully" },
			{ status: 200 },
		);
	} catch (e) {
		console.error(e);

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
