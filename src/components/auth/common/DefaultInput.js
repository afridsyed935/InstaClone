import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const DefaultInput = ({
    placeholder,
    onChange,
    secureTextEntry = false,
    jsxContent = null
}) => {
  return (
    <View style={styles.box}>
      <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChange} secureTextEntry={secureTextEntry}/>
      {
          jsxContent &&
          <View>{jsxContent}</View>
      }
    </View>
  );
};

export default DefaultInput;

const styles = StyleSheet.create({
    input: {
        paddingVertical: 15,
        paddingHorizontal: 8,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        outlineStyle: 'none' 
    },
    box: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderColor: '#99acc2',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 50,
        position: 'relative',
        marginVertical: 2
    }
});
