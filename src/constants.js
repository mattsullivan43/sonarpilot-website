// "Start free" / "Get started" CTAs open the visitor's mail client addressed
// to the SonarPilot inbox, pre-filled with a subject and body.
const ADDRESS = 'mjsullivan0910@gmail.com'
const SUBJECT = encodeURIComponent('Start free — SonarPilot')
const BODY = encodeURIComponent(
  "Hi SonarPilot team,\n\nI'd like to start using SonarPilot. Here are a few details:\n\n- Name:\n- Company / brokerage:\n- What I'd like to do:\n\nThanks!",
)

export const MAILTO = `mailto:${ADDRESS}?subject=${SUBJECT}&body=${BODY}`
