import { widgetCatalog } from "./utils/widget" // Import widget catalog
import { PlaygroundLayout } from "./components/playground/layout"

const App = () => {
  return <PlaygroundLayout widgets={widgetCatalog} />
}

export default App
