import {Router} from './routes/Router';
import {AppwriteProvider} from './appwrite/AppwriteContext';

const App = () => {
  return (
    <AppwriteProvider>
      <Router />
    </AppwriteProvider>
  );
};

export default App;
