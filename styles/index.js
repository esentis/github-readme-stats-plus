// Each style module exports a default render function (repo data → SVG string) and a one-line `about`.
// Listing it in a group here makes it available as ?style=<name> and puts it on the STYLES.md gallery.
import * as adaptive from "./adaptive.js";
import * as aurora from "./aurora.js";
import * as blueprint from "./blueprint.js";
import * as boarding from "./boarding.js";
import * as bold from "./bold.js";
import * as brutalist from "./brutalist.js";
import * as cassette from "./cassette.js";
import * as cinema from "./cinema.js";
import * as creditcard from "./creditcard.js";
import * as floppy from "./floppy.js";
import * as glass from "./glass.js";
import * as handheld from "./handheld.js";
import * as holo from "./holo.js";
import * as luggage from "./luggage.js";
import * as neon from "./neon.js";
import * as passport from "./passport.js";
import * as periodic from "./periodic.js";
import * as pixel from "./pixel.js";
import * as retromac from "./retromac.js";
import * as retrowin from "./retrowin.js";
import * as splitflap from "./splitflap.js";
import * as spotlight from "./spotlight.js";
import * as swiss from "./swiss.js";
import * as synthwave from "./synthwave.js";
import * as terminal from "./terminal.js";
import * as vhs from "./vhs.js";

export const groups = {
  Originals: { adaptive, aurora, neon, spotlight, brutalist, glass, terminal, bold, holo, blueprint, synthwave, pixel, swiss, boarding },
  "Everyday objects": { periodic, creditcard, passport, luggage, cinema, cassette, floppy, vhs, handheld, retrowin, retromac, splitflap },
};

export default Object.fromEntries(
  Object.values(groups).flatMap((group) => Object.entries(group).map(([name, style]) => [name, style.default])),
);
