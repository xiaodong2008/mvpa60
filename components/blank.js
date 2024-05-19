import { View } from "react-native";

export default function Blank(props) {
  return (
    <View
      style={{
        height: props.height || 0,
        width: props.width || 0,
      }}
    ></View>
  );
}
