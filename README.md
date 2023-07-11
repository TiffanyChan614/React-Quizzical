# React-Quizzical

## Description

This is the final solo project of the [React course by Bob Ziroll on Scrimba](https://scrimba.com/learn/learnreact). The code is all written by me without any guidance. The project is a quiz app that fetches trivia questions from the [Open Trivia Database API](https://opentdb.com/) and score players based on their answers.

## Live Demo

You can try the page [here](https://quizzical987.netlify.app).

## Screenshots

![Start Page](./screenshots/startPage.png)

![Quiz Page](./screenshots/quizPage.png)

![Answer Page](./screenshots/ansPage.png)

## Built with

- HTML 5
- CSS 3
- JavaScript
- React JS
- Figma

## Project Requirements

- Two screens: a start page and a quiz page
- Pull 5 questions from the OTDB API
- Tally correct answers after 'Check answers' is clicked
- Styled and polished
- Limit answer choice to 1 per question

## Local Setup

- Clone the repository
- Run `npm install` to install the dependencies
- Run `npm dev` to start the development server

## Dependencies

This project depends on the following packages:

- `he` (version ^1.2.0): A robust HTML entity encoder/decoder.
- `react` (version ^18.2.0): A JavaScript library for building user interfaces.
- `react-dom` (version ^18.2.0): A package for working with the DOM in React applications.

This project also has the following development dependencies:

- `@types/react` (version ^18.0.37): TypeScript definitions for the React library.
- `@types/react-dom` (version ^18.0.11): TypeScript definitions for the react-dom package.
- `@vitejs/plugin-react` (version ^4.0.0): A Vite plugin for React development.
- `eslint` (version ^8.38.0): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- `eslint-plugin-react` (version ^7.32.2): An ESLint plugin for React-specific linting rules.
- `eslint-plugin-react-hooks` (version ^4.6.0): An ESLint plugin for enforcing rules of Hooks in React applications.
- `eslint-plugin-react-refresh` (version ^0.3.4): An ESLint plugin for react-refresh.
- `vite` (version ^4.4.2): A frontend tooling platform that provides faster and leaner development for modern web projects.

## API

- [Open Trivia Database API](https://opentdb.com/)

## Usage

1. When you first load the application, you will see the start page with the title "Quizzical" and a prompt asking if you are ready to test your brain.
   Click the "Start quiz" button to begin the quiz.
2. The application will fetch a set of trivia questions from the API and display them one by one on the quiz page.
3. For each question, choose the answer you think is correct by clicking on the corresponding button.
4. Once you have answered all the questions, click the "Check answers" button to see your score.
5. The answer page will display the questions again with the correct answers highlighted and your score out of 5.
6. To play again, click the "Play again" button.

## Skills Learned

- Event handling in React
- Conditional rendering in React
- Fetching data from an API
- Handling state and side effects in React

## Future Improvements

- ~~Allow the user to choose the number of questions they want to answer~~
- ~~Allow the user to choose the difficulty of the questions~~
- ~~Allow the user to choose the category of the questions~~
- ~~Allow the user to choose the category of the questions~~
- ~~Add a back button to the quiz page to allow the user to go back to the start page~~
- ~~Avoid shuffling the answers of true/false questions~~
