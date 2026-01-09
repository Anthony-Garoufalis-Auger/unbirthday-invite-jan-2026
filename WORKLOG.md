# Unbirthday Tea Party — WORKLOG

## 0) Rule of the land (so I don’t get lost)
- This chat is the **MASTER** for decisions, copy, routes, prompts, naming.
- Other chats are **IMAGE FACTORY** only (generate images from prompts, nothing else).
- Chats do **not** share memory. The source of truth is this file + the MASTER chat.

---

## 1) Current flow (routes)
1. `/` — Looking-glass interrogation (name + “Were you born on 25 January?”)
2. `/not-invited` — Not invited + “I shall try again.” → `/`
3. `/invitation` — Invitation opening + gate (“I shall.” / “I refuse.” → repent)
4. `/details` — Details + gate (“I shall.” / “I refuse.” → repent)
5. `/rsvp` — RSVP gate (“I shall.” reveals ledger; “I refuse.” → regrets)
6. `/regrets` — Regret note textarea + submit + “I have reconsidered.” → `/rsvp`
7. `/dress` — Dress mandatory (“Understood, good sir.” / “I refuse.” → dress-refusal)
8. `/dress-refusal` — Tar & feather warning + “I shall continue.” → `/must-bring`
9. `/must-bring` — Understood gate
10. `/should-bring` — Understood gate
11. `/could-bring` — Understood gate
12. `/mustnt-bring` — Understood gate
13. `/table-rules` — Understood gate
14. `/oath` — Enthusiastic yes + optional checkbox pledge (no extra fields)
15. `/thanks` — Final message + “Take me home!” → `/home`
16. `/home` — Guillotine trap + “I shall return to the looking-glass.” → `/`
17. `/repent` — Reusable repent page (varies by `reason=`). **Uses `/not-invited` illustration**.

---

## 2) Button language (final)
### Page 1 (birth gate)
- “I was.” / “I was not.”

### Decision gates (invitation/details/rsvp/oath)
- “I shall.” / “I refuse.”

### Understood gates (dress + all checklist pages + rules)
- “Understood, good sir.” / “I refuse.”

### Repent
- “I shall try again.”

### Final
- “Take me home!”

---

## 3) Repent lines (final)
Use: `/repent?returnTo=/somewhere&reason=KEY`

- invitation: “You have refused my invitation? How unwise.”
- details: “You refuse the particulars? Typical of you.”
- dress: “You refuse to dress the part? The table frowns.”
- must-bring: “You refuse the necessities? You get the boot at the door.”
- should-bring: “You refuse to perform? How timid.”
- could-bring: “You refuse the optional offering? Suit yourself.”
- mustnt-bring: “You refuse restraint? Typical of you.”
- table-rules: “You refuse the rules? The table will notice.”
- oath: “You refuse enthusiasm? A pity.”

---

## 4) Illustration production plan (16 unique images)
- **Portrait** orientation.
- **Black-and-white Victorian ink engraving**, Tenniel-inspired, original.
- **No text** inside images.
- **Generous blank space in the lower half** for HTML text + buttons.
- Save as **WebP** in: `public/illustrations/`
- Naming scheme below.

### Filenames (canonical)
01. `p01-looking-glass.webp` (route: `/`)
02. `p02-not-invited.webp` (route: `/not-invited`) **Also reused for `/repent`**
03. `p03-invitation.webp` (route: `/invitation`)
04. `p04-details.webp` (route: `/details`)
05. `p05-ledger.webp` (route: `/rsvp`)
06. `p06-regrets.webp` (route: `/regrets`)
07. `p07-dress.webp` (route: `/dress`)
08. `p08-tar-feather.webp` (route: `/dress-refusal`)
09. `p09-must-bring.webp` (route: `/must-bring`)
10. `p10-should-bring.webp` (route: `/should-bring`)
11. `p11-could-bring.webp` (route: `/could-bring`)
12. `p12-mustnt-bring.webp` (route: `/mustnt-bring`)
13. `p13-table-rules.webp` (route: `/table-rules`)
14. `p14-oath.webp` (route: `/oath`)
15. `p15-thanks-mouse.webp` (route: `/thanks`)
16. `p16-guillotine.webp` (route: `/home`)

### Image status tracker
- [ ] 01 p01-looking-glass.webp
- [ ] 02 p02-not-invited.webp (and used for repent)
- [ ] 03 p03-invitation.webp
- [ ] 04 p04-details.webp
- [ ] 05 p05-ledger.webp
- [ ] 06 p06-regrets.webp
- [ ] 07 p07-dress.webp
- [ ] 08 p08-tar-feather.webp
- [ ] 09 p09-must-bring.webp
- [ ] 10 p10-should-bring.webp
- [ ] 11 p11-could-bring.webp
- [ ] 12 p12-mustnt-bring.webp
- [ ] 13 p13-table-rules.webp
- [ ] 14 p14-oath.webp
- [ ] 15 p15-thanks-mouse.webp
- [ ] 16 p16-guillotine.webp

---

## 5) Master style prompt (constant)
Create an original black-and-white Victorian ink engraving illustration (John Tenniel–inspired, but not a copy), with crisp pen linework, dense cross-hatching and stipple shading, high contrast, and a clean 19th-century wood-engraving look. No modern rendering style, no colour, no greyscale washes—just ink lines on an off-white paper feel. No text, lettering, captions, borders, frames, or watermarks in the image. Leave generous negative space in the lower half for webpage text and buttons. Keep the scene theatrical and slightly unsettling but not gory; menace is implied rather than shown. Draw in a consistent perspective and level of detail across the series. OUTPUT: Portrait orientation, centred composition, subject in the upper half, ample blank space below, sharp details.

---

## 6) Prompts queue (paste MASTER style + one subject line)
### 01 — Looking-glass
SUBJECT: an ornate standing looking-glass with Victorian flourishes, and a faint mysterious silhouette behind the glass as if watching the viewer; ambiguous silhouette, no clear face.

### 02 — Not invited (also used for repent)
SUBJECT: a stern Wonderland playing-card authority figure dismissing the viewer with an outstretched hand; absurdly official, slightly menacing, subtle tea motifs.

### 03 — Invitation (with tabby cameo + mushrooms)
SUBJECT: a long tea table with mismatched teacups, teapot, biscuits; English garden in background with a small cluster of mushrooms near hedges or stones; rabbit-ear silhouette in shadow; playing-card corner peeking from under a saucer; tiny tabby cat cameo peeking from behind a sugar bowl or table leg, wearing a collar with a small medallion marked with a single capital letter “M”; no other text.

### 04 — Details
SUBJECT: an ornate blank invitation card beside a Victorian pocket watch and a small blank address placard (no readable writing), arranged like a bookplate still-life; subtle Wonderland hints.

### 05 — Ledger
SUBJECT: an open ledger book with a quill pen and ink bottle; small playing-card decorative flourishes.

### 06 — Regrets
SUBJECT: a folded regret letter beside a wilted rose and a cooled teacup; elegant, melancholy.

### 07 — Dress
SUBJECT: Wonderland archetype costumes (queen, rabbit, cat, card-soldier silhouettes) displayed as garments on hangers or mannequins, like a Victorian fashion plate.

### 08 — Tar & feather (dress refusal)
SUBJECT: a lizard chimney sweep being comically tarred and feathered by playing-card characters beside a brick chimney; humiliating but not gory.

### 09 — Must bring
SUBJECT: teacup and tea tin with loose leaves on a tray, like an instructional plate.

### 10 — Should bring (performance)
SUBJECT: a lectern or music stand with sheet music and a rolled poem, awaiting a performance.

### 11 — Could bring
SUBJECT: an eccentric teapot with curling steam that subtly suggests a caterpillar-like silhouette in the vapour.

### 12 — Mustn’t bring
SUBJECT: a ceremonial bowl containing abstract forbidden “modern rectangles” implied without branding, watched by stern disapproving teacups.

### 13 — Table rules
SUBJECT: a tea table where one figure whispers and another is dramatically shushed by a card-soldier; theatrical reprimand.

### 14 — Oath
SUBJECT: a hand over heart in a formal vow gesture above a teacup; subtle crown-and-card motifs.

### 15 — Thanks (mouse + teapot)
SUBJECT: a quaint tea table with a small mouse emerging from a teapot spout; charming and mischievous.

### 16 — Guillotine trap
SUBJECT: a guillotine on a simple stage surrounded by playing-card characters holding pikes; menacing but cartoonish; no gore.

---

## 7) Notes (style adjustments discovered during generation)
- (Add notes here as you go, e.g. “needs more negative space”, “too cartoony”, “increase cross-hatching”, etc.)

---

## 8) Quick per-image workflow (repeat)
1) Copy MASTER STYLE + SUBJECT into image generator chat.
2) Generate.
3) Download.
4) Rename to canonical filename.
5) Move into `public/illustrations/`.
6) Tick checkbox in “Image status tracker”.
7) Record any prompt tweaks in “Notes”.
