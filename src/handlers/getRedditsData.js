const d = document,
	limit = 5,
	url = 'https://www.reddit.com/reddits.json'

/* Add event a document */
d.addEventListener('click', (e) => {
	if (e.target.matches('#get-reddits')) {
		fetchSubreddits(url, limit)
	}
})

/* fetch subrredits */
const fetchSubreddits = async (url, limit) => {
	const response = await fetch(`${url}?limit=${limit}`)
	const responseJSON = await response.json()

	// console.log(response, responseJSON);
	parseResults(responseJSON.data.children)
}

/* Parse results */
const parseResults = (data) => {
	const infoListReddit = []

	data.forEach(
		({
			data: {
				id,
				display_name,
				title,
				img_url,
				url_blog_subreddi,
				suscribers,
				public_description,
				date_create,
				name_blog,
				banner_img
			},
		}) => {
			infoListReddit.push({
				id,
				display_name,
				title,
				img_url,
				url_blog_subreddi,
				suscribers,
				public_description,
				date_create,
				name_blog,
				banner_img
			})
		}
	)

	// console.log(infoListReddit);
	displayReddits(infoListReddit)
}

const displayReddits = (info) => {
	const $content = d.getElementById('content'),
		$fragment = d.createDocumentFragment()

	info.forEach(
		(
			{
				id,
				display_name,
				title,
				img_url,
				url_blog_subreddi,
				suscribers,
				public_description,
				date_create,
				name_blog,
				banner_img
			},
			idx
		) => {
			rank = idx + 1
			const $card = d.createElement('a')
			$card.innerHTML = `${rank} -- id: ${id} -- display-name: ${display_name} -- img_url ${img_url} -- url_blog_subreddi:${url_blog_subreddi} -- suscribers: ${suscribers} titlle: ${title} -- date_create: ${date_create} -- name_blog: ${name_blog} -- banner_img: ${banner_img} -- public_description: ${public_description}
    <br>`
			$fragment.appendChild($card)
		}
	)

	$content.appendChild($fragment)
}
