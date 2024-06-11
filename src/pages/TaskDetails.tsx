import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function TaskDetails({ route, navigation }) {
    const { task, index, setTasks, tasks } = route.params;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [color, setColor] = useState(task.color || 'red');
    const [isEditing, setIsEditing] = useState(false);

    const saveTask = () => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, title, description, color } : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        navigation.goBack();
        Keyboard.dismiss();
    };

    const deleteTask = () => {
        setTasks(tasks.filter((_, i) => i !== index));
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            behavior="padding"
            style={{ flex: 1 }}
            enabled={Platform.OS === 'ios'}>
            <View style={styles.container}>
                {isEditing ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Edit Task Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Edit Task Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <View style={styles.colorPicker}>
                            <Button 
                                mode="contained" 
                                style={[styles.colorButton, { backgroundColor: 'green' }]} 
                                onPress={() => setColor('green')}
                            />
                            <Button 
                                mode="contained" 
                                style={[styles.colorButton, { backgroundColor: 'orange' }]} 
                                onPress={() => setColor('orange')}
                            />
                            <Button 
                                mode="contained" 
                                style={[styles.colorButton, { backgroundColor: 'red' }]} 
                                onPress={() => setColor('red')}
                            />
                        </View>
                        <Button mode="contained" onPress={saveTask} style={styles.button}>
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>{task.title}</Text>
                        <Text style={styles.description}>{task.description}</Text>
                        <Button mode="contained" onPress={() => setIsEditing(true)} style={styles.button}>
                            Edit
                        </Button>
                    </>
                )}
                <Button mode="contained" color="red" onPress={deleteTask} style={styles.button}>
                    Delete
                </Button>
                <Button onPress={() => navigation.goBack()} style={styles.button}>Back</Button>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
    colorPicker: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});
