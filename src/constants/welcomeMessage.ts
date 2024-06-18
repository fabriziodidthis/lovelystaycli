import figlet from 'figlet'

// Print the LovelyStay welcome message
const welcomeMessage = figlet.textSync('LovelyStay CLI!', {
  font: 'Big',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true,
})

export default welcomeMessage
