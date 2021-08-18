# Vue Gooey Background

Gooey Background Component for Vue 3.

See the [DEMO](https://stackblitz.com/edit/vue-hcyeqk?file=src/App.vue) on StackBlitz.

## Install

```sh
npm i vue-gooey-background
```

## Register the component

```js
import GooeyBackground from 'vue-gooey-background'

// register globally
app.component('GooeyBackground', GooeyBackground)

// or locally
export default {
	components: { GooeyBackground },
	// ...
}
```

## Usage

```html
<!-- simple -->
<GooeyBackground>
	<a>Your gooey link.</a>
</GooeyBackground>

<!-- available props -->
<GooeyBackground disabled ellipse> ... </GooeyBackground>
```

## Props

#### disabled

-  _Optional_
-  Type: `Boolean`
-  Disables the animation of the moving ball. Making the background static.

#### ellipse

-  _Optional_
-  Type: `Boolean`
-  Enable it if the shape of your element is round.

## CSS Variables

Some css properties can be easily changed by setting css variables.

```css
/* the defaults: */
.gooey-background {
	/* color of the gooey background  */
	--bg-color: #42b883;
	/* border radius (will be much increased by svg filter) */
	--bg-radius: 12px;
	/* size of the ball that's following the mouse */
	/* keep the number higher than you want, because of the svg filter */
	--ball-size: 52px;
	/* duration of the background color transition */
	--duration: 300ms;
	/* timing function of the background color transition */
	--ease: cubic-bezier(0.51, 0.06, 0.56, 1.37);
}
```
