const data1 = [
  {
    "id": 1,
    "text": "爱人者人恒爱之，敬人者人恒敬之。",
    "pinyin": "ài rén zhě rén héng ài zhī, jìng rén zhě rén héng jìng zhī",
    "pinyin_key": "A",
    "meaning": "形容会爱护别人的人自然会被人爱护，能尊敬别人的人也自然会被人尊敬。[1]",
    "en": "He who loves others is constantly loved by them; he who respects others is constantly respected by them.",
    "bm": "Orang yang menyayangi orang lain akan sentiasa disayangi; orang yang menghormati orang lain akan sentiasa dihormati.",
    "example": "作为班长，他深知“爱人者人恒爱之，敬人者人恒敬之”的道理，所以真诚对待每一位同学。"
  },
  {
    "id": 2,
    "text": "百尺竿头，更进一步。",
    "pinyin": "bǎi chǐ gān tóu, gèng jìn yī bù",
    "pinyin_key": "B",
    "meaning": "表示学问、成绩达到很高程度后再接再厉，以期取得更大的进步。[1]",
    "en": "To make further progress after achieving a high level.",
    "bm": "Terus berusaha untuk mencapai kemajuan yang lebih besar walaupun sudah berjaya.",
    "example": "虽然你这次考试拿了第一名，但仍需百尺竿头，更进一步。"
  },
  {
    "id": 3,
    "text": "病从口入，祸从口出。",
    "pinyin": "bìng cóng kǒu rù, huò cóng kǒu chū",
    "pinyin_key": "B",
    "meaning": "警惕我们要小心饮食和说话。[1]",
    "en": "Illness enters by the mouth, trouble comes out by the mouth.",
    "bm": "Penyakit masuk melalui mulut, bencana keluar dari mulut.",
    "example": "他因为乱说话而得罪了人，真是病从口入，祸从口出。"
  },
  {
    "id": 4,
    "text": "不怪绳短，只怪井深。",
    "pinyin": "bù guài shéng duǎn, zhǐ guài jǐng shēn",
    "pinyin_key": "B",
    "meaning": "不检讨自己，只会埋怨环境不好。[1]",
    "en": "Do not blame the short rope; blame the deep well.",
    "bm": "Jangan menyalahkan persekitaran atas kelemahan sendiri.",
    "example": "失败后应多找自身原因，不能不怪绳短，只怪井深。"
  },
  {
    "id": 5,
    "text": "不入虎穴，焉得虎子。",
    "pinyin": "bù rù hǔ xué, yān dé hǔ zǐ",
    "pinyin_key": "B",
    "meaning": "形容人若不经艰险，事情就难获得成功。[1]",
    "en": "Nothing ventured, nothing gained.",
    "bm": "Kalau tidak masuk ke sarang harimau, bagaimana dapat anak harimau.",
    "example": "要想拿到第一手资料，就必须深入险境，不入虎穴，焉得虎子。"
  },
  {
    "id": 6,
    "text": "吃得苦中苦，方为人上人。",
    "pinyin": "chī dé kǔ zhōng kǔ, fāng wéi rén shàng rén",
    "pinyin_key": "C",
    "meaning": "表示肯吃苦的人，一定有好的前途。[1]",
    "en": "No pain, no gain; only those who endure the hardest hardships can reach the top.",
    "bm": "Hanya mereka yang sanggup bersusah payah akan mencapai kejayaan.",
    "example": "哪怕训练再累，他都咬牙坚持，因为他懂得吃得苦中苦，方为人上人的道理。"
  },
  {
    "id": 7,
    "text": "尺璧非宝，寸阴是竞。",
    "pinyin": "chǐ bì fēi bǎo, cùn yīn shì jìng",
    "pinyin_key": "C",
    "meaning": "形容时间极其珍贵。[1]",
    "en": "A foot of jade is not a treasure, but an inch of time is worth competing for.",
    "bm": "Masa lebih berharga daripada harta benda.",
    "example": "尺璧非宝，寸阴是竞，我们要抓紧每一分钟来充实自己。"
  },
  {
    "id": 8,
    "text": "初生之犊不畏虎。",
    "pinyin": "chū shēng zhī dú bù wèi hǔ",
    "pinyin_key": "C",
    "meaning": "形容青年人不怕困难挫折，敢想敢做。[1]",
    "en": "Newborn calves are not afraid of tigers.",
    "bm": "Orang muda yang berani dan tidak takut menghadapi cabaran.",
    "example": "这些刚毕业的年轻人凭借着初生之犊不畏虎的冲劲，攻克了难题。"
  },
  {
    "id": 9,
    "text": "当局者迷，旁观者清。",
    "pinyin": "dāng jú zhě mí, páng guān zhě qīng",
    "pinyin_key": "D",
    "meaning": "表示当事人往往辨不清是非，局外人则头脑清醒。[1]",
    "en": "The onlookers see clearly what the players fail to see.",
    "bm": "Pemerhati lebih jelas melihat keadaan berbanding orang yang terlibat.",
    "example": "遇到感情问题时，他总是当局者迷，旁观者清。"
  },
  {
    "id": 10,
    "text": "富贵不能淫，贫贱不能移，威武不能屈。",
    "pinyin": "fù guì bù néng yín, pín jiàn bù néng yí, wēi wǔ bù néng qū",
    "pinyin_key": "F",
    "meaning": "强调做人应有自己的节操与原则，不会轻易受环境影响而改变心志。[1]",
    "en": "Neither riches nor honors can corrupt him, neither poverty nor humbleness can make him swerve, and neither threats nor force can subdue him.",
    "bm": "Mempunyai prinsip hidup yang teguh dan tidak mudah dipengaruhi oleh keadaan.",
    "example": "许多先烈面对敌人的威逼利诱，做到了富贵不能淫，贫贱不能移，威武不能屈。"
  },
  {
    "id": 11,
    "text": "工欲善其事，必先利其器。",
    "pinyin": "gōng yù shàn qí shì, bì xiān lì qí qì",
    "pinyin_key": "G",
    "meaning": "要把工作做好，一定先要有良好的工具。[1]",
    "en": "A workman must first sharpen his tools if he is to do his work well.",
    "bm": "Untuk melakukan kerja dengan baik, alatan yang baik mesti disediakan dahulu.",
    "example": "工欲善其事，必先利其器，我们在做实验前必须先检查好设备。"
  },
  {
    "id": 12,
    "text": "国家兴亡，匹夫有责。",
    "pinyin": "guó jiā xīng wáng, pǐ fū yǒu zé",
    "pinyin_key": "G",
    "meaning": "表示国家大事，每个国民都有责任。[1]",
    "en": "Every common man has a responsibility for the rise and fall of the nation.",
    "bm": "Setiap rakyat bertanggungjawab atas jatuh bangun negaranya.",
    "example": "国家兴亡，匹夫有责，作为公民我们要关心国家大事。"
  },
  {
    "id": 13,
    "text": "好事不出门，恶事传千里。",
    "pinyin": "hǎo shì bù chū mén, è shì chuán qiān lǐ",
    "pinyin_key": "H",
    "meaning": "不出门意指事情不传播出去，全句形容好事不容易被人知道，坏事却传播得很快。[1]",
    "en": "Good news never goes beyond the gate, while bad news spreads far and wide.",
    "bm": "Perkara baik jarang diketahui orang, tetapi perkara buruk cepat tersebar.",
    "example": "他做了一件错事，结果很快全校都知道了，真是好事不出门，恶事传千里。"
  },
  {
    "id": 14,
    "text": "积财千万，不如薄伎在身。",
    "pinyin": "jī cái qiān wàn, bù rú bó jì zài shēn",
    "pinyin_key": "J",
    "meaning": "表示本领比财富更为可靠。[1]",
    "en": "Better to have a useful skill than a fortune.",
    "bm": "Kemahiran diri lebih berguna dan boleh diharap berbanding kekayaan yang banyak.",
    "example": "父亲常教导我，积财千万，不如薄伎在身，一定要学好一门手艺。"
  },
  {
    "id": 15,
    "text": "兼听则明，偏信则暗。",
    "pinyin": "jiān tīng zé míng, piān xìn zé àn",
    "pinyin_key": "J",
    "meaning": "指多方面听取意见，才能明辨是非；单听信某方面的话，就愚昧不明。[1]",
    "en": "Listen to both sides and you will be enlightened; heed only one side and you will be in the dark.",
    "bm": "Mendengar dari pelbagai pihak akan memberikan kejelasan, manakala mempercayai sebelah pihak sahaja akan membawa kekeliruan.",
    "example": "作为领导者，必须懂得兼听则明，偏信则暗的道理。"
  },
  {
    "id": 16,
    "text": "江山易改，本性难移。",
    "pinyin": "jiāng shān yì gǎi, běn xìng nán yí",
    "pinyin_key": "J",
    "meaning": "形容人的本性难以改变。[1]",
    "en": "A leopard cannot change its spots.",
    "bm": "Sifat atau perwatakan seseorang sangat sukar untuk diubah.",
    "example": "虽然他答应不再迟到，但江山易改，本性难移，今天他又迟到了。"
  },
  {
    "id": 17,
    "text": "近水楼台先得月，向阳花木易为春。",
    "pinyin": "jìn shuǐ lóu tái xiān dé yuè, xiàng yáng huā mù yì wéi chūn",
    "pinyin_key": "J",
    "meaning": "比喻由于先接近某些人或某事物而抢先得到某种利益或优势。[1]",
    "en": "Those closest to the source are the first to benefit.",
    "bm": "Mereka yang lebih dekat dengan sesuatu atau seseorang akan lebih mudah mendapat kelebihan.",
    "example": "他在人事部工作，每次有晋升机会总是近水楼台先得月。"
  },
  {
    "id": 18,
    "text": "近朱者赤，近墨者黑。",
    "pinyin": "jìn zhū zhě chì, jìn mò zhě hēi",
    "pinyin_key": "J",
    "meaning": "表示环境可以影响一个人的品格。[1]",
    "en": "He who gets near vermilion becomes red, and he who gets near ink becomes black.",
    "bm": "Persekitaran atau rakan taulan boleh mempengaruhi sifat seseorang.",
    "example": "交朋友一定要慎重，毕竟近朱者赤，近墨者黑。"
  },
  {
    "id": 19,
    "text": "经一蹶者长一智。",
    "pinyin": "jīng yī jué zhě zhǎng yī zhì",
    "pinyin_key": "J",
    "meaning": "形容失败一次，就多得一次的知识与经验。[1]",
    "en": "A fall into the pit, a gain in your wit.",
    "bm": "Mendapat pengajaran dan pengalaman baru setiap kali mengalami kegagalan.",
    "example": "这次生意虽然亏了本，但也算是经一蹶者长一智。"
  },
  {
    "id": 20,
    "text": "救人一命，胜造七级浮屠。",
    "pinyin": "jiù rén yī mìng, shèng zào qī jí fú tú",
    "pinyin_key": "J",
    "meaning": "比喻救人一命，比花钱去修建七层宝塔的功德还要来得大。[1]",
    "en": "Saving a life is more meritorious than building a seven-story pagoda.",
    "bm": "Menyelamatkan nyawa seseorang adalah perbuatan yang sangat mulia.",
    "example": "医生全力抢救车祸伤者，因为他们深信救人一命，胜造七级浮屠。"
  }
];
