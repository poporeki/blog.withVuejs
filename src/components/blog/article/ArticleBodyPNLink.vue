<template>
	<div class="o-arc-lkbox">
		<div class="arc-link-wrap prev" v-if="arcPrev">
			<span class="iconfont icon-arrow-left"></span>
			<router-link :to="'/blog/article/'+arcPrev._id">上一篇:&nbsp;{{arcPrev.title}}</router-link>
		</div>

		<div class="arc-link-wrap next" v-if="arcNext">
			<span class="iconfont icon-arrow-right"></span>
			<router-link :to="'/blog/article/'+arcNext._id">下一篇:&nbsp;{{arcNext.title}}</router-link>
		</div>
	</div>
</template>

<style lang="scss">
	.o-arc-lkbox {
		margin-top: 50px;

		.arc-link-wrap {
			color: #085e2c;
			padding: 5px 0;

			&,
			a {
				font-size: 0.9rem;
			}

			a {
				color: #d7d5d5;
				transition: color 0.3s ease;
			}

			.iconfont {
				display: inline-block;
				transition: transform 0.3s ease;
			}

			&:hover {
				a {
					text-decoration: underline;
					color: #fff;
				}

				&.prev {
					.iconfont {
						transform: translateX(-5px);
					}
				}

				&.next {
					.iconfont {
						transform: translateX(-5px);
					}
				}
			}
		}
	}
</style>

<script>
	export default {
		props: ["arcprev", "arcnext"],
		computed: {
			arcPrev() {
				return this.arcprev;
			},
			arcNext() {
				return this.arcnext;
			}
		}
	};
</script>
