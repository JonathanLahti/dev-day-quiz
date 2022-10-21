#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

import QUESTION_TEXT from './data/questions.json'
import CHOICE_TEXT from './data/choices.json'
import ANSWER_TEXT from './data/answers.json'

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
    message: 'Enter you name',
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
  if (score < 5) console.log(`You score was ${score}! That\'s not very good :(`);
  if (score > 5 && score < 7) console.log(`You score was ${score}! Not bad!`);
  if (score > 7) console.log(`You score was ${score}! NOICE ONE BRUV!`);
};

const question1 = async () => {
  const prompt = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: QUESTION_TEXT.question1,
    choices: CHOICE_TEXT.question1,
  });

  return handleAnswer(prompt.question_1 === ANSWER_TEXT.question1);
};


const question2 = async () => {
  const prompt = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: QUESTION_TEXT.question2,
    choices: CHOICE_TEXT.question2,
  });

  return handleAnswer(prompt.question_2 === ANSWER_TEXT.question2);
};


const question3 = async () => {
  const prompt = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: QUESTION_TEXT.question3,
    choices: CHOICE_TEXT.question3,
  });

  return handleAnswer(prompt.question_3 === ANSWER_TEXT.question3);
};


await start();
await requestPlayerName();
await question1();
await question2();
await question3();
endQuiz();
