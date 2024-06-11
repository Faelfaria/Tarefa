import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from '/home/user/projeto/Tela/src/AppNavigator.js';

export default function App() {
    return (
        <PaperProvider>
            <AppNavigator />
        </PaperProvider>
    );
}
