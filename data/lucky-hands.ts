import type { PersonaKey } from "./personas";

export type LuckyCard = {
  rank: string;
  suit: "spade" | "heart" | "hidden";
};

export type LuckyHand = {
  id: string;
  code: string;
  title: string;
  cards: [LuckyCard, LuckyCard];
  keywords: string[];
  index: number;
  reading: string;
  hidden?: boolean;
  royal?: boolean;
};

type LuckyPersonaKey = "SSR" | "MAGIC" | "PEACE";

export const luckyPersonaKeys: LuckyPersonaKey[] = ["SSR", "MAGIC", "PEACE"];

function isLuckyPersonaKey(personaKey: PersonaKey): personaKey is LuckyPersonaKey {
  return luckyPersonaKeys.some((key) => key === personaKey);
}

export const hiddenLuckyHand: LuckyHand = {
  id: "blind",
  code: "Blind Luck",
  title: "隐藏幸运｜盲打签",
  cards: [
    { rank: "?", suit: "spade" },
    { rank: "?", suit: "heart" },
  ],
  keywords: ["未知", "胆量", "第一反应"],
  index: 99,
  hidden: true,
  reading:
    "今天的幸运不在你知道多少，而在你敢不敢相信自己的第一反应。盲打签不是让你真的盲打，而是提醒你：有些选择不必过度解释，先感受，再行动。",
};

export const royalHiddenLuckyHand: LuckyHand = {
  id: "aa-suited-royal",
  code: "AA suited",
  title: "隐藏皇家｜同色双 A",
  cards: [
    { rank: "A", suit: "heart" },
    { rank: "A", suit: "heart" },
  ],
  keywords: ["离谱高光", "规则外", "皇家警察"],
  index: 100,
  hidden: true,
  royal: true,
  reading:
    "这已经不是普通幸运签了，这手 AA 同色只能请皇家警察来打了。今天你的气场不负责讲道理，只负责让所有人暂停三秒：等等，刚才发生了什么？",
};

export const luckyHands: LuckyHand[] = [
  {
    id: "27o",
    code: "27o",
    title: "杂色反骨牌",
    cards: [
      { rank: "7", suit: "spade" },
      { rank: "2", suit: "heart" },
    ],
    keywords: ["反骨", "空降", "不按套路"],
    index: 72,
    reading:
      "27o 是今日反常识签。它看起来不像主角，但偏偏最适合提醒你：不要急着变成标准答案。今天你的幸运点不在看起来合理，而在我偏要走自己的路。",
  },
  {
    id: "47o",
    code: "47o",
    title: "小手枪",
    cards: [
      { rank: "4", suit: "spade" },
      { rank: "7", suit: "heart" },
    ],
    keywords: ["突然开火", "轻装上阵", "小而有戏"],
    index: 76,
    reading:
      "47o 的玄学是小东西也有响声。今天不适合铺太大场面，适合抓一个小机会轻轻一扣，气氛就变了。别小看不起眼的瞬间，它可能正是你的转场按钮。",
  },
  {
    id: "j8o",
    code: "J8o",
    title: "男人牌",
    cards: [
      { rank: "J", suit: "spade" },
      { rank: "8", suit: "heart" },
    ],
    keywords: ["硬气", "面子", "不解释"],
    index: 81,
    reading:
      "J8o 是一种很倔的手牌。它不一定讲道理，但很讲气势。今天你适合少解释，多保持姿态。真正的重点不是别人懂不懂，而是你自己别先怂。",
  },
  {
    id: "86s",
    code: "86s",
    title: "上山牌",
    cards: [
      { rank: "8", suit: "heart" },
      { rank: "6", suit: "heart" },
    ],
    keywords: ["绕路", "爬坡", "后劲"],
    index: 84,
    reading:
      "86s 像一条不直但有风景的山路。今天你的幸运不在开局很顺，而在越走越有感觉。别急着证明路线正确，先往上走，风景会在后半段出现。",
  },
  {
    id: "a5s",
    code: "A5s",
    title: "小 AK",
    cards: [
      { rank: "A", suit: "heart" },
      { rank: "5", suit: "heart" },
    ],
    keywords: ["轻巧", "伪装", "灵活上限"],
    index: 88,
    reading:
      "A5s 是小 AK，也是今天的别把自己说太满签。它有 A 的底气，也有 5 的灵活。适合低调开局，保留变化，让别人晚一点才发现你不是随便来的。",
  },
  {
    id: "54s",
    code: "54s",
    title: "地下通道",
    cards: [
      { rank: "5", suit: "heart" },
      { rank: "4", suit: "heart" },
    ],
    keywords: ["低调", "暗线", "后门灵感"],
    index: 73,
    reading:
      "54s 是低处开花的牌。今天不要嫌自己的起点不起眼，真正有用的线索往往藏在边角。你越不急着站到灯下，越容易发现别人没看到的路。",
  },
  {
    id: "65s",
    code: "65s",
    title: "斜坡起步",
    cards: [
      { rank: "6", suit: "heart" },
      { rank: "5", suit: "heart" },
    ],
    keywords: ["顺势", "小步", "慢热"],
    index: 75,
    reading:
      "65s 的幸运来自连续感。今天适合一点点推进，不要一上来就求大动静。小步走对了，也会走出一条很漂亮的线。",
  },
  {
    id: "76s",
    code: "76s",
    title: "顺风弯道",
    cards: [
      { rank: "7", suit: "heart" },
      { rank: "6", suit: "heart" },
    ],
    keywords: ["灵活", "变线", "不卡死"],
    index: 79,
    reading:
      "76s 提醒你别把自己锁在一种答案里。今天适合保留弹性，顺着桌面变化微调。真正的好运，可能来自你临时拐的那个弯。",
  },
  {
    id: "87s",
    code: "87s",
    title: "山路中段",
    cards: [
      { rank: "8", suit: "heart" },
      { rank: "7", suit: "heart" },
    ],
    keywords: ["节奏", "连接", "慢慢有戏"],
    index: 82,
    reading:
      "87s 是很有节奏感的手牌。它不急着开大，但很会连接前后。今天适合把碎片串起来，越到后面越能看见完整图案。",
  },
  {
    id: "98s",
    code: "98s",
    title: "暗流加速",
    cards: [
      { rank: "9", suit: "heart" },
      { rank: "8", suit: "heart" },
    ],
    keywords: ["潜力", "转折", "越走越顺"],
    index: 86,
    reading:
      "98s 的玄学是先藏一下，再突然顺起来。今天不必抢第一眼的光，保持一点流动感，等局面开始转，你会发现自己已经站在合适的位置。",
  },
  {
    id: "t9s",
    code: "T9s",
    title: "临门一脚",
    cards: [
      { rank: "T", suit: "heart" },
      { rank: "9", suit: "heart" },
    ],
    keywords: ["接近", "机会感", "一步之遥"],
    index: 85,
    reading:
      "T9s 像那种差一点就很完整的预感。今天你会对快到了特别敏感。别因为还差一点就放弃，有时候幸运就是在最后一格亮起来。",
  },
  {
    id: "jts",
    code: "JTs",
    title: "顺子美学",
    cards: [
      { rank: "J", suit: "heart" },
      { rank: "T", suit: "heart" },
    ],
    keywords: ["漂亮", "连贯", "手感在线"],
    index: 89,
    reading:
      "JTs 是很有审美的手牌，讲究一个顺。今天适合做让自己觉得舒服的选择：不急、不硬、不拧巴。手感顺的时候，很多事会自己接上。",
  },
  {
    id: "aa",
    code: "AA",
    title: "天选双 A",
    cards: [
      { rank: "A", suit: "spade" },
      { rank: "A", suit: "heart" },
    ],
    keywords: ["压场", "高光", "正面登场"],
    index: 96,
    reading:
      "AA 是今天最亮的牌面签。它提醒你：有些时候不用绕路，你可以直接站到光里。但越是高光，越要稳住，不要急着把所有情绪都交出去。",
  },
  {
    id: "kk",
    code: "KK",
    title: "王座牌",
    cards: [
      { rank: "K", suit: "spade" },
      { rank: "K", suit: "heart" },
    ],
    keywords: ["气场", "位置", "别乱"],
    index: 94,
    reading:
      "KK 是一张很讲位置感的牌。今天你的幸运来自稳住自己的边界，不急着追逐所有声音。坐稳了，别人自然会感到你的重量。",
  },
  {
    id: "qq",
    code: "QQ",
    title: "女王牌",
    cards: [
      { rank: "Q", suit: "spade" },
      { rank: "Q", suit: "heart" },
    ],
    keywords: ["优雅", "判断", "不失控"],
    index: 92,
    reading:
      "QQ 的玄学是漂亮但不慌。今天适合保持审美和判断力，不为了证明自己而用力过猛。真正高级的气场，是别人急你不急。",
  },
  {
    id: "aks",
    code: "AKs",
    title: "王炸气质",
    cards: [
      { rank: "A", suit: "heart" },
      { rank: "K", suit: "heart" },
    ],
    keywords: ["主角", "清晰", "站出来"],
    index: 95,
    reading:
      "AKs 是我可以上桌说话的手牌。今天适合做清晰、有存在感的选择。不要把自己的气场藏太久，合适的时候就该亮相。",
  },
  {
    id: "aqs",
    code: "AQs",
    title: "清醒高光",
    cards: [
      { rank: "A", suit: "heart" },
      { rank: "Q", suit: "heart" },
    ],
    keywords: ["体面", "清醒", "高级感"],
    index: 91,
    reading:
      "AQs 像一束不刺眼的高光。今天适合把话说清、把节奏拿稳，不必夸张，也能让别人感觉你很有分量。",
  },
  {
    id: "kqs",
    code: "KQs",
    title: "高级连线",
    cards: [
      { rank: "K", suit: "heart" },
      { rank: "Q", suit: "heart" },
    ],
    keywords: ["气质", "顺滑", "配合"],
    index: 90,
    reading:
      "KQs 是很顺眼的一手牌。今天适合让沟通、节奏和判断保持在同一条线上。别拧巴，顺起来就是你的幸运开关。",
  },
  {
    id: "qjs",
    code: "QJs",
    title: "温柔连线",
    cards: [
      { rank: "Q", suit: "heart" },
      { rank: "J", suit: "heart" },
    ],
    keywords: ["顺滑", "好相处", "不拧巴"],
    index: 87,
    reading:
      "QJs 是一张很会照顾节奏的牌。今天适合用舒服的方式推进关系和选择。你不需要很用力，温柔也可以很有结构。",
  },
  {
    id: "a4s",
    code: "A4s",
    title: "小弯路",
    cards: [
      { rank: "A", suit: "heart" },
      { rank: "4", suit: "heart" },
    ],
    keywords: ["保留", "转向", "轻声发力"],
    index: 83,
    reading:
      "A4s 是别急着摊牌的签。今天适合把真正的想法留一点在后面，先顺着局面走，等弯路把你带到更好的位置。",
  },
  {
    id: "55",
    code: "55",
    title: "小稳定器",
    cards: [
      { rank: "5", suit: "spade" },
      { rank: "5", suit: "heart" },
    ],
    keywords: ["低调", "稳住", "不内耗"],
    index: 78,
    reading:
      "55 是今天的稳定小锚点。它不张扬，但能提醒你别被外界带跑。把节奏放慢一点，很多不必要的消耗会自己降下来。",
  },
  {
    id: "66",
    code: "66",
    title: "稳稳过桥",
    cards: [
      { rank: "6", suit: "spade" },
      { rank: "6", suit: "heart" },
    ],
    keywords: ["平衡", "过渡", "站稳"],
    index: 80,
    reading:
      "66 像一座小桥，不喧哗，但能让你从一个状态走到另一个状态。今天适合稳稳过渡，不必一步到位，先站住就很好。",
  },
];

export const allLuckyHands = [hiddenLuckyHand, royalHiddenLuckyHand, ...luckyHands];

export function findLuckyHand(id: string) {
  return allLuckyHands.find((hand) => hand.id === id) ?? null;
}

export function drawLuckyHand() {
  const roll = Math.random();

  if (roll < 0.01) {
    return royalHiddenLuckyHand;
  }

  if (roll < 0.04) {
    return hiddenLuckyHand;
  }

  return luckyHands[Math.floor(Math.random() * luckyHands.length)];
}

const personaOpenings: Record<LuckyPersonaKey, string[]> = {
  SSR: [
    "对 SSR 来说，这是一张自带镜头感的手牌。",
    "对 SSR 来说，这张牌像聚光灯突然打下来，别人还没反应过来，你已经入画了。",
    "对 SSR 来说，这不是手牌，是一段高光预告片。",
    "对 SSR 来说，它的重点不在强不强，而在一出现就很难被忽略。",
  ],
  MAGIC: [
    "对 MAGIC 来说，这是一张直觉开始发声的手牌。",
    "对 MAGIC 来说，这张牌像桌面上突然亮了一下的小预感。",
    "对 MAGIC 来说，它不是答案，是某种正在靠近的信号。",
    "对 MAGIC 来说，这张牌最玄的地方在于：你越不解释，它越像真的。",
  ],
  PEACE: [
    "对 PEACE 来说，这是一张把节奏调舒服的手牌。",
    "对 PEACE 来说，这张牌像给心态按了一下静音键。",
    "对 PEACE 来说，它提醒你别被外界推着跑，舒服才是今天的主线。",
    "对 PEACE 来说，这张牌不催你赢过谁，只提醒你稳稳地待在自己的节奏里。",
  ],
};

const personaClosings: Record<LuckyPersonaKey, string[]> = {
  SSR: [
    "今天别急着解释你的高光，先把镜头站稳。",
    "今天适合少说两句，把出场感留给结果。",
    "今天你的气场不需要旁白，站稳就够有戏。",
    "今天别追着别人证明自己，镜头已经在你这边了。",
  ],
  MAGIC: [
    "今天可以相信那些反复出现的小预感，但记得给自己留一点回旋空间。",
    "今天别把每个直觉都讲成道理，玄学偶尔也需要一点留白。",
    "今天适合顺着感觉走，但别忘了给自己留一条退路。",
    "今天你的好运不一定讲逻辑，但会讲时机。",
  ],
  PEACE: [
    "今天的幸运来自不内耗，舒服地选择，安静地发光。",
    "今天别急着证明什么，把心态放平，好东西会自己靠近。",
    "今天适合慢一点、稳一点，别让噪音抢走你的节奏。",
    "今天先照顾好自己的状态，剩下的交给顺其自然。",
  ],
};

export function getPersonaLuckyReading(personaKey: PersonaKey, hand: LuckyHand, variant = 0) {
  if (!isLuckyPersonaKey(personaKey)) {
    return hand.reading;
  }

  const key = personaKey;
  const opening = personaOpenings[key][variant % personaOpenings[key].length];
  const closing = personaClosings[key][variant % personaClosings[key].length];

  return `${hand.code} ${opening}${hand.reading}${closing}`;
}
