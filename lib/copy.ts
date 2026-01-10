export const COPY = {
  "/": {
    title: "THROUGH THE LOOKING-GLASS",
    body: [
      "A presence lingers behind the glass.",
    ],
    namePrompt: "What is your name, young child?",
    question: "Were you born on the 25th of January?",
    buttons: { yes: "I was.", no: "I was not." },
  },
  "/not-invited": {
    title: "",
    body: [
      "Born on the 25th? Then you are not permitted to enter our wonderland.",
      "(Hmmm, maybe next time you should consider lying.)",
    ],
    button: "I am sorry, I am awfully tired. Can I try that again?",
  },
  "/invitation": {
    title: "VERY MERRY UNBIRTHDAY TEA PARTY",
    body: [
      "You are cordially invited to a midday tea party to celebrate Anthony's unbirthday — and yours too.",
      "Merriment and revelry await you at the table of bad manners. Exorbitant amounts of tea and biscuits, and beautiful compatriots ready to partake in excessively caffeinated madness, will be present at the table.",
    ],
    question: "Would you like to know more?",
    buttons: { yes: "Oh, I very much would.", no: "I am scared, get me out of here." },
  },
  "/details": {
    title: "",
    body: [
      "More details to come once you've accepted the invitation.",
    ],
    question: "Will you be gracing us with your presence?",
    buttons: {
      yes: "Of course, I wouldn't miss it for the word.",
      maybe: "It is a maybe for me, but I will try my best. I wouldn't want to offend our handsome host.",
      no: "Unfortunately, I won't be able to join the festivities.",
    },
  },
  "/rsvp": {
    title: "RSVP",
    question: "Will you be ours?",
    buttons: { yes: "I wouldn't miss it for the world.", no: "I refuse this invitation." },
    ledgerTitle: "Pledge to Come",
    submit: "How shall I arrive?",
    options: [
      "I shall attend",
      "I may attend",
      "It is a maybe for me, but I will try my best. I wouldn't want to offend our handsome host.",
      "I shall arrive fully prepared — mentally, physically, emotionally, spiritually — for the occasion",
    ],
  },
  "/regrets": {
    title: "",
    body: ["So be it, but at least show some good manners and leave a note of regret to be read aloud at the table."],
    submit: "Well of course, What kind of a person wouldn't send along their regrets?",
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
    title: "",
    body: [
      "John Malcom was a staunch Loyalist and customs officer in revolutionary Boston, forever insisting that rules and a tax be put on tea.",
      "So the townsfolk, being far more imaginative about dress codes than the colonial army, fitted him with a scalding coat of tar topped with a hefty dose of feathers, then carted him through the streets for the enjoyment of the crowd.",
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
    buttons: { yes: "I will try, good sir.", no: "I refuse to partake." },
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
      "• A bad attitude. No Debbie Downers, no Igors, no hurried rabbits, no toxic energy, no private discussions, no fussy etiquette.",
    ],
    question: "Understood?",
    buttons: { yes: "In total agreement, good sir.", no: "I refuse." },
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
    title: "",
    body: [
      "One final thing…",
      "Do you swear, enthusiastically and without a shred of dignity, to submit to the madness of costume, manners, and whatever petty theatrics the table demands?",
    ],
    buttons: { yes: "I'd suck off an entire barbarian army to show you my enthusiasm, good sir.", no: "I refuse." },
  },
  "/thanks": {
    title: "",
    body: [
      "As amusing as that would be to watch, that won't be necessary. Our host appreciates your enthusiasm and awaits you earnestly for a lovely cup of tea the twenty-fifth.",
      "Thank you.",
    ],
    button: "May I go home now?",
  },
  "/home": {
    title: "",
    body: [
      "NO, YOUNG CHILD.",
      "OFF WITH YOUR HEAD!",
    ],
    button: "Really?!",
  },
} as const;

export const REPENT_REASON: Record<string, string> = {
  invitation: "You refuse to hear out the details? Now you should be be scared you stupid little bitch.",
  details: "You refuse the particulars? Go home!",
  dress: "Refuse to dress the part? Meet your fate.",
  "must-bring": "You refuse the necessities? You get the boot at the door.",
  "should-bring": "You refuse to perform? How timid.",
  "could-bring": "You refuse the optional offering? Suit yourself.",
  "mustnt-bring": "You refuse restraint? Typical of you.",
  "table-rules": "You refuse the rules? The table will notice.",
  oath: "You refuse enthusiasm? A pity.",
};
