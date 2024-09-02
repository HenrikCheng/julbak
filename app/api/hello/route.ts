export async function GET(request: any) {
	return new Response(JSON.stringify({ message: "Hello, world!" }), {
		headers: { "Content-Type": "application/json" },
	});
}
