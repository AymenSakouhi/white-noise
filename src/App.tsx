import "./App.css";
import Layout from "./components/Layout";
import WhiteNoisePlayer from "./components/WhiteNoisePlayer";
import { soundsAssets } from "./helpers/utils";
import { BsSoundwave } from "react-icons/bs";

const whiteNoisesArr =
  // eslint-disable-next-line
  Object.entries(soundsAssets)?.map(([path, module]) => {
    return {
      title: path?.split("/")?.pop()?.split(".")?.shift() || "",
      Icon: BsSoundwave,
      path,
    };
  }) || [];

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
                Icon: _.Icon,
              }}
            />
          ))}
      </Layout>
    </>
  );
}

export default App;
