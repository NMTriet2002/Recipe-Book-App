declare module 'react-native-vector-icons/FontAwesome' {
    import { Component } from 'react';
  
    interface IconProps {
      name: string;
      size?: number;
      color?: string;
    }
  
    export default class FontAwesome extends Component<IconProps> {}
  }
  