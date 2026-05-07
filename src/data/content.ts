export type ColorKey = "blue" | "red" | "green" | "khaki" | "amber";

export interface Example {
  en: string;
  zh: string;
}

export interface Word {
  en: string;
  pos?: string;
  ipa?: string;
  zh: string;
  note?: string;
  examples?: Example[];
  tag: string;
  color: ColorKey;
}

export interface Phrase {
  en: string;
  zh: string;
  tip?: string;
}

export interface Scenario {
  id: string;
  icon: string;
  label: string;
  blurb: string;
  color: ColorKey;
  phrases: Phrase[];
}

export interface KeyPhrase {
  en: string;
  zh: string;
}

export interface Trip {
  id: string;
  day: string;
  chip: string;
  city: string;
  cn: string;
  title: string;
  sub: string;
  flag: string;
  color: ColorKey;
  paper: string;
  accent: string;
  weather: string;
  duration: string;
  spots: string[];
  keyPhrase: KeyPhrase;
  status?: string;
}

export interface Progress {
  totalDays: number;
  currentDay: number;
  completed: { day: number; label: string; done: boolean }[];
}

export interface Quote {
  en: string;
  who: string;
}

export interface GameOption {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface GameScene {
  id: string;
  title: string;
  cn: string;
  setup: string;
  options: GameOption[];
}

export interface DeepgramVoice {
  id: string;
  label: string;
}

export const TODAY_WORDS: Word[] = [
  {
    en: "boarding pass",
    pos: "n.",
    ipa: "/ˈbɔːrdɪŋ pæs/",
    zh: "登機證",
    note: "行李託運後櫃檯給你的小卡，過安檢和登機都會看。",
    examples: [
      { en: "Could you have your boarding pass ready, please?", zh: "請把您的登機證準備好。" },
      { en: "I lost my boarding pass — can you reprint it at the gate?", zh: "我登機證不見了，可以在登機門補印嗎？" },
    ],
    tag: "Airport",
    color: "blue",
  },
  {
    en: "transfer",
    pos: "v. / n.",
    ipa: "/ˈtrænsfɜːr/",
    zh: "轉機 / 轉乘",
    note: "搭飛機是 transfer / connecting flight；地鐵換線也是 transfer。",
    examples: [
      { en: "I have a 90-minute transfer at Narita.", zh: "我在成田有 90 分鐘的轉機時間。" },
      { en: "Transfer to the Red Line at Clark/Lake.", zh: "在 Clark/Lake 站轉紅線。" },
    ],
    tag: "Transit",
    color: "green",
  },
  {
    en: "check in",
    pos: "v.",
    ipa: "/tʃɛk ɪn/",
    zh: "報到 / 入住",
    note: "機場是 check in luggage；旅館是 check in to my room。動詞分開寫。",
    examples: [
      { en: "Hi, I'd like to check in. The reservation is under Lin.", zh: "你好，我要 check in，訂房名字是 Lin。" },
      { en: "What time can I check in?", zh: "幾點可以入住？" },
    ],
    tag: "Hotel",
    color: "red",
  },
  {
    en: "round trip",
    pos: "n.",
    ipa: "/raʊnd trɪp/",
    zh: "來回票",
    note: "美式說 round trip，英式常說 return ticket。單程是 one way。",
    examples: [
      { en: "One adult round-trip ticket to O'Hare, please.", zh: "一張到 O'Hare 的成人來回票，謝謝。" },
      { en: "Is round trip cheaper than two one-ways?", zh: "來回比兩張單程便宜嗎？" },
    ],
    tag: "Transit",
    color: "blue",
  },
  {
    en: "to-go",
    pos: "adj. / adv.",
    ipa: "/tə ɡoʊ/",
    zh: "外帶",
    note: "美國說 to-go，英國說 takeaway。內用是 for here / dine-in。",
    examples: [
      { en: "One latte, to-go please.", zh: "一杯拿鐵，外帶謝謝。" },
      { en: "For here or to-go?", zh: "內用還是外帶？" },
    ],
    tag: "Food",
    color: "khaki",
  },
];

export const VOCAB_LIBRARY: Word[] = [
  // Airport
  { en: "carry-on",        zh: "隨身行李", pos: "n.",  tag: "Airport", color: "blue",
    examples: [{ en: "Is this within the carry-on size limit?", zh: "這個有在隨身行李尺寸內嗎？" }] },
  { en: "checked baggage", zh: "託運行李", pos: "n.",  tag: "Airport", color: "blue",
    examples: [{ en: "I have one checked baggage.", zh: "我有一件託運行李。" }] },
  { en: "gate",            zh: "登機門",   pos: "n.",  tag: "Airport", color: "blue",
    examples: [{ en: "Has the gate changed?", zh: "登機門有變更嗎？" }] },
  { en: "layover",         zh: "中停",     pos: "n.",  tag: "Airport", color: "blue",
    examples: [{ en: "I have a 4-hour layover in Tokyo.", zh: "我在東京中停 4 小時。" }] },
  { en: "customs",         zh: "海關",     pos: "n.",  tag: "Airport", color: "blue",
    examples: [{ en: "Anything to declare at customs?", zh: "海關有東西要申報嗎？" }] },

  // Hotel
  { en: "reservation",     zh: "訂房 / 預約", pos: "n.", tag: "Hotel", color: "red",
    examples: [{ en: "I have a reservation under the name Lin.", zh: "我有訂房，名字是 Lin。" }] },
  { en: "deposit",         zh: "押金",     pos: "n.",  tag: "Hotel", color: "red",
    examples: [{ en: "Is there a deposit on the room?", zh: "房間需要押金嗎？" }] },
  { en: "amenities",       zh: "備品 / 設施", pos: "n.", tag: "Hotel", color: "red",
    examples: [{ en: "What amenities are included?", zh: "有附哪些備品？" }] },
  { en: "late check-out",  zh: "延遲退房", pos: "n.",  tag: "Hotel", color: "red",
    examples: [{ en: "Could I have a late check-out at 2 pm?", zh: "可以延遲退房到下午兩點嗎？" }] },

  // Food
  { en: "server",          zh: "服務生",   pos: "n.",  tag: "Food", color: "khaki",
    examples: [{ en: "Could we ask the server for the bill?", zh: "可以請服務生結帳嗎？" }] },
  { en: "tap water",       zh: "白開水",   pos: "n.",  tag: "Food", color: "khaki",
    examples: [{ en: "Just tap water is fine, thanks.", zh: "白開水就好，謝謝。" }] },
  { en: "split the check", zh: "分開結帳", pos: "v.",  tag: "Food", color: "khaki",
    examples: [{ en: "Could we split the check, please?", zh: "可以分開結帳嗎？" }] },
  { en: "spicy",           zh: "辣的",     pos: "adj.", tag: "Food", color: "khaki",
    examples: [{ en: "How spicy is it on a scale of 1 to 5?", zh: "辣度 1-5 大概幾級？" }] },
  { en: "allergic to",     zh: "對⋯過敏", pos: "phr.", tag: "Food", color: "khaki",
    examples: [{ en: "I'm allergic to peanuts.", zh: "我對花生過敏。" }] },

  // Transit
  { en: "fare",            zh: "車資 / 票價", pos: "n.", tag: "Transit", color: "green",
    examples: [{ en: "How much is the fare to downtown?", zh: "到市中心多少錢？" }] },
  { en: "platform",        zh: "月台",     pos: "n.",  tag: "Transit", color: "green",
    examples: [{ en: "Which platform for the airport train?", zh: "去機場的車在幾號月台？" }] },
  { en: "rush hour",       zh: "尖峰時段", pos: "n.",  tag: "Transit", color: "green",
    examples: [{ en: "Avoid rush hour if you can.", zh: "盡量避開尖峰時段。" }] },
  { en: "transfer",        zh: "轉乘",     pos: "v.",  tag: "Transit", color: "green",
    examples: [{ en: "Where do I transfer to the Blue Line?", zh: "藍線在哪裡轉？" }] },

  // Sightseeing
  { en: "landmark",        zh: "地標",     pos: "n.",  tag: "Sights", color: "amber",
    examples: [{ en: "Cloud Gate is a famous landmark in Chicago.", zh: "雲門是芝加哥有名的地標。" }] },
  { en: "around the corner", zh: "就在轉角", pos: "phr.", tag: "Sights", color: "amber",
    examples: [{ en: "It's just around the corner.", zh: "就在轉角。" }] },
  { en: "head straight",   zh: "直走",     pos: "phr.", tag: "Sights", color: "amber",
    examples: [{ en: "Head straight for two blocks.", zh: "直走兩個街口。" }] },
  { en: "must-see",        zh: "必去",     pos: "adj.", tag: "Sights", color: "amber",
    examples: [{ en: "What's a must-see in this neighborhood?", zh: "這附近有什麼必去的地方？" }] },
];

export const SCENARIOS: Scenario[] = [
  {
    id: "airport",
    icon: "✈︎",
    label: "機場 · Airport",
    blurb: "Check-in、安檢、轉機、海關。",
    color: "blue",
    phrases: [
      { en: "I'd like an aisle seat, please.", zh: "我想要走道座位，謝謝。", tip: "window seat = 靠窗" },
      { en: "Where is gate B12?", zh: "B12 登機門在哪裡？" },
      { en: "Has my flight been delayed?", zh: "我的班機有延誤嗎？" },
      { en: "I'm just transiting — I won't leave the airport.", zh: "我只是過境，不會出機場。" },
      { en: "Could I get a window seat instead?", zh: "可以改成靠窗的位子嗎？" },
      { en: "I'd like to check this bag.", zh: "這件我要託運。" },
      { en: "Is there a charging station near the gate?", zh: "登機門附近有充電站嗎？", tip: "outlet = 插座" },
      { en: "I'm here for tourism, about ten days.", zh: "我來觀光，大概十天。", tip: "海關問句的標準答法" },
    ],
  },
  {
    id: "hotel",
    icon: "✦",
    label: "住宿 · Hotel",
    blurb: "Check-in、要備品、客訴、延遲退房。",
    color: "red",
    phrases: [
      { en: "I have a reservation under the name Lin.", zh: "我有訂房，名字是 Lin。" },
      { en: "Could I have an extra towel and pillow?", zh: "可以多一條毛巾和一個枕頭嗎？" },
      { en: "The Wi-Fi in my room isn't working.", zh: "我房間的 Wi-Fi 不能用。" },
      { en: "Could I leave my luggage here until 5 pm?", zh: "行李可以寄放到下午五點嗎？", tip: "luggage storage" },
      { en: "Is breakfast included?", zh: "有附早餐嗎？" },
      { en: "Could I have a late check-out, please?", zh: "可以延遲退房嗎？" },
      { en: "Is there a quieter room available?", zh: "有比較安靜的房間嗎？" },
      { en: "Could you call a taxi to the airport for 6 am?", zh: "可以幫我叫早上六點到機場的計程車嗎？" },
    ],
  },
  {
    id: "restaurant",
    icon: "◴",
    label: "餐廳 · Restaurant",
    blurb: "點餐、客製化、飲食限制、結帳。",
    color: "khaki",
    phrases: [
      { en: "Table for two, please.", zh: "兩位，謝謝。" },
      { en: "Could I see the menu?", zh: "可以看一下菜單嗎？" },
      { en: "What do you recommend?", zh: "你推薦什麼？" },
      { en: "Does this contain peanuts? I'm allergic.", zh: "這個有花生嗎？我過敏。" },
      { en: "I'd like it medium-rare.", zh: "我要五分熟。", tip: "rare / medium-rare / medium / medium-well / well-done" },
      { en: "Could we have the check, please?", zh: "可以結帳嗎？" },
      { en: "Is the tip included?", zh: "小費已經含在裡面了嗎？" },
      { en: "Could we get this to-go?", zh: "這個可以打包嗎？" },
    ],
  },
  {
    id: "transit",
    icon: "▣",
    label: "交通 · Transit",
    blurb: "問路、買票、地鐵轉乘、計程車。",
    color: "green",
    phrases: [
      { en: "How do I get to downtown from here?", zh: "從這裡怎麼去市中心？" },
      { en: "Which line goes to Chinatown?", zh: "哪一條線到中國城？" },
      { en: "Is this the right platform for the airport?", zh: "去機場是這個月台嗎？" },
      { en: "How much is the fare?", zh: "車資多少錢？" },
      { en: "Could you let me know when we get to my stop?", zh: "到站可以提醒我嗎？" },
      { en: "Could you take me to this address?", zh: "可以載我到這個地址嗎？", tip: "（出示手機地圖）" },
      { en: "Could I have the receipt, please?", zh: "可以給我收據嗎？" },
      { en: "Is there a day pass for the metro?", zh: "地鐵有一日票嗎？" },
    ],
  },
  {
    id: "directions",
    icon: "✦",
    label: "問路 · Directions",
    blurb: "聽得懂左右、街口、距離。",
    color: "amber",
    phrases: [
      { en: "Excuse me, do you know where the nearest pharmacy is?", zh: "不好意思，最近的藥局在哪？" },
      { en: "Is it walking distance, or should I take a cab?", zh: "走得到，還是要搭計程車？" },
      { en: "How long does it take on foot?", zh: "走路要多久？" },
      { en: "Could you point it out on the map?", zh: "可以在地圖上指給我看嗎？" },
      { en: "Sorry, could you say that more slowly?", zh: "不好意思，可以說慢一點嗎？" },
      { en: "Take a left at the next intersection.", zh: "下個路口左轉。", tip: "intersection = 十字路口" },
      { en: "It's right across from the bank.", zh: "就在銀行對面。" },
      { en: "I think I'm lost — could you help me?", zh: "我好像迷路了，可以幫我嗎？" },
    ],
  },
  {
    id: "shopping",
    icon: "✧",
    label: "購物 · Shopping",
    blurb: "試穿、換貨、退稅、付款。",
    color: "blue",
    phrases: [
      { en: "I'm just browsing, thanks.", zh: "我只是看看，謝謝。" },
      { en: "Do you have this in a medium?", zh: "這個有 M 號嗎？" },
      { en: "Where's the fitting room?", zh: "試衣間在哪？" },
      { en: "Could I pay by card?", zh: "可以刷卡嗎？" },
      { en: "Is tax included in the price?", zh: "價格有含稅嗎？" },
      { en: "Can I get a tax refund as a tourist?", zh: "我是觀光客可以退稅嗎？" },
      { en: "Could I exchange this for a different size?", zh: "可以換一個尺寸嗎？" },
      { en: "Could you gift-wrap this, please?", zh: "可以幫我包裝成禮物嗎？" },
    ],
  },
];

export const TRIPS: Trip[] = [
  {
    id: "chicago-d2",
    day: "Day 02",
    chip: "1/22",
    city: "Chicago",
    cn: "芝加哥",
    title: "抵達日 · 芝加哥",
    sub: "Arrival Day",
    flag: "🇺🇸",
    color: "red",
    paper: "linear-gradient(135deg, #F7E2DA 0%, #F7F5EF 60%)",
    accent: "#C8472D",
    weather: "12° / Cloudy",
    duration: "1 day",
    spots: ["O'Hare Intl. (ORD)", "Blue Line → Loop", "Hotel Check-in", "Millennium Park"],
    keyPhrase: { en: "I'm here for tourism, about ten days.", zh: "我來觀光，大概十天。" },
    status: "✓ 完成",
  },
  {
    id: "chicago-d3",
    day: "Day 03",
    chip: "3/22",
    city: "Chicago",
    cn: "ORD → Chinatown",
    title: "雙線轉乘 · 入住",
    sub: "Transit & Check-in",
    flag: "🇺🇸",
    color: "blue",
    paper: "linear-gradient(135deg, #E6ECFF 0%, #F7F5EF 60%)",
    accent: "#1E50FF",
    weather: "10° / Clear",
    duration: "1 day",
    spots: ["Blue Line", "Transfer at Clark/Lake", "Red Line → Cermak", "Chinatown Hotel"],
    keyPhrase: { en: "Transfer to the Red Line at Clark/Lake.", zh: "在 Clark/Lake 站轉紅線。" },
    status: "✓ 完成",
  },
  {
    id: "kyoto",
    day: "Day —",
    chip: "Planned",
    city: "Kyoto",
    cn: "京都",
    title: "古都漫步",
    sub: "Old town walk",
    flag: "🇯🇵",
    color: "green",
    paper: "linear-gradient(135deg, #DDEAE0 0%, #F7F5EF 60%)",
    accent: "#2F7A52",
    weather: "—",
    duration: "1 day",
    spots: ["Fushimi Inari", "Gion", "Kiyomizu-dera", "Pontocho"],
    keyPhrase: { en: "Could I get the vegetarian option without bonito?", zh: "可以給我不加柴魚的素食嗎？" },
    status: "草稿",
  },
];

export const PROGRESS: Progress = {
  totalDays: 22,
  currentDay: 21,
  completed: [
    { day: 1,  label: "Mission + 選定目的地",     done: true },
    { day: 2,  label: "Chicago 抵達日手冊",       done: true },
    { day: 3,  label: "ORD → Chinatown 轉乘手冊", done: true },
    { day: 4,  label: "情境：Hotel check-in",     done: true },
    { day: 5,  label: "NotebookLM 口袋書",        done: true },
    { day: 6,  label: "半日行程草稿",              done: true },
    { day: 7,  label: "Week 1 復盤",              done: true },
  ],
};

export const DAILY_QUOTES: Quote[] = [
  { en: "Travel is fatal to prejudice, bigotry, and narrow-mindedness.", who: "Mark Twain" },
  { en: "Not all those who wander are lost.", who: "J.R.R. Tolkien" },
  { en: "The world is a book and those who do not travel read only one page.", who: "St. Augustine" },
];

export const GAME_SCENES: GameScene[] = [
  {
    id: "checkin",
    title: "Hotel Check-in",
    cn: "辦理入住",
    setup: "你抵達 Chicago 的 Chinatown Hotel，櫃台說 \"Hi, do you have a reservation?\"",
    options: [
      { text: "Yes, I have a reservation under the name Lin.", correct: true,
        feedback: "✓ 完美。報名字 + 訂房，櫃台一聽就懂。" },
      { text: "Reservation. Lin. Yes.", correct: false,
        feedback: "可以聽懂但太斷。完整一點：\"I have a reservation under...\"" },
      { text: "I want a room.", correct: false,
        feedback: "如果你已經訂了，這句會讓櫃台以為你是 walk-in。先說「I have a reservation.」" },
    ],
  },
  {
    id: "transfer",
    title: "Subway Transfer",
    cn: "問轉乘",
    setup: "你在 Clark/Lake 站，要從 Blue Line 轉 Red Line 去 Chinatown。問月台人員。",
    options: [
      { text: "Excuse me, where do I transfer to the Red Line?", correct: true,
        feedback: "✓ 標準 transfer 用法。對方會直接指方向。" },
      { text: "Red Line where?", correct: false,
        feedback: "聽得懂但不禮貌。前面加 \"Excuse me\" 差很多。" },
      { text: "I want Red Line train.", correct: false,
        feedback: "直接但不像母語者說的。可以改：\"How do I get to the Red Line?\"" },
    ],
  },
  {
    id: "allergy",
    title: "Restaurant Allergy",
    cn: "餐廳告知過敏",
    setup: "你在拉麵店，菜單上看不出有沒有花生。你對花生嚴重過敏。",
    options: [
      { text: "Does this contain peanuts? I'm allergic.", correct: true,
        feedback: "✓ 直接、清楚、安全。allergic 是關鍵字。" },
      { text: "No peanut please.", correct: false,
        feedback: "可以理解但不夠清楚。allergic 比 \"no\" 更能讓對方警覺。" },
      { text: "I don't like peanuts.", correct: false,
        feedback: "「不喜歡」≠「過敏」。對方可能還是會用同一個鍋。要說 allergic！" },
    ],
  },
];

export const DEEPGRAM_VOICES: DeepgramVoice[] = [
  { id: "aura-asteria-en", label: "Asteria (female)" },
  { id: "aura-luna-en",    label: "Luna (female)" },
  { id: "aura-stella-en",  label: "Stella (female)" },
  { id: "aura-orion-en",   label: "Orion (male)" },
  { id: "aura-arcas-en",   label: "Arcas (male)" },
  { id: "aura-perseus-en", label: "Perseus (male)" },
];

export const DEFAULT_VOICE = "aura-asteria-en";
export const DEEPGRAM_VOICE_IDS = DEEPGRAM_VOICES.map((v) => v.id);
