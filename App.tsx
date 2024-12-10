import "react-native-gesture-handler";
import "./global.css";
import ApplicationStack from "./src/navigators/ApplicationStack";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationStack />
      </PersistGate>
      <Toast />
    </Provider>
  );
}
