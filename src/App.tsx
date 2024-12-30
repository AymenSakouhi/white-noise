import './App.css'
import Layout from './components/Layout'
import WhiteNoisePlayer from './components/WhiteNoisePlayer'
import { soundsAssets } from './helpers/utils'
import { BsSoundwave } from 'react-icons/bs'
import { auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('user info', user)
    } catch (error) {
      console.error('Error during google sign in', error)
    }
  }
  return (
    <div>
      <button onClick={handleGoogleSignIn}>sign in with google</button>
    </div>
  )
}

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
  return (
    <>
      <GoogleSignIn />
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
  )
}

export default App
