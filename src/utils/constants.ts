// ============================================================
// 🦉 CONSTANTS — Edit all personalized text here!
// ============================================================
// This is the ONE file you need to edit to personalize everything.
// Swap in your real words, memories, and photos below.

// ---- NAMES & DATES ----
export const HER_NICKNAME = "Ullu";
export const MY_NICKNAME = "Baby";
export const INSIDE_JOKE_NAME = "Mottu";

// The date your happy days started (when you first saw her)
// Format: YYYY-MM-DD
export const START_DATE = "2025-07-08";

// ---- HERO SECTION ----
export const HERO_SUBTITLE = "I have something to tell you...";
export const HERO_BUTTON_TEXT = "Open my letter";

// ---- APOLOGY SECTION ----
export const APOLOGY_PARAGRAPHS = [
  `Hey Mottu,`,
  `I know I messed up. I couldn't be there to pick you up, and I hate that. You were far away and I was stuck here and I couldn't even get you a proper gift. That's not okay and I'm not gonna pretend it is.`,
  `But here's what I figured — instead of some random thing wrapped in paper that you'd forget about in a week, I wanted to give you something that actually took effort. Something that says what I'm usually too awkward to say out loud.`,
  `So yeah. This is me, trying. Scroll down, Ullu.`,
];
export const APOLOGY_SIGN_OFF = "— Your Baby";

// ---- TIMELINE / MEMORIES ----
// 📷 SWAP PHOTOS: Replace the `image` paths with your real photos!
//    Drop photos into /public/images/ and update paths like "/images/your-photo.jpg"
export interface MemoryItem {
  id: number;
  title: string;
  caption: string;
  image: string | null; // null = show placeholder
  emoji: string;
}

export const MEMORIES: MemoryItem[] = [
  {
    id: 1,
    title: "The saree moment",
    caption:
      "The first time I saw you in a saree, I literally forgot how to talk. You looked at me like 'what?' and I was just... done for.",
    image: "/images/ullu-saree.png",
    emoji: "🦉",
  },
  {
    id: 2,
    title: "Kasauli, but make it chaos",
    caption:
      "We went to Kasauli and immediately got lost. No GPS, no clue, just us arguing about which turn to take. Honestly? Best wrong turn of my life.",
    image: "/images/kasauli-trip.png",
    emoji: "🗺️",
  },
  {
    id: 3,
    title: "Cheese burst at Domino's",
    caption:
      "You and cheese burst pizza is a love story I can never compete with. I've accepted my place. I'm second.",
    image: "/images/pizza-moment.png",
    emoji: "🍕",
  },
  {
    id: 4,
    title: "The slim vs. mottu debate",
    caption:
      "You call me skinny like it's an insult. I call you mottu like it's the softest word I know. We're both right.",
    image: "/images/slim-vs-mottu.png",
    emoji: "😂",
  },
];

// ---- REASONS I LOVE HER ----
// ✏️ PERSONALIZE: Swap these with your real reasons!
export const REASONS = [
  "You laugh at your own jokes before you even finish telling them",
  "The way you say 'baby' when you want something and think I won't notice",
  "You pretend to be angry but your face gives you away every time",
  "You make even Domino's feel like a fancy date",
  "The way you looked in that saree and had zero idea what you did to me",
  "You call me skinny like it's a crime and honestly it's my favourite thing",
  "You got lost with me in Kasauli and didn't even panic. You just held my hand.",
  "You're my Ullu. That's it. That's the reason.",
];

// ---- COUPON BOOK ----
// ✏️ PERSONALIZE: Change these to your own IOUs!
export interface CouponItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

export const COUPONS: CouponItem[] = [
  {
    id: 1,
    emoji: "🎬",
    title: "Movie Night",
    description: "One movie night — my treat, your pick, no complaints from me",
  },
  {
    id: 2,
    emoji: "📵",
    title: "No Phones Day",
    description: "One full day — no phones, just us, I mean it",
  },
  {
    id: 3,
    emoji: "🍳",
    title: "Breakfast in Bed",
    description: "One breakfast in bed — don't ask what's in it, just eat",
  },
  {
    id: 4,
    emoji: "🛵",
    title: "Surprise Ride",
    description:
      "One surprise ride — I pick you up, no questions, we just go",
  },
  {
    id: 5,
    emoji: "🤗",
    title: "Big Spoon Day",
    description:
      "One full day of being the big spoon — even if you make fun of my arms",
  },
  {
    id: 6,
    emoji: "🍕",
    title: "Extra Cheese Burst",
    description: "One extra cheese burst pizza — yes, the expensive one",
  },
];

// ---- CLOSING NOTE ----
export const CLOSING_PARAGRAPHS = [
  `I'm not perfect, Ullu. I couldn't be there, I didn't have a gift, and half the time I don't know what I'm doing.`,
  `But I know one thing for sure — you're the best thing that's ever happened to me. Every single day since July 8th has been better because you're in it.`,
  `Happy Girlfriend's Day, Mottu. I love you. More than cheese burst pizza. And you know that's saying something.`,
];
export const CLOSING_SIGN_OFF = "Forever yours,";
export const CLOSING_NAME = "Baby 🦉";

// ---- FOOTER ----
export const FOOTER_TEXT = `made with love by Baby, for Ullu 🦉`;
