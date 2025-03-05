import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addDraft, updateDraft } from "../store/draftsSlice";
// import DocumentPicker from "react-native-document-picker";
import { sendEmail } from "../utils/emailService";

const EmailEditorScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const draft = route.params?.draft || {};
  const [recipient, setRecipient] = useState(draft.recipient || "");
  const [subject, setSubject] = useState(draft.subject || "");
  const [body, setBody] = useState(draft.body || "");
  const [attachment, setAttachment] = useState(null);

  const handleSaveDraft = () => {
    const emailDraft = { id: draft.id || Date.now().toString(), recipient, subject, body, status: "Draft" };
    draft.id ? dispatch(updateDraft(emailDraft)) : dispatch(addDraft(emailDraft));
    navigation.goBack();
  };

  const handleSendEmail = async () => {
    await sendEmail({ recipient, subject, body });
    dispatch(updateDraft({ ...draft, status: "Sent" }));
    navigation.goBack();
  };

//   const pickDocument = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.allFiles] });
//       setAttachment(res);
//     } catch (err) {
//       console.error("Document Picker Error:", err);
//     }
//   };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.InputContainer}>
        {/* <Text>Recipient</Text> */}
      <TextInput placeholder="Recipient" value={recipient} onChangeText={setRecipient} style={styles.inputBar} />
      <TextInput placeholder="Subject" value={subject} onChangeText={setSubject} style={styles.inputBar}/>
      <TextInput placeholder="Compose email" value={body} onChangeText={setBody} multiline style={[styles.inputBar,{height:120,textAlignVertical:"top"}]}/>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonContainer,{backgroundColor:"#2e86c1"}]} onPress={handleSaveDraft}>
        <Text style={styles.buttonText}>Save Draft</Text>
      </TouchableOpacity>

      </View>
     
      {/* <Button title="Pick Attachment" onPress={pickDocument} /> */}
     
      
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:"#ffff"
  },
  InputContainer:{
    // backgroundColor:'red'
    margin:10,
    // flexDirection:'row',
    padding:10,
  },
  inputBar:{
    borderWidth:0.3,
    borderRadius:10,
    margin:5,
    paddingHorizontal:10
  },
  buttonContainer:{
    margin:10,
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    borderRadius:10,
    backgroundColor:'#2ecc71',
    elevation:8

  },
  buttonText:{
    fontSize:15,
  }

})
export default EmailEditorScreen;
