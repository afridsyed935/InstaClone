import React, { Component } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { validateSignUp } from '../components/auth/validation/signUpValidation';
import DefaultInput from '../components/auth/common/DefaultInput';

class Register extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          signupFname: "",
          signupLname: "",
          signupEmail: "",
          signupPassword: "",
          signupConfirmPassword: "",
          errors: {},
          checkbox: false,
          hasSubmitted: false,
          captcha: false,
          signupLoading: false,
        };
      }

    handleSignup = () => {
        const { errors, isValid } = validateSignUp(this.state);
        if(isValid) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.state.signupEmail, this.state.signupPassword)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
        } else {
            this.setState({errors: errors})
        }
    }

    render() {
        const { signupLoading, signupPassword } = this.state;
        let errors = this.state.errors;
    
        return (
            <View>
                <DefaultInput placeholder='First Name' onChange={(e) => this.setState({signupFname: e})}/>
                {
                    errors.signupFname && <View><Text style={styles.errorMsg}>{errors.signupFname}</Text></View>
                }
                <DefaultInput placeholder='Last Name' onChange={(e) => this.setState({signupLname: e})}/>
                {
                    errors.signupLname && <View><Text style={styles.errorMsg}>{errors.signupLname}</Text></View>
                }
                <DefaultInput placeholder='Email' onChange={(e) => this.setState({signupEmail: e})}/>
                {
                    errors.signupEmail && <View><Text style={styles.errorMsg}>{errors.signupEmail}</Text></View>
                }
                <DefaultInput placeholder='Password' secureTextEntry onChange={(e) => this.setState({signupPassword: e})}/>
                {
                    errors.signupPassword && <View><Text style={styles.errorMsg}>{errors.signupPassword}</Text></View>
                }
                <DefaultInput placeholder='Confirm Password' secureTextEntry onChange={(e) => this.setState({signupConfirmPassword: e})}/>
                {
                    errors.signupConfirmPassword && <View><Text style={styles.errorMsg}>{errors.signupConfirmPassword}</Text></View>
                }
                <Button title='Sign Up' onPress={this.handleSignup}/>
            </View>
        )
    }
}

export default Register

const styles = StyleSheet.create({
    errorMsg: {
        paddingVertical: 2,
        paddingHorizontal: 2,
        color: 'red'
    }
});