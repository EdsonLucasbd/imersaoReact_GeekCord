import React, { useEffect, useState } from 'react';
import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';
import { useRouter } from 'next/router';

const InfoBoxItems = ({ children }) => {
  return (
    <Box
      styleSheet={{
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      {children}
    </Box>
  )
}

const InfoTitle = ({ children }) => {
  return (
    <Text 
      variant='heading5'
      styleSheet={{
        color: appConfig.theme.colors.primary['200'],
        marginRight: '15px,'
      }}
    >
      {children}
    </Text>
  )
}

const InfoData = ({ children }) => {
  return (
    <Text 
      variant='body3'
      styleSheet={{
      color: appConfig.theme.colors.primary['050'],
      marginLeft: '18px',
    }}
    >
      {children}
    </Text>
  )
}


export default function UserInfoModal({ specificUser }) {
  const router = useRouter();
  const [isOpen, setOpenState] = useState('');
  const [userData, setUserData] = useState({});
  const [userRepoStars, setUserRepoStars] = useState({});
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (specificUser === undefined) {
      let logedUser = router.query.username;
      setUserName(logedUser)
    } else {
      setUserName(specificUser)
      setOpenState(true)
    }
  }, [])

  function getUserData() {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => {
        return response.json();
      })
      .then((convertedResponse) => {
        setUserData(convertedResponse)
        console.log(convertedResponse)
      })
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((res) => {
        return res.json()
      })
      .then((starred) => starred.map((s) => ({

        repo: s.name
        , description: s.description
        , stargazers: s.stargazers_count
      }))).then((greater) => {
        const ord = greater.sort((a, b) => {
          return b.stargazers - a.stargazers
        })
        setUserRepoStars(ord[0])
      })
  }

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Box
        styleSheet={{
          alignItems: 'center',
          backgroundColor: 'transparent' /* appConfig.theme.colors.neutrals[300] */,
          borderRadius: '50%',
          display: 'flex',
          fontSize: '20px',
          focus: { backgroundColor: appConfig.theme.colors.primary[800] },
          justifyContent: 'center',
          lineHeight: '0',
          margin: '0 8px 5px -5px',
          minHeight: '30px',
          minWidth: '30px',
          padding: '0 3px 0 3px',
          opacity: 0.5,
          transition: '0.2s linear',
          hover: {
            opacity: 1,
          }
        }}
        onClick={() => setOpenState(!isOpen)}
      >
        <Image
          styleSheet={{
            borderRadius: '50%',
            cursor: 'pointer',
            height: '40px',
            width: '40px',
          }}
          src={`https://github.com/${userName}.png`}
          onClick={() => { getUserData() }}
        />
      </Box>
      {isOpen && (
        <Box
          styleSheet={{
            backgroundColor: appConfig.theme.colors.neutrals[800],
            borderRadius: '5px',
            top: '30px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '350px',
            padding: '16px',
            position: 'absolute',
            left: '30px',
            zIndex: '100',
            width: {
              xs: '300px',
              sm: '390px',
            },
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals["000"],
                fontWeight: 'bold',
            }}>
              Perfil
            </Text>
            <Text 
              tag='span'
              styleSheet={{ 
                position: 'absolute',
                color: appConfig.theme.colors.neutrals["000"],
                right: '10px',
                opacity: 0.5,
                transition: '0.2s',
                cursor: 'pointer',
                hover: {
                    fontWeight: 'bold',
                    opacity: 1,
                  }
              }}
              onClick={() => setOpenState(!isOpen)}
            >
              Ⓧ
            </Text>
          </Box>
          <Box
            styleSheet={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              overflow: 'hidden',
              paddingTop: '16px',
            }}
          >
            <Image
              styleSheet={{
                marginLeft: '20%',
                marginBottom: '5px',
                borderRadius: '50%',
                height: '150px',
                width: '150px',
              }}
              src={`https://github.com/${userName}.png`}
            />
            <InfoBoxItems>
              <InfoTitle>
                Nome:
              </InfoTitle>
              <InfoData>
                {userData.name}
              </InfoData>
            </InfoBoxItems>
            <InfoBoxItems>
              <InfoTitle>
                Seguidores:
              </InfoTitle>
              <InfoData>
                {userData.followers}
              </InfoData>
            </InfoBoxItems>
            <InfoBoxItems>
              <InfoTitle>
                Seguindo:
              </InfoTitle>
              <InfoData>
                {userData.following}
              </InfoData>
            </InfoBoxItems>
            <InfoBoxItems>
              <InfoTitle>
                Localidade:
              </InfoTitle>
              <InfoData>
                {userData.location}
              </InfoData>
            </InfoBoxItems>
            <InfoBoxItems>
              <InfoTitle>
                Repo mais popular:
              </InfoTitle>
              <InfoData>
                {userRepoStars.repo}
              </InfoData>
            </InfoBoxItems>
            <InfoBoxItems>
              <InfoTitle>
                Estrelas:
              </InfoTitle>
              <InfoData>
                {userRepoStars.stargazers}
              </InfoData>
            </InfoBoxItems>
          </Box>
        </Box>
      )}
    </Box>
  )
}