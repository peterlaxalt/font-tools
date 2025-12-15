"use client";

import React, { useState } from "react";
import { UploadedFont, DiacriticsSettings, ColorTheme } from "../../types";
import CharacterGrid from "./CharacterGrid";

interface DiacriticsProofProps {
  font: UploadedFont | undefined;
  settings: DiacriticsSettings;
  onSettingsChange: (settings: DiacriticsSettings) => void;
  theme: ColorTheme;
  compareEnabled: boolean;
  comparisonFont: string;
}

const DIACRITICS_DATA = {
  uppercase:
    "A A̠ A̧ À Á Â Ã Ä Å Ā Ă Ą Ǎ Ⱥ Ǻ Ạ Ả Ấ Ầ Ẩ Ẫ Ậ Ắ Ằ Ẳ Ẵ Ặ Ʌ Æ Ǽ Ɑ Ⓐ B Ḅ Ḇ Ɓ C Ç Ć Ĉ Ċ Č Ƈ Ȼ Ɔ D Ð Đ Ď Ɖ Ḍ Ḏ Ḑ Ḓ Ɗ Ꟈ Ǆ ǅ E E̱ È É Ê Ë Ē Ĕ Ė Ę Ě Ẹ Ẻ Ẽ Ế Ề Ể Ễ Ệ Ɇ Ǝ Ə Ɛ F Ƒ G G̃ G̱ Ĝ Ğ Ġ Ģ Ɠ Ǥ Ǧ Ǵ Ɡ Ɣ H Ĥ Ȟ Ḥ Ħ Ḧ Ɦ I Ì Í Î Ï Ĩ Ī Ĭ Į İ Ǐ Ḭ Ỉ Ị Ɪ Ɩ Ɩ̀ Ɩ́ Ɩ̃ Ɨ Ĳ J J̌ Ĵ Ɉ K Ķ Ǩ Ḵ Ḳ Ƙ L Ĺ Ļ Ľ Ŀ Ł Ꝉ Ḷ Ƚ Ḽ Ḻ Ɬ Ɫ Ǉ ǈ M Ḿ N N̄ N̈ Ñ Ń Ņ Ň Ǹ Ṅ Ṉ Ṋ Ṇ Ŋ Ŋ́ Ǌ ǋ Ɲ O Ò Ó Ô Õ Ö Ō Ŏ Ő Ǒ Ṍ Ọ Ỏ Ố Ồ Ổ Ỗ Ộ Ơ Ớ Ờ Ở Ỡ Ợ Ơ̄ Ǫ Ø Ø̂ Ø̌ Ǿ Ɵ Œ P Ṗ Þ Ƥ Ᵽ Q R Ŕ Ŗ Ř Ṛ Ṟ Ɍ Ɽ S Ś Ŝ Ş Š Ș Ṣ Ʃ ẞ T Ţ Ť Ț Ṭ Ṱ Ŧ Ƭ Ⱦ Ʈ U Ù Ú Û Ü Ũ Ū Ŭ Ů Ű Ǔ Ǖ Ṵ Ṹ Ų Ụ Ủ Ư Ứ Ừ Ử Ữ Ự Ʉ Ꞹ Ʊ Ʋ V Ṽ W Ŵ Ẁ Ẃ Ẅ Ⱳ X Χ Ẋ Ẍ Y Ý Ŷ Ÿ Ȳ Ỳ Ỵ Ỷ Ỹ Ƴ ⅄ Z Z̨ Ź Ż Ž Ẓ Ƶ Ʒ Ǯ Ɂ",
  lowercase:
    "a a̠ a̧ à á â ã ä å ā ă ą ǎ ⱥ ǻ ạ ả ấ ầ ẩ ẫ ậ ắ ằ ẳ ẵ ặ ʌ æ ǽ ɑ ⓐ b ḅ ḇ ɓ c ç ć ĉ ċ č ƈ ȼ ɔ d ð đ ď ɖ ḍ ḏ ḑ ḓ ɗ ꟈ ǆ e e̱ è é ê ë ē ĕ ė ę ě ẹ ẻ ẽ ế ề ể ễ ệ ɇ ǝ ə ɛ f ƒ g g̃ g̱ ĝ ğ ġ ģ ɠ ǥ ǧ ǵ ɡ ɣ h ĥ ȟ ḥ ħ ḧ ɦ i ì í î ï ĩ ī ĭ į i̇ ǐ ḭ ỉ ị ɪ ɩ ɩ̀ ɩ́ ɩ̃ ɨ ĳ j ǰ ĵ ɉ k ķ ǩ ḵ ḳ ƙ l ĺ ļ ľ ŀ ł ꝉ ḷ ƚ ḽ ḻ ɬ ɫ ǉ m ḿ n n̄ n̈ ñ ń ņ ň ǹ ṅ ṉ ṋ ṇ ŋ ŋ́ ǌ ɲ o ò ó ô õ ö ō ŏ ő ǒ ṍ ọ ỏ ố ồ ổ ỗ ộ ơ ớ ờ ở ỡ ợ ơ̄ ǫ ø ø̂ ø̌ ǿ ɵ œ p ṗ þ ƥ ᵽ q r ŕ ŗ ř ṛ ṟ ɍ ɽ s ś ŝ ş š ș ṣ ʃ ß t ţ ť ț ṭ ṱ ŧ ƭ ⱦ ʈ u ù ú û ü ũ ū ŭ ů ű ǔ ǖ ṵ ṹ ų ụ ủ ư ứ ừ ử ữ ự ʉ ꞹ ʊ ʋ v ṽ w ŵ ẁ ẃ ẅ ⱳ x χ ẋ ẍ y ý ŷ ÿ ȳ ỳ ỵ ỷ ỹ ƴ ʎ z z̨ ź ż ž ẓ ƶ ʒ ǯ ɂ",
  vietnamese:
    "À Á Â Ầ Ấ Ẫ Ẩ Ậ Ã Ă Ằ Ắ Ẵ Ẳ Ặ Ả Ạ Đ È É Ê Ề Ế Ễ Ể Ệ Ẽ Ẻ Ẹ Ì Í Ĩ Ỉ Ị Ò Ó Ô Ồ Ố Ỗ Ổ Ộ Õ Ỏ Ơ Ờ Ớ Ỡ Ở Ợ Ọ Ù Ú Ũ Ủ Ư Ừ Ứ Ữ Ử Ự Ụ Ỳ Ý Ỹ Ỷ Ỵ\n\nà á â ầ ấ ẫ ẩ ậ ã ă ằ ắ ẳ ẵ ặ ả ạ đ è é ê ề ế ễ ể ệ ẽ ẻ ẹ ì í ĩ ỉ ị ò ó ô ồ ố ỗ ổ ộ õ ỏ ơ ờ ớ ỡ ở ợ ọ ù ú ũ ủ ư ừ ứ ữ ử ự ụ ỳ ý ỹ ỷ ỵ",
  vietnamesePairs:
    "Àà Áá Ââ Ầầ Ấấ Ẫẫ Ẩẩ Ậậ Ãã Ăă Ằằ Ắắ Ẵẵ Ẳẳ Ặặ Ảả Ạạ Đđ Èè Éé Êê Ềề Ếế Ễễ Ểể Ệệ Ẽẽ Ẻẻ Ẹẹ Ìì Íí Ĩĩ Ỉỉ Ịị Òò Óó Ôô Ồồ Ốố Ỗỗ Ổổ Ộộ Õõ Ỏỏ Ơơ Ờờ Ớớ Ỡỡ Ởở Ợợ Ọọ Ùù Úú Ũũ Ủủ Ưư Ừừ Ứứ Ữữ Ửử Ựự Ụụ Ỳỳ Ýý Ỹỹ Ỷỷ Ỵỵ",
  uppercaseLowercasePairs:
    "Aa A̠a̠ A̧a̧ Àà Áá Ââ Ãã Ää Åå Āā Ăă Ąą Ǎǎ Ⱥⱥ Ǻǻ Ạạ Ảả Ấấ Ầầ Ẩẩ Ẫẫ Ậậ Ắắ Ằằ Ẳẳ Ẵẵ Ặặ Ʌʌ Ææ Ǽǽ Ɑɑ Bb Ḅḅ Ḇḇ Ɓɓ Cc Çç Ćć Ĉĉ Ċċ Čč Ƈƈ Ȼȼ Ɔɔ Dd Ðð Đđ Ďď Ɖɖ Ḍḍ Ḏḏ Ḑḑ Ḓḓ Ɗɗ Ꟈꟈ Ǆǆ Ee E̱e̱ Èè Éé Êê Ëë Ēē Ĕĕ Ėė Ęę Ěě Ẹẹ Ẻẻ Ẽẽ Ếế Ềề Ểể Ễễ Ệệ Ɇɇ Ǝǝ Əə Ɛɛ Ff Ƒƒ Gg G̃g̃ G̱g̱ Ĝĝ Ğğ Ġġ Ģģ Ɠɠ Ǥǥ Ǧǧ Ǵǵ Ɡɡ Ɣɣ Hh Ĥĥ Ȟȟ Ḥḥ Ħħ Ḧḧ Ɦɦ Ii Ìì Íí Îî Ïï Ĩĩ Īī Ĭĭ Įį İi̇ Ǐǐ Ḭḭ Ỉỉ Ịị Ɪɪ Ɩɩ Ɩ̀ɩ̀ Ɩ́ɩ́ Ɩ̃ɩ̃ Ɨɨ Ĳĳ Jj J̌ǰ Ĵĵ Ɉɉ Kk Ķķ Ǩǩ Ḵḵ Ḳḳ Ƙƙ Ll Ĺĺ Ļļ Ľľ Ŀŀ Łł Ꝉꝉ Ḷḷ Ƚƚ Ḽḽ Ḻḻ Ɬɬ Ɫɫ Ǉǉ Mm Ḿḿ Nn N̄n̄ N̈n̈ Ññ Ńń Ņņ Ňň Ǹǹ Ṅṅ Ṉṉ Ṋṋ Ṇṇ Ŋŋ Ŋ́ŋ́ Ǌǌ Ɲɲ Oo Òò Óó Ôô Õõ Öö Ōō Ŏŏ Őő Ǒǒ Ṍṍ Ọọ Ỏỏ Ốố Ồồ Ổổ Ỗỗ Ộộ Ơơ Ớớ Ờờ Ởở Ỡỡ Ợợ Ơ̄ơ̄ Ǫǫ Øø Ø̂ø̂ Ø̌ø̌ Ǿǿ Ɵɵ Œœ Pp Ṗṗ Þþ Ƥƥ Ᵽᵽ Qq Rr Ŕŕ Ŗŗ Řř Ṛṛ Ṟṟ Ɍɍ Ɽɽ Ss Śś Ŝŝ Şş Šš Șș Ṣṣ Ʃʃ ẞß Tt Ţţ Ťť Țț Ṭṭ Ṱṱ Ŧŧ Ƭƭ Ⱦⱦ Ʈʈ Uu Ùù Úú Ûû Üü Ũũ Ūū Ŭŭ Ůů Űű Ǔǔ Ǖǖ Ṵṵ Ṹṹ Ųų Ụụ Ủủ Ưư Ứứ Ừừ Ửử Ữữ Ựự Ʉʉ Ꞹꞹ Ʊʊ Ʋʋ Vv Ṽṽ Ww Ŵŵ Ẁẁ Ẃẃ Ẅẅ Ⱳⱳ Xx Χχ Ẋẋ Ẍẍ Yy Ýý Ŷŷ Ÿÿ Ȳȳ Ỳỳ Ỵỵ Ỷỷ Ỹỹ Ƴƴ ⅄ʎ Zz Z̨z̨ Źź Żż Žž Ẓẓ Ƶƶ Ʒʒ Ǯǯ Ɂɂ",
  languages: [
    {
      name: "Azeri",
      text: "Zəfər, jaketini də papağını da götür, bu axşam hava çox soyuq olacaq.",
    },
    {
      name: "Catalan",
      text: "Jove xef, porti whisky amb quinze glaçons d'hidrogen, coi!",
    },
    {
      name: "Croatian",
      text: "Gojazni đačić s biciklom drži hmelj i finu vatu u džepu nošnje.",
    },
    {
      name: "Czech",
      text: "Nechť již hříšné saxofony ďáblů rozzvučí síň úděsnými tóny waltzu, tanga a quickstepu",
    },
    { name: "Danish", text: "Høj bly gom vandt fræk sexquiz på wc" },
    { name: "Dutch", text: "Lynx c.q. vos prikt bh: dag zwemjuf!" },
    {
      name: "Esperanto",
      text: "Eble ĉiu kvazaŭ-deca fuŝĥoraĵo ĝojigos homtipon",
    },
    {
      name: "Estonian",
      text: "Põdur Zagrebi tšellomängija-följetonist Ciqo külmetas kehvas garaažis",
    },
    {
      name: "Filipino",
      text: "Ang buko ay para sa tao dahil wala nang pwedeng mainom na gatas.",
    },
    {
      name: "Finnish",
      text: "Törkylempijävongahdus Albert osti fagotin ja töräytti puhkuvan melodian",
    },
    { name: "French", text: "Buvez de ce whisky que le patron juge fameux" },
    { name: "West Frisian", text: "Alve bazige froulju wachtsje op dyn komst" },
    {
      name: "German",
      text: "Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich",
    },
    {
      name: "Hungarian",
      text: "Jó foxim és don Quijote húszwattos lámpánál ülve egy pár bűvös cipőt készít",
    },
    {
      name: "Icelandic",
      text: "Kæmi ný öxi hér, ykist þjófum nú bæði víl og ádrepa.",
    },
    {
      name: "Irish",
      text: "D'fhuascail Íosa Úrmhac na hÓighe Beannaithe pór Éava agus Ádhaimh",
    },
    { name: "Italian", text: "In quel campo si trovan funghi in abbondanza." },
    {
      name: "Latvian",
      text: "Muļķa hipiji turpat brīvi mēģina nogaršot celofāna žņaudzējčūsku.",
    },
    {
      name: "Lithuanian",
      text: "Įlinkdama fechtuotojo špaga sublykčiojusi pragręžė apvalų arbūzą",
    },
    {
      name: "Norwegian",
      text: "Vår sære Zulu fra badeøya spilte jo whist og quickstep i min taxi.",
    },
    { name: "Polish", text: "Jeżu klątw, spłódź Finom część gry hańb!" },
    {
      name: "Portuguese",
      text: "Luís argüia à Júlia que «brações, fé, chá, óxido, pôr, zângão» eram palavras do português.",
    },
    {
      name: "Romanian",
      text: "Muzicologă în bej vând whisky și tequila, preț fix.",
    },
    {
      name: "Serbian",
      text: "Gojazni đačić s biciklom drži hmelj i finu vatu u džepu nošnje.",
    },
    { name: "Slovak", text: "Kŕdeľ ďatľov učí koňa žrať kôru." },
    {
      name: "Slovenian",
      text: "Šerif bo za vajo spet kuhal domače žgance. Piškur molče grabi fižol z dna cezijeve hoste.",
    },
    {
      name: "Spanish",
      text: "El veloz murciélago hindú comía feliz cardillo y kiwi. ¡qué figurota exhibe! La cigüeña tocaba el saxofón ¿Detrás del palenque de paja?",
    },
    { name: "Swedish", text: "Yxskaftbud, ge vår WC-zonmö IQ-hjälp." },
    { name: "Turkish", text: "Fahiş bluz güvencesi yağdırma projesi çöktü." },
  ],
};

export default function DiacriticsProof({
  font,
  settings,
  onSettingsChange,
  theme,
  compareEnabled,
  comparisonFont,
}: DiacriticsProofProps) {
  const [vietnameseText, setVietnameseText] = useState(
    "Việt Nam là một quốc gia xinh đẹp với văn hóa phong phú và ẩm thực tuyệt vời"
  );

  const [vietnameseHeadline, setVietnameseHeadline] = useState(
    "Khám Phá Ẩm Thực Việt Nam Cùng Chúng Tôi"
  );

  const [vietnameseParagraph, setVietnameseParagraph] = useState(
    "Từ những bát phở nóng hổi đến những chiếc bánh mì giòn rụm, ẩm thực Việt Nam luôn mang đến những trải nghiệm độc đáo và khó quên. Mỗi món ăn đều chứa đựng câu chuyện riêng về văn hóa, truyền thống và tình yêu thương của người Việt. Hãy cùng chúng tôi khám phá hương vị đặc trưng của từng vùng miền, từ Bắc chí Nam."
  );

  const [pangramStandard, setPangramStandard] = useState(
    "Họ đi tìm gã quỷ sứ bận quần áo vá, túm lấy cổ cho vào rọ xe bò rồi đem phim về."
  );

  const [pangramAllConsonant, setPangramAllConsonant] = useState(
    "Phim xẩm Huế quay lén vợ chồng bác thợ may già."
  );

  const [pangramModern, setPangramModern] = useState(
    "Cạnh cô nàng dâu đanh đá, gã kỹ sư già hút thuốc phiện, vẽ tranh."
  );

  const [diacriticStressWords, setDiacriticStressWords] = useState(
    "Thủy, Thúy, Đẫy, Tễu, Khuya, Tuyết, Khuỷu, Ngoằn, Ngoèo."
  );

  const [diacriticStressSentence, setDiacriticStressSentence] = useState(
    "Chị Tư giữ vững nhịp điệu, ngẫm nghĩ kĩ lưỡng về những chuỗi ngày bão giông đã qua."
  );

  const [truyenKieuShort, setTruyenKieuShort] = useState(
    "Trăm năm trong cõi người ta, Chữ tài chữ mệnh khéo là ghét nhau. Trải qua một cuộc bể dâu, Những điều trông thấy mà đau đớn lòng."
  );

  const [truyenKieuLong, setTruyenKieuLong] = useState(
    "Trăm năm trong cõi người ta, chữ tài chữ mệnh khéo là ghét nhau. Trải qua một cuộc bể dâu, những điều trông thấy mà đau đớn lòng. Lạ gì bỉ sắc tư phong, trời xanh quen thói má hồng đánh ghen. Cảo thơm lần giở trước đèn, phong tình cổ lục còn truyền sử xanh."
  );

  const [languageTexts, setLanguageTexts] = useState<{ [key: string]: string }>(
    Object.fromEntries(
      DIACRITICS_DATA.languages.map((lang) => [lang.name, lang.text])
    )
  );

  const handleLanguageTextChange = (langName: string, newText: string) => {
    setLanguageTexts((prev) => ({ ...prev, [langName]: newText }));
  };
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const settingsPanelStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    padding: "12px 20px",
    borderBottom: `1px solid ${theme.text}`,
    alignItems: "center",
    flexWrap: "wrap",
  };

  const settingGroupStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    opacity: 0.6,
  };

  const inputStyle: React.CSSProperties = {
    padding: "4px 8px",
    border: `1px solid ${theme.text}20`,
    borderRadius: "3px",
    fontSize: "12px",
    width: "60px",
    backgroundColor: "transparent",
    color: "currentColor",
  };

  const proofContentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    padding: "0 20px 32px 20px",
  };

  const splitContainerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: compareEnabled ? "50% 50%" : "1fr",
    gap: "0",
  };

  const rightColumnStyle: React.CSSProperties = {
    paddingLeft: compareEnabled ? "20px" : "0",
    borderLeft: compareEnabled ? `1px solid ${theme.text}` : "none",
  };

  const leftColumnStyle: React.CSSProperties = {
    paddingLeft: compareEnabled ? '0px' : '0',
    paddingRight: compareEnabled ? '20px' : '0',
  };

  const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    paddingTop: 20,
    letterSpacing: "0.5px",
  };

  const characterSetStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: `${settings.fontSize}px`,
    lineHeight: settings.leading,
    letterSpacing: `${settings.letterSpacing}px`,
    wordWrap: "break-word",
  });

  const editableTextStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: `${settings.fontSize}px`,
    lineHeight: settings.leading,
    letterSpacing: `${settings.letterSpacing}px`,
    wordWrap: "break-word",
    outline: "none",
    cursor: "text",
    minHeight: "1em",
  });

  const languageNameStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    marginBottom: "12px",
  };

  const columnTitleStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    marginTop: "32px",
    marginBottom: "24px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const headlineStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: `${settings.fontSize * 2}px`,
    lineHeight: 1.2,
    fontWeight: 700,
    letterSpacing: `${settings.letterSpacing}px`,
    wordWrap: "break-word",
    outline: "none",
    cursor: "text",
    minHeight: "1em",
  });

  const productCardsContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
    overflowX: "auto",
    paddingBottom: "8px",
  };

  const productCardStyle: React.CSSProperties = {
    border: `1px solid ${theme.text}20`,
    borderRadius: "6px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "160px",
    maxWidth: "160px",
    flexShrink: 0,
  };

  const productImageStyle: React.CSSProperties = {
    width: "100%",
    aspectRatio: "1",
    backgroundColor: `${theme.text}10`,
    borderRadius: "4px",
    marginBottom: "4px",
  };

  const badgeContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
  };

  const badgeStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: "9px",
    padding: "2px 6px",
    backgroundColor: `${theme.text}10`,
    borderRadius: "3px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  });

  const productTitleStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: `${settings.letterSpacing}px`,
  });

  const priceContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "6px",
    alignItems: "baseline",
    marginTop: "auto",
  };

  const priceStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: `${settings.letterSpacing}px`,
  });

  const strikePriceStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: "13px",
    fontWeight: 400,
    textDecoration: "line-through",
    opacity: 0.5,
    letterSpacing: `${settings.letterSpacing}px`,
  });

  const unitPriceStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: "11px",
    fontWeight: 500,
    opacity: 0.6,
    letterSpacing: `${settings.letterSpacing}px`,
  });

  const buttonStyle = (fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: "11px",
    fontWeight: 600,
    padding: "8px 12px",
    backgroundColor: theme.text,
    color: theme.background,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
  });

  const renderProofColumn = (fontFamily: string) => (
    <div>
      {/* Uppercase Diacritics */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Uppercase Latin</div>
        <CharacterGrid
          characters={DIACRITICS_DATA.uppercase}
          fontFamily={fontFamily}
          theme={theme}
          compareEnabled={compareEnabled}
          comparisonFont={comparisonFont}
          columnCount={settings.columnCount}
          cellFontScale={settings.cellFontScale}
        />
      </div>

      {/* Lowercase Diacritics */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Lowercase Latin</div>
        <CharacterGrid
          characters={DIACRITICS_DATA.lowercase}
          fontFamily={fontFamily}
          theme={theme}
          compareEnabled={compareEnabled}
          comparisonFont={comparisonFont}
          columnCount={settings.columnCount}
          cellFontScale={settings.cellFontScale}
        />
      </div>

      {/* Vietnamese */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Vietnamese</div>
        <CharacterGrid
          characters={DIACRITICS_DATA.vietnamese}
          fontFamily={fontFamily}
          theme={theme}
          compareEnabled={compareEnabled}
          comparisonFont={comparisonFont}
          columnCount={settings.columnCount}
          cellFontScale={settings.cellFontScale}
        />
      </div>

      {/* Vietnamese Uppercase/Lowercase Pairs */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Vietnamese Uppercase/Lowercase Pairs</div>
        <div style={characterSetStyle(fontFamily)}>
          {DIACRITICS_DATA.vietnamesePairs}
        </div>
      </div>

      {/* Vietnamese Sample Text */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Vietnamese Sample</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setVietnameseText(e.currentTarget.textContent || "")}
        >
          {vietnameseText}
        </div>
      </div>

      {/* Vietnamese Headline */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Vietnamese Headline</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={headlineStyle(fontFamily)}
          onInput={(e) => setVietnameseHeadline(e.currentTarget.textContent || "")}
        >
          {vietnameseHeadline}
        </div>
      </div>

      {/* Vietnamese Paragraph */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Vietnamese Paragraph</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setVietnameseParagraph(e.currentTarget.textContent || "")}
        >
          {vietnameseParagraph}
        </div>
      </div>

      {/* Vietnamese Ecommerce Product Cards */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Vietnamese Ecommerce</div>
        <div style={productCardsContainerStyle}>
          {/* Product Card 1 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 100+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Hành Tây 10 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$5.99</div>
              <div style={strikePriceStyle(fontFamily)}>$6.99</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$0.59/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>

          {/* Product Card 2 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 250+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Cà Chua 5 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$8.99</div>
              <div style={strikePriceStyle(fontFamily)}>$10.99</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$1.79/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>

          {/* Product Card 3 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 500+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Gạo Tám 25 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$24.99</div>
              <div style={strikePriceStyle(fontFamily)}>$29.99</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$0.99/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>

          {/* Product Card 4 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 150+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Táo Fuji 3 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$4.49</div>
              <div style={strikePriceStyle(fontFamily)}>$5.49</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$1.49/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>

          {/* Product Card 5 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 300+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Thịt Bò 2 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$18.99</div>
              <div style={strikePriceStyle(fontFamily)}>$21.99</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$9.49/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>

          {/* Product Card 6 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 200+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Chuối 4 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$2.99</div>
              <div style={strikePriceStyle(fontFamily)}>$3.99</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$0.74/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>

          {/* Product Card 7 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 400+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Khoai Tây 8 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$6.99</div>
              <div style={strikePriceStyle(fontFamily)}>$8.99</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$0.87/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>

          {/* Product Card 8 */}
          <div style={productCardStyle}>
            <div style={productImageStyle}></div>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle(fontFamily)}>Đã Bán 180+</div>
            </div>
            <div style={productTitleStyle(fontFamily)}>
              Dưa Hấu 12 lb
            </div>
            <div style={priceContainerStyle}>
              <div style={priceStyle(fontFamily)}>$7.99</div>
              <div style={strikePriceStyle(fontFamily)}>$9.99</div>
            </div>
            <div style={unitPriceStyle(fontFamily)}>$0.66/lb</div>
            <div style={buttonStyle(fontFamily)}>Thêm vào giỏ</div>
          </div>
        </div>
      </div>

      {/* Vietnamese Pangrams */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Pangrams (Quick Brown Fox)</div>

        <div style={languageNameStyle}>Standard Designer Pangram</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setPangramStandard(e.currentTarget.textContent || "")}
        >
          {pangramStandard}
        </div>

        <div style={{...languageNameStyle, marginTop: "20px"}}>All-Consonant Sentence</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setPangramAllConsonant(e.currentTarget.textContent || "")}
        >
          {pangramAllConsonant}
        </div>

        <div style={{...languageNameStyle, marginTop: "20px"}}>Modern Pangram</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setPangramModern(e.currentTarget.textContent || "")}
        >
          {pangramModern}
        </div>
      </div>

      {/* Diacritic Stress Tests */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Diacritic Stress Tests</div>

        <div style={languageNameStyle}>Vertical Stress Test (Stacked Diacritics)</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setDiacriticStressWords(e.currentTarget.textContent || "")}
        >
          {diacriticStressWords}
        </div>

        <div style={{...languageNameStyle, marginTop: "20px"}}>Dense Sentence (Heavy Tone Marks)</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setDiacriticStressSentence(e.currentTarget.textContent || "")}
        >
          {diacriticStressSentence}
        </div>
      </div>

      {/* Truyện Kiều (Vietnamese Lorem Ipsum) */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Truyện Kiều (Vietnamese Lorem Ipsum)</div>

        <div style={languageNameStyle}>Short Block (Opening Lines)</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setTruyenKieuShort(e.currentTarget.textContent || "")}
        >
          {truyenKieuShort}
        </div>

        <div style={{...languageNameStyle, marginTop: "20px"}}>Long Block (Prose Style)</div>
        <div
          contentEditable
          suppressContentEditableWarning
          style={editableTextStyle(fontFamily)}
          onInput={(e) => setTruyenKieuLong(e.currentTarget.textContent || "")}
        >
          {truyenKieuLong}
        </div>
      </div>

      {/* Uppercase/Lowercase Pairs */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Uppercase/Lowercase Pairs</div>
        <div style={characterSetStyle(fontFamily)}>
          {DIACRITICS_DATA.uppercaseLowercasePairs}
        </div>
      </div>

      {/* Language Samples */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Language Samples</div>
        {DIACRITICS_DATA.languages.map((lang, index) => (
          <div key={index}>
            <div style={languageNameStyle}>{lang.name}</div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={editableTextStyle(fontFamily)}
              onInput={(e) =>
                handleLanguageTextChange(lang.name, e.currentTarget.textContent || "")
              }
            >
              {languageTexts[lang.name]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Settings Panel */}
      <div style={settingsPanelStyle}>
        <div style={settingGroupStyle}>
          <label style={labelStyle}>Size</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.fontSize}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                fontSize: Number(e.target.value),
              })
            }
            min={8}
            max={120}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Leading</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.leading}
            onChange={(e) =>
              onSettingsChange({ ...settings, leading: Number(e.target.value) })
            }
            min={0.5}
            max={3}
            step={0.1}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Spacing</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.letterSpacing}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                letterSpacing: Number(e.target.value),
              })
            }
            min={-5}
            max={10}
            step={0.1}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Columns</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.columnCount}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                columnCount: Number(e.target.value),
              })
            }
            min={6}
            max={24}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Cell Font Scale</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.cellFontScale}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                cellFontScale: Number(e.target.value),
              })
            }
            min={0.1}
            max={1.5}
            step={0.05}
          />
        </div>
      </div>

      {/* Proof Display */}
      <div style={proofContentStyle}>
        <div style={splitContainerStyle}>
          <div style={leftColumnStyle}>
            {compareEnabled && <div style={columnTitleStyle}>{font ? font.name : 'No Font'}</div>}
            {renderProofColumn(
              font ? font.fontFamily : "system-ui, sans-serif"
            )}
          </div>
          {compareEnabled && (
            <div style={rightColumnStyle}>
              <div style={columnTitleStyle}>{comparisonFont}</div>
              {renderProofColumn(comparisonFont)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
