import express from 'express'
const app = express();
import { runner } from './start/run'
import { modules } from './start/modules';
import './utils/passport-config';

modules(app, express);
runner(app);