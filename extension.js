const vscode = require('vscode');
const { generateIpsum } = require('./scripts/rajoyIpsumGenerator.js');

function activate(context) {
    console.log('Congratulations, your extension "rajoyipsum" is now active!');

    let disposable = vscode.commands.registerCommand('rajoyipsum.generateIpsum', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }
    
        const ipsumText = await generateIpsum(); // Asegúrate de que esta función devuelve una cadena
        
        const position = editor.selection.start; // Obtiene la posición actual del cursor
        editor.edit(editBuilder => {
            // Aquí ya no necesitas definir nuevamente 'position', úsala directamente
            editBuilder.insert(position, ipsumText);
        }).then(success => {
            if (!success) {
                vscode.window.showErrorMessage('Error inserting text');
            }
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
