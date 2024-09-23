import './App.css';
import Header from './Header';
import InformationView from './InformationView';
import PointOfInterest from './PointOfInterest';
import SpatialView from './SpatialView';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header/>
        <PointOfInterest id="point-1" label="1" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <PointOfInterest id="point-2" label="2" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <PointOfInterest id="point-3" label="3" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <SpatialView/>
        <InformationView/>
      </div>
    </ChakraProvider>
  );
}

export default App;
