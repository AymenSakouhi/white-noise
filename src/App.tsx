import './App.css'
import Layout from './components/Layout'
import WhiteNoisePlayer from '@/components/WhiteNoisePlayer'
import { soundsAssets } from '@/helpers/utils'
import { BsSoundwave } from 'react-icons/bs'
import { useAuth } from '@/components/AuthContext'
import GoogleSignIn from '@/components/GoogleSignIn'

// eslint-disable-next-line
const whiteNoisesArr =
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
      ) : (
        <GoogleSignIn />
      )}
    </>
  )
}

export default App
