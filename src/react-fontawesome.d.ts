declare module 'react-fontawesome' {
  import { Component } from 'react'

  interface FontAwesomeProps {
    name: string
    className?: string
    size?: string
    spin?: boolean
    pulse?: boolean
    onClick?: () => void
  }

  export default class FontAwesome extends Component<FontAwesomeProps> {}
}
