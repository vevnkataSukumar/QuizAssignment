import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {ScreenHeight, ScreenWidth} from '../utils';

const Quiz = ({route, navigation}) => {
    const {data} = route.params;
    const QuizData = data?.questionsData;
    const answersData = getAnswers(QuizData);
    const [questionData, setQuestionData] = useState({});
    const [answersArray, addAnswers] = useState([]);
    const [timerEnabled, setTimerEnabled] = useState(true);
    const [counter, setCounter] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [initText, setInitText] = useState('Quiz starts in');
    let intervalId;

    function getAnswers(data){
        let Arr=[];
        data.map((e,i) => Arr.push(e.answer));
        return Arr;
    }

    useEffect(() => {
        if (timerEnabled) {
          intervalId = setInterval(() => {
            setOpeningData(3);
            setCounter(counter => counter + 1);
          }, 1000)
        }
    
        return () => clearInterval(intervalId);
    }, [timerEnabled, counter])

    const setOpeningData = (val) => {
        if(counter < val) {
            if (counter === val) setCounter(-1);
        } else {
            // if (counter === val) setCounter(-1);
            setTimerEnabled(false);
            setCounter(0);
            handleQuestionData();
        }
    }

    const handleQuestionData = () => {
        console.log('handleQuestionData', answersArray);
        if(questionNumber < QuizData.length) {
            setQuestionData(QuizData[questionNumber]);
            setQuestionNumber((prevState) => (prevState + 1));
        } else {
            setTimeout(() => {
                setInitText('Completing summary in');
                setTimerEnabled(true);
                setTimeout(() => {
                    setTimerEnabled(false);
                    clearInterval(intervalId);
                    moveOut();
                    setTimerEnabled(false);
                    setQuestionNumber(0);
                    addAnswers([]);
                }, 3500);
            }, 500);
        }  
    }

    const moveOut = () => {
        navigation.navigate('QuizSummary', {data: {
            answers: answersArray,
            questionsData: QuizData,
            total: answersArray.length,
        }});
    }

    const displayAlertDialog = (val) => {
        const message = (val ===1 ) ? 'Correct Answer' : (val === 0) ?  'Wrong answer' : 'Not answered';
        Alert.alert(
            '',
            message,
            [{text: 'Ok', onPress: () => handleQuestionData()}],
            {cancelable: false},
        );
    };

    const handleOptionClick = (ans) => {
        const ansIndex = questionData.options.indexOf(ans.toString())+1;

        console.log(answersArray.length);
        if(Number(questionData.answer) === ansIndex) {
            let answers = answersArray.slice();
            answers.push(1);
            addAnswers(answers);
            displayAlertDialog(1);
        } else if(Number(questionData.answer) != ansIndex){
            let answers = answersArray.slice();
            answers.push(0);
            addAnswers(answers);
            displayAlertDialog(0);
        } else {
            let answers = answersArray.slice();
            answers.push(-1);
            addAnswers(answers);
            displayAlertDialog(-1);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.pageTitle} onPress={() => navigation.goBack()}>Oh my Quiz</Text>
            {
                (timerEnabled) &&
                <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{color: '#fff', fontSize: 18, letterSpacing: 0.1, fontWeight: '500'}}>{initText}</Text>
                    <Text style={styles.timerVal}>{counter}</Text>
                </View>
            }
            {
                (!timerEnabled && questionData) &&
                <View>
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>{questionData.question}</Text>
                        <View style={styles.optionsContainer}>
                            {
                                questionData?.options?.map((ques,index) => {
                                    return (
                                        <TouchableOpacity style={styles.ansTab} activeOpacity={1} key={index} onPress={() => handleOptionClick(ques)}>
                                            <Text>{ques}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            }
            
        </View>
    )
}

export default Quiz;

const styles = StyleSheet.create({         
    container: {
        flex: 1, 
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6646ee'
    },
    pageTitle: {
        color: '#fff',
        fontSize: 20,
        marginVertical: 20,
        letterSpacing: 0.2
    },
    timerVal: {
        marginVertical: 20,
        fontSize: 80,
        fontWeight: 'bold',
        color: '#fff',
    },
    questionContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        marginVertical: 20,
        fontSize: 16,
        color: '#fff',
        letterSpacing: 0.1,
        fontWeight: '500'
    },
    optionsContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
    ansTab: {
        width: ScreenWidth/3,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: '#000',
        backgroundColor: '#fff'
    }
});