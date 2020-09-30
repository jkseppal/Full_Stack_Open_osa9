import React from "react";
import ReactDOM from "react-dom";

interface Part {
  name: string;
  exerciseCount: number;
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Part[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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

const Content: React.FC<{ parts: Part[] }> = ({ parts }) => (
  <React.Fragment>
    {parts.map(p => 
      <div key={p.name}>
        <p>
          {p.name} {p.exerciseCount}
        </p>
      </div>
    )}</React.Fragment>
  );

  const Total: React.FC<{ parts: Part[] }> = ({ parts }) => (
    <React.Fragment>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </React.Fragment>
  )

ReactDOM.render(<App />, document.getElementById("root"));
