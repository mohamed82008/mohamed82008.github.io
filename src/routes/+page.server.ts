import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('api/pages')
	const posts: Post[] = await response.json()
	return { posts }
}
