import { config } from './../../api/config.js'
import {InstallGlobalCommands} from "../utils.js";

const GET_CONTENT_COMMAND = {
    name: 'get-content',
    description: 'Get page content from lore wiki.',
    type: 1,
    contexts: [0, 1, 2],
};

const ALL_COMMANDS = [GET_CONTENT_COMMAND];

InstallGlobalCommands(config.bot_id, ALL_COMMANDS);