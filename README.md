#Welcome

Siopa is an experimental text adventure created for the 2014 [Js13kGames
competition](http://js13kgames.com/). We hope you enjoy it!

##Playing

You can play the game at [String Trees](http://stringtrees.com/games/siopa).
Alternatively, you can download the source and open up `index.html` in your
browser.

##Code Overview

`index.html` contains the entire textual content of the game, marked up with
custom tags parsed by the Siopa engine. The engine itself is located at
`js/siopa-engine.js`. Scripts specific to Siopa, that work alongside and with
the engine, are located at `js/siopa.js`. Styles for the engine (some of which,
especially the `display: none`s, integral to the engine's operation) are located
at `css/siopa-engine.css`.

The `dist` folder contains compressed and uncompressed versions of the minified
game as submitted to Js13kGames. Minification involved running the JS through
uglifyjs and CSS through uglifycss, moving the code into inline blocks, and
running the whole HTML file through the simple custom HTML minifier
`htmlmin.py`, located in the repo root.

The final compressed version weighs in at 13,311 bytes, or one byte shy of
exactly 13 kilobytes. Much more material was written for the game than was
included in the final submission. The `archive` folder contains copies of the
game with various amounts of additional content. Note that these files will
only work with older (non-cut) versions of the JS files, which are contained in
the repo history but aren't in the current tree. After the competition, I will
probably get them to an easily playable state directly in the repo&mdash;but while
the competition is going on, I feel the focus should be on the 13 KB entry
version.

##Credits

Richard Schnedier (me) came up with the original idea and design of the game,
programmed the Siopa engine, and marked up the writing with the Siopa tags.
Nicholas Ken Capils did the writing and level design. Thanks to our
playtesters, and particularly our fellow String Trees compatriot
[Jacsn](https://jacsn.net).

I'm
