import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import terminalImage from "terminal-image";

import questions from "./data/questions.json";


const TITLE = "🎅🏻🎄 SAMBLA GROUP DEV CHRISTMAS QUIZ 🎄🎅🏻\n";

export const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

let playerName;
let score = 0;


const buildQuestion = ({ name, type, message, choices, answer }) => {
  return async () => {
    const prompt = await inquirer.prompt({ name, type, message, choices });

    return handleAnswer(prompt[name] === answer);
  };
};

const handleAnswer = async (correct) => {
  const spinner = createSpinner("Checking answer...").start();
  await sleep(1000);

  if (!correct) return spinner.error({ text: `Wrong 💀 \n` });

  score++;
  return spinner.success({ text: `Good job ${playerName} \n` });
};

const fakeHack = async () => {
  const spinner = createSpinner("Loading...").start();
  await sleep(3000);

  spinner.update({
    text: "...I'm not actually doing anything, I just thought the spinner looks cool.",
  });
  await sleep(3000);

  spinner.update({ text: "...or am I? 🤔😏" });
  await sleep(3000);

  spinner.update({ text: "Root access successfully acquired..." });
  await sleep();

  spinner.update({ text: "Scanning search history...." });
  await sleep();

  spinner.update({ text: "SUSPICIOUS ACTIVITY FOUND" });
  await sleep(2000);

  spinner.update({
    text: "Sending report to katinka.johansson@samblagroup.com...",
  });
  await sleep();

  spinner.update({ text: "Ok, now back to the quiz!" });
  await sleep();

  spinner.stop();
  console.clear();
};

export const start = async () => {
  console.clear();
  const title = chalkAnimation.neon(TITLE);
  await sleep();
  title.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    Do the quiz, answer the questions.
    Winner gets to sugondeez.
  `);

  console.log(`
    ${chalk.bgBlue("RULES")}
    No googling, no cheating!!
    (That includes YOU Lorenzo!)
    ${await terminalImage.file("image-mac.png", {
      width: "12%",
      height: "12%",
      preserveAspectRatio: false,
    })}
  `);
};

export const requestPlayerName = async () => {
  const prompt = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Enter your name to begin:",
  });

  playerName = prompt.player_name;
  console.clear();

  await fakeHack();
};

export const quiz = async () => {
  for (const [key, value] of Object.entries(questions)) {
    const question = buildQuestion(value);
    await question();

    const spinner = createSpinner("Next question...").start();
    await sleep(3000);
    spinner.stop();
    console.clear();
  }
};

export const endQuiz = () => {
  if (score < 5)
    console.log(`Your score was ${score}! That\'s not very good :(`);
  if (score >= 5 && score < 7) console.log(`Your score was ${score}! Not bad!`);
  if (score >= 7) console.log(`Your score was ${score}! NOICE ONE BRUV!`);
};

