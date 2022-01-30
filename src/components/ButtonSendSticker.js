import React, { useState } from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = useState('');

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
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
          // filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            backgroundColor: appConfig.theme.colors.primary[800],
            // filter: 'grayscale(0)'
          }
        }}
        label="😋"
        onClick={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            backgroundColor: appConfig.theme.colors.neutrals[800],
            borderRadius: '5px',
            bottom: '30px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
            display: 'flex',
            flexDirection: 'column',
            height: '300px',
            padding: '16px',
            position: 'absolute',
            left: '30px',
            width: {
              xs: '200px',
              sm: '290px',
            },
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flex: 1,
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              overflow: 'scroll',
              paddingTop: '16px',
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  borderRadius: '5px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  padding: '10px',
                  width: '50%',
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}