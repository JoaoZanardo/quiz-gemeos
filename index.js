const answerArea = document.querySelector('.answer-area');
const title = document.querySelector('.title');
let phase = 0;
let getRight = [];

function questionList(question) {
    clear();
    title.innerHTML = question.title;
    for (const answer of question.answers) {
        const div = document.createElement('div');
        div.classList = 'answer--box';
        div.value = answer;
        div.innerHTML = answer;
        answerArea.appendChild(div);
    }
    changeQuestion();
}
questionList(questions[phase]);

function changeQuestion() {
    const answers = document.querySelectorAll('.answer--box');
    for (const i of answers) {
        i.addEventListener('click', () => {
            verify(i.value, questions[phase].correctAnwser);
            phase = phase + 1;
            if (questions.length <= phase) return getResult();
            questionList(questions[phase]);
        });
    }
}

function verify(answer, correctAnswer) {
    if (answer === correctAnswer) getRight.push(answer);
}

function getResult() {
    clear();

    const h1 = document.createElement('h1');
    
    const btt = document.createElement('button');
    btt.innerHTML = 'Try again';
    btt.classList = 'btt-result';
    btt.addEventListener('click', () => {
        phase = 0;
        getRight = [];
        questionList(questions[phase]);
    });

    const result = (getRight.length/questions.length) * 100;
    console.log(getRight);

    title.innerHTML = '';
    h1.innerHTML = `You got ${result} % right`;
    h1.classList = 'result';

    answerArea.appendChild(h1);
    answerArea.append(btt)
}

function clear() {
    answerArea.innerHTML = '';
}
