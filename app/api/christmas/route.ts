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
			.sort({ name: 1 })
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

		const { name, desired_amount, unit } = newItem;
		if (!name || !desired_amount || !unit) {
			return NextResponse.json(
				{ error: "Missing required fields: name, desired_amount, or unit" },
				{ status: 400 },
			);
		}

		const currentDate = new Date().toISOString();

		const itemWithDate = {
			...newItem,
			date: currentDate,
		};

		const result = await db.collection("bake_content").insertOne(itemWithDate);
		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.error(error);
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
		const itemId = url.searchParams.get("id");
		const contributorDate = url.searchParams.get("contributorDate");

		if (!itemId) {
			return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
		}

		let result;
		if (contributorDate && contributorDate.length > 0) {
			// Delete a specific contributor from an ingredient based on date
			result = await db
				.collection("bake_content")
				.updateOne(
					{ _id: new ObjectId(itemId) },
					{ $pull: { contributors: { date: contributorDate } as any } },
				);

			if (result.modifiedCount === 0) {
				return NextResponse.json(
					{ error: "Contributor not found or not removed" },
					{ status: 404 },
				);
			}

			return NextResponse.json(
				{ message: "Contributor deleted successfully" },
				{ status: 200 },
			);
		} else {
			// Delete the entire ingredient item
			result = await db
				.collection("bake_content")
				.deleteOne({ _id: new ObjectId(itemId) });

			if (result.deletedCount === 0) {
				return NextResponse.json({ error: "Item not found" }, { status: 404 });
			}

			return NextResponse.json(
				{ message: "Item deleted successfully" },
				{ status: 200 },
			);
		}
	} catch (error) {
		console.error(error);
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

		const url = new URL(request.url);
		const id = url.searchParams.get("id");
		const contributorDate = url.searchParams.get("contributorDate");

		if (!id) {
			return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
		}

		const updateOperation = await request.json();

		let result;

		if (contributorDate) {
			// Handle updates for a specific contributor identified by date
			result = await db.collection("bake_content").updateOne(
				{ _id: new ObjectId(id), "contributors.date": contributorDate },
				{ $set: { "contributors.$": updateOperation } }, // Update the specific contributor
			);

			if (result.matchedCount === 0) {
				return NextResponse.json(
					{ error: "Item or contributor not found" },
					{ status: 404 },
				);
			}

			return NextResponse.json(
				{ message: "Contributor updated successfully" },
				{ status: 200 },
			);
		} else if (updateOperation.$push) {
			// Add a new contributor
			const currentDate = new Date().toISOString();
			const updatedPushOperation = {
				...updateOperation,
				$push: {
					contributors: {
						...updateOperation.$push.contributors,
						date: currentDate,
					},
				},
			};

			result = await db
				.collection("bake_content")
				.updateOne({ _id: new ObjectId(id) }, updatedPushOperation);

			if (result.matchedCount === 0) {
				return NextResponse.json({ error: "Item not found" }, { status: 404 });
			}

			return NextResponse.json(
				{ message: "Item updated successfully" },
				{ status: 200 },
			);
		} else {
			// Default to setting fields if no special operation is specified
			result = await db
				.collection("bake_content")
				.updateOne({ _id: new ObjectId(id) }, { $set: updateOperation });

			if (result.matchedCount === 0) {
				return NextResponse.json({ error: "Item not found" }, { status: 404 });
			}

			return NextResponse.json(
				{ message: "Item updated successfully" },
				{ status: 200 },
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
