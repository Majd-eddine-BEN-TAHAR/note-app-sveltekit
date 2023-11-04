<script lang="ts">
	import '../app.css';
	import '@fontsource/rubik';
	import '@fontsource/rubik/500.css';
	import { browser } from '$app/environment';

	function loadDummyDataToStart() {
		if (browser) {
			const data = JSON.parse(localStorage.getItem('storedData'));
			if (data.NOTES.length === 0) {
				localStorage.setItem(
					'storedData',
					JSON.stringify({
						TAGS: [
							{ value: '5a4a93a1-f9c8-4442-9e18-9a9a95796a97', label: 'ReactJS' },
							{ value: '78aba75c-1e79-4302-b36b-2cd463c3decd', label: 'NextJS' }
						],
						NOTES: [
							{
								title: "What's React and Next.js?",
								markdown:
									"React and Next.js are two powerful technologies that have become the standard for building modern web applications. If you're new to web development or looking to expand your skills, this article will provide you with a foundational understanding of React and Next.js.\n\n## What is React?\n\nReact is a JavaScript library for building user interfaces. Developed by Facebook, it allows you to create interactive, dynamic, and reusable UI components. React makes it easier to manage complex user interfaces by breaking them down into smaller, manageable pieces.\n\n### Key Concepts in React\n\n1. **Components**: React applications are built using components. Components are reusable, self-contained building blocks that represent parts of your user interface. They can be as simple as a button or as complex as an entire page.\n\n2. **Virtual DOM**: React uses a Virtual DOM to efficiently update the actual DOM. Instead of updating the entire DOM every time a change occurs, React calculates the minimal number of updates needed to reflect the new state.\n\n3. **State and Props**: React components can have state and receive props. State allows components to manage their own data, while props are used to pass data from parent to child components.\n\n4. **Lifecycle Methods**: React components have a set of lifecycle methods that allow you to interact with them at different stages. You can use these methods to perform tasks like data fetching, updating, and cleaning up resources.\n\n## What is Next.js?\n\nNext.js is a React framework for building server-rendered React applications. It adds server-side rendering (SSR), routing, and other features to React applications. Next.js simplifies the process of setting up a React project, handling routing, and optimizing performance.\n\n### Key Concepts in Next.js\n\n1. **Server-Side Rendering**: Next.js allows you to pre-render pages on the server, which improves SEO and initial page load performance. Pages can be pre-rendered at build time (static) or at request time (server-side rendering).\n\n2. **File-Based Routing**: Next.js uses a file-based routing system. For example, creating a file named `about.js` in the `pages` directory automatically creates a route at `/about`.\n\n3. **Data Fetching**: Next.js provides data fetching methods that allow you to fetch data during server-side rendering or on the client side. This makes it easy to incorporate external data into your pages.\n\n4. **Static Site Generation (SSG)**: Next.js can generate static HTML files at build time for better performance and scalability. This is especially useful for content-heavy websites.",
								value: '444452ff-1b97-4f1c-b19b-e96cf2ff86a9',
								tagIds: [
									'5a4a93a1-f9c8-4442-9e18-9a9a95796a97',
									'78aba75c-1e79-4302-b36b-2cd463c3decd'
								]
							}
						]
					})
				);
			}
		}
	}

	loadDummyDataToStart();
</script>

<div class="max-w-4xl px-4 mx-auto my-4">
	<slot />
</div>

<style>
	:global(body) {
		font-family: 'Rubik', sans-serif;
	}
</style>
