import Appbar from "./Components/Appbar"
import { RecoilRoot } from 'recoil'
import Board from "./Components/Board"
// import Timer from "./Components/Timer"
import Numbers from "./Components/Numbers"

function App() {


  return (
    <RecoilRoot>
      <div className="h-screen w-full">
        <Appbar />
        <Board />
        <Numbers />
        {/* <Timer /> */}
      </div>
    </RecoilRoot>
  )
}

export default App
