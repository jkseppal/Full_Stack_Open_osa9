import React from "react";
import ReactDOM from "react-dom";
//import { parseJsonText } from "typescript";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "Fourth part";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Fourth part",
      exerciseCount: 77,
      description: "Additional part for testing"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

/*const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <React.Fragment>
    {parts.map(p => 
      <div key={p.name}>
        <p>
          {p.name} {p.exerciseCount}
        </p>
      </div>
    )}</React.Fragment>
  );*/

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <React.Fragment>
    {parts.map(p => {
      switch (p.name) {
        case "Fundamentals":
          return <p key={p.name}>{p.name}<br />Exercises: {p.exerciseCount}<br />Description: {p.description}</p>
        case "Using props to pass data":
          return <p key={p.name}>{p.name}<br />Exercises: {p.exerciseCount}<br />Group projects: {p.groupProjectCount}</p>
        case "Deeper type usage":
          return <p key={p.name}>{p.name}<br />Exercises: {p.exerciseCount}<br />Description: {p.description}<br />Submit exercises: {p.exerciseSubmissionLink}</p>
        case "Fourth part":
          return <p key={p.name}>{p.name}<br />Exercises: {p.exerciseCount}<br />Description: {p.description}</p>
        default:
          return assertNever(p);
      };
    })}
  </React.Fragment>
)

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <React.Fragment>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById("root"));
