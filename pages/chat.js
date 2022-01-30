import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import appConfig from '../config.json';

import { insertMessage, getMessagesData, listenRealTimeMessage } from '../src/utils/supabaseAPI';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

export default function ChatPage() {
  const router = useRouter()
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const logedUser = router.query.username;
    getMessagesData(setMessageList);
    setUserName(logedUser);
    listenRealTimeMessage((newMessage) => {
      setMessageList((currentMessageListValue) => {
        return [
          newMessage,
          ...currentMessageListValue,
        ]
      })
    });
  }, []);

  function sendNewMessage(newMessage) {
    const thisMessage = {
      from: userName,
      text: newMessage
    }

    insertMessage(thisMessage, messageList)

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
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(/geekCord-background-2.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Box
          styleSheet={{
            backgroundColor: appConfig.theme.colors.neutrals[700],
            borderRadius: '5px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            height: '100%',
            maxHeight: '95vh',
            maxWidth: '95%',
            opacity: 0.9,
            padding: '32px',
          }}
        >
          <Header user={userName}/>
          <Box
            styleSheet={{
              backgroundColor: appConfig.theme.colors.neutrals[600],
              borderRadius: '5px',
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              height: '80%',
              padding: '16px',
              position: 'relative',
            }}
          >

            <MessageList messages={messageList} changeList={setMessageList}/>
            <Box
              as="form"
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ButtonSendSticker onStickerClick={(sticker) => {
                sendNewMessage(`:sticker:${sticker}`)
              }} />
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
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  border: '0',
                  borderRadius: '5px',
                  color: appConfig.theme.colors.neutrals[200],
                  marginRight: '12px',
                  overflow: 'hidden',
                  padding: '6px 8px',
                  resize: 'none',
                  width: '100%',
                }}
              />
              <Button
                iconName="FaTelegramPlane"
                label="Enviar"
                size='xs'
                disabled={message.length === 0}
                onClick={() => sendNewMessage(message, message.from)}
                styleSheet={{
                  backgroundColor: appConfig.theme.colors.primary[700],
                  focus: { backgroundColor: appConfig.theme.colors.primary[800] },
                  fontSize: '20px',
                  height: '43px',
                  hover: { backgroundColor: appConfig.theme.colors.primary[800] },
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

function Header({ user }) {
  const [userData, setUserData] = useState({});
  
  function getUserData() {
    fetch(`https://api.github.com/users/${user}`)
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
            // marginBottom: '16px',
            borderRadius: '50%',
            cursor: 'pointer',
            height: '40px',
            width: '40px',
          }}
          src={`https://github.com/${user}.png`}
          onClick={() => { getUserData() }}
        />
        <Text 
          variant='heading5'
          styleSheet={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          Chat
          <Image 
            src="/chat.ico" 
            alt="chat icon" 
            styleSheet={{
              height: '22px',
              marginLeft: '7px',
              width: '22px',
            }}
          />
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          iconName='FaSignOutAlt'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  function deleteMessage(messageId) {
    const newArray = props.messages.filter((item) => item.id !== messageId);
    console.log('lista original', props.messages)
    console.log('lista nova', newArray)
    props.changeList(newArray);
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
        color: appConfig.theme.colors.neutrals["000"],
        display: 'flex',
        flex: 1,
        flexDirection: 'column-reverse',
        marginBottom: '16px',
        overflow: 'scroll',
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
              padding: '6px',
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  display: 'inline-block',
                  height: '20px',
                  marginRight: '8px',
                  width: '20px',
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[300],
                  fontSize: '10px',
                  marginLeft: '8px',
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
              <Text 
              tag="span" 
              onClick={() => {
                deleteMessage(message.id)
              }}
              styleSheet={{ 
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
              { message.text.startsWith(':sticker:') 
                ? (
                  <Image src={message.text.replace(':sticker:', '')}/>
                ) : (
                  message.text
                ) }

          </Text>
        );
      })}
    </Box>
  )
}