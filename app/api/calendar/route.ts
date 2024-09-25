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
			.limit(100)
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

		// Check if an existing entry with the same date and position exists
		const existingItem = await db
			.collection("time_slot_booking")
			.findOne({ date, position });

		if (existingItem) {
			// Delete the existing item
			const deleteResult = await db
				.collection("time_slot_booking")
				.deleteOne({ _id: existingItem._id });

			if (deleteResult.deletedCount === 0) {
				return NextResponse.json(
					{ error: "Failed to delete existing item" },
					{ status: 500 },
				);
			}
		}

		// Insert the new item
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

export async function PUT(request: Request) {
	try {
		const db = (await clientPromise).db("Christmas_bake");
		const url = new URL(request.url);
		const _id = url.searchParams.get("_id");

		if (!_id)
			return NextResponse.json({ error: "No _id provided" }, { status: 400 });

		const updatedItem = await request.json();
		const { name, date, position } = updatedItem;

		if (!name || !date || !position)
			return NextResponse.json(
				{ error: "Missing name, date or position" },
				{ status: 400 },
			);

		const existingItem = await db
			.collection("time_slot_booking")
			.findOne({ _id: new ObjectId(_id) });
		if (!existingItem) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		const result = await db
			.collection("time_slot_booking")
			.replaceOne({ _id: new ObjectId(_id) }, { name, date, position });

		if (result.modifiedCount === 0) {
			return NextResponse.json({ error: "No changes made" }, { status: 400 });
		}

		return NextResponse.json({
			message: "Update successful",
			updatedItem: { name, date, position },
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
