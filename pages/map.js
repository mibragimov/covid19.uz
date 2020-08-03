import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { Typography, makeStyles, Box } from '@material-ui/core';
import Flag from '../components/Flag';
import MapChart from '../components/MapChart';
import { numberWithCommas } from '../utils/numberWithCommas';
import Layout from '../components/Layout';
import { withTranslation, i18n } from '../i18n';

var countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/uz.json'));
countries.registerLocale(require('i18n-iso-countries/langs/ru.json'));

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  span: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    fontWeight: 600,

    '& span': {
      marginLeft: theme.spacing(2),
    },
  },
  confirmed: {
    color: theme.palette.info.main,
  },
  recovered: {
    color: theme.palette.success.main,
  },
  active: {
    color: theme.palette.warning.main,
  },
  critical: {
    color: theme.palette.secondary.main,
  },
  deaths: {
    color: theme.palette.error.main,
  },
  tests: {
    color: theme.palette.warning.dark,
  },
}));

function Map({ world, t }) {
  const [content, setContent] = useState('');

  const classes = useStyles();
  let currLang = i18n.language === 'uz' ? 'uz' : 'ru';

  return (
    <Layout>
      <MapChart setTooltipContent={setContent} world={world} />
      <ReactTooltip backgroundColor="#1B2435">
        {content ? (
          <Box>
            <Box component="span" className={classes.span}>
              <Flag src={content.country_code} alt={content.country} />
              <Typography>
                {countries.getName(content.country_code, currLang)}
              </Typography>
            </Box>

            <Box className={classes.box}>
              <Typography variant="caption" className={classes.p}>
                {t('confirmed')}:
                <span className={classes.confirmed}>
                  {content.confirmed === -1
                    ? t('unknown')
                    : numberWithCommas(content.confirmed)}
                </span>
              </Typography>

              <Typography variant="caption" className={classes.p}>
                {t('recovered')}:
                <span className={classes.recovered}>
                  {content.recovered === -1
                    ? t('unknown')
                    : numberWithCommas(content.recovered)}
                </span>
              </Typography>

              <Typography variant="caption" className={classes.p}>
                {t('active')}:
                <span className={classes.active}>
                  {content.confirmed === -1
                    ? t('unknown')
                    : numberWithCommas(
                        content.confirmed - content.recovered - content.deaths
                      )}
                </span>
              </Typography>

              <Typography variant="caption" className={classes.p}>
                {t('deaths')}:
                <span className={classes.deaths} variant="caption">
                  {content.deaths === -1
                    ? t('unknown')
                    : numberWithCommas(content.deaths)}
                </span>
              </Typography>
              <Typography variant="caption" className={classes.p}>
                {t('tests')}:
                <span className={classes.tests} variant="caption">
                  {content.tests === -1
                    ? t('unknown')
                    : numberWithCommas(content.tests)}
                </span>
              </Typography>
            </Box>
          </Box>
        ) : (
          ''
        )}
      </ReactTooltip>
    </Layout>
  );
}

Map.propTypes = {
  t: PropTypes.func.isRequired,
};

export async function getStaticProps() {
  const { data } = await axios.get('https://cov19.cc/report.json');

  return {
    props: {
      totals: data.regions.world.totals,
      world: data.regions.world,
      updated: data.last_updated,
    },
    unstable_revalidate: 1, // In seconds
  };
}

export default withTranslation('common')(Map);
