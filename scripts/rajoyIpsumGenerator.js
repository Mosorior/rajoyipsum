const fs = require('fs').promises;
const path = require('path');

async function generateIpsum() {
  const dataPath = path.join(__dirname, 'data', 'data.json');
  const textData = JSON.parse(await fs.readFile(dataPath, 'utf8'));

  const themes = Object.keys(textData).filter(theme => theme !== 'Conectores' && theme !== 'Finales');
  const connectors = textData['Conectores'].map(connector => connector.text.trim()); // Aseguramos que los conectores no tengan espacios al principio o al final.
  const finals = textData['Finales'].map(final => final.text.trim()); // Aseguramos que los finales no tengan espacios al principio.

  let paragraphText = ["Rajoy Ipsum "];
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
              // Añadimos el conector directamente antes del texto, sin espacio adicional al final de la frase anterior
              let randomConnector = connectors[Math.floor(Math.random() * connectors.length)];
              textToAdd = `${randomConnector} ${textToAdd}`;
          }
          // Si no es la primera frase, añadimos el texto directamente sin espacio al principio.
          paragraphText.push(i === 0 ? textToAdd : textToAdd.trimStart());
      }
  }

  let randomFinal = finals[Math.floor(Math.random() * finals.length)];
  // Añadimos el final directamente, sin espacio adicional.
  paragraphText.push(randomFinal);

  return paragraphText.join(''); // Unimos todo sin añadir espacios adicionales entre las frases.
}

module.exports = { generateIpsum };
