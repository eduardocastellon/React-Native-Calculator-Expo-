import * as FileSystem from 'expo-file-system/legacy';

type History = {
    key: number;
    input1: number;
    operator: string;
    input2: number;
    answer: number;
};

export let history: History[] = [];

export const ReadFile = async () => {
    const fileUri = FileSystem.documentDirectory + 'history.json';
    const file: any = await FileSystem.getInfoAsync(fileUri);
    if (!file.exists) {
        history = [];
        console.log("file no exist")
        console.log(history);
        return history;
    }

    const content = await FileSystem.readAsStringAsync(fileUri, { encoding: 'utf8' });

    history = JSON.parse(content);
    // console.log("file si exist")
    // console.log(history);
};

export const WriteToFile = async (i1: number, operator: string, i2: number, ans: number) => {

    const cache = {
        key: history.length + 1,
        input1: i1,
        operator,
        input2: i2,
        answer: ans,
    };
    history.push(cache);
    // history = [];
    const fileUri = FileSystem.documentDirectory + 'history.json';
    await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(history, null, 2),
        { encoding: 'utf8' }
    );
    // console.log(history)
};

export const ClearHistory = async () => {
    //initialize history
    history = [];
    const fileUri = FileSystem.documentDirectory + 'history.json';
    await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(history, null, 2),
        { encoding: 'utf8' }
    );
}