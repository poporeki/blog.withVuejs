<template>
	<div class="post-wrapper">
		<select v-model="selected.province" @change="getRegion(selected.province,'city')">
			<option value disabled>请选择省份</option>
			<option v-for="(pro,pidx) in provinceList" :value="pro.region_id" :key="pidx">{{pro.region_name}}</option>
		</select>
		<select v-model="selected.city" @change="getRegion(selected.city,'county')">
			<option value disabled>请选择城市</option>
			<option v-for="(city,cidx) in cityList" :value="city.region_id" :key="cidx">{{city.region_name}}</option>
		</select>
		<select v-model="selected.county" @change="getPost">
			<option value disabled>请选择区县</option>
			<option
				v-for="(county,pidx) in countyList"
				:value="county.region_id"
				:key="pidx"
			>{{county.region_name}}</option>
		</select>
		<div class="input-box">
			<input
				type="text"
				v-model="searchWords"
				placeholder="街道"
				@focus="inputFocus=true"
				@blur="inputFocus=false"
			>
			<transition enter-active-class="fadeInTop">
				<ul class="s-w-list" v-show="searchList.length!==0">
					<li v-for="(ws,widx) in searchList" :key="widx" @click="selectWords(ws.ADDR)">{{ws.ADDR}}</li>
				</ul>
			</transition>
		</div>
		<ul class="reseult-list" v-show="postCodeList.length!==0">
			<li>
				<h2>查询结果：</h2>
			</li>
			<li v-for="(text,tidx) in postCodeList" :key="tidx">
				<h3>地址：{{text.ADDR}}</h3>
				<p>邮政编码：{{text.POSTCODE}}</p>
			</li>
		</ul>
	</div>
</template>
<style lang="scss" scoped>
	.post-wrapper {
		min-height: 400px;
	}
	select {
		height: 40px;
		background-color: transparent;
		border: none;
		outline: none;
		margin: 10px;
		color: #fff;
		option {
			color: #000;
		}
	}
	input {
		color: inherit;
		height: 40px;
		background-color: transparent;
		padding: 0 10px;
		border: none;
		border-bottom: 2px solid #fff;
		outline: none;
	}
	.s-w-list {
		margin: 0;
		padding: 0;
		padding: 10px;
		background-color: rgb(53, 53, 53);
		> li {
			margin: 0;
			padding: 0;
			padding: 10px 0;
		}
	}
	.reseult-list {
		margin-top: 30px;
	}
	.fadeInTop {
		animation: fadeInTop 0.5s forwards;
	}
	@keyframes fadeInTop {
		0% {
			opacity: 0;
			transform: translateY(-10%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				itemTitle: "地区邮编查询",
				inputFocus: false,
				selected: {
					province: "",
					city: "",
					county: ""
				},
				searchWords: "",
				provinceList: [],
				searchList: [],
				cityList: [],
				countyList: [],
				postCodeList: []
			};
		},
		watch: {
			searchWords(val, oldVal) {
				if (val === oldVal) return;
				this.getPost();
			}
		},
		methods: {
			selectWords(words) {
				this.searchWords = words;
				this.searchList = [];
			},
			getRegion(id, region) {
				let parent_id = id || 0;
				region = region || "province";
				let apiUrl = "/api/v1/tools/getregion";
				let that = this;
				that.$axios
					.get(apiUrl, {
						params: {
							parent_id
						}
					})
					.then(({ data }) => {
						if (!data.status) return;
						that[region + "List"] = data.data;
					});
			},
			getPost() {
				let apiUrl = "/api/v1/tools/getpostcode";
				let that = this;
				let searchkey = that.searchWords;
				if (
					that.selected.province === "" ||
					that.selected.city === "" ||
					that.selected.county === ""
				)
					return;
				that.$axios
					.get(apiUrl, {
						params: {
							provinceid: that.selected.province,
							cityid: that.selected.city,
							areaid: that.selected.county,
							searchkey
						}
					})
					.then(({ data }) => {
						if (!data.status || data.data.su !== true) {
							alert(data.msg);
						}
						that.postCodeList = data.data.rs;
						that.searchList = data.data.rs;
					});
			}
		},
		created() {
			this.getRegion();
			this.$emit("pageTitle", this.itemTitle);
		}
	};
</script>
