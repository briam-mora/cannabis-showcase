import './App.css';
import Header from './Header';
import InformationView from './InformationView';
import SpatialView from './SpatialView';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header/>
        <SpatialView/>
        <InformationView/>
      </div>
    </ChakraProvider>
  );
}

export default App;
