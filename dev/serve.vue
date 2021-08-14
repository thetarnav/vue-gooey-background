<script lang="ts">
import { defineComponent } from 'vue'
import GooeyBackground from '@/gooey-background.vue'
// @ts-ignore
// import GooeyBackground from "../dist/gooey-background.esm.js"

export default defineComponent({
	name: 'ServeDev',
	components: {
		GooeyBackground,
	},
})
</script>

<template>
	<gooey-background class="example example-1">Hello</gooey-background>
	<gooey-background class="example example-2">Example BOX</gooey-background>
	<gooey-background class="example example-3" disabled>Hello</gooey-background>
	<gooey-background class="example example-4">Hello</gooey-background>
</template>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vw;
	overflow-x: hidden;
	overflow-y: scroll;
}
#app {
	margin: 100px auto;
	width: 100%;
	height: 150vh;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.gooey-background {
	&.example {
		margin: 30px;
		color: white;
		padding: 16px 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&.example-2 {
		--bg-color: black;
	}

	// &.example-3 {

	// }
}
</style>
