import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ClearHistory, history, ReadFile } from "@/history/history";

export default function Modal() {
    const [cache, setCache] = useState(history);
    const Clear = async () => {
        await ClearHistory();
        setCache([]);
    }
    return(
        <ScrollView style={{ flex: 1, backgroundColor: "black", padding: 10 }}>
            <Pressable onPress={Clear}><Text style={{color: "white"}}>Clear History</Text></Pressable>
            {cache.map((i) => (
                <Text key={i.key} style={{color: "white"}}>{i.input1} {i.operator} {i.input2} = {i.answer}</Text>
            ))}
        </ScrollView>
    );
}