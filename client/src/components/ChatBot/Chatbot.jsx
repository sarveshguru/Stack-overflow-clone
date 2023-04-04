import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from "styled-components";

const steps = [
  {
    id: 'greet',
    message: 'Hello, welcome to our chatbot!',
    trigger: 'name',
  },
  {
    id: 'name',
    message: 'Please enter your name:',
    trigger: 'waiting1',
  },

  //navigate 
  {
    id: 'waiting1',
    user: true,
    trigger: 'askO',
  },

  {
    id: 'askO',
    message: 'Is your mobile no. is verified ?',
    trigger: 'OTPYN',
  },

  {
    id: 'OTPYN',
    options: [
      { value: 'yes-v', label: 'Yes', trigger: 'yes-v' },
      { value: 'no-v', label: 'No', trigger: 'no-v' },
    ],
  },

  {
    id: 'yes-v',
    message: 'great',
    trigger: 'question',
  },

  {
    id: 'no-v',
    component: <GoToPage />,
    asMessage: true,
    end: true,
  },


  {
    id: 'question',
    message: 'Hi {previousValue}, please select a programming topic:',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'react', label: 'React', trigger: 'react' },
      { value: 'html', label: 'HTML', trigger: 'html' },
      { value: 'javascript', label: 'JavaScript', trigger: 'javascript' },
    ],
  },
  {
    id: 'react',
    message: 'React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.',
    trigger: 'more',
  },
  {
    id: 'html',
    message: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and other information to be displayed in a web browser.',
    trigger: 'more',
  },
  {
    id: 'javascript',
    message: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is used primarily for client-side scripting and creating dynamic web content.',
    trigger: 'more',
  },
  {
    id: 'more',
    message: 'Do you need any more assistance?',
    trigger: 'more-options',
    end: false,
  },
  {
    id: 'more-options',
    options: [
      { value: 'yes', label: 'Yes', trigger: 'options' },
      { value: 'no', label: 'No, I am done', trigger: 'end-message' },
    ],
  },
  {
    id: 'end-message',
    message: 'Thank you for using our chatbot. Have a nice day!',
    end: true,
  },
];

const theme = {
  background: "#F5F5F5",
  headerBgColor: "#2F3F4F",
  headerFontSize: "20px",
  botBubbleColor: "#E0EAF1",
  headerFontColor: "white",
  botFontColor: "#1A2232",
  userBubbleColor: "#E0EAF1",
  userFontColor: "#1A2232",
};

const config = {
  floating: true,
};

// const navigate = useNavigate()

function GoToPage() {
  window.location.href = 'https://stack-overflow-sarvesh.netlify.app/OtpV';
  return <p> Redirecting to OTP Verificatoin page</p>
}

const Chatbot = () => {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot headerTitle="Chat Bot" steps={steps} {...config} />
      </ThemeProvider>
    </div>
  );
};

export default Chatbot;
