# QuickMail - React Native Email Client

A simple email client built with React Native using **AsyncStorage** for drafts and **Mockoon API** for email sending.

## 📌 Features

✅ View, create, and edit email drafts  
✅ Save drafts using AsyncStorage  
✅ Send emails via Mockoon API  
✅ View sent emails  
✅ Modern UI using React Native Paper

## 🛑 uses of Mockoon

**Run Mockoon API:**
**Open Mockoon**
**Import the provided mockoon-config.json**
**Start the server on http://localhost:3000**

## 🔧 Tech Stack

- **React Native (TypeScript)**
- **Redux Toolkit** (for state management)
- **React Native Paper** (UI components)
- **AsyncStorage** (local storage)
- **Mockoon API** (email sending simulation)

## 🛑 Challenges Faced & How I Overcame Them

**1️⃣ Managing Drafts Efficiently**

**Challenge: Storing and retrieving drafts correctly using AsyncStorage while keeping the UI updated.**
**Solution: Used useEffect and Redux Toolkit to manage state updates and ensure drafts load instantly.**

## 2️⃣ Mockoon API Setup & Integration

**Challenge: Ensuring Mockoon API works like a real email service, handling API responses correctly.**
**Solution: Configured a POST /send-email route in Mockoon and used proper error handling to simulate a real API.**

## 4️⃣ Navigation & UI Consistency

**Challenge: Keeping navigation smooth between screens (Home, Email Editor, Sent Emails).**
**Solution: Used React Navigation and ensured a consistent UI with React Native Paper.**

## 5️⃣ Error Handling & Edge Cases

**Challenge: Handling missing recipient fields, failed API calls, and UI feedback.**
**Solution: Implemented proper validations, error messages, and a React Native Paper Dialog instead of alerts.**

## 🚀 Installation & Setup

1️⃣ Clone the repo:

```sh
git clone https://github.com/Yash777Salave/QuickMail.git
cd QuickMail
```
