import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const sendEmail = async (emailData: { recipient: any; subject: any; body: any; }) => {
  try {
    
    const response = await fetch("http://192.168.43.252:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    console.log("Email API Response:", result.message);
    if (response.ok) {

      const sentEmails = await AsyncStorage.getItem("sentEmails");
      const sentEmailsArray = sentEmails ? JSON.parse(sentEmails) : [];

      const newSentEmail = {
        ...emailData,
        status: "Sent",
        sentAt: new Date().toISOString(),
      };

         sentEmailsArray.push(newSentEmail);
      await AsyncStorage.setItem("sentEmails", JSON.stringify(sentEmailsArray));


            Alert.alert("Success", result.message);
            console.log("✅ Email API Response:", result.message);
          } else {
            Alert.alert("Error", "Failed to send email.");
            console.error("❌ API Error:", result);
          }
  } catch (error) {
    console.error("Failed to send email:", error);
        Alert.alert("Error", "Network request failed.");

  }
};



//     if (response.ok) {
//       Alert.alert("Success", result.message);
//       console.log("✅ Email API Response:", result.message);
//     } else {
//       Alert.alert("Error", "Failed to send email.");
//       console.error("❌ API Error:", result);
//     }
//   } catch (error) {
//     Alert.alert("Error", "Network request failed.");
//     console.error("❌ Network Error:", error);
//   }
// };
