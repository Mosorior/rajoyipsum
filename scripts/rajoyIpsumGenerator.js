const fs = require('fs').promises;
const path = require('path');

async function generateIpsum() {
  const dataPath = path.join(__dirname, 'data', 'data.json');
  const textData = JSON.parse(await fs.readFile(dataPath, 'utf8'));

  const themes = Object.keys(textData).filter(theme => theme !== 'Conectores' && theme !== 'Finales');
  const connectors = textData['Conectores'].map(connector => connector.text);
  const finals = textData['Finales'].map(final => final.text);

  let paragraphText = ["Rajoy Ipsum"];
  let usedPhrases = new Set();
  let currentTheme = themes[Math.floor(Math.random() * themes.length)];

  for (let i = 0; i < 4; i++) {
      if (i !== 0 && Math.random() > 0.66) {
          currentTheme = themes[Math.floor(Math.random() * themes.length)];
      }

      let selectedTexts = textData[currentTheme].filter(text => !usedPhrases.has(text.text));
      if (selectedTexts.length > 0) {
          let textToAdd = selectedTexts[Math.floor(Math.random() * selectedTexts.length)].text;
          usedPhrases.add(textToAdd);

          if (i > 0) {
              let randomConnector = connectors[Math.floor(Math.random() * connectors.length)];
              textToAdd = `${randomConnector.trim()} ${textToAdd}`;
          }
          paragraphText.push(textToAdd);
      }
  }

  const randomFinal = finals[Math.floor(Math.random() * finals.length)];
  paragraphText.push(randomFinal.startsWith(" ") ? randomFinal.trim() : randomFinal);

  return paragraphText.join(' ');

}

module.exports = { generateIpsum };
