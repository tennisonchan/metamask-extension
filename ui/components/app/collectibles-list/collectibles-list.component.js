import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../ui/box';
import Button from '../../ui/button';
import Typography from '../../ui/typography/typography';
import {
  COLORS,
  TYPOGRAPHY,
  TEXT_ALIGN,
  BLOCK_SIZES,
  JUSTIFY_CONTENT,
  FLEX_DIRECTION,
  ALIGN_ITEMS,
  DISPLAY,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { getEnvironmentType } from '../../../../app/scripts/lib/util';
import { ENVIRONMENT_TYPE_POPUP } from '../../../../shared/constants/app';

export default function CollectiblesList({ onAddNFT }) {
  const t = useI18nContext();
  const blockSizes = {
    copy:
      getEnvironmentType() === ENVIRONMENT_TYPE_POPUP
        ? BLOCK_SIZES.TWO_THIRDS
        : BLOCK_SIZES.ONE_THIRD,
    button:
      getEnvironmentType() === ENVIRONMENT_TYPE_POPUP
        ? BLOCK_SIZES.HALF
        : BLOCK_SIZES.ONE_FIFTH,
  };

  const collections = {
    Opensea: {
      collectibles: [
        { icon: './images/kitty-1.svg' },
        { icon: './images/kitty-2.svg' },
        { icon: './images/kitty-3.svg' },
        { icon: './images/kitty-1.svg' },
      ],
    },
    CryptoKitties: {
      collectibles: [
        { icon: './images/kitty-1.svg' },
        { icon: './images/kitty-2.svg' },
      ],
    },
  };

  return (
    <Box
      padding={[4, 6, 4, 6]}
      className="collectibles-list"
      flexDirection={FLEX_DIRECTION.COLUMN}
    >
      {Object.keys(collections).length > 0 ? (
        <>
          {Object.keys(collections).map((key, index) => {
            const { collectibles } = collections[key];
            return (
              <>
                <Box
                  marginBottom={2}
                  display={DISPLAY.FLEX}
                  alignItems={ALIGN_ITEMS.CENTER}
                  justifyContent={JUSTIFY_CONTENT.SPACE_BETWEEN}
                  key={`collection-${index}`}
                  onClick={() => {
                    console.log(`Toggling ${key}`);
                  }}
                >
                  <Box alignItems={ALIGN_ITEMS.FLEX_START}>
                    <Typography color={COLORS.BLACK} variant={TYPOGRAPHY.H4}>
                      {`${key} (${collectibles.length})`}
                    </Typography>
                  </Box>
                  <Box alignItems={ALIGN_ITEMS.FLEX_END}>
                    <i className="fa fa-caret-down fa-lg" />
                  </Box>
                </Box>
                <Box>
                  {collectibles.map((collectible, i) => {
                    return (
                      <img
                        src={collectible.icon}
                        style={{ width: '98px' }}
                        key={`collectible-${i}`}
                      />
                    );
                  })}
                </Box>
              </>
            );
          })}
          <Box
            marginTop={4}
            flexDirection={FLEX_DIRECTION.COLUMN}
            justifyContent={JUSTIFY_CONTENT.CENTER}
          >
            <Typography
              color={COLORS.UI3}
              variant={TYPOGRAPHY.H5}
              align={TEXT_ALIGN.CENTER}
            >
              {t('missingNFT')}
            </Typography>
            <Button
              className="import-token-link__link"
              type="link"
              onClick={onAddNFT}
            >
              {t('addNFT')}
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box justifyContent={JUSTIFY_CONTENT.CENTER}>
            <img src="./images/diamond.png" />
          </Box>
          <Typography
            color={COLORS.UI3}
            variant={TYPOGRAPHY.H3}
            align={TEXT_ALIGN.CENTER}
          >
            {t('noNFTs')}
          </Typography>
          <Box justifyContent={JUSTIFY_CONTENT.CENTER}>
            <Box width={blockSizes.copy}>
              <Typography
                color={COLORS.UI3}
                variant={TYPOGRAPHY.H5}
                align={TEXT_ALIGN.CENTER}
              >
                {t('noNFTsDetails')}
              </Typography>
            </Box>
          </Box>
          <Box marginTop={6} justifyContent={JUSTIFY_CONTENT.CENTER}>
            <Box width={blockSizes.button}>
              <Button type="primary" onClick={onAddNFT}>
                {t('addNFT')}
              </Button>
            </Box>
          </Box>
          <Box marginTop={2}>
            <Button
              href="https://community.metamask.io/"
              target="_blank"
              type="link"
              rel="noopener noreferrer"
            >
              {t('learnMore')}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

CollectiblesList.propTypes = {
  onAddNFT: PropTypes.func.isRequired,
};
