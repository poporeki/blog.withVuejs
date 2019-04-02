<template>
	<div class="bread">
		<ol class="breadcrumb">
			<li>
				<router-link to="/">Home</router-link>
			</li>
			<li>
				<router-link :to="'/blog/articlelist?by[type_id]='+arctype.id">{{arctype.name}}</router-link>
			</li>
			<li style="color:#aaa">{{arctitle}}</li>
		</ol>
	</div>
</template>
<style lang="scss">
	.bread {
		margin-bottom: 50px;
		padding: 5px 0;
		border-top: 2px solid rgb(177, 177, 177);

		.breadcrumb {
			display: flex;
			flex-direction: row;
			padding: 0;
			margin: 0;
			font-size: 16px;

			> li {
				color: #fff;
				display: flex;
				flex-direction: row;

				a {
					display: block;
					color: #fff;
					transition: transform 0.3s ease, background-color 0.3s ease;

					&:hover {
						transform: rotate(6deg);
					}

					&:active {
						transform: scale(0.9);
					}
				}

				&:first-child:before {
					content: "";
				}

				&:before {
					padding: 0 5px;
					content: "/\00a0";
				}
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {};
		},

		props: ["arctype", "arctitle", "arcid"]
	};
</script>

