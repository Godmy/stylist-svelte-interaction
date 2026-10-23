# Input compositions and the HTML domain

`html` owns native elements, native attribute recipes and an explicitly enabled
baseline skin. `input` owns labelled fields, feedback, collections and editing
behaviour. Rendering an `input`, `label`, `p` or `div` does not by itself make a
composition redundant. This domain belongs to the interaction repository.

## Decisions for all 23 original families

| Family                | Decision                         | Contract beyond a native element                                                                                                                                                        |
| --------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| InputField            | Removed; use InputText           | Duplicated InputText's field/label/helper/error composition, added an unnecessary outer container and discarded native events/attributes. Its extra recipe fields were not implemented. |
| InputText             | Keep; uses HtmlInput             | Label, helper/error association, token size, visual state, value binding.                                                                                                               |
| InputEmail            | Keep as a small InputText preset | Email type/autocomplete/placeholder on the complete labelled-field API. No extra default regex over native email validation.                                                            |
| InputName             | Keep as a small InputText preset | Name autocomplete/placeholder on the labelled-field API.                                                                                                                                |
| InputPassword         | Keep; uses HtmlInput             | Keyboard-accessible visibility toggle and optional strength display.                                                                                                                    |
| TextArea              | Keep; uses HtmlTextarea          | Label/feedback, resize and length counter, value binding.                                                                                                                               |
| InputGroup            | Keep; uses HtmlInputText         | Label/feedback and a non-submit action button.                                                                                                                                          |
| InputDouble           | Keep                             | Two independently bound labelled fields.                                                                                                                                                |
| NumberInput           | Keep; uses HtmlInputNumber       | Additional step buttons, callbacks and separate input/button classes.                                                                                                                   |
| PhoneNumberInput      | Keep; uses HtmlInputTel          | Russian +7 formatting and normalised value callbacks. It is not a generic international phone validator.                                                                                |
| InputPinDigit         | Keep; uses HtmlInputText         | One-character input, numeric keyboard hint, focus/error appearance and size. It does not implement a complete OTP flow or automatic focus movement.                                     |
| InputStepper          | Keep                             | Bounded quantity display and buttons, not a native form input.                                                                                                                          |
| RadioGroup            | Keep                             | Fieldset/legend, option descriptions and scalar binding. Native radios retain Svelte group binding.                                                                                     |
| RadioButtonGroup      | Keep                             | Container-level attributes, option classes, orientation, value callbacks and binding. Overlaps RadioGroup semantically but has a different contract.                                    |
| CheckboxGroup         | Keep; uses HtmlInputCheckbox     | Collection binding, option metadata and optional at-least-one validation.                                                                                                               |
| TagInput              | Keep                             | Delimiters, duplicate/validator/max-count handling and removal actions.                                                                                                                 |
| RichTextEditor        | Keep                             | Editable HTML, value/callbacks, formatting and optional scoped HTML skin.                                                                                                               |
| RichTextFormatToolbar | Keep                             | Editing commands, selection controls and link/image actions. It is not a generic HTML toolbar wrapper.                                                                                  |
| InputLabel            | Keep                             | Field association, required indicator, size/disabled appearance.                                                                                                                        |
| InputHelper           | Keep                             | Feedback text/children API and field presentation.                                                                                                                                      |
| InputError            | Keep                             | Conditional error feedback and field presentation.                                                                                                                                      |
| InputAddon            | Keep                             | Position-dependent attached decoration; no corresponding native HTML skin rule.                                                                                                         |
| CharactersCount       | Keep                             | Count/percentage formatting and threshold appearance.                                                                                                                                   |

The available workspace application `src` and module sources were scanned before
removal. InputField had one consuming file: portfolio's scrum-backlog, with four
instances. They now use InputText, preserving their native input handlers. No
generated export files are manually maintained as part of this consolidation.

## Migration from InputField

Replace `input/component/molecule/input-field/index.svelte` with
`input/component/molecule/input-text/index.svelte` and `RecipeInputField` with
`RecipeInputText`. Shared label/helper/error/value/native attributes keep their
meaning. Consumers of the removed component's outer DOM wrapper or its unused
recipe fields must review those assumptions. This is a public API removal; a
workspace scan cannot establish every external package consumer.

## Native contracts and feedback

SlotInputBase, numeric, phone, PIN and textarea recipes reuse their corresponding
HTML recipes. Composition-only props are filtered by resolveInputAttributes, while
native attributes, `aria-*`, `data-*`, form ownership and lowercase native event
handlers reach the actual control. Value and DOM-element bindings are forwarded
through the HTML primitive. Native callbacks retain their native currentTarget.

Labelled fields generate a stable `$props.id()` when the caller omits id. Visible
helper/error text receives an id and is included in aria-describedby alongside
caller-provided descriptions. An error array marks a textarea invalid without a
separate error=true flag. References are only added for feedback actually rendered.

NumberInput delegates step buttons to the browser's stepUp/stepDown, including the
min-relative step base. Typing is not silently rounded or clamped; native validity
reports invalid values. An empty numeric value is undefined and remains empty.
Numeric value callbacks emit finite numbers; native input events and value binding
also expose clearing the field. There is no invented min/max attribute when absent.

PhoneNumberInput shows a formatted value but binds/emits normalised digits. Its
native FormData value is the formatted text displayed by the underlying tel input.
The +7 country prefix is not duplicated. A native inputmode hint on a PIN field
does not imply numeric validation.

`value` is the current value; `defaultValue` is the form-reset value. Setting one
does not promise to set the other. Radio/checkbox options accept defaultChecked
for their reset state. Reset synchronises collection bindings without synthesising
input/change callbacks. Its reset listener checks cancellation; a framework-level
limitation for trusted reset clicks is described below. CheckboxGroup's required
means at least one selection, rather than every checkbox being required.

TagInput, InputStepper and RichTextEditor add interaction but are not successful
native form controls. Use their bindings/callbacks to integrate their data into an
application's form model. A skin does not add serialization or validation behaviour.

## Skin and styles

Skin is opt-in and is never installed globally by an ordinary input composition.
Native examples can use serializeHtmlStylesheet with the usual data-html-skin host.
The shared field stylesheet retains component sizes, field layouts and visual
states outside a skin. Component classes can override the baseline cascade layer.
Rules that target a wrapped HTML element must cross the Svelte component boundary;
their uniquely named control selectors are global, rather than unusable scoped CSS.

RichTextEditor accepts `skin?: boolean` (default false). With skin=true it renders
the existing HTML stylesheet scoped to `[data-input-editor-skin]` and marks only
the editable content with that attribute. The toolbar and neighbouring previews
are outside this scope. Disabling skin/unmounting removes that instance's style.
The story enables the skin and exposes the switch as a control. External value
changes update the editor; local edits preserve local state and emit callbacks.
The existing editing-command engine and caller-provided HTML boundary are retained.

## Supporting entities and validation

Slots compose the field, label, validation, helper, number, phone and tag APIs;
recipes assemble those contracts. Redundant repeated slot intersections were
removed. Existing functions retain class/preset resolution, character thresholds,
phone formatting and component state. The new form-reset state helper subscribes
to the owning form and removes its listener on cleanup.

Tests cover native attributes/events, label/feedback association, numeric class
ownership, PIN, selection groups, disabled tag actions, external editor updates,
phone round-tripping and every preset/custom render of all 22 remaining stories.
The standalone local demonstration in `.tmp/input-html` additionally checks actual
SSR/hydration, FormData/reset/bindings, numeric stepping, keyboard focus, editor
scope isolation, both themes, no provider and narrow viewports in a real browser.
These checks are not a claim of exhaustive HTML Standard conformance.

A comparison in Chromium 149 exposed a reset limitation in Svelte 5.57.2:
for a trusted reset-button click, a bound control can reset before a
target form listener calls preventDefault. This also occurs with a bare
HtmlInputText; an unbound native input preserves its edited value. The runtime's
document-capture reset handler schedules binding updates before that target
listener runs. This consolidation does not patch Svelte or claim full cancelled
reset parity. Applications that cancel reset need to verify this scenario.

After source deletions/new helpers, integration requires Dmitrii's human-managed
`yarn stylist:index` and `yarn stylist:manifest`, followed by `yarn stylist:errors`,
from `D:/2026/cloudflare/lankatour.ru`. Package builds/releases are separate.
