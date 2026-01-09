export const COPY = {
  "/": {
    title: "THROUGH THE LOOKING-GLASS",
    body: [
      "A presence lingers behind the glass.",
      "It does not blink. It does not breathe.",
      "It simply waits.",
    ],
    namePrompt: "What is your name, young child?",
    question: "Were you born on the 25th of January?",
    buttons: { yes: "I was.", no: "I was not." },
  },
  "/not-invited": {
    title: "NOT INVITED.",
    body: [
      "Born on the 25th? How inconveniently legitimate.",
      "This table is reserved for the gloriously misdated — the unbirthday sort.",
      "Try again. And next time… consider fiction.",
    ],
    button: "I shall try again.",
  },
  "/invitation": {
    title: "VERY MERRY UNBIRTHDAY TEA PARTY",
    body: [
      "You are cordially invited to a midday tea party to celebrate my UNBIRTHDAY — and likely yours too.",
      "Merriment and revelry await us at the table of bad manners. Exorbitant amounts of tea and biscuits, and beautiful compatriots ready to partake in excessively caffeinated madness, will be present at the table.",
      "Luckily, Lewis Carroll’s birthday is on the 27th, so if we are rowdy enough, perhaps her spirit will feel inclined to grace us with it's presence for her own unbirthday.",
    ],
    question: "Would you like to know more?",
    buttons: { yes: "I very much would.", no: "I am scared, get me out of here." },
  },
  "/details": {
    title: "THE DETAILS",
    body: [
      "Sunday 25 January 2026",
      "5628 avenue du Parc — #304",
      "First pour: 11:00 | Last pour: ~16:00-ish",
      "More details to come once you've accepted the invitation.",
    ],
    question: "Proceed to the RSVP?",
    buttons: { yes: "Of course.", no: "I unfortunately can't make it." },
  },
  "/rsvp": {
    title: "RSVP",
    question: "Will you be ours?",
    buttons: { yes: "I wouldn't miss it for the world.", no: "I refuse this invitation." },
    ledgerTitle: "SIGN THE LEDGER",
    submit: "I sign.",
    options: [
      "I shall attend",
      "I may attend",
      "I shall arrive fully prepared — mentally, physically, emotionally, spiritually — for the occasion",
    ],
  },
  "/regrets": {
    title: "REGRETS",
    body: ["So be it, but at at least show some good manners and leave a note of regret to be read aloud at the table:"],
    submit: "What kind of a person wouldn't send along their regrets?",
    reconsider: "In the end, I actually do think I can make it.",
  },
  "/dress": {
    title: "DRESS FOR THE OCCASION",
    body: [
      "Come as if you’ve stepped through the glass darkly:",
      "• Queens, flowers, rabbits, cats, cards, tramps, chimney sweeps, twins — a blend of Victorian practicality and timeless childlike innocence. Do not be dull.",
      "• Bright colours, odd silhouettes, playful accessories, Mary Jane-style shoes with ankle straps, corsets, gloves, bows, stripes — lean in.",
      "",
      "If you arrive dressed like you belong in polite society, you may face the fate of John Malcolm, in true tea-party fashion.",
    ],
    question: "Understood?",
    buttons: { yes: "Understood, good sir.", no: "Who is John Malcolm?" },
  },
  "/dress-refusal": {
    title: "The Malcolm Story",
    body: [
      "John Malcom was a staunch Loyalist and customs officer in revolutionary Boston, forever insisting that rules and a tax be put on tea.",
      "So the townsfolk, being far more imaginative about dress codes than the British army, fitted him with a scalding coat of tar topped with a hefty dose of feathers, then carted him through the streets for the enjoyment of the crowd.",
    ],
    button: "Tax on tea? The man deserved his fate. I shall come dressed to impress, don't worry",
  },
  "/must-bring": {
    title: "WHAT YOU MUST BRING (YES, MUST)",
    body: [
      "• Your favourite tea (loose leaf, bags, bizarre florals — whatever you swear by).",
      "• A teacup — bring your own vessel of dignity or absurdity.",
    ],
    question: "Understood?",
    buttons: { yes: "Why of course, good sir.", no: "I refuse." },
  },
  "/should-bring": {
    title: "WHAT YOU SHOULD BRING",
    body: [
      "• A short speech, a joke, a sonnet, or a story fit for the occasion — to be read at the table, should you dare.",
      "• A song, to be sung solo or by the party.",
    ],
    question: "Understood?",
    buttons: { yes: "I will oblige, good sir.", no: "I refuse." },
  },
  "/could-bring": {
    title: "WHAT YOU COULD BRING",
    body: [
      "• Your teapot (if you have one — the more character, the better).",
      "• Mushrooms. No pressure, no commentary, no weirdness about it — everyone minds their own Wonderland. The Caterpillar will be pleased.",
    ],
    question: "Understood?",
    buttons: { yes: "Oh that sounds magical, good sir.", no: "I refuse." },
  },
  "/mustnt-bring": {
    title: "WHAT YOU MUSTN’T BRING",
    body: [
      "• A mobile phone to the table. All phones will be placed into a bowl upon entry. If you touch yours before you leave, you will feel the wrath of the table.",
      "• A bad attitude. No Debbie Downers, no Igors, no hurried rabbits, no toxic energy, no fussy etiquette.",
    ],
    question: "Understood?",
    buttons: { yes: "One hundred per cent, good sir.", no: "I refuse." },
  },
  "/table-rules": {
    title: "TABLE RULES",
    body: [
      "If you gossip, you share. If you monologue, do so with gusto. If you arrive with a partner: no whispering, no private arguments — you will be called out.",
    ],
    question: "Understood?",
    buttons: { yes: "These should go without saying, good sir.", no: "I refuse." },
  },
  "/oath": {
    title: "THE OATH",
    body: [
      "One final question, before the table will acknowledge you.",
      "DO you give an enthusiastic yes to the following?",
    ],
    checkbox: "I consent to participate fully in the madness — costume, manners, and whatever small performance the table demands.",
    buttons: { yes: "One hundred per cent good sir.", no: "I refuse." },
  },
  "/thanks": {
    title: "EXCELLENT.",
    body: [
      "Thank you. The table will await you.",
    ],
    button: "Can I go home now?",
  },
  "/home": {
    title: "NO, YOUNG CHILD.",
    body: [
      "OFF WITH YOUR HEAD!",
    ],
    button: "Really?",
  },
} as const;

export const REPENT_REASON: Record<string, string> = {
  invitation: "You have refused my invitation? How unwise.",
  details: "You refuse the particulars? Typical of you.",
  dress: "Refuse to dress the part? Meet your fate.",
  "must-bring": "You refuse the necessities? You get the boot at the door.",
  "should-bring": "You refuse to perform? How timid.",
  "could-bring": "You refuse the optional offering? Suit yourself.",
  "mustnt-bring": "You refuse restraint? Typical of you.",
  "table-rules": "You refuse the rules? The table will notice.",
  oath: "You refuse enthusiasm? A pity.",
};
