// Each style module exports a default render function (repo data → SVG string) and a one-line `about`.
// Listing it in a group here makes it available as ?style=<name> and puts it on the STYLES.md gallery.
import * as acrylic from "./acrylic.js";
import * as adaptive from "./adaptive.js";
import * as apothecary from "./apothecary.js";
import * as arcade from "./arcade.js";
import * as artdeco from "./artdeco.js";
import * as ascii from "./ascii.js";
import * as aurora from "./aurora.js";
import * as bauhaus from "./bauhaus.js";
import * as bento from "./bento.js";
import * as bigtype from "./bigtype.js";
import * as blackletter from "./blackletter.js";
import * as blueprint from "./blueprint.js";
import * as boarding from "./boarding.js";
import * as bold from "./bold.js";
import * as borealis from "./borealis.js";
import * as botanical from "./botanical.js";
import * as brutalist from "./brutalist.js";
import * as brutalweb from "./brutalweb.js";
import * as cartridge from "./cartridge.js";
import * as cassette from "./cassette.js";
import * as catalog from "./catalog.js";
import * as chalkboard from "./chalkboard.js";
import * as chrome from "./chrome.js";
import * as cinema from "./cinema.js";
import * as clay from "./clay.js";
import * as comic from "./comic.js";
import * as constructivist from "./constructivist.js";
import * as creditcard from "./creditcard.js";
import * as cyberpunk from "./cyberpunk.js";
import * as darkglass from "./darkglass.js";
import * as dashboard from "./dashboard.js";
import * as destijl from "./destijl.js";
import * as dunes from "./dunes.js";
import * as duotone from "./duotone.js";
import * as floppy from "./floppy.js";
import * as forest from "./forest.js";
import * as frost from "./frost.js";
import * as glass from "./glass.js";
import * as glitch from "./glitch.js";
import * as gumwrapper from "./gumwrapper.js";
import * as handheld from "./handheld.js";
import * as holo from "./holo.js";
import * as isometric from "./isometric.js";
import * as jersey from "./jersey.js";
import * as keynote from "./keynote.js";
import * as lava from "./lava.js";
import * as ledmatrix from "./ledmatrix.js";
import * as lowpoly from "./lowpoly.js";
import * as luggage from "./luggage.js";
import * as meander from "./meander.js";
import * as memphis from "./memphis.js";
import * as mesh from "./mesh.js";
import * as moon from "./moon.js";
import * as neon from "./neon.js";
import * as neonsign from "./neonsign.js";
import * as neumorph from "./neumorph.js";
import * as nouveau from "./nouveau.js";
import * as nutrition from "./nutrition.js";
import * as origami from "./origami.js";
import * as papelpicado from "./papelpicado.js";
import * as passport from "./passport.js";
import * as pastel from "./pastel.js";
import * as patch from "./patch.js";
import * as periodic from "./periodic.js";
import * as pixel from "./pixel.js";
import * as placard from "./placard.js";
import * as playingcard from "./playingcard.js";
import * as polaroid from "./polaroid.js";
import * as popart from "./popart.js";
import * as productlabel from "./productlabel.js";
import * as racetiming from "./racetiming.js";
import * as railway from "./railway.js";
import * as receipt from "./receipt.js";
import * as retromac from "./retromac.js";
import * as retrowin from "./retrowin.js";
import * as riso from "./riso.js";
import * as sakura from "./sakura.js";
import * as scandi from "./scandi.js";
import * as scoreboard from "./scoreboard.js";
import * as sketch from "./sketch.js";
import * as smartwatch from "./smartwatch.js";
import * as splitflap from "./splitflap.js";
import * as spotlight from "./spotlight.js";
import * as stamp from "./stamp.js";
import * as starfield from "./starfield.js";
import * as sticker from "./sticker.js";
import * as storm from "./storm.js";
import * as subway from "./subway.js";
import * as swiss from "./swiss.js";
import * as synthwave from "./synthwave.js";
import * as tarot from "./tarot.js";
import * as terminal from "./terminal.js";
import * as terrazzo from "./terrazzo.js";
import * as ticker from "./ticker.js";
import * as topographic from "./topographic.js";
import * as tradingcard from "./tradingcard.js";
import * as ukiyoe from "./ukiyoe.js";
import * as underwater from "./underwater.js";
import * as vaporwave from "./vaporwave.js";
import * as vhs from "./vhs.js";
import * as vinyl from "./vinyl.js";
import * as voxel from "./voxel.js";
import * as wanted from "./wanted.js";
import * as washi from "./washi.js";
import * as waves from "./waves.js";
import * as weather from "./weather.js";
import * as wireframe from "./wireframe.js";
import * as wristband from "./wristband.js";
import * as y2k from "./y2k.js";

export const groups = {
  Originals: { adaptive, aurora, neon, spotlight, brutalist, glass, terminal, bold, holo, blueprint, synthwave, pixel, swiss, boarding },
  "Everyday objects": { periodic, creditcard, passport, luggage, cinema, cassette, floppy, vhs, handheld, retrowin, retromac, splitflap },
  "Places and print": { washi, cyberpunk, memphis, railway, catalog, polaroid, stamp, arcade, keynote, darkglass, terrazzo, sketch },
  "Pop culture": { jersey, tradingcard, wanted, tarot, playingcard, scoreboard, racetiming, ticker, nutrition, productlabel, wristband, gumwrapper },
  "Art movements": { artdeco, nouveau, destijl, constructivist, popart, ukiyoe, meander, blackletter, apothecary, papelpicado, scandi, brutalweb },
  "Digital art": { chrome, pastel, duotone, glitch, ascii, wireframe, lowpoly, voxel, acrylic, bento, dashboard },
  "Signs and screens": { patch, neonsign, chalkboard, receipt, vinyl, cartridge, placard, subway, weather, smartwatch, bigtype, mesh },
  "Nature": { underwater, starfield, topographic, borealis, waves, dunes, forest, lava, frost, sakura, storm, moon },
  "Materials and techniques": { clay, riso, isometric, sticker, neumorph, origami, vaporwave, bauhaus, comic, ledmatrix, botanical, y2k },
};

export default Object.fromEntries(
  Object.values(groups).flatMap((group) => Object.entries(group).map(([name, style]) => [name, style.default])),
);
