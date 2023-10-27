import './App.css';
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from '@sendbird/uikit-react/sendbirdSelectors';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider'
import { ChannelProvider } from '@sendbird/uikit-react/Channel/context'

const APP_ID = ""
const USER_ID = ""
const ACCESS_TOKEN = ""
const CHANNEL_URL = ""

function App() {
  return (
    <div className="App">
      <SendbirdProvider appId={APP_ID} userId={USER_ID} accessToken={ACCESS_TOKEN}>
        <ChannelProvider channelUrl={CHANNEL_URL}>
          <Chat />
        </ChannelProvider>
      </SendbirdProvider >
    </div>
  );
}


function Chat() {
  const globalStore = useSendbirdStateContext();
  const getGroupChannel = sendbirdSelectors.getGetGroupChannel(globalStore);
  const sendUserMessage = sendbirdSelectors.getSendUserMessage(globalStore);

  const handleClick = async () => {
    const groupChannel = await getGroupChannel(CHANNEL_URL)
    sendUserMessage(groupChannel, {
      message: "Hello World!"
    })
  }

  return (
    <button onClick={handleClick}>Click</button>
  );
}

export default App;
