import { clock } from './components/clock.js';
import {  socialsData } from './data/socialData.js';
import { renderSocials } from './components/renderSocials.js';


clock('.clock');
renderSocials('footer > .socials', socialsData);

