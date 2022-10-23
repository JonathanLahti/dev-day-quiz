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

  if (!correct) return spinner.error({ text: `Wrong! 💀 \n` });

  score++;
  return spinner.success({ text: `Good job ${playerName}! \n` });
};

const fakeHack = async () => {
  const loadingSpinner = createSpinner("Loading...").start();
  await sleep();

  loadingSpinner.update({
    text: "I don't need to load here...",
  });
  await sleep();

  loadingSpinner.update({
    text: "I just like the spinner animation...",
  });
  await sleep();

  loadingSpinner.update({
    text: "This is not actually doing anything...",
  });
  await sleep();

  loadingSpinner.update({ text: "...or is it? 🤔😏" });
  await sleep();
  loadingSpinner.reset();

  const hackSpinner = createSpinner(
    "Acquiring root access..."
  ).start();
  await sleep();
  hackSpinner.update({ text: "Root access acquired!"});
  hackSpinner.success();

  const browserSpinner = createSpinner("Scanning browser history....").start();
  await sleep();
  browserSpinner.update({ text: chalk.bgRed("SUSPICIOUS ACTIVITY FOUND!")});
  browserSpinner.warn();

  const reportSpinner = createSpinner(
    "Sending report to katinka.johansson@samblagroup.com..."
  ).start();
  await sleep();
  reportSpinner.update({ text: `Sent! Naughty naughty, ${playerName}.`});
  reportSpinner.success();

  const quizSpinner = createSpinner("Now back to the quiz... 3").start();
  await sleep(1000);
  quizSpinner.update({ text: "Now back to the quiz... 2"});
  await sleep(1000);
  quizSpinner.update({ text: "Now back to the quiz... 1"});
  await sleep(1000)
  quizSpinner.stop();

  console.clear();
};

export const start = async () => {
  console.clear();
  const title = chalkAnimation.neon(TITLE);
  await sleep();
  title.stop();

  console.log(`
    ${chalk.bgGreen("WELCOME")}
    Welcome to the Dev Team Christmas Quiz!
  `);

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    Use the arrow keys to select you answer.
    j/k keys work too for you Vimlords (Nazim).

    Press Enter to select your answer.
  `);

  console.log(`
    ${chalk.bgRed("RULES")}
    No googling, no cheating!!
    (That includes YOU Lorenzo!) \n
    ${await terminalImage.file("image-mac.png", {
      width: "10%",
      height: "10%",
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
    await sleep();
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