import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {ScreenHeight, ScreenWidth} from '../utils';
import MatiIcon from 'react-native-vector-icons/MaterialIcons';
import {TigersQuestionsData, DinosaursQuestionsData, GiraffesQuestionsData, LionsQuestionsData} from '../utils';

const TopicDescription = ({route,navigation}) => {
    const { data } = route.params;
    const [paused, setVideoPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0.0);
    const [showAddNotes, setShowAddNotes] = useState(false);
    const [notes, addNotes] = useState([]);
    const [notesValue, setNotesValue] = useState('');

    const handleOverLay = () => {
        setShowAddNotes(!showAddNotes);
        setVideoPaused(true);
    }

    const onVideoProgress = (e) => {
        if(e?.currentTime) {
            setCurrentTime(e.currentTime/100);
        }
    }

    const clickSave = () => {
        console.log("current Time: ",currentTime);
        if(notesValue.length > 0) {
            const notesData = {
                title: currentTime.toFixed(2),
                value: notesValue,
            };
            notes.push(notesData);
            console.log("notes now: ", notes);
            addNotes(notes);
            setNotesValue('');
            setVideoPaused(false);
            setShowAddNotes(false);
        } else {
            setShowAddNotes(false);
        }
    }

    const onVideoEnd = () => {
        const routeData = getData();
        navigation.navigate('Quiz', {data: routeData})
    }

    const getData = () => {
        const id = data.id;
        switch (id) {
            case 1:
                return {
                    id: 1, 
                    questionsData: TigersQuestionsData
                };
            case 2:
                return {
                    id: 2, 
                    questionsData: DinosaursQuestionsData
                };
            case 3:
                return {
                    id: 3, 
                    questionsData: GiraffesQuestionsData
                };
            case 4:
                return {
                    id: 4, 
                    questionsData: LionsQuestionsData
                };
            default:
                return {};
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <VideoPlayer
                    source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
                    style={styles.video}
                    disableBack={true}
                    paused={paused}
                    resizeMode={ 'contain'}
                    onEnd={() => onVideoEnd()}
                    onProgress={(e) => onVideoProgress(e)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        alignSelf: 'stretch', 
                        height: ScreenHeight / 2.5,
                        width: ScreenWidth
                    }}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{data.topic}</Text>
                <Text style={styles.description}>{data.description}</Text>
                <View style={styles.ListContainer}>
                    <FlatList 
                        data={notes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <View style={styles.noteTextTab}>
                                <Text style={styles.timeText}>{item.title}</Text>
                                <Text style={styles.valueText}>{item.value}</Text>
                            </View>
                        )}  
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.notes} activeOpacity={1} onPress={() => handleOverLay()}>
                <MatiIcon name="note-add" size={25} color={'#ffffff'} />
            </TouchableOpacity>
            {
                showAddNotes && (
                    <TouchableOpacity style={styles.overlayContainer} onPress={() => handleOverLay()}>
                        <View style={styles.addNotesContainer}>
                            <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 5}} onPress={() => handleOverLay()}>
                                <MatiIcon name="close" size={30} color={'#000000'} />
                            </TouchableOpacity>
                            <TextInput 
                                placeholder="Add notes here"
                                style={styles.input}
                                name={'note'}
                                value={notesValue}
                                multiline={true}
                                blurOnSubmit={true}
                                onChangeText={(text) => setNotesValue(text)}
                            />
                            <TouchableOpacity  style={styles.button} activeOpacity={1} onPress={() => clickSave()}>
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default TopicDescription;

const styles = StyleSheet.create({         
    container: {
        flex: 1, 
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    videoContainer: {
        alignSelf: 'stretch',
        height: ScreenHeight / 2.5
    },
    contentContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: 15,
        height: ScreenHeight - (ScreenHeight / 2.5)
    },
    title: {
        fontSize: 18,
        letterSpacing: 0.2,
        marginVertical: 15,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0.1
    },
    notes: {
        position: 'absolute',
        bottom: 20, 
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6646ee',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        zIndex: 11,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    addNotesContainer: {
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 30
    },
    input: {
        paddingHorizontal: 10,
        height: ScreenHeight/6,
        borderRadius: 5,
        borderColor: 'blue',
        alignSelf: 'stretch',
        marginBottom: 10,
        backgroundColor: 'lightgrey'
    },
    button: {
        alignSelf: 'stretch',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#6646ee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: "#ffffff"
    }, 
    ListContainer: {
        marginTop: 10,
        alignSelf: 'stretch'
    },
    noteTextTab: {
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        marginBottom: 5
    },
    timeText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#0079bf',
        marginRight: 5
    }, 
    valueText: {
        fontSize: 16,
        letterSpacing: 0.1
    }
});