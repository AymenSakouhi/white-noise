import "./App.css";
import Layout from "./components/Layout";
import WhiteNoisePlayer from "./components/WhiteNoisePlayer";
// import { GiWaterMill } from "react-icons/gi";
// import train from "@/assets/downloads/train.5b190888.ogg";
import { soundsAssets } from "./helpers/utils";

console.log(soundsAssets);
const whiteNoisesArr =
  Object.entries(soundsAssets)?.map(([path, module]) => {
    return {
      title: path?.split("/").pop().split(".").shift() || "",
      path,
    };
  }) || [];
console.log(whiteNoisesArr);
function App() {
  return (
    <>
      <Layout>
        {whiteNoisesArr &&
          whiteNoisesArr?.map((_) => (
            <WhiteNoisePlayer
              key={_.path}
              {...{
                title: _.title,
                path: _.path,
              }}
            />
          ))}
      </Layout>
    </>
  );
}

export default App;
