import React from 'react';
import BackgroundProvider from './Background';
import DataProvider from './Data';
import MeProvider from './Me';

interface ContextsProviderProps {
    children: React.ReactNode
}

const ContextsProvider: React.FC<ContextsProviderProps> = ({children}) => {
  return (
    <BackgroundProvider>
      <MeProvider>
        <DataProvider>
          {children}
        </DataProvider>
      </MeProvider>
    </BackgroundProvider>
  )
}

export default ContextsProvider

