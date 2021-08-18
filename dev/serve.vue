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
	<gooey-background class="example example-1">
		Welcome to
	</gooey-background>

	<gooey-background class="example example-2">
		vue-gooey-background
	</gooey-background>

	<gooey-background class="example example-3" disabled>
		Disabled :(
	</gooey-background>

	<gooey-background class="example example-4">
		With hover
	</gooey-background>
</template>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vw;
	overflow-x: hidden;
	overflow-y: scroll;
	font-family: Avenir, Helvetica, Arial, sans-serif;
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

	&.example-4 {
		--bg-color: #f39740;
		--duration: 200ms;
		--ease: ease;
		&:hover {
			--bg-color: #df8339;
		}
	}
}
</style>
