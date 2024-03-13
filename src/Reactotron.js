import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron, {
  trackGlobalErrors,
  networking,
} from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

if (__DEV__) {
  Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ name: 'CognizantRNTask' })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(reactotronRedux())
    .use(networking())
    .connect()
}

export default Reactotron
