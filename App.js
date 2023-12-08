import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
   <>
   <StackNavigator/>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



/* onst transporter = nodemailer.createTestAccount({
  service: "gmail",
  auth: {
    user: "manasseh919@gmail.com",
    pass: "pymscgdvrragzlyr",
  },
}); */