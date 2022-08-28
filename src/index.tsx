import * as React from 'react';
import PickerMain from './components/main/PickerMain';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import './EmojiPickerReact.css';
import { Footer } from './components/footer/Footer';
import { PickerConfigProvider } from './components/context/PickerConfigContext';
import { PickerConfig } from './config/config';
import { ElementRefContextProvider } from './components/context/ElementRefContext';

export interface Props extends PickerConfig {}

export function Picker(props: Props) {
  return (
    <ElementRefContextProvider>
      <PickerConfigProvider {...props}>
        <PickerMain>
          <Header />
          <Body />
          <Footer />
        </PickerMain>
      </PickerConfigProvider>
    </ElementRefContextProvider>
  );
}
