import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const dir_file = params.slug.split('/')
		let post
		if (dir_file.length == 1) {
			post = await import(`../../pages/${dir_file[0]}.md`)
		} else if (dir_file.length == 2) {
			post = await import(`../../pages/${dir_file[0]}/${dir_file[1]}.md`)
		} else {
			error(404, 'Only 2 levels in are currently implement.')
		}
		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		console.log(e)
		error(404, `Could not find ${params.slug}`)
	}
}
