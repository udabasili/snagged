import { createChatBotMessage } from 'react-chatbot-kit';
import { useDispatch } from 'react-redux';
import { helpWindowHandler } from '../../redux/user/user.actions';
import { FaWindowClose } from 'react-icons/fa';

const botName = "Somebot";

const ChatBotHeader = () =>{

	const dispatch = useDispatch()
	return(
		<div className='chat__header' >
			<div className='chat__username'>
				<span className='username'>Chatbot</span>
			</div>
			<FaWindowClose 
				onClick={() => dispatch(helpWindowHandler(false))}
				className='close-button'/>
		</div>
	)
	
}

const config = {
  // Defines the chatbot name
  botName: botName,
  // Defines an array of initial messages that will be displayed on first render
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}`),
    createChatBotMessage(
      "First things first, which airport are you looking for information from?",
      {
        widget: "airportSelector",
        delay: 500,
      }
    ),
  ],
  // Defines an object that will be injected into the chatbot state, you can use this state in widgets for example
  state: {
    airports: [],
    flightType: "",
    selectedFlightId: "",
    selectedFlight: null,
  },
  // Defines an object of custom components that will replace the stock chatbot components. 
  customComponents: {
     // Replaces the default header
    header: () => ChatBotHeader() ,
    // Replaces the default bot avatar

  },
  // Defines an object of custom styles if you want to override styles
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  // Defines an array of widgets that you want to render with a chatbot message
  widgets: [
    {
      // defines the name you will use to reference to this widget in "createChatBotMessage".
      widgetName: "singleFlight",
      // Function that will be called internally to resolve the widget
      // Any props you want the widget to receive on render
      props: {},
      // Any piece of state defined in the state object that you want to pass down to this widget
      mapStateToProps: [
        "selectedFlightId",
        "selectedFlight",
      ],
    },
  ],
};

export default config;