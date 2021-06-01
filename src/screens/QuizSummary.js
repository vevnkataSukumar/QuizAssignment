import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import {ScreenHeight} from '../utils';
import { PieChart } from 'react-native-svg-charts';
import { CommonActions } from '@react-navigation/native';
import QButton from '../components/QButton';

const QuizSummary = ({route, navigation}) => {
    const {data} = route.params;
    const answers = data?.answers;
    const correctAnswers = answers ? answers.filter(e => e === 1) : 0;
    const wrongAnswers = answers ? answers.filter(e => e === 0) : 0;
    const unansweredAnswers = answers ? answers.filter(e => e === -1) : 0;
    const score = correctAnswers ? (correctAnswers.length) * 2 : 0;
 
    const pieData = [
        {
            value: correctAnswers.length,
            svg: {
                fill: "green",
                onPress:() => {console.log("Pressed 1")}
            }
        },
        {
            value: wrongAnswers.length,
            svg: {
                fill: "red",
                onPress:() => {console.log("Pressed 0")}
            }
        },
        {
            value: unansweredAnswers.length,
            svg: {
                fill: "orange",
                onPress:() => {console.log("Pressed -1")}
            }
        },
    ];

    const  getColor = (val) => {
        switch (val) {
            case -1:
                return "orange";
            case 0:
                return "red";
            case 1:
                return "green";
            default:
                return "green";
        }
    }
    
    return(
        <View style={styles.container}>
            <ScrollView style={{alignSelf: 'stretch'}} bounces={false}>
                <View style={[styles.scoreCard, {paddingVertical: 5}]}>
                    <Text>Scorecard</Text>
                    <Text style={styles.score}>{score}</Text>
                    <Text>Max points can be scored is 20.</Text>
                </View>
                <Text style={styles.summaryTitle}>Summary of your report</Text>
                <View style={[styles.scoreCard, {flexDirection: 'row'}]}>
                    <View style={styles.section}>
                        <PieChart style={{ height: 100, width: 100 }} data={pieData} />
                    </View>
                    <View style={styles.section}>
                        <View style={styles.cubeContainer}>
                            <View style={styles.cube}></View>
                            <Text>Answered</Text>
                        </View>
                        <View style={styles.cubeContainer}>
                            <View style={[styles.cube, {backgroundColor: 'orange'}]}></View>
                            <Text>un-answered</Text>
                        </View>
                        <View style={styles.cubeContainer}>
                            <View style={[styles.cube, {backgroundColor: 'red'}]}></View>
                            <Text>Wrong answered</Text>
                        </View>
                    </View>
                </View>
                <FlatList 
                    data={data?.questionsData}
                    style={{height: ScreenHeight/3.6, marginTop: 15}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <View style={styles.questionTab}>
                            <View style={{flex:10, alignSelf: 'stretch'}}>
                                <Text style={styles.questionText}>{item.question}</Text>
                                <Text style={styles.answerText}>{item.options[item.answer-1]}</Text>
                            </View>
                            <View style={{flex:2, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={[styles.statusCircle, {backgroundColor: getColor(answers[index])}]}></View>
                            </View>
                        </View>
                    )} 
                />

                <QButton
                    title={'Go to Home'} 
                    onPress={() => navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'Home' }
                            ],
                        })
                    )}
                    buttonStyle={{backgroundColor: 'blue', alignSelf: 'center'}}
                />
            </ScrollView>
        </View>
    )
}

export default QuizSummary;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    scoreCard: {
        alignSelf: 'stretch',
        position: 'relative',
        height: ScreenHeight/4.8,
        borderRadius: 6,
        borderWidth: 0.8,
        borderColor: 'lightgrey',
        backgroundColor: '#ffffff',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    score: {
        fontSize: 40,
        fontWeight: '500',
        letterSpacing: 0.2,
        alignSelf: 'center',
        color: '#6646ee'
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    cubeContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cube: {
        height: 20,
        width: 20,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: 'green'
    },
    summaryTitle: {
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'grey'
    },
    questionTab: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderWidth: 0.8,
        borderColor: 'lightgrey',
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        alignItems: 'center'
    },
    questionText: {
        fontSize: 14,
        marginBottom: 8
    },
    answerText: {

    },
    statusCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        alignSelf: 'center'
    },
});