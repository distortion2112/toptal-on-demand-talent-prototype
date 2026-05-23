# Toptal Brand Guide — Design Tokens

Use these values for all mockups. Do not approximate — match exactly.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `NAVY` | `#0D1D3E` | Primary brand color. Headings, sidebar backgrounds, primary text on light surfaces. |
| `TEAL` | `#07947C` | Primary action color. Buttons, CTAs, active states, accent borders. |
| `BLUE` | `#204ECF` | Secondary action. Hover states on buttons, links, secondary CTAs. |
| `ALERT` | `#D42551` | Destructive / urgent. Error states, emergency mode indicators, SLA breach (red). |
| `MUTED` | `#626679` | Secondary text. Labels, captions, placeholder text. |
| `LIGHT_BG` | `#F4F6FB` | Page / app background. |
| `TABLE_ALT` | `#EDF1FD` | Alternating row backgrounds, expander headers, subtle card backgrounds. |
| `BODY` | `#2D2D2D` | Primary body text on light backgrounds. |
| `WHITE` | `#FFFFFF` | Text on dark surfaces (navy, teal), card backgrounds. |

### SLA Status Colors (derived)
| State | Color | Usage |
|---|---|---|
| On track | `#07947C` (TEAL) | SLA badge green |
| Warning (>50% elapsed) | `#F59E0B` | SLA badge amber — use standard amber, not in palette |
| Breach (>80% elapsed) | `#D42551` (ALERT) | SLA badge red |

---

## Typography

- **Font family:** System sans-serif stack — Inter preferred, fallback to `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Headings:** NAVY (`#0D1D3E`), font-weight 700
- **H1:** Has a 3px TEAL bottom border with 8px padding-bottom
- **Body text:** BODY (`#2D2D2D`), font-weight 400
- **Labels / captions:** MUTED (`#626679`), font-weight 400
- **Button text:** WHITE, font-weight 600

---

## Buttons

| Variant | Background | Text | Hover Background |
|---|---|---|---|
| Primary | `#07947C` (TEAL) | `#FFFFFF` | `#204ECF` (BLUE) |
| Destructive | `#D42551` (ALERT) | `#FFFFFF` | darker red |
| Ghost / secondary | transparent | `#0D1D3E` (NAVY) | `#EDF1FD` (TABLE_ALT) |

- Border radius: `4px`
- No border on primary/destructive
- Font weight: 600

---

## Badges / Tags

Pill-style inline labels. Border radius `12px`. Font size `0.78em`. Font weight `600`. Padding `2px 8px`.

| Variant | Background | Text |
|---|---|---|
| Teal (success, active, certified) | `#07947C` | `#FFFFFF` |
| Blue (informational, in-progress) | `#204ECF` | `#FFFFFF` |
| Alert (urgent, emergency, breach) | `#D42551` | `#FFFFFF` |
| Muted (neutral, inactive, closed) | `#626679` | `#FFFFFF` |

---

## Cards & Containers

- **Background:** `#FFFFFF`
- **Border:** `1px solid #EDF1FD` (TABLE_ALT) or subtle shadow (`0 1px 3px rgba(0,0,0,0.08)`)
- **Border radius:** `6px`
- **Accent left border (featured/active cards):** `4px solid #07947C` (TEAL)
- **Alert left border (urgent):** `4px solid #D42551` (ALERT)

---

## Sidebar (if applicable)

- Background: `#0D1D3E` (NAVY)
- Text / labels / headings: `#FFFFFF`
- Select inputs: white background, NAVY text

---

## Tone & Feel

Professional and confident — not clinical, not startup-casual. This is an enterprise platform used by senior engineering teams and Toptal delivery managers. The UI should communicate reliability and speed. Avoid decorative elements that don't carry meaning. Every visual element should earn its place.
