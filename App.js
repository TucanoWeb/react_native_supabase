import AppNavigation from './src/routes/stackRoutes';

import { userContext, userContextProps } from './src/context/userContext';
import { useState } from 'react';

export default function App() {

  const [user, setUser] = useState()

  return (
    <userContextProps.Provider value={[user, setUser]}>
      <userContext.Provider value={user}>
        <AppNavigation />
      </userContext.Provider>
    </userContextProps.Provider>
  );
}