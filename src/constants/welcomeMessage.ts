import figlet from 'figlet'

/**
 * Welcome message to be displayed when the CLI is run
 * @defaultValue 'LovelyStay CLI!'
 */
const welcomeMessage = figlet.textSync('LovelyStay CLI!', {
  font: 'Big',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true,
})

export default welcomeMessage
