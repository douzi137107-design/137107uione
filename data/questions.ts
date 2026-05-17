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
      { text: "不急，这种牌容易让局面变复杂，先放了。", scores: ["ROCK", "PEACE", "TANK"] },
      { text: "这牌有故事，我感觉能搞点事情。", scores: ["MAGIC", "DRAMA", "SSR"] },
      { text: "看对手是谁，他容易犯错我就陪他玩。", scores: ["FISHER", "BEEF", "GHOST"] },
    ],
  },
  {
    q: "你最讨厌哪种牌桌情况？",
    options: [
      { text: "对手乱打，完全不按逻辑来。", scores: ["XUEBA", "JUAN", "TANK"] },
      { text: "一晚上没什么参与感，太无聊了。", scores: ["YOLO", "BOOM", "DRAMA"] },
      { text: "被同一个人连续压住节奏，越想越不舒服。", scores: ["BEEF", "BOOM", "RICH"] },
      { text: "大家都太认真，没人聊天，像考试现场。", scores: ["TALKER", "PEACE", "MAGIC"] },
    ],
  },
  {
    q: "你拿下一个大底池之后，通常会？",
    options: [
      { text: "表面平静，心里默默记下这手牌。", scores: ["GHOST", "ROCK", "XUEBA"] },
      { text: "开始进入状态，感觉今晚可以起飞。", scores: ["YOLO", "BOOM", "SSR"] },
      { text: "看看对手反应，他是不是开始急了。", scores: ["SHARK", "FISHER", "TALKER"] },
      { text: "嘴上说运气好，实际上爽得想站起来谢幕。", scores: ["DRAMA", "RICH", "MAGIC"] },
    ],
  },
  {
    q: "碰到离谱反转之后，你第一反应是？",
    options: [
      { text: "没事，长期看这是正常波动。", scores: ["XUEBA", "PEACE", "JUAN"] },
      { text: "这牌也能出来？今天系统是不是有剧本？", scores: ["BOOM", "MAGIC", "BEEF"] },
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
    q: "你最喜欢的漂亮操作是？",
    options: [
      { text: "精准读出对手弱点，一手拿下。", scores: ["SHARK", "XUEBA", "FISHER"] },
      { text: "最后突然反转，直接变成名场面。", scores: ["SSR", "MAGIC", "YOLO"] },
      { text: "慢慢磨，少犯错，最后自然收下。", scores: ["ROCK", "PEACE", "TANK"] },
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
      { text: "继续等，没必要硬参与。", scores: ["ROCK", "PEACE", "TANK"] },
      { text: "找机会动一下，不然太没存在感了。", scores: ["YOLO", "DRAMA", "TALKER"] },
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
      { text: "别急，他会自己送信息的。", scores: ["FISHER", "GHOST", "ROCK"] },
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
  {
    q: "牌桌突然安静三秒，你脑子里的弹幕是？",
    options: [
      { text: "没人说话正好，我要体面地记住每个人的反应。", scores: ["SSR", "BEEF", "RICH"] },
      { text: "这段沉默有点贵气，像主角登场前的空镜。", scores: ["SSR", "RICH", "BEEF"] },
      { text: "安静也挺好，我顺便把刚才那几手在脑子里复盘一遍。", scores: ["JUAN", "PEACE", "SSR"] },
      { text: "先别急着破冰，稳住气场，谁先动谁露馅。", scores: ["RICH", "BEEF", "PEACE"] },
    ],
  },
  {
    q: "朋友说“你刚才那手有点抽象”，你会？",
    options: [
      { text: "抽象只是表面，我看到的是对手弱点和升级空间。", scores: ["JUAN", "SSR", "SHARK"] },
      { text: "我先笑一下，回去再把这手复盘到他怀疑人生。", scores: ["RICH", "BEEF", "JUAN"] },
      { text: "牌桌不能只有标准答案，偶尔爆一下才有空气感。", scores: ["BOOM", "ROCK", "PEACE"] },
      { text: "不解释，玄学和数学有时候只是同一件事的两种叫法。", scores: ["MAGIC", "SSR", "XUEBA"] },
    ],
  },
  {
    q: "如果牌桌有朋友圈，你最可能发什么？",
    options: [
      { text: "今天主打一个看破不说破，聊天只是我的烟雾弹。", scores: ["GHOST", "TALKER", "RICH"] },
      { text: "有人已经开始急了，我不点名，但我记得很清楚。", scores: ["SHARK", "BEEF", "ROCK"] },
      { text: "表面和平局，实际每个细节都值得卷一下。", scores: ["PEACE", "BOOM", "JUAN"] },
      { text: "玄学也是科学，只是暂时没写进教材。", scores: ["MAGIC", "SSR", "XUEBA"] },
    ],
  },
  {
    q: "你最容易被哪句话点燃？",
    options: [
      { text: "你怎么不说话，是不是没想法？", scores: ["GHOST", "TALKER", "RICH"] },
      { text: "你刚才是不是故意针对我？", scores: ["SHARK", "BEEF", "ROCK"] },
      { text: "娱乐局而已，你怎么还卷起来了？", scores: ["BOOM", "PEACE", "JUAN"] },
      { text: "你这手纯靠运气吧？", scores: ["MAGIC", "DRAMA", "SSR"] },
    ],
  },
  {
    q: "你在牌桌上的隐藏技能更像哪一个？",
    options: [
      { text: "边聊天边记样本，别人以为我只是话多。", scores: ["GHOST", "XUEBA", "TALKER"] },
      { text: "看似随便坐着，其实在等别人自己露出破绽。", scores: ["JUAN", "FISHER", "RICH"] },
      { text: "越安静越有压迫感，像一块记仇的石头。", scores: ["SHARK", "BEEF", "ROCK"] },
      { text: "情绪来了先扛住，扛完再决定要不要爆。", scores: ["BOOM", "PEACE", "TANK"] },
    ],
  },
  {
    q: "遇到一个特别爱说“我随便玩玩”的人，你会？",
    options: [
      { text: "很好，我先观察他随便到什么程度。", scores: ["MAGIC", "YOLO", "SSR"] },
      { text: "我信一半，剩下一半放进观察名单。", scores: ["DRAMA", "XUEBA", "GHOST"] },
      { text: "顺着聊，让他多暴露一点真实习惯。", scores: ["FISHER", "TALKER", "RICH"] },
      { text: "默默调整策略，不让场面牵着走。", scores: ["ROCK", "SHARK", "JUAN"] },
    ],
  },
  {
    q: "你最像哪种牌桌表情包？",
    options: [
      { text: "表面：嗯嗯。内心：这笔账我先记着。", scores: ["BEEF", "BOOM", "TANK"] },
      { text: "表面：随缘。内心：这把有光，感觉来了。", scores: ["YOLO", "PEACE", "MAGIC"] },
      { text: "表面：正常。内心：这剧情和公式都不该这么走。", scores: ["DRAMA", "SSR", "XUEBA"] },
      { text: "表面：哈哈哈。内心：样本量加一，继续观察。", scores: ["GHOST", "FISHER", "TALKER"] },
    ],
  },
  {
    q: "当你发现自己被读懂了，你会怎么补救？",
    options: [
      { text: "换节奏，先把对方的判断打乱。", scores: ["JUAN", "RICH", "SHARK"] },
      { text: "收一下，保持边界，让对方先急。", scores: ["ROCK", "BEEF", "PEACE"] },
      { text: "突然来点玄的，让局面重新变复杂。", scores: ["YOLO", "BOOM", "TANK"] },
      { text: "继续演，甚至演出一个被读懂的人。", scores: ["MAGIC", "DRAMA", "SSR"] },
    ],
  },
  {
    q: "牌桌上你最不能忍的“人设崩塌”是？",
    options: [
      { text: "我说我随便聊聊，其实每句话都在进数据库。", scores: ["GHOST", "XUEBA", "TALKER"] },
      { text: "我说我佛系，下一秒开始认真钓人上钩。", scores: ["JUAN", "FISHER", "RICH"] },
      { text: "我说我很稳，其实只是把不爽藏得比较深。", scores: ["SHARK", "BEEF", "ROCK"] },
      { text: "我说我情绪稳定，但心里已经响起警报。", scores: ["BOOM", "PEACE", "TANK"] },
    ],
  },
  {
    q: "如果给你的牌桌人格配一首 BGM，你选？",
    options: [
      { text: "开场就有鼓点，主打一个马上有戏。", scores: ["MAGIC", "YOLO", "SSR"] },
      { text: "低音很重，像在暗处观察全场。", scores: ["DRAMA", "XUEBA", "GHOST"] },
      { text: "轻松但洗脑，大家不知不觉跟着你走。", scores: ["FISHER", "TALKER", "RICH"] },
      { text: "极简冷静，听起来就不像会乱动。", scores: ["ROCK", "SHARK", "JUAN"] },
    ],
  },
  {
    q: "有人说“你今天状态不对”，你的第一反应是？",
    options: [
      { text: "状态不对？那可能是我在蓄力。", scores: ["BEEF", "BOOM", "TANK"] },
      { text: "我也觉得不对，但这种不对很有机会。", scores: ["YOLO", "PEACE", "MAGIC"] },
      { text: "谢谢提醒，我马上把自己加入复盘对象。", scores: ["DRAMA", "SSR", "XUEBA"] },
      { text: "他为什么会这么说？这句话本身有信息。", scores: ["GHOST", "FISHER", "TALKER"] },
    ],
  },
  {
    q: "你最想拥有哪种牌桌超能力？",
    options: [
      { text: "一眼看穿对手是真松弛还是假松弛。", scores: ["JUAN", "RICH", "SHARK"] },
      { text: "自动屏蔽情绪噪音，只保留有效信息。", scores: ["ROCK", "BEEF", "PEACE"] },
      { text: "关键时刻自带主角滤镜。", scores: ["YOLO", "BOOM", "TANK"] },
      { text: "让别人永远猜不到我下一秒想干嘛。", scores: ["MAGIC", "DRAMA", "SSR"] },
    ],
  },
  {
    q: "牌桌休息时，你通常在干嘛？",
    options: [
      { text: "回忆刚才谁说了什么，谁表情变了一下。", scores: ["GHOST", "XUEBA", "TALKER"] },
      { text: "和大家聊几句，顺便刷新社交能量。", scores: ["JUAN", "FISHER", "RICH"] },
      { text: "看起来放空，其实在等下一个节奏点。", scores: ["SHARK", "BEEF", "ROCK"] },
      { text: "调整心态，告诉自己别把娱乐局变成论文。", scores: ["BOOM", "PEACE", "TANK"] },
    ],
  },
  {
    q: "如果你的牌桌风格是一种天气，会是？",
    options: [
      { text: "晴天突然打雷，大家都清醒了。", scores: ["MAGIC", "YOLO", "SSR"] },
      { text: "阴天低压，安静但很有存在感。", scores: ["DRAMA", "XUEBA", "GHOST"] },
      { text: "微风，聊着聊着就把信息吹出来。", scores: ["FISHER", "TALKER", "RICH"] },
      { text: "恒温空调，稳定得让人怀疑你没情绪。", scores: ["ROCK", "SHARK", "JUAN"] },
    ],
  },
  {
    q: "你最容易在哪个瞬间突然认真？",
    options: [
      { text: "有人连续挑衅我的判断。", scores: ["BEEF", "BOOM", "TANK"] },
      { text: "我突然感觉这一手有点不普通。", scores: ["YOLO", "PEACE", "MAGIC"] },
      { text: "发现前面几轮其实有规律。", scores: ["DRAMA", "SSR", "XUEBA"] },
      { text: "一个人说话方式和刚才不一样了。", scores: ["GHOST", "FISHER", "TALKER"] },
    ],
  },
  {
    q: "最后一题：你希望别人怎么评价你？",
    options: [
      { text: "他看起来很轻松，但真的不好对付。", scores: ["JUAN", "RICH", "SHARK"] },
      { text: "他很稳，可是稳得一点都不无聊。", scores: ["ROCK", "BEEF", "PEACE"] },
      { text: "他一出现，桌子就开始有节目了。", scores: ["YOLO", "BOOM", "TANK"] },
      { text: "他到底怎么想的，我真的猜不到。", scores: ["MAGIC", "DRAMA", "SSR"] },
    ],
  },
];
