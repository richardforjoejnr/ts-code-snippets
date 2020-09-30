/* eslint-disable */
import { start } from './server';

start().then(() => console.log('STUB server started!')).catch((error: any) => console.log('Server error. ', error));