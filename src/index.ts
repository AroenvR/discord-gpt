import dotenv from 'dotenv'; dotenv.config();
import { startBot } from './bot';
import { ask } from './gpt';

startBot();
ask("What are the names of the planets in the solar system?");