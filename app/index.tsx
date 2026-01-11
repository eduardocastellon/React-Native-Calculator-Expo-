import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ReadFile, WriteToFile } from "@/history/history";

//styles for buttons
const styles = StyleSheet.create({
  frame: {
    flex: 1,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: "black",
  },
  layer: {
    flexDirection: "row",
    // gap: 7,
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  operator: {
    backgroundColor: "#232323ff",
  },
  input: {
    backgroundColor: "#b1b1b1ff",
  },
  clear: {
    backgroundColor: "#000000ff",
  },
  inputField: {
    width: 240,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#858585ff",
  },
  text: {
    color: "white",
    fontSize: 25,
  }
});

export default function Index() {

  useEffect(() => {
    const getHistoryData = async () => {
      await ReadFile();
    }
    getHistoryData();
  }, []);

  //inputs
  const [input1, setInput1] = useState<any>(null);
  const [input2, setInput2] = useState<any>(null);
  const [answer, setAnswer] = useState<boolean>(false);

  const [operator, setOperator] = useState<any>(null);

  const [inputField, setInputField] = useState("");

  //on "clear"
  const handleClear = () => {
    setInputField("");
    setInput1(null);
    setInput2(null);
    setOperator(null);
    setAnswer(false);
  }
  //on "input"
  const handleInput = (x:any) => {
    if (x == "." && inputField.includes(".")){
      return;
    }
    setInputField(inputField + x);
    setAnswer(false);
  }
    
  const handleOperation = (x:any) => {
    if (operator === x){
      return;
    }
    let t = parseFloat(inputField);
    if (inputField !== ""){
      if (input1 === null){
        setInput1(t);
        setInputField("");
      } else {
        setInput2(t);
        setInputField("");
      }
    }
    setOperator(x);
  }

  const handleEquals = async () => {
    if (inputField !== ""){
      let x = parseFloat(inputField);
      setInput2(x);
      switch (operator){
        case "/":
          setInput1(input1 / x);
          await WriteToFile(input1, operator, x, input1 / x);
          break;
        case "x":
          setInput1(input1 * x);
          await WriteToFile(input1, operator, x, input1 * x);
          break;
        case "-":
          setInput1(input1 - x);
          await WriteToFile(input1, operator, x, input1 - x);
          break;
        case "+":
          setInput1(input1 + x);
          await WriteToFile(input1, operator, x, input1 + x);
          break;
        default:
          return;
      }
      // const t = parseFloat(input1.toFixed(5));
      // setInput1(t);
      setAnswer(true);
    }
  }

  const value: number | string = answer ? input1 : inputField || 0;
  return (
    <View style={styles.frame}>
      <View style={styles.layer}>
        <View style={[styles.inputField]}><Text style={styles.text}>{value}</Text></View>
        <Pressable style={[styles.button, styles.clear]} onPress={handleClear}><Text style={styles.text}>C</Text></Pressable>
      </View>
      <View style={styles.layer}>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("9")}><Text style={styles.text}>9</Text></Pressable>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("8")}><Text style={styles.text}>8</Text></Pressable>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("7")}><Text style={styles.text}>7</Text></Pressable>
        <Pressable style={[styles.button, styles.operator]} onPress={() => handleOperation("/")}><Text style={styles.text}>/</Text></Pressable>
      </View>
      <View style={styles.layer}>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("6")}><Text style={styles.text}>6</Text></Pressable>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("5")}><Text style={styles.text}>5</Text></Pressable>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("4")}><Text style={styles.text}>4</Text></Pressable>
        <Pressable style={[styles.button, styles.operator]} onPress={() => handleOperation("x")}><Text style={styles.text}>X</Text></Pressable>
      </View>
      <View style={styles.layer}>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("3")}><Text style={styles.text}>3</Text></Pressable>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("2")}><Text style={styles.text}>2</Text></Pressable>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("1")}><Text style={styles.text}>1</Text></Pressable>
        <Pressable style={[styles.button, styles.operator]} onPress={() => handleOperation("-")}><Text style={styles.text}>-</Text></Pressable>
      </View>
      <View style={styles.layer}>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("0")}><Text style={styles.text}>0</Text></Pressable>
        <Pressable style={[styles.button, styles.input]} onPress={() => handleInput("0")}><Text style={styles.text}>.</Text></Pressable>
        <Pressable style={[styles.button, styles.operator]} onPress={handleEquals}><Text style={styles.text}>=</Text></Pressable>
        <Pressable style={[styles.button, styles.operator]} onPress={() => handleOperation("+")}><Text style={styles.text}>+</Text></Pressable>
      </View>
      <Link href={{ pathname: "/modal" }}><Text style={{ color: "white", textDecorationLine: "underline" }}>View History</Text></Link>
      <Text style={{ color: "white" }}>gerdfgdfg</Text>
    </View>
  );
}
