import React from 'react'
import { AnswerObject } from '../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.Style';
type Props = {
    question:string,
    answers: string[],
    callback:(e:React.MouseEvent<HTMLButtonElement>) =>void,
    userAnswer:AnswerObject | undefined,
    QuestionNumber:number,
    totalQuestions:number
}
const QuestionCard:React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    QuestionNumber,
    totalQuestions
}) => {
  return (
    <Wrapper>
        <p className="number">
            Question: {QuestionNumber}/{totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html:question}} />
        <div>
            {
                answers.map((answer, index)=>(
                    <ButtonWrapper 
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                    key={index}>
                        <button value={answer} disabled={!!userAnswer} onClick={callback} >
                            <span dangerouslySetInnerHTML={{__html:answer}} />
                        </button>
                    </ButtonWrapper>
                ))
            }
        </div>
    </Wrapper>
  )
}

export default QuestionCard