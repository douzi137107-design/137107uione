export const personaOrder = [
  "SSR",
  "DRAMA",
  "MAGIC",
  "YOLO",
  "BOOM",
  "BEEF",
  "SHARK",
  "RICH",
  "TALKER",
  "FISHER",
  "GHOST",
  "XUEBA",
  "JUAN",
  "TANK",
  "PEACE",
  "ROCK",
  "BUG",
  "KING",
] as const;

export type PersonaKey = (typeof personaOrder)[number];

export type Persona = {
  key: PersonaKey;
  englishName: PersonaKey;
  chineseName: string;
  image: string;
  description: string;
  strengths: string[];
  improvements: string[];
};

export const personas: Record<PersonaKey, Persona> = {
  SSR: {
    key: "SSR",
    englishName: "SSR",
    chineseName: "天选之子",
    image: "/personas/ssr.png",
    description: "你自带高光时刻体质，总能在别人觉得平平无奇的局面里等到反转。你相信感觉，也愿意给灵感一点表演空间。",
    strengths: ["临场感强", "情绪感染力高", "敢在关键时刻做选择"],
    improvements: ["别把一次神来之笔当成固定剧本", "复盘时多区分灵感和事实"],
  },
  DRAMA: {
    key: "DRAMA",
    englishName: "DRAMA",
    chineseName: "戏精",
    image: "/personas/drama.png",
    description: "你是牌桌上的剧情制造机，表情、节奏、台词都很有层次。你不只是参与牌局，还会让每一手牌变得有记忆点。",
    strengths: ["表达力强", "心理博弈感足", "很会制造氛围"],
    improvements: ["别让表演盖过判断", "关键时刻减少情绪加戏"],
  },
  MAGIC: {
    key: "MAGIC",
    englishName: "MAGIC",
    chineseName: "玄学家",
    image: "/personas/magic.png",
    description: "你对细节和气场很敏感，常常能从别人没注意到的小信号里读出故事。你的牌桌风格带一点不可解释的灵光。",
    strengths: ["直觉敏锐", "观察细腻", "临场创造力强"],
    improvements: ["给直觉配一点证据", "别被一瞬间的感觉完全带走"],
  },
  YOLO: {
    key: "YOLO",
    englishName: "YOLO",
    chineseName: "莽夫",
    image: "/personas/yolo.png",
    description: "你讨厌一桌人都在等，喜欢让事情动起来。你行动果断、节奏很快，牌桌因为你多了很多节目效果。",
    strengths: ["行动果断", "不怕尝试", "能快速打开局面"],
    improvements: ["重大选择前多停三秒", "别让兴奋替你完成判断"],
  },
  BOOM: {
    key: "BOOM",
    englishName: "BOOM",
    chineseName: "爆破手",
    image: "/personas/boom.png",
    description: "你天生带着点火属性，遇到僵局就想打破它。你不喜欢被动等待，更愿意用主动姿态把桌面节奏推起来。",
    strengths: ["攻击性强", "破局能力好", "存在感鲜明"],
    improvements: ["控制连续加速的冲动", "把火力留给更清晰的机会"],
  },
  BEEF: {
    key: "BEEF",
    englishName: "BEEF",
    chineseName: "记仇家",
    image: "/personas/beef.png",
    description: "你记忆力很好，尤其记得谁让你不舒服。你会把每一次交锋都收进小本本，等到合适时机再回应。",
    strengths: ["目标感强", "记忆细节多", "对人性变化敏感"],
    improvements: ["别让个人情绪绑架策略", "该翻篇时就轻装继续"],
  },
  SHARK: {
    key: "SHARK",
    englishName: "SHARK",
    chineseName: "鲨鱼",
    image: "/personas/shark.png",
    description: "你看起来冷静，实际上一直在寻找对手的弱点。你不急着表现，但一旦机会清楚，动作会很干净。",
    strengths: ["判断锋利", "压迫感强", "抓失误能力好"],
    improvements: ["别让强势变成紧绷", "偶尔放松会让信息更多"],
  },
  RICH: {
    key: "RICH",
    englishName: "RICH",
    chineseName: "富贵玩家",
    image: "/personas/rich.png",
    description: "你自带大场面气质，喜欢体面、喜欢漂亮操作，也喜欢让自己保持从容。牌桌上，你很懂气势的重要性。",
    strengths: ["气场稳定", "自信外放", "很会掌握体面节奏"],
    improvements: ["别为了面子硬撑", "把自信和纪律放在一起"],
  },
  TALKER: {
    key: "TALKER",
    englishName: "TALKER",
    chineseName: "话痨",
    image: "/personas/talker.png",
    description: "你是牌桌空气调节器，哪里冷场哪里就有你。聊天不是分心，而是你收集信息、观察反应的方式。",
    strengths: ["社交敏锐", "沟通自然", "能让气氛变松弛"],
    improvements: ["别聊到忘记观察自己", "关键手牌减少外界干扰"],
  },
  FISHER: {
    key: "FISHER",
    englishName: "FISHER",
    chineseName: "钓鱼佬",
    image: "/personas/fisher.png",
    description: "你不急着出手，更喜欢看别人怎么动。你擅长等对方露出破绽，再用很轻的动作把机会收回来。",
    strengths: ["耐心好", "诱导能力强", "善于发现对手习惯"],
    improvements: ["别等到错过主动窗口", "必要时把意图藏得更自然"],
  },
  GHOST: {
    key: "GHOST",
    englishName: "GHOST",
    chineseName: "幽灵",
    image: "/personas/ghost.png",
    description: "你的存在感不一定强，但信息一直在你这里沉淀。别人看不懂你，是因为你习惯把节奏藏在安静里。",
    strengths: ["低调稳定", "隐藏信息能力强", "观察不容易被发现"],
    improvements: ["别过度隐身导致机会流走", "适当释放信号能提升掌控感"],
  },
  XUEBA: {
    key: "XUEBA",
    englishName: "XUEBA",
    chineseName: "做题家",
    image: "/personas/xueba.png",
    description: "你喜欢把牌桌变成一道可拆解的题。范围、频率、位置、对手类型，都会被你放进脑内模型。",
    strengths: ["逻辑清晰", "学习能力强", "复盘意识好"],
    improvements: ["别让模型压过真实桌感", "接受娱乐局里也会有不标准答案"],
  },
  JUAN: {
    key: "JUAN",
    englishName: "JUAN",
    chineseName: "卷王",
    image: "/personas/juan.png",
    description: "你不是随便玩玩型选手。你会学习、记录、复盘，也会把每次体验都变成下一次变强的材料。",
    strengths: ["自驱力强", "持续进步", "细节打磨认真"],
    improvements: ["别把娱乐变成压力测试", "给自己留一点轻松空间"],
  },
  TANK: {
    key: "TANK",
    englishName: "TANK",
    chineseName: "坦克",
    image: "/personas/tank.png",
    description: "你有很强的抗压感，不容易被外界节奏推着走。你重视稳固结构，也愿意扛住复杂局面。",
    strengths: ["抗压稳定", "纪律感强", "决策不易变形"],
    improvements: ["别把稳固变成迟钝", "偶尔主动变速会更有弹性"],
  },
  PEACE: {
    key: "PEACE",
    englishName: "PEACE",
    chineseName: "和平玩家",
    image: "/personas/peace.png",
    description: "你最在意舒服的体验和稳定心态。你不喜欢无意义的火药味，更愿意让牌桌保持轻松、清醒、友好。",
    strengths: ["心态平稳", "边界感好", "能缓和紧张气氛"],
    improvements: ["别为了和气放弃表达", "该争取主动时别太客气"],
  },
  ROCK: {
    key: "ROCK",
    englishName: "ROCK",
    chineseName: "石头人",
    image: "/personas/rock.png",
    description: "你稳得像一块石头，很少被情绪推着走。你相信耐心和纪律，也愿意等到局面足够清晰。",
    strengths: ["谨慎可靠", "耐心扎实", "不容易被诱导"],
    improvements: ["别让稳变成太可预测", "适度变化会让你更难被读懂"],
  },
  BUG: {
    key: "BUG",
    englishName: "BUG",
    chineseName: "系统漏洞",
    image: "/personas/bug.png",
    description:
      "你不是某一种牌桌人格，你像是把 16 种人格都偷偷点满了。该稳的时候像 ROCK，该冲的时候像 YOLO，该算的时候像 XUEBA，该演的时候像 DRAMA。你能聊天，也能隐身；能给压力，也能及时收手。别人还在猜你是什么类型，你已经在根据他们的类型换打法了。系统原本想给你贴标签，结果标签自己 fold 了。",
    strengths: ["全局适应", "情绪稳定", "读人精准", "策略灵活"],
    improvements: ["未发现明显短板"],
  },
  KING: {
    key: "KING",
    englishName: "KING",
    chineseName: "被雪藏的王",
    image: "/personas/king.png",
    description:
      "系统原本也想把你归类，但归到最后发现：你不在分类表里，你在分类表上面。曾经，KING 是牌桌人格系统里的公开人格。但因为他太全面、太稳定、太有压制力，导致其他人格都像陪衬。后来，系统为了平衡生态，也为了给其他人格留出曝光空间，悄悄把 KING 从公开结果池里下架了。只有极少数人，在稳定、自控、逻辑、读人、控场、压迫感全部拉满时，系统才会重新识别出那个被雪藏的名字：KING。",
    strengths: ["稳定自控", "逻辑压制", "精准读人", "全局控场"],
    improvements: ["容易被误判为普通玩家", "不喜欢暴露全部实力", "对低质量局面耐心有限"],
  },
};

export const complianceStatement =
  "本测试仅用于德扑兴趣社交、策略学习与娱乐交流；不提供金钱输赢建议；禁止任何形式的赌博行为。";
