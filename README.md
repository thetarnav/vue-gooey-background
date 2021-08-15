# Vue Gooey Background

Gooey Background Component for Vue 3.

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
.gooey-background {
	/* the defaults: */
	--bg-color: #42b883;
	--bg-radius: 12px;
	--ball-size: 52px;
}
```
