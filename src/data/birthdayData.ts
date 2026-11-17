export interface PhotoItem {
  id: string;
  src: string;
  fallbackSrc?: string;
  caption: string;
  dateOrPlace?: string;
  rotation?: number;
}

export interface BirthdayConfig {
  name: string;
  senderName: string;
  introHeading: string;
  introMessage: string;
  introHint: string;
  revealSubtitle: string;
  birthdayMessage: string;
  cardSubtitle: string;
  finalQuestion: string;
  finalResponseText: string;
  finalCelebrationNote: string;
  music: string;
  photos: PhotoItem[];
  specialHighlights: {
    title: string;
    description: string;
    emoji: string;
  }[];
}

export const birthdayData: BirthdayConfig = {
  name: "Sanika",
  senderName: "Someone Who Admires You",
  introHeading: "Hey Sanika... ❤️",
  introMessage: "I made a little something for you.",
  introHint: "But first... you have to open it.",
  revealSubtitle: "Today is all about you, your smile, and the joy you bring into the world.",
  birthdayMessage: `Dear Sanika, My Maaa ❤️

I don't know if a website, a thousand words, or even a lifetime would be enough to express everything I feel for you. But I wanted to create something special, something that could remind you how deeply you are loved by me.

Sanika, you came into my life and slowly became a part of everything. My mornings feel better when I see your messages, my nights feel incomplete without talking to you, and even the smallest moments with you become memories I wish I could keep forever.

I love your smile, your little talks, your childish moments, your care, your silly expressions and even those tiny things you probably don't realise I notice. Sometimes, even watching you on a video call while you're doing your own little things makes me feel like the happiest person alive. And yes, even when I accidentally fall asleep during our calls, please know that being with you is still my favourite place to be. 🥹❤️

I want you to understand something, my love. I don't want to be just someone who says he loves you. I want to be the person who makes you feel loved every single day. The person you can run to when everything feels difficult. The person who listens to your endless stories, takes care of you when you're unwell, comforts you when you cry and celebrates even your smallest achievements.

And maybe I'm a little possessive when it comes to you. Not because I want to control your world, your friendships or your freedom, but because you hold such a special place in my heart. I love calling you *my girl, my Bujji, my favourite person, my future wife*. There is something incredibly beautiful about knowing that we chose each other. ❤️

I know life won't always be perfect. There may be misunderstandings, difficult days, silly fights and moments when we don't understand each other. But I never want us to forget that we're on the same side. I don't want either of us to fight for attention or feel alone in this relationship. I want us to understand each other, choose each other and grow together.

Thank you for choosing me, even with all my imperfections. Thank you for loving me, for trusting me and for making me feel special in ways you might not even realise. I wish I could take away every pain you feel, every tear you shed and every doubt that makes you question your worth. I want you to see yourself through my eyes just once. Maybe then you'd understand how incredibly beautiful and precious you are to me.

And if I could make one wish for every lifetime, it would be the same every time:

Let me find you again. Let me fall in love with you again. Let me hold your hand again. Let me call you mine again.

I don't just dream of romantic moments with you. I dream of ordinary mornings, silly arguments over little things, sharing food, travelling together, taking care of each other, growing older and building a little world of our own.

One day, I hope there won't be any need to wait for a video call or a goodnight message. I'll simply be beside you, holding you close, reminding you that you're home.

Until then, remember this:

You are not just a beautiful chapter in my life. You are the person I want beside me as I write the rest of my story.

My Sanika. My Bujji. My favourite girl. My forever choice.

I love you more than these words could ever explain.

In this life, in every lifetime, I'll keep choosing you. ❤️🥹

Forever yours. 🫂💗.

Happy Birthday, Sanika. ❤️`,
  cardSubtitle: "May your smile always be as beautiful and radiant as it is today.",
  finalQuestion: "Did you like your little surprise? 🥹",
  finalResponseText: "That's all I wanted to hear. ❤️",
  finalCelebrationNote: "Happy Birthday once again, Sanika! 🎂✨ May this year be filled with endless magic, peace, and unforgettable moments.",
  music: "/music/birthday.mp3",
  
  // Photos configuration:
  // Using the uploaded Sanika images placed into public/photos (Sanika01..Sanika11)
  photos: [
    {
      id: "sanika-01",
      src: "/photos/Sanika images/Sanika01.jpeg",
      fallbackSrc: "/photos/Sanika images/Sanika01.jpeg",
      caption: "Smiles that warm the heart ❤️",
      dateOrPlace: "Park",
      rotation: -3
    },
    {
      id: "sanika-02",
      src: "/photos/Sanika images/Sanika02.jpeg",
      fallbackSrc: "/photos/Sanika images/Sanika02.jpeg",
      caption: "Collage of happy moments 😊",
      dateOrPlace: "Collage",
      rotation: 2
    },
    {
      id: "sanika-03",
      src: "/photos/Sanika images/Sanika03.png",
      fallbackSrc: "/photos/Sanika images/Sanika03.png",
      caption: "Classic black & white charm 🖤",
      dateOrPlace: "Memories",
      rotation: 4
    },
    {
      id: "sanika-04",
      src: "/photos/Sanika images/Sanika05.png",
      fallbackSrc: "/photos/Sanika images/Sanika05.png",
      caption: "Cute and confident ✨",
      dateOrPlace: "At home",
      rotation: -2,
    },
    {
      id: "sanika-05",
      src: "/photos/Sanika images/Sanika09.png",
      fallbackSrc: "/photos/Sanika images/Sanika09.png",
      caption: "Park day — soft smiles 🌿",
      dateOrPlace: "Close-up",
      rotation: 3
    },
    {
      id: "sanika-06",
      src: "/photos/Sanika images/sanika06.jpeg",
      fallbackSrc: "/photos/Sanika images/sanika06.jpeg",
      caption: "Beautiful in every look 🌸",
      dateOrPlace: "Portrait",
      rotation: -4
    },
    {
      id: "sanika-07",
      src: "/photos/Sanika images/saree.png",
      fallbackSrc: "/photos/Sanika images/saree.png",
      caption: "Saree elegance 🌺",
      dateOrPlace: "Tradition",
      rotation: 1
    },
    {
      id: "sanika-08",
      src: "/photos/Sanika images/sanika07.jpeg",
      fallbackSrc: "/photos/Sanika images/sanika08.jpeg",
      caption: "Carefree and joyful 😄",
      dateOrPlace: "Happy day",
      rotation: -1
    },
    {
      id: "sanika-09",
      src: "/photos/Sanika images/sanika09.jpeg",
      fallbackSrc: "/photos/Sanika images/sanika09.jpeg",
      caption: "Candid and lovely 🌼",
      dateOrPlace: "Candid",
      rotation: 2
    },
    {
      id: "sanika-10",
      src: "/photos/Sanika images/saree02.png",
      fallbackSrc: "/photos/Sanika images/saree02.png",
      caption: "A serene portrait — love this one 💚",
      dateOrPlace: "Garden",
      rotation: -2
    },
    {
      id: "sanika-11",
      src: "/photos/Sanika images/Finalshot.png",
      fallbackSrc: "/photos/Sanika images/Finalshot.png",
      caption: "A bright smile to end with ✨",
      dateOrPlace: "Final shot",
      rotation: 0
    }
  ],

  specialHighlights: [
    {
      title: "Radiant Kindness",
      description: "You have a natural gift for making people around you feel comfortable and cared for.",
      emoji: "🌸"
    },
    {
      title: "Infectious Laugh",
      description: "That genuine laugh that immediately makes everyone else smile too.",
      emoji: "✨"
    },
    {
      title: "Pure Energy",
      description: "Bringing warmth and positive vibes everywhere you go.",
      emoji: "💖"
    }
  ]
};
