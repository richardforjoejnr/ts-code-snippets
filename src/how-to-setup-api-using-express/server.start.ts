/* eslint-disable */
import { start } from './server';

start().then(() => console.log('server started!')).catch((error: any) => console.log('Server error. ', error));