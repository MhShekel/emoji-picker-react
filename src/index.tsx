import * as React from 'react';
import PickerMain from './components/main/PickerMain';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import './EmojiPickerReact.css';
import { Footer } from './components/footer/Footer';

export interface Props {}

export function Picker(/*props: Props*/) {
  return (
    <PickerMain>
      <Header />
      <Body />
      <Footer />
    </PickerMain>
  );
}
