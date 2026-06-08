import { dx } from '../wore/hex.js';

const params = new URLSearchParams(window.location.search);
const page = params.get('page') || 'home';
dx.loadPage({ p: page });
