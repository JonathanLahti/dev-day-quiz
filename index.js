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
    ${chalk.bgBlue('HOW TO PLAY')}
    Do the quiz, answer the questions.
    Winner gets to sugondeez.
  `);

  console.log(`
    ${chalk.bgBlue('RULES')}
    No googling, no cheating!!
    (That includes YOU Lorenzo!)
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


await start();
await requestPlayerName();

for (const [key, value] of Object.entries(questions)) {
  const question = buildQuestion(value);
  await question();
}

endQuiz();
