import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Appbar, FAB, List, Dialog, Portal, Button, Text, IconButton } from 'react-native-paper';

export default function HomePage({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [visible, setVisible] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const addTask = () => {
        const newTask = { title: 'New Task', description: '', color: 'red' };
        setTasks([...tasks, newTask]);
    };

    const startShake = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shakeAnimation, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const stopShake = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shakeAnimation, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                })
            ])
        ).stop();
    };

    const confirmDelete = (index) => {
        setDeleteIndex(index);
        setVisible(true);
    };

    const handleDelete = () => {
        if (deleteIndex !== null) {
            const updatedTasks = tasks.filter((_, i) => i !== deleteIndex);
            setTasks(updatedTasks);
            setDeleteIndex(null);
        }
        setVisible(false);
        stopShake();
    };

    const hideDialog = () => {
        setVisible(false);
        stopShake();
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Tarefas" />
                <FAB
                    small
                    icon="plus"
                    onPress={addTask}
                    style={styles.fab}
                />
            </Appbar.Header>
            <View style={styles.body}>
                {tasks.map((task, index) => (
                    <TouchableOpacity
                        key={index}
                        onLongPress={() => {
                            startShake();
                            confirmDelete(index);
                        }}
                        onPress={() => navigation.navigate('TaskDetails', {
                            task,
                            index,
                            setTasks,
                            tasks
                        })}
                    >
                        <Animated.View style={[
                            styles.taskCard,
                            { backgroundColor: task.color },
                            { transform: [{ translateX: shakeAnimation }] }
                        ]}>
                            <List.Item
                                title={task.title}
                                description={task.description}
                                right={() => (
                                    <IconButton
                                        icon="delete"
                                        color="red"
                                        onPress={() => confirmDelete(index)}
                                    />
                                )}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                ))}
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirm Delete</Dialog.Title>
                    <Dialog.Content>
                        <Text>Você deseja deletar este Card?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={handleDelete}>Delete</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
    },
    body: {
        flex: 1,
        padding: 20,
    },
    taskCard: {
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
    },
});
