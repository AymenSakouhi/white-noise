import Layout from './components/reusable/Layout'
import WhiteNoisePlayer from '@/components/WhiteNoisePlayer'
import { soundsAssets } from '@/helpers/utils'
import { BsSoundwave } from 'react-icons/bs'
import { useAuth } from '@/components/AuthContext'
import GoogleSignIn from '@/components/reusable/GoogleSignIn'
import Pomodoro from '@/components/Pomodoro'
import AddYourNoise from './components/AddYourNoise'

const whiteNoisesArr =
  // eslint-disable-next-line
  Object.entries(soundsAssets)?.map(([path, module]) => {
    return {
      title: path?.split('/')?.pop()?.split('.')?.shift() || '',
      Icon: BsSoundwave,
      path,
    }
  }) || []

function App() {
  const currentUser = useAuth()

  return (
    <>
      {currentUser ? (
        <Layout>
          <Pomodoro />
          <div className="col-span-full text-sky-200 text-2xl text-center">
            Choose your best comination
          </div>
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
          <AddYourNoise />
        </Layout>
      ) : (
        <GoogleSignIn />
      )}
    </>
  )
}

export default App
