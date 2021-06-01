import React from 'react';
import Routes from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
// Screen -1
/**
 * 1. Containing Title "Select Option".
 * 2. Options "Tiger" "Dinosaurrs" "Giraffes" "Lions"
 * 3. On click on option navigate to respective option page 
 */

// Screen - 2
/**
 * 1. Topic Details page containing
 * 2. Video to play
 * 3. Option Title
 * 4. Description
 * 5. Add notes button
 * 6. On Button click stop the video take notes and display video time as Prefix
 * 7. Display notes in  list manner
 */

// Screen -3
/**
 * 1. Once the video completed Open Quiz page
 * 2. Page should contain 10 Questions
 * 3. Each page containing one question with 4 options and are selectable with timer ofr 5 Sec
 * 4. Once the timer reaches 30 Secs Question should change and save the Answers for the questions
 * 5. Each question once the option selected should show weather it is correct or wrong
 * 6. Once the all questions completed SHould show the results
 */