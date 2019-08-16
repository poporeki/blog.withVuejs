<template>
	<div class="emoji-container">
		<a class="emoji-btn" @click="isShow=!isShow">😀</a>
		<div class="emoji-inner" v-show="isShow">
			"TODO:"
			<div class="emoji-list">
				<div
					class="emoji-list-item"
					@click="isShow=false"
					v-for="(emoji,eidx) in emojiList"
					:key="eidx"
				>{{emoji}}</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props: ["el"],
		data() {
			return {
				isShow: false,
				emojiList: [
					"😀",
					"😁",
					"😂",
					"🤣",
					"😃",
					"😅",
					"😆",
					"😎",
					"😍",
					"😪",
					"😐",
					"😏",
					"😥",
					"😜",
					"😝",
					"😭",
					"😨",
					"💀",
					"😠",
					"🐷",
					"🐔",
					"🐽"
				]
			};
		},
		insertAtCursor(myField, myValue) {
			//IE 浏览器
			if (document.selection) {
				myField.focus();
				sel = document.selection.createRange();
				sel.text = myValue;
				sel.select();
			}

			//FireFox、Chrome等
			else if (myField.selectionStart || myField.selectionStart == "0") {
				var startPos = myField.selectionStart;
				var endPos = myField.selectionEnd;

				// 保存滚动条
				var restoreTop = myField.scrollTop;
				myField.value =
					myField.value.substring(0, startPos) +
					myValue +
					myField.value.substring(endPos, myField.value.length);

				if (restoreTop > 0) {
					myField.scrollTop = restoreTop;
				}

				myField.focus();
				myField.selectionStart = startPos + myValue.length;
				myField.selectionEnd = startPos + myValue.length;
			} else {
				myField.value += myValue;
				myField.focus();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.emoji-container {
		position: absolute;
		width: 100%;
		z-index: 100;
	}
	.emoji-btn {
		font-size: 1.3rem;
		cursor: pointer;
	}
	.emoji-inner {
		position: absolute;
		bottom: 100%;
		padding: 1rem;
		display: flex;
		background-color: rgb(36, 36, 36);
		font-size: 1.2rem;
		.emoji-list {
			display: flex;
			flex-direction: row;
			.emoji-list-item {
				cursor: pointer;
				&:hover {
					background-color: rgb(63, 63, 63);
					transform: scale(1.05);
				}
			}
		}
	}
</style>


