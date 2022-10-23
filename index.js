#!/usr/bin/env node

import { start, requestPlayerName, endQuiz, quiz, showRankings } from "./utils.js";

await start();
await requestPlayerName();
await quiz();

await endQuiz();
await showRankings();