## RevealAnimation Component

A GSAP-powered reveal animation for your home page that creates a stunning entrance effect with a dramatic de-materialization transition.

### Animation Sequence

1. **Initial Materialization**: The counter "0" materializes from a blurred, scaled state into sharp focus
2. **Counter Animation** (0-100): Counter counts from 0 to 100, slowing down as it approaches 100
3. **Fade Transition**: The "100" fades out with scale effect
4. **Hello Materialization**: "Hello" materializes from a blurred, scaled state into sharp focus
5. **Hello Display**: "Hello" stays visible for a configurable duration
6. **De-materialization**: "Hello" de-materializes with blur/scale effect, fading out of existence
7. **Synchronized Split**: As "Hello" de-materializes, the background panels start sliding away, revealing your main content

### Usage

```tsx
import { RevealAnimation } from "@/components/RevealAnimation";

<RevealAnimation
  counterDuration={2.5}
  helloDuration={0.8}
  dematerializeDuration={0.6}
  splitDuration={1.2}
  counterEase="power1.out"
  splitEase="power3.inOut"
  onComplete={() => console.log("Animation complete!")}
>
  {/* Your main content here */}
</RevealAnimation>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | The content to reveal after the animation |
| `counterDuration` | `number` | `2.5` | Duration of the counter animation (0-100) in seconds |
| `helloDuration` | `number` | `0.8` | How long "Hello" stays visible before de-materializing in seconds |
| `dematerializeDuration` | `number` | `0.6` | Duration of the de-materialization effect in seconds |
| `splitDuration` | `number` | `1.2` | Duration of the background panel split animation in seconds |
| `counterEase` | `string` | `"power1.out"` | GSAP easing function for counter animation (gentle slowdown) |
| `splitEase` | `string` | `"power3.inOut"` | GSAP easing function for split animation |
| `onComplete` | `() => void` | `undefined` | Callback function when animation completes |

### GSAP Easing Options

You can use any GSAP easing function. Popular choices:

- `"power1.out"`, `"power2.out"`, `"power3.out"`, `"power4.out"` - Smooth deceleration
- `"power1.in"`, `"power2.in"`, `"power3.in"`, `"power4.in"` - Smooth acceleration
- `"power1.inOut"`, `"power2.inOut"`, `"power3.inOut"`, `"power4.inOut"` - Acceleration then deceleration
- `"back.out(1.7)"` - Slight overshoot (great for bouncy effects)
- `"elastic.out(1, 0.3)"` - Elastic/spring effect
- `"bounce.out"` - Bouncing effect
- `"circ.inOut"` - Circular easing
- `"expo.inOut"` - Exponential easing

### Styling

The component uses Tailwind CSS classes for styling:

- **Background**: `bg-foreground` (dark background)
- **Text**: `text-primary` (primary color)
- **Font**: `font-header` (requires font-header to be defined in your CSS)
- **Counter Size**: Responsive sizing with `text-[20vh] md:text-[25vh] lg:text-[30vh]`
- **Hello Size**: Slightly smaller with `text-[15vh] md:text-[18vh] lg:text-[22vh]`
- **Effects**: Text shadow for depth, blur filter for de-materialization

### Mobile Support

The animation is fully responsive and works on mobile devices. The text sizes adjust based on viewport height (vh units) to ensure proper scaling across all screen sizes.

### Performance Notes

- The component uses GSAP for smooth 60fps animations
- Simple DOM elements (div) instead of SVG for better performance
- CSS filters (blur) are hardware-accelerated for smooth de-materialization
- The Noise component is rendered with optimized settings (`patternAlpha={15}`, `patternRefreshInterval={2}`)
- The overlay is removed from the DOM after the animation completes to free up resources
- `pointer-events` are managed to ensure no interaction blocking after completion
- De-materialization happens faster than panel movement for dramatic effect

### Requirements

Make sure you have:
- GSAP installed in your project (`gsap`)
- Tailwind CSS configured
- A `font-header` font family defined in your CSS
- The Noise component available (included in the project)

### Customization Tips

**Faster, Snappy Animation:**
```tsx
<RevealAnimation
  counterDuration={1}
  helloDuration={0.5}
  dematerializeDuration={0.2}
  splitDuration={0.8}
/>
```

**Slower, More Dramatic:**
```tsx
<RevealAnimation
  counterDuration={3}
  helloDuration={1.5}
  dematerializeDuration={0.5}
  splitDuration={2}
  counterEase="power4.inOut"
  splitEase="expo.inOut"
/>
```

**Quick De-materialization (Ghost Effect):**
```tsx
<RevealAnimation
  helloDuration={1}
  dematerializeDuration={0.15}
  splitDuration={1.5}
/>
```

### Key Animation Timing

For best results:
- `counterDuration`: 2.5-3 seconds recommended for a perceivable count
- `counterEase`: 
  - `"power1.out"` (default) - Gentle, smooth slowdown at the end
  - `"linear"` or `"none"` - Constant speed throughout
  - `"power2.out"` - More dramatic slowdown (starts faster)
- `dematerializeDuration`: Should allow enough time to see the blur effect clearly (0.5-0.8s recommended)
- `helloDuration`: Controls how long the viewer sees "Hello" - adjust based on desired impact
- The panels start moving as soon as de-materialization begins, creating a layered reveal effect

### Counter Easing Comparison

- **power1.out** (Recommended): Gradual slowdown, entire animation is visible
- **power2.out**: Faster start, more dramatic slowdown at end
- **power3.out**: Very fast start, very slow end (numbers 0-33 blur by)
- **linear**: Constant speed (no slowdown effect)
- **power1.in**: Slow start, fast finish (opposite of what you want)

### Effect Details

**Initial Counter Materialization:**
- Counter "0" starts invisible (SSR-safe with inline `opacity: 0`)
- GSAP sets blur (20px) and scale (1.3x) on client mount
- Small delay (0.1s) allows background noise to render first
- Materializes over 0.5s into sharp focus at normal scale
- Prevents seeing static "0" before animation starts (both SSR and CSR)

**Materialization (Hello Fade In):**
- "Hello" starts blurred (20px blur) and scaled (1.3x)
- Smoothly transitions to sharp focus at normal scale over 0.6s
- Creates the feeling of text "coming into existence"

**De-materialization (Fade Out):**
- "Hello" blurs (30px) and scales up (1.5x) while fading
- Happens simultaneously with panel split for dramatic effect
- Duration configurable via `dematerializeDuration` prop

