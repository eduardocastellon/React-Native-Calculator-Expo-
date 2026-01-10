import { ScrollView, Text, View } from "react-native";

export default function Modal() {
    return(
        <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
            <Text style={{ color: "white" }}>This is the Modal</Text>
        </ScrollView>
    );
}