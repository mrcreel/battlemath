import React, { useReducer, useCallback, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Picker
} from 'react-native'
import { reducer, initialState, types } from './AppReducer'

import './App.css'

function App() {
  const [
    { answer, numOfEnemies, val1, val2, won, operator, mode },
    dispatch
  ] = useReducer(reducer, initialState)

  let submitInputRef = useRef()

  // useCallback helps prevent re-rendering via memoization
  const handleAnswerChange = useCallback(
    value => {
      dispatch({ type: types.SET_ANSWER, payload: value })
    },
    [dispatch]
  )

  const handleModePicker = useCallback(
    mode => {
      dispatch({
        type: types.SET_MODE,
        payload: mode
      })
    },
    [dispatch]
  )

  const handleRestart = useCallback(() => {
    dispatch({ type: types.RESTART })
  }, [dispatch])

  const handleSubmit = useCallback(() => {
    dispatch({ type: types.CHECK_ANSWER })
    if (submitInputRef.current) submitInputRef.current.focus()
  }, [dispatch])

  const activeTheme = themes[mode]

  // Equivalent of componentDidMount
  useEffect(() => {
    dispatch({ type: types.NEW_PROBLEM })
    if (submitInputRef.current) submitInputRef.current.focus()
  }, [])

  return (
    <View
      style={[styles.root, { backgroundColor: activeTheme.backgroundColor }]}
    >
      <Text style={styles.title}>Battle Math</Text>
      <Picker
        selectedValue={mode}
        style={styles.picker}
        onValueChange={handleModePicker}
      >
        <Picker.Item label="Addition(+)" value="addition" />
        <Picker.Item label="Subtraction(-)" value="subtraction" />
        <Picker.Item label="Multiplication(*)" value="multiplication" />
        <Picker.Item label="Division(/)" value="division" />
      </Picker>
      <View style={styles.battlefield}>
        <View style={styles.container}>
          <View nativeID="hero" style={[styles.character, styles.hero]} />
        </View>
        <View style={styles.container}>
          {[...Array(numOfEnemies)].map((_, i) => (
            <View
              className="enemy"
              key={i}
              style={[styles.character, styles.enemy]}
            />
          ))}
        </View>
      </View>
      {won ? (
        <View>
          <Text>Victory!</Text>
          <Button
            onPress={handleRestart}
            title="Restart"
            color="#0080ff"
            accessibilityLabel="Click this button to play again."
          />
        </View>
      ) : (
        <View style={styles.mathContainer}>
          <View style={styles.mathRow}>
            <Text nativeID="val1" style={styles.mathText}>
              {val1}
            </Text>
            <Text nativeID="operator" style={styles.mathText}>
              {operator}
            </Text>
            <Text nativeID="val2" style={styles.mathText}>
              {val2}
            </Text>
            <Text style={styles.mathText}>=</Text>
            <TextInput
              nativeID="answer-input"
              style={styles.input}
              onChangeText={handleAnswerChange}
              onSubmitEditing={handleSubmit}
              value={answer}
              ref={submitInputRef}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            testID="submit"
            title="Submit"
            onPress={handleSubmit}
            accessibilityLabel="Learn more about this purple button"
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16
  },
  title: {
    fontSize: 32,
    fontFamily: `"Comic Sans MS", cursive, sans-serif`
  },
  picker: { height: 60, width: 150 },
  battlefield: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  character: {
    width: 40,
    height: 40
  },
  hero: {
    backgroundColor: 'blue'
  },
  enemy: {
    backgroundColor: 'red'
  },
  mathContainer: {
    paddingVertical: 16
  },
  mathRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16
  },
  mathText: {
    fontSize: 40
  },
  input: {
    height: 60,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 8
  },
  button: {
    height: 60,
    width: 200,
    backgroundColor: '#841584',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 40
  }
})

const themes = {
  addition: {
    backgroundColor: 'green'
  },
  subtraction: {
    backgroundColor: 'pink'
  },
  multiplication: {
    backgroundColor: 'yellow'
  },
  division: {
    backgroundColor: 'orange'
  }
}

export default App
