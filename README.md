# ZonesConnect — combined APS Application

One package, two surfaces:

1. **Persistent menu item** in CCP v2 (customers) and RCP (resellers) —
   labeled "ZonesConnect", Font Awesome `fa-external-link` icon, opens
   `https://www.zones.com/site/standard_page/index.html` in a new tab.
2. **Home dashboard tile**, also for both customers and resellers — same
   redirect, but with a configurable title/text/button/colors and a real
   custom icon image URL (not limited to Font Awesome).

Both use different, independent mechanisms to avoid CCP v2's
subscription requirement:
- The menu items bind to the platform's generic
  `http://aps-standard.org/types/core/subscription/service/1.0` collection
  type (per CloudBlue's own "Customizing the Menu in Odin Automation
  CCP v2" KB article).
- The tiles use `access: global = true` on this package's own
  `tile_settings` APS type (per your "CCP for Resellers" internal doc),
  which is why `<categories><category>System</category>
  <category>CCP</category></categories>` is included — required by CBC
  v21+ for global-access packages.

These two mechanisms are unrelated to each other, so if one doesn't
render in your environment for any reason, the other can still work
independently — you're not betting everything on one approach.

## Deployment

1. **Import Package** in PCP.
2. **Add Instance** — endpoint URI: `https://127.0.0.1:8081/pa/rest/fake/`
   (no real backend). Click through the wizard; tile defaults are used
   unless you set them.
3. Check both surfaces:
   - CCP v2 (customer) and RCP (reseller) menu — "ZonesConnect" item.
   - Home dashboard (both roles) — "ZonesConnect" tile.

## Configuration

- **Tile appearance / target URL**: Operations > Applications >
  ZonesConnect > Instances > (your instance) > Tile Settings. Editable
  fields: Tile Title, Tile Label, Tile Hint, Tile Text, Tile Button Text,
  Tile Font/Background Color, **Tile Icon URL** (arbitrary image, e.g. a
  hosted transparent zones.com favicon), Tile Background Image URL, and
  **Target URL** (defaults to the Zones page above).
- **Menu item icon/label**: edit `icon`/`label` on the two
  `<navigation icon="fa-external-link" ...>` blocks in `APP-META.xml`
  (menu items are Font Awesome only — no custom image support there).
- **Menu item order/visibility**: Provider admin can reorder or hide it
  later via PCP, same as any other menu item — no repackaging needed.
- **Hiding the tile for specific L1/L2 resellers**: Operations > Settings
  > UX1 navigation, search by view-plugin id (`ux1-dashboard-tile-rcp` /
  `ux1-dashboard-tile-ccp`), hide widget.

## If you only want one surface

Delete whichever `<navigation>` blocks you don't need from
`APP-META.xml` (the menu-item pair, or the tile pair + the `globals`
settings block if you drop tiles entirely), remove the now-unused files,
and regenerate `APP-LIST.xml`/re-zip. Let me know if you'd rather I just
produce that trimmed version directly.
