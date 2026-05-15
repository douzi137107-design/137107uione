import type { PersonaKey } from "./personas";

export type AnswerOption = {
  text: string;
  scores: PersonaKey[];
};

export type Question = {
  q: string;
  options: AnswerOption[];
};

export const questions: Question[] = [
  {
    q: "刚坐上牌桌，你第一件事通常是？",
    options: [
      { text: "先观察全桌，看看谁紧、谁松、谁容易上头。", scores: ["FISHER", "GHOST", "SHARK"] },
      { text: "先聊两句，把气氛打开，顺便看看大家什么反应。", scores: ["TALKER", "DRAMA", "RICH"] },
      { text: "先看位置、筹码深度、对手类型，脑子里开始建模。", scores: ["XUEBA", "JUAN", "TANK"] },
      { text: "今天感觉不错，先来一手试试水。", scores: ["YOLO", "MAGIC", "SSR"] },
    ],
  },
  {
    q: "你拿到一手边缘牌，最真实的想法是？",
    options: [
      { text: "位置不错，可以打，主动权先拿到手。", scores: ["SHARK", "YOLO", "RICH"] },
      { text: "不急，这种牌赢小输大，先放了。", scores: ["ROCK", "PEACE", "TANK"] },
      { text: "这牌有故事，我感觉能搞点事情。", scores: ["MAGIC", "DRAMA", "SSR"] },
      { text: "看对手是谁，他容易犯错我就陪他玩。", scores: ["FISHER", "BEEF", "GHOST"] },
    ],
  },
  {
    q: "你最讨厌哪种牌桌情况？",
    options: [
      { text: "对手乱打，完全不按逻辑来。", scores: ["XUEBA", "JUAN", "TANK"] },
      { text: "一晚上没什么机会，太无聊了。", scores: ["YOLO", "BOOM", "DRAMA"] },
      { text: "被同一个人连续赢，越想越不舒服。", scores: ["BEEF", "BOOM", "RICH"] },
      { text: "大家都太认真，没人聊天，像考试现场。", scores: ["TALKER", "PEACE", "MAGIC"] },
    ],
  },
  {
    q: "你赢了一个大底池之后，通常会？",
    options: [
      { text: "表面平静，心里默默记下这手牌。", scores: ["GHOST", "ROCK", "XUEBA"] },
      { text: "开始进入状态，感觉今晚可以起飞。", scores: ["YOLO", "BOOM", "SSR"] },
      { text: "看看对手反应，他是不是开始急了。", scores: ["SHARK", "FISHER", "TALKER"] },
      { text: "嘴上说运气好，实际上爽得想站起来谢幕。", scores: ["DRAMA", "RICH", "MAGIC"] },
    ],
  },
  {
    q: "你被 bad beat 之后，第一反应是？",
    options: [
      { text: "没事，长期看这是正常波动。", scores: ["XUEBA", "PEACE", "JUAN"] },
      { text: "这牌也能发出来？发牌系统是不是认识他？", scores: ["BOOM", "MAGIC", "BEEF"] },
      { text: "记住这个人，接下来我会盯着他。", scores: ["BEEF", "SHARK", "FISHER"] },
      { text: "不说话，喝口水，继续等机会。", scores: ["GHOST", "ROCK", "TANK"] },
    ],
  },
  {
    q: "别人觉得你在牌桌上最像什么？",
    options: [
      { text: "很稳，几乎不犯大错。", scores: ["ROCK", "PEACE", "TANK"] },
      { text: "很会聊，桌上有你气氛不会冷。", scores: ["TALKER", "DRAMA", "RICH"] },
      { text: "有点危险，不知道你什么时候突然开火。", scores: ["YOLO", "BOOM", "SHARK"] },
      { text: "看不太懂你，但总感觉你在憋大的。", scores: ["GHOST", "FISHER", "MAGIC"] },
    ],
  },
  {
    q: "你最喜欢的赢法是？",
    options: [
      { text: "精准读出对手弱点，一手拿下。", scores: ["SHARK", "XUEBA", "FISHER"] },
      { text: "河牌神来一张，直接逆天改命。", scores: ["SSR", "MAGIC", "YOLO"] },
      { text: "慢慢磨，少犯错，最后自然赢。", scores: ["ROCK", "PEACE", "TANK"] },
      { text: "用心理战把对手演进去。", scores: ["DRAMA", "TALKER", "BEEF"] },
    ],
  },
  {
    q: "如果有人一直 bluff 你，你会？",
    options: [
      { text: "先忍，等他自己露出破绽。", scores: ["FISHER", "GHOST", "ROCK"] },
      { text: "找准一手，直接反击，让他知道桌上有人。", scores: ["SHARK", "YOLO", "BOOM"] },
      { text: "开始分析他的频率，看他到底偏离多少。", scores: ["XUEBA", "JUAN", "TANK"] },
      { text: "嘴上笑着，心里已经给他建了一个专属文件夹。", scores: ["BEEF", "TALKER", "DRAMA"] },
    ],
  },
  {
    q: "你学习德扑最像哪种状态？",
    options: [
      { text: "看书、看视频、记范围，越学越上头。", scores: ["JUAN", "XUEBA", "TANK"] },
      { text: "不太爱学理论，但我相信牌感。", scores: ["MAGIC", "SSR", "YOLO"] },
      { text: "喜欢看实战，尤其是对手怎么犯错。", scores: ["FISHER", "SHARK", "GHOST"] },
      { text: "学可以，但别太累，开心最重要。", scores: ["PEACE", "TALKER", "RICH"] },
    ],
  },
  {
    q: "翻牌前你最常出现的内心声音是？",
    options: [
      { text: "这手牌范围里该不该出现？", scores: ["XUEBA", "JUAN", "TANK"] },
      { text: "他刚才那个动作不自然。", scores: ["SHARK", "FISHER", "GHOST"] },
      { text: "这把有感觉，能中。", scores: ["MAGIC", "SSR", "YOLO"] },
      { text: "我要不要装得弱一点？", scores: ["DRAMA", "TALKER", "BEEF"] },
    ],
  },
  {
    q: "如果你今晚一直没拿到好牌，你会？",
    options: [
      { text: "继续等，烂牌不值得我出手。", scores: ["ROCK", "PEACE", "TANK"] },
      { text: "找机会偷一下，不然太没参与感了。", scores: ["YOLO", "DRAMA", "TALKER"] },
      { text: "观察别人，没牌也能收集信息。", scores: ["GHOST", "FISHER", "SHARK"] },
      { text: "怀疑今天座位、方向、饮料、衣服颜色都有问题。", scores: ["MAGIC", "BOOM", "SSR"] },
    ],
  },
  {
    q: "别人说你太紧了，你会？",
    options: [
      { text: "紧就紧，少犯错才是王道。", scores: ["ROCK", "PEACE", "XUEBA"] },
      { text: "表面接受，下一手找机会证明自己不是只会等。", scores: ["BEEF", "BOOM", "YOLO"] },
      { text: "其实我是在藏，你们没懂。", scores: ["GHOST", "FISHER", "DRAMA"] },
      { text: "回去复盘一下，我是不是真的过紧。", scores: ["JUAN", "TANK", "XUEBA"] },
    ],
  },
  {
    q: "你觉得自己最大的牌桌优势是？",
    options: [
      { text: "心态稳，不容易被带节奏。", scores: ["PEACE", "ROCK", "TANK"] },
      { text: "敢打，关键时候不怂。", scores: ["YOLO", "BOOM", "RICH"] },
      { text: "会观察人，能抓到细节。", scores: ["SHARK", "FISHER", "GHOST"] },
      { text: "会制造气氛，也会制造压力。", scores: ["TALKER", "DRAMA", "RICH"] },
    ],
  },
  {
    q: "如果你突然被全桌针对，你会？",
    options: [
      { text: "更兴奋，说明他们怕我。", scores: ["RICH", "YOLO", "BOOM"] },
      { text: "收紧一点，等他们犯错。", scores: ["ROCK", "FISHER", "GHOST"] },
      { text: "重新调整策略，看看哪里被识破了。", scores: ["XUEBA", "JUAN", "TANK"] },
      { text: "表面开玩笑，暗地里逐个记账。", scores: ["BEEF", "TALKER", "DRAMA"] },
    ],
  },
  {
    q: "你最像哪句话？",
    options: [
      { text: "长期来看，这手是没问题的。", scores: ["XUEBA", "JUAN", "TANK"] },
      { text: "别急，他会自己送的。", scores: ["FISHER", "GHOST", "ROCK"] },
      { text: "我感觉这把能来。", scores: ["MAGIC", "SSR", "YOLO"] },
      { text: "你信不信我这里真有？", scores: ["DRAMA", "TALKER", "BOOM"] },
    ],
  },
  {
    q: "朋友让你评价自己的牌桌风格，你会说？",
    options: [
      { text: "别问，问就是稳。", scores: ["ROCK", "PEACE", "TANK"] },
      { text: "我就是喜欢主动一点，牌局要有节目效果。", scores: ["YOLO", "BOOM", "DRAMA"] },
      { text: "我主要看人，对手才是答案。", scores: ["SHARK", "FISHER", "TALKER"] },
      { text: "理论要学，但有时候也得信点玄的。", scores: ["JUAN", "XUEBA", "MAGIC"] },
    ],
  },
];
