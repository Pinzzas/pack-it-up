// events.js — all 8 events for v1
//
// Structure per event:
//   id          — event identifier (E1–E8)
//   title       — display name
//   description — one-line context shown during the drive
//   ideal       — array of item ids; first present one triggers the ideal outcome
//   improvised  — array of item ids; first present one triggers improvised (only if no ideal item found)
//   text        — outcome prose for each tier; rough must always end warm
//
// Resolution order: Ideal → Improvised → Rough (see src/resolve.js)

export const EVENTS = [

  {
    id: 'E1',
    title: 'The Tollway Crawl',
    description: 'Leaving Manila. Bumper-to-bumper on SLEX/STAR.',
    ideal:      ['snack_stash'],
    improvised: ['power_bank'],
    text: {
      ideal:      'Traffic crawled for two hours — but the snacks came out and so did the stories. By the time you reached the toll, you were almost sorry to leave.',
      improvised: 'Three hours of red taillights, but at least the phones stayed alive. You played music, you played games, you played every playlist twice.',
      rough:      'Three hours of pure, uncut traffic. No snacks, no distractions — just you and the road, and eventually, an actual conversation. It was the best part of the drive.',
    },
  },

  {
    id: 'E2',
    title: 'The Sudden Ulan',
    description: 'A downpour hits the open road.',
    ideal:      ['rain_jacket'],
    improvised: ['malong', 'beach_towel'],
    text: {
      ideal:      'The rain came sideways. Jacket on, hood up — you pushed on, soaked-but-fine, laughing at everyone without one.',
      improvised: 'No rain jacket, but you wrapped yourself in whatever was closest and made a run for it. Ridiculous. It worked.',
      rough:      "You pulled over at a waiting shed and just watched it come down. The rain was loud. You didn't talk much. That silence is still with you somewhere.",
    },
  },

  {
    id: 'E3',
    title: 'The Roadside Stop',
    description: 'The bibingka / fruit / buko stall on the highway.',
    ideal:      ['cooler_bag'],
    improvised: ['snack_stash', 'coin_purse'],
    text: {
      ideal:      'The cooler made all the difference — you loaded up, packed it cold, and had the best movable feast on the road home.',
      improvised: 'Grabbed what you could and ate it right there, standing on the gravel. No plate, no table, no ceremony. Perfect.',
      rough:      'One buko, two straws. The cheapest thing you bought all trip. The one you keep talking about.',
    },
  },

  {
    id: 'E4',
    title: 'The Ferry Crossing',
    description: 'Waiting at the port, the bangka ride over the water.',
    ideal:      ['dry_bag'],
    improvised: ['big_duffel', 'first_aid'],
    text: {
      ideal:      'The waves rocked the bangka and spray came over the side — but everything important was zipped in the dry bag. You crossed with your hands free.',
      improvised: 'No dry bag, but you improvised — wrapped things, tucked them close, held them above your head when it got rough. Managed it.',
      rough:      'Everything got wet. The phone dried eventually. The story never will.',
    },
  },

  {
    id: 'E5',
    title: 'The Beachfront Night',
    description: 'Cooler evening by the water. Nothing to do but sit.',
    ideal:      ['speaker'],
    improvised: ['power_bank', 'snack_stash', 'malong'],
    text: {
      ideal:      'Speaker out, volume low — the music mixed with the waves and you stayed out two hours longer than planned.',
      improvised: "No speaker, but you made it work. Snacks, the malong wrapped around your shoulders, phone screen down. The water didn't care what you brought.",
      rough:      "Just the sound of the waves. No music, no distractions. You talked — the kind of talking that doesn't happen at home. You stayed until you couldn't see the horizon.",
    },
  },

  {
    id: 'E6',
    title: 'The Sandy Aftermath',
    description: 'Back in the car. Everything covered in sand.',
    ideal:      ['extra_shirt'],
    improvised: ['beach_towel', 'big_duffel', 'flip_flops'],
    text: {
      ideal:      "Clean shirt on, sand off, back in the car like a civilized person. The others were jealous. You didn't mention the extra shirt until three days later.",
      improvised: 'You made do — towel, whatever was clean enough. Not clean. But enough.',
      rough:      "Sand in the seats. Sand in the shoes. Sand in the cup holder, somehow. You're still finding it. You've started considering it a souvenir.",
    },
  },

  {
    id: 'E7',
    title: 'The Mosquito Ambush',
    description: 'Sundown. The buzzing starts.',
    ideal:      ['off_repellent'],
    improvised: ['malong'],
    text: {
      ideal:      'You sprayed and they left you alone. You were the only one not slapping yourself. You did not let this go.',
      improvised: 'Covered up with the malong and waited it out. Sweaty, but mostly unbitten. Mostly.',
      rough:      'You were eaten alive. The next morning you compared bites — someone had seventeen. This is now a competition.',
    },
  },

  {
    id: 'E8',
    title: 'The Unloaded Toll',
    description: "The RFID barrier won't lift. The beep of shame. Cars stacking up.",
    ideal:      ['coin_purse'],
    improvised: [], // intentionally no improvised tier for E8
    text: {
      ideal:      'Coin purse out, cash ready — the attendant waved you through before the car behind you could even honk.',
      improvised: '', // never reached — E8 has no improvised tier
      rough:      "The barrier didn't lift. The beep happened again. You reverse-parked into the cash lane while everyone watched. This story now opens every retelling of this trip.",
    },
  },

];
