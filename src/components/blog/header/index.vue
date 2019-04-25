<template>
	<header>
		<transition enter-active-class="animated fadeIn">
			<Header-top v-if="true"></Header-top>
		</transition>
		<nav>
			<Header-navbar></Header-navbar>
			<Header-search></Header-search>
		</nav>
	</header>
</template>


<script>
	import Topitem from "@/components/blog/header/BlogHeaderTop";
	import Navbar from "@/components/blog/header/BlogHeaderNavigation";
	import Search from "@/components/blog/header/BlogHeaderSearch";
	export default {
		components: {
			HeaderNavbar: Navbar,
			HeaderTop: Topitem,
			HeaderSearch: Search
		}
	};
</script>
<style lang="scss">
	@font-face {
		font-family: "Loto";
		src: url("https://fonts.googleapis.com/css?family=Lato:300");
	}

	@media (width: 360px) {
		header {
			height: 80px;

			nav {
				flex-direction: column-reverse !important;
			}
		}
	}

	@media (max-width: 768px) {
		header {
			nav {
				padding: 50px 0 20px !important;
				flex-direction: column-reverse !important;
			}
		}
	}

	header {
		position: relative;

		nav {
			display: flex;
			flex-direction: row;
			padding: 100px 0;
			justify-content: space-between;
		}
	}
</style>
