# Animated buttons

Shared native button/link rendering for shine, glow, fill, arrow, selection and morph.
Import component source directly until Dmitrii regenerates indexes and the sandbox manifest.

- `href` renders a real link; omit it for an action button. `type="submit"` supports forms.
- `disabled` and `loading` block activation. Provide readable loading text through children.
- `block` fills available width. Labels wrap on narrow screens.
- ShineButton runs an automatic light pass every five seconds by default; set `attention={false}` for interaction-only motion. Disabled/loading states pause the effect. Glow, fill and arrow respond to hover and keyboard focus.
- ShineButton also continuously moves two highlights around its rounded border. `animatedBorder={false}` disables that independently of the surface shine. Reduced motion and disabled/loading states stop the border animation. Style with `--button-edge-color`, `--button-edge-width`, `--button-edge-duration`, and `--button-shine-color`.
- Hover and keyboard focus trigger an immediate shine pass even when automatic attention is enabled; with attention on, the loop then keeps running while hovered/focused (every `--button-attention-active-duration`, default 2.5 s, instead of 5 s) instead of stopping. Customize the pressed transform with `--button-pressed-transform` (default `scale(0.98)`). The landing CTA adds lift with a 5% scale-up, a warm faster shine, a thicker warmer edge, a stronger shadow and an advancing arrow on hover/focus; reduced motion keeps the color feedback without movement.
- SelectionButton exposes `bind:selected` and `aria-pressed`; preventDefault in onclick cancels the toggle.
- MorphButton uses host-controlled `state="idle|loading|success|error"`. Set success only after server confirmation; error permits retry. It announces states to assistive technology.
- Reduced motion removes movement; content and selection remain visible.
- CSS variables: `--button-background`, `--button-color`, `--button-border`, `--button-radius`, `--button-focus`, `--button-fill`, `--button-glow`, `--button-selection-background`, `--button-selection-color`.

Stories accompany every component. Only Dmitrii runs the indexation and auditor CLIs.
