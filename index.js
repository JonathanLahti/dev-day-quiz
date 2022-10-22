#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

import questions from './data/questions.json'

const TITLE = '🎅🏻🎄 SAMBLA GROUP DEV CHRISTMAS QUIZ 🎄🎅🏻\n';

let playerName;
let score = 0;

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

const start = async () => {
  console.clear();
  const title = chalkAnimation.neon(TITLE);
  await sleep();
  title.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY\n')}
    Do the quiz, answer the questions.
    Winner gets to sugondeez.
  `);
};

const requestPlayerName = async () => {
  const prompt = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'Enter your name',
  });

  playerName = prompt.player_name;
};

const handleAnswer = async (correct) => {
  const spinner = createSpinner('Checking answer...').start();
  await sleep(1000);

  if (!correct) return spinner.error({ text: `Wrong 💀 \n` });

  score++;
  return spinner.success({ text: `Good job ${playerName} \n` })
};

const endQuiz = () => {
  if (score < 5) console.log(`Your score was ${score}! That\'s not very good :(`);
  if (score > 5 && score < 7) console.log(`Your score was ${score}! Not bad!`);
  if (score > 7) console.log(`Your score was ${score}! NOICE ONE BRUV!`);
};

const buildQuestion = ({ name, type, message, choices, answer }) => {
  return async () => {
    const prompt = await inquirer.prompt({ name, type, message, choices });

    return handleAnswer(prompt[name] === answer);
  };
};

const q1 = buildQuestion(questions.q1);
const q2 = buildQuestion(questions.q2);
const q3 = buildQuestion(questions.q3);
const q4 = buildQuestion(questions.q4);
const q5 = buildQuestion(questions.q5);

await start();
await requestPlayerName();

await q1();
await q2();
await q3();
await q4();
await q5();

endQuiz();
