# **OpenFit: Your Open Source Workout Tracker**

OpenFit is a cross-platform workout tracker designed to help you organize, track, and achieve your fitness goals. Built using **React Native** and **Expo**, OpenFit runs seamlessly on **Android**, **iOS**, and **Web**, making your fitness journey accessible wherever you are. 

This is an open-source project. Contributions are welcome to enhance features, design, and functionality.

Donations are welcome (though not yet accepted) and will be used to fund the deployment of this app (expo charges for more monthly users, and web domains cost money).

---

## **Features**

- Create and organize custom workout routines.
- Track your progress over time.
- Cross-platform support (Android, iOS, and Web).
- User-friendly interface with dark and light theme options (planned).
- Easy customization and extension via community contributions.

---

## **Getting Started**

### **1. Prerequisites**
Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (16.x or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- A web browser, Android/IOS emulator, and or Expo Go installed on a mobile device.

### **2. Clone the Repository**
```bash
git clone https://github.com/iain-broomell/OpenFit
cd OpenFit
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Run the App**

#### **For Android/iOS**
Run the Expo development server and scan the QR code with the Expo Go app:
```bash
npx expo start
```

#### **For Web**
Launch the web version:
```bash
npx expo start --web
```
Then navigate to `localhost:8081`

**This app will be published on Google Play and the Apple App Store in the future.**
---

## **Contributing**

We welcome contributions of all kinds! Here's how you can get started:

### **1. Fork the Repository**
Click the "Fork" button at the top right of this page to create your own copy of the repository.

### **2. Create a Feature Branch**
Create a branch for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
```

### **3. Make Your Changes**
- Follow naming conventions
- Ensure all changes are well-documented and tested.

### **4. Commit and Push**
Commit your changes with a descriptive message:
```bash
git commit -m "Add: Your detailed commit message"
git push origin feature/your-feature-name
```

### **5. Open a Pull Request**
- Navigate to the original repository.
- Click "New Pull Request" and select your branch.

---

## **Project Structure**

```
OpenFit/
├── app/                   # Main application folder
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home tab
│   │   ├── routines.tsx   # Routine list tab
│   │   ├── profile.tsx    # User profile tab
│   └── components/        # Reusable components
│       ├── Routine.tsx    # Routine card component
│       ├── RoutineCreator.tsx # Modal to create routines
├── assets/                # Images, icons, etc.
├── README.md              # Project documentation
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## **Roadmap**

### **Planned Features**
- Dark mode.
- Analytics for workout progress.
- Cloud-based account syncing.
- Social features to share routines and lifts.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

If you have questions, suggestions, or want to collaborate:
- Open an issue in the [GitHub Issues](https://github.com/iain-broomell/OpenFit/issues) tab.
- Reach out via email at **iainbroomell@gmail.com**.

---
