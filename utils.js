import { getRankings, insertPlayerScore } from "./db.js";

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

import { questions } from "./data/questions.js";

const TITLE = "🔥🚀🍻 SAMBLA GROUP DEV-DAY QUIZ 🍻🚀🔥\n";

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

  if (!correct) return spinner.error({ text: `💀 Wrong! ⛔️ \n` });

  score++;
  return spinner.success({ text: `Correct! Bra jobbat ${playerName}! \n` });
};

const fakeHack = async () => {
  const loadingSpinner = createSpinner("Loading quiz...").start();
  await sleep();

  loadingSpinner.update({
    text: "I don't really need to load here...",
  });
  await sleep();

  loadingSpinner.update({
    text: "<------ I just like this spinning animation... look at it go!",
  });
  await sleep();

  loadingSpinner.update({
    text: "This is not actually doing anything...",
  });
  await sleep();

  loadingSpinner.update({ text: "...or is it? 🤔😏" });
  await sleep();
  loadingSpinner.reset();

  const hackSpinner = createSpinner("Acquiring root access...").start();
  await sleep();
  hackSpinner.update({ text: "Root access acquired!" });
  hackSpinner.success();

  const browserSpinner = createSpinner("Scanning browser history....").start();
  await sleep();
  browserSpinner.update({ text: chalk.bgRed("SUSPICIOUS ACTIVITY FOUND!") });
  browserSpinner.warn();

  const reportSpinner = createSpinner(
    "Sending report to HR:  katinka.johansson@samblagroup.com..."
  ).start();
  await sleep();
  reportSpinner.update({ text: `Sent! Naughty naughty, ${playerName}.` });
  reportSpinner.success();

  const quizSpinner = createSpinner("Now back to the quiz... 5").start();
  await sleep(1000);
  quizSpinner.update({ text: "Now back to the quiz... 4" });
  await sleep(1000);
  quizSpinner.update({ text: "Now back to the quiz... 3" });
  await sleep(1000);
  quizSpinner.update({ text: "Now back to the quiz... 2" });
  await sleep(1000);
  quizSpinner.update({ text: "Now back to the quiz... 1" });
  await sleep(1000);
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
    Welcome to the Dev Day Quiz!
  `);

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    Use the arrow keys to select you answer.
    j/k keys work too for you Vimlords (Nazim).

    Press Enter to select your answer.

    The next question will load automatically on sumbit.

    A leaderboard will be shown at the end of the quiz. 🏆
  `);

  console.log(`
    ${chalk.bgRed("RULES")}
    No googling, no cheating!!
    (That includes YOU Lorenzo!) \n
  `);

  console.log(`
    ${chalk.bgMagenta("NOTE")}
    Try not to hit enter more than once, or when
    the question is loading, otherwise it will submit
    the question before you have time to read it.

    It's a bug I'm too lazy to fix. \n
`);
};

export const requestPlayerName = async () => {
  const prompt = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Enter your name to begin:",
  });

  if (!prompt.player_name) return requestPlayerName();

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

export const endQuiz = async () => {
  if (score < 5)
    console.log(`Your score was ${score}! That's not very good :(`);
  if (score >= 5 && score < 7) console.log(`Your score was ${score}! Not bad!`);
  if (score >= 7) console.log(`Your score was ${score}! NOICE ONE BRUV!`);

  await insertPlayerScore(playerName, score);
};

export const showRankings = async () => {
  const data = await getRankings();

  console.table(data);
};
