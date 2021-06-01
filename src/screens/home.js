import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QButton from '../components/QButton';
import {TigersData, DinosaursData, GiraffesData, LionsData} from '../utils';
import {LionsQuestionsData} from '../utils'

const Home = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Select a topic!</Text>
            <View style={styles.topicsContainer}>
                <View style={styles.topicsSubContainer}>
                    <QButton
                        title={TigersData.topic} 
                        onPress={() => navigation.navigate('TopicDescription', {data: TigersData})}
                        buttonStyle={{backgroundColor: 'blue'}}
                    />
                    <QButton
                        title={DinosaursData.topic} 
                        onPress={() => navigation.navigate('TopicDescription', {data: DinosaursData})}
                        buttonStyle={{backgroundColor: 'orange'}}
                    />
                </View>
                <View style={styles.topicsSubContainer}>
                    <QButton
                        title={GiraffesData.topic} 
                        onPress={() => navigation.navigate('TopicDescription', {data: GiraffesData})}
                        buttonStyle={{backgroundColor: 'green'}}
                    />
                    <QButton
                        title={LionsData.topic} 
                        onPress={() => navigation.navigate('TopicDescription', {data: LionsData})}
                        buttonStyle={{backgroundColor: 'grey'}}
                    />
                </View>
            </View>
            {/* <Text 
                onPress={() => navigation.navigate('QuizSummary',{data: {
                    id: 4, 
                    questionsData: LionsQuestionsData,
                    answers: [0,1,1,1,0,1,1,1,-1,0]
                }})}
            >Quiz Summary</Text> */}
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    title: {
        fontSize: 35,
        letterSpacing: 0.2,
        marginVertical: 70
    },
    topicsContainer: {
        alignSelf: 'stretch',
        marginTop: 30
    },
    topicsSubContainer:{ 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});