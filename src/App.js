import Tree from "./Tree/Tree";
import { simpsonsTree } from "./data";
import "./App.css";

const preprocessData = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const App = () => {
  const datalist = preprocessData(simpsonsTree);

  return <Tree root="abe" datalist={datalist} />;
};

export default App;
