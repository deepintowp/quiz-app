import  React, {useState }from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions } from './api';
//TYPES
import { Difficulty, QuestionState } from './api';
import { GlobalStyle } from './App.styles';
export type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string
}
const TOTAL_QUESTIONS:number = 10
function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  
  const startTrivia = async () =>{
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer
      if(correct) setScore(prev=> prev + 1)
      //save answers
      const answerObject = {
        question: questions[number].question,
        answer:answer,
        correct:correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [ ...prev, answerObject]);
    }
    console.log(userAnswers);
  }
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  }
  console.log(userAnswers);
  return (
    <>
    <GlobalStyle/>
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
      (<button onClick={startTrivia} className="start">
        Start
      </button>) : ""
      }
      {!gameOver && <p className="className">Score:{score}</p>}
      {loading && <p className="loading">Loading...</p> }
      {!gameOver && !loading &&  
       (<QuestionCard
      QuestionNumber={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}


      />)  }
      {!gameOver && 
      !loading && 
      userAnswers.length === number + 1 
      && number !== TOTAL_QUESTIONS - 1  
      && <button onClick={nextQuestion} className="next">Next Question</button>}
    </div>
    </>
  );
}

export default App;
