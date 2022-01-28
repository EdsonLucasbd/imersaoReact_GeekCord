import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';

import Head from 'next/head';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  function sendNewMessage(newMessage) {
    const thisMessage = {
      id: messageList.length,
      from: 'EdsonLucasbd',
      text: newMessage
    }
    setMessageList([thisMessage, ...messageList]);
    setMessage('')
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/chat.ico" />
        <title>GeekCord | Chat</title>
      </Head>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(/geekCord-background-2.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            maxWidth: '95%',
            maxHeight: '95vh',
            padding: '32px',
            opacity: 0.9,
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '80%',
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: 'column',
              borderRadius: '5px',
              padding: '16px',
            }}
          >

            <MessageList messages={messageList} />
            <Box
              as="form"
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                value={message}
                onChange={(event) => {
                  const value = event.target.value;
                  setMessage(value);
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && event.shiftKey === false) {
                    event.preventDefault();
                    sendNewMessage(message);
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: '12px',
                  color: appConfig.theme.colors.neutrals[200],
                  overflow: 'hidden',
                }}
              />
              <Button
                iconName="FaTelegramPlane"
                label="Enviar"
                size='xs'
                disabled={message.length === 0}
                onClick={() => sendNewMessage(message)}
                styleSheet={{
                  backgroundColor: appConfig.theme.colors.primary[700],
                  hover: { backgroundColor: appConfig.theme.colors.primary[800] },
                  focus: { backgroundColor: appConfig.theme.colors.primary[800] },
                  height: '43px',
                  marginBottom: '8px',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

function Header() {
  const [userData, setUserData] = useState({});

  function getUserData(userName) {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => {
        return response.json();
      })
      .then((convertedResponse) => {
        setUserData(convertedResponse)
        console.log(convertedResponse)
      })
  }

  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Image
          styleSheet={{
            borderRadius: '50%',
            // marginBottom: '16px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
          }}
          src={`https://github.com/EdsonLucasbd.png`}
          onClick={() => { getUserData('EdsonLucasbd') }}
        />
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {props.messages.map((message) => {
        return (

          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/EdsonLucasbd.png`}
              />
              <Text tag="strong">
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
              <Text tag="span" styleSheet={{ 
                cursor: 'pointer' ,
                marginLeft: '85%',
                opacity: 0.5,
                transition: '0.2s',
                hover: {
                  opacity: 1,
                }
              }}>
                Ⓧ
              </Text>
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  )
}