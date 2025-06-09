import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    Animated,
    ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isValid, format } from 'date-fns';
import { SwipeListView } from 'react-native-swipe-list-view';

import { RootStackParamList } from '../../Navigation/types';
import { getStyles, getComponentStyles } from './style'; //
import { useThemedStyles } from '../../hooks/useThemedStyles';
import DefaultHeader from '../../components/DefaultHeader';
import CategoryTag from '../../components/CategoryTag';
import SmallBackButton from '../../components/SmallBackButton';
import Input from '../../components/input';
import DateInput from '../../components/DateInput';
import { Task, Subtask } from '../../interfaces/task';
import ArrowConfirmIcon from '../../Assets/icons/arrowConfirm.png';
import CheckedIcon from '../../Assets/icons/CheckSquare-2.png';
import UncheckedIcon from '../../Assets/icons/CheckSquare-1.png';
import GoldPencilIcon from '../../Assets/icons/GoldPencil.png';
import XCircle from '../../Assets/icons/XCircle.png';
import TrashIcon from '../../Assets/icons/Trash.png';
import { getProfile } from '../../services/profileService';
import { updateTaskAPI, deleteTaskAPI } from '../../services/taskService';
import AnimatedCheck from '../../components/AnimatedCheck';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;


const SubtaskCreator = React.memo(({ onAddSubtask }: { onAddSubtask: (text: string) => void; }) => {
    const { control, handleSubmit, reset } = useForm({ defaultValues: { text: '' } });
    const styles = useThemedStyles(getStyles);
    const onSubmit = (data: { text: string }) => {
        onAddSubtask(data.text);
        reset({ text: '' });
    };

    return (
        <View style={styles.addSubtaskInputContainer}>
            <Controller
                control={control}
                name="text"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Escreva sua subtarefa..."
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        onSubmitEditing={handleSubmit(onSubmit)}
                        autoFocus
                    />
                )}
            />
            <TouchableOpacity style={styles.confirmButtonCircle} onPress={handleSubmit(onSubmit)}>
                <Image source={ArrowConfirmIcon} />
            </TouchableOpacity>
        </View>
    );
});

const SubtaskRow = React.memo(({
    item, onToggle, onEdit
} : {
    item: Subtask,
    onToggle: (id: string) => void,
    onEdit: (id: string, newText: string) => void,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const { control, handleSubmit } = useForm({ defaultValues: { editText: item.text } });
    const styles = useThemedStyles(getStyles);
    const componentStyles = useThemedStyles(getComponentStyles);
    const handleEditPress = () => setIsEditing(true);

    const onSubmitEdit = (data: { editText: string }) => {
        if (data.editText.trim()) {
            onEdit(item.id, data.editText.trim());
        }
        setIsEditing(false);
    };


    if (isEditing) {
        return (
            <View style={[styles.subtaskArea, {paddingVertical: 10}]}>
                <Controller
                    control={control}
                    name="editText"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            value={value}
                            onChangeText={onChange} 
                            onBlur={onBlur}
                            containerStyle={{flex: 1, marginBottom: 0}}
                            autoFocus
                            onSubmitEditing={handleSubmit(onSubmitEdit)}
                        />
                    )}
                />
                <TouchableOpacity style={styles.confirmEditButton} onPress={handleSubmit(onSubmitEdit)}>
                    <Image source={require('../../Assets/icons/arrowConfirm.png')} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[componentStyles.rowFront, styles.subtaskArea]}>
            <View style={styles.subtaskAreaText}>
                <AnimatedCheck isCompleted={item.isCompleted} onToggle={() => onToggle(item.id)} checkedImageSource={CheckedIcon} uncheckedImageSource={UncheckedIcon} />
                <Text style={[styles.subtaskText, item.isCompleted && styles.subtaskTextCompleted]}>{item.text}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={handleEditPress}>
                    <Image source={require('../../Assets/icons/Pencil.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const SubtasksSection = React.memo(({
    subtasks, onToggle, onEdit, onDelete, onAdd
} : {
    subtasks: Subtask[],
    onToggle: (id: string) => void,
    onEdit: (id: string, newText: string) => void,
    onDelete: (id: string) => void,
    onAdd: (text: string) => void,
}) => {
    const [showCreator, setShowCreator] = useState(false);
    const componentStyles = useThemedStyles(getComponentStyles);
    const styles = useThemedStyles(getStyles);

    const renderItem = useCallback(({ item }: { item: Subtask }) => (
        <SubtaskRow
            item={item}
            onToggle={onToggle}
            onEdit={onEdit}
        />
    ), [onToggle, onEdit]);

    const renderHiddenItem = useCallback(({ item }: { item: Subtask }) => (
        <View style={componentStyles.rowBack}>
            <TouchableOpacity style={[componentStyles.backRightBtn, componentStyles.backRightBtnRight]} onPress={() => onDelete(item.id)}>
                <Image source={TrashIcon} style={componentStyles.trashIcon} />
            </TouchableOpacity>
        </View>
    ), [onDelete, componentStyles]);

    const handleAddSubtaskInternal = (text: string) => {
        onAdd(text);
        setShowCreator(false);
    }


    return (
        <>
            <SwipeListView
                data={subtasks}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                keyExtractor={(item) => item.id}
                rightOpenValue={-75}
                disableRightSwipe
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
            />
            <View style={{marginTop: 32}}>
                {showCreator && <SubtaskCreator onAddSubtask={handleAddSubtaskInternal} />}
                <TouchableOpacity style={styles.addButton} onPress={() => setShowCreator(p => !p)}>
                    <Text style={styles.addButtonText}>ADICIONAR SUBTASK</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});

const mapPriorityToString = (priority?: number): 'ALTA' | 'MÉDIA' | 'BAIXA' | 'Sem prioridade' => {
    switch (priority) {
        case 2: return 'ALTA';
        case 1: return 'MÉDIA';
        case 0: return 'BAIXA';
        default: return 'Sem prioridade';
    }
};

const TaskDetailsScreen: React.FC = () => {
    const route = useRoute<TaskDetailsRouteProp>();
    const { task: initialTask } = route.params;
    const [task, setTask] = useState<Task>(initialTask);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(initialTask.title);
    const [editedDescription, setEditedDescription] = useState(initialTask.description ?? '');
    const [editedCategories, setEditedCategories] = useState<string[]>(initialTask.categories || []);
    const [editedPriority, setEditedPriority] = useState<number | undefined>(initialTask.priority);
    const [editedDeadline, setEditedDeadline] = useState<Date | null>(null);
    const [newTag, setNewTag] = useState('');
    const [tagError, setTagError] = useState('');
    const swipeableTaskRef = useRef<Swipeable>(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TaskDetails'>>();

    const styles = useThemedStyles(getStyles);
    const componentStyles = useThemedStyles(getComponentStyles);

    useEffect(() => {
        if (initialTask?.deadline) {
            let parsedDate;
            if (initialTask.deadline.includes('/')) {
                const parts = initialTask.deadline.split('/');
                parsedDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
            } else {
                parsedDate = new Date(initialTask.deadline);
            }
            if (isValid(parsedDate)) setEditedDeadline(parsedDate);
        }
        setTask(initialTask);
        setEditedTitle(initialTask.title);
        setEditedDescription(initialTask.description ?? '');
        setEditedCategories(initialTask.categories || []);
        setEditedPriority(initialTask.priority);
    }, [initialTask]);

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                const userData = await getProfile();
                setAvatar(userData.picture);
            } catch (error) { console.log('[TaskDetails] Erro ao carregar avatar:', error); }
        };
        loadAvatar();
    }, []);

    const handleUpdateTask = useCallback(
        async (updatedTaskData: Partial<Task>) => {
            const originalTask = { ...task };
            const mergedTask = { ...task, ...updatedTaskData };
            setTask(mergedTask);
            try {
                await updateTaskAPI(originalTask.id, mergedTask);
                if (updatedTaskData.isCompleted !== undefined) {
                    navigation.navigate('MainApp', {
                        screen: 'Home',
                        params: { scrollToTaskId: mergedTask.id },
                    });
                } else {
                    navigation.setParams({ task: mergedTask });
                }
            } catch (error: any) {
                console.error('Erro detalhado ao atualizar tarefa:', error?.response?.data || error);
                Alert.alert('Erro', 'Não foi possível salvar as alterações da tarefa.');
                setTask(originalTask); 
            }
        },
        [task, navigation]
    );

    const handleResolveTask = useCallback(() => handleUpdateTask({ isCompleted: true }), [handleUpdateTask]);
    const handleReopenTask = useCallback(() => handleUpdateTask({ isCompleted: false }), [handleUpdateTask]);

    const handleConfirmEdit = useCallback(() => {
        const deadlineToSave = editedDeadline instanceof Date && isValid(editedDeadline)
            ? format(editedDeadline, 'dd/MM/yyyy') 
            : null;
        handleUpdateTask({
            title: editedTitle,
            description: editedDescription,
            categories: editedCategories,
            priority: editedPriority,
            deadline: deadlineToSave as string,
        });
        setIsEditing(false);
    }, [editedTitle, editedDescription, editedCategories, editedPriority, editedDeadline, handleUpdateTask]);

    const handleDeleteTask = useCallback(() => {
        swipeableTaskRef.current?.close();
        Alert.alert('Excluir Tarefa', 'Tem certeza que deseja excluir esta tarefa?',
            [{ text: 'Cancelar', style: 'cancel' }, {
                text: 'Excluir', style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteTaskAPI(task.id);
                        navigation.navigate('MainApp', { screen: 'Home', params: { deletedTaskId: task.id } });
                    } catch (error) { Alert.alert('Erro', 'Não foi possível excluir a tarefa.'); }
                },
            }]
        );
    }, [task.id, navigation]);

    const handleAddSubtask = useCallback((text: string) => {
        const newSubtask: Subtask = { id: String(Date.now()), text, isCompleted: false };
        const updatedSubtasks = [...(task.subtasks || []), newSubtask];
        handleUpdateTask({ subtasks: updatedSubtasks });
    }, [task.subtasks, handleUpdateTask]);

    const handleToggleSubtask = useCallback((id: string) => {
        const updatedSubtasks = task.subtasks?.map(sub => sub.id === id ? { ...sub, isCompleted: !sub.isCompleted } : sub) || [];
        handleUpdateTask({ subtasks: updatedSubtasks });
    }, [task.subtasks, handleUpdateTask]);

    const handleDeleteSubtask = useCallback((id: string) => {
        const updatedSubtasks = task.subtasks?.filter(sub => sub.id !== id) || [];
        handleUpdateTask({ subtasks: updatedSubtasks });
    }, [task.subtasks, handleUpdateTask]);

    const handleEditSubtask = useCallback((id: string, newText: string) => {
        handleUpdateTask({
            subtasks: task.subtasks?.map(sub => sub.id === id ? { ...sub, text: newText } : sub)
        });
    }, [task.subtasks, handleUpdateTask]);

    const handleEditTask = useCallback(() => setIsEditing(true), []);

    const handleCancelEdit = useCallback(() => {
        setIsEditing(false);
        setEditedTitle(task.title);
        setEditedDescription(task.description ?? '');
        setEditedCategories(task.categories || []);
        setEditedPriority(task.priority);
        if (task.deadline) {
            const parts = task.deadline.split('/');
            setEditedDeadline(new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])));
        } else {
            setEditedDeadline(null);
        }
    }, [task]);

    const handleAddTag = useCallback((tag: string) => {
        const trimmed = tag.trim();
        if (trimmed.includes(' ')) {
            setTagError('Use apenas uma palavra para a tag.');
            return;
        }
        if (!trimmed || editedCategories.includes(trimmed)) {
            setTagError('Tag inválida ou já adicionada.');
            return;
        }
        setEditedCategories(prev => [...prev, trimmed]);
        setNewTag('');
        setTagError('');
    }, [editedCategories]);

    const handleRemoveTag = useCallback((tagToRemove: string) => {
        setEditedCategories(prev => prev.filter(tag => tag !== tagToRemove));
    }, []);

    const renderDeleteAction = useCallback((progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {

        const trans = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [0, 80],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity style={componentStyles.deleteBox} onPress={handleDeleteTask}>
                <Animated.View style={{ transform: [{ translateX: trans }] }}>
                    <Image source={TrashIcon} style={componentStyles.trashIcon} />
                </Animated.View>
            </TouchableOpacity>
        );
    }, [handleDeleteTask, componentStyles]);

    return (
        <GestureHandlerRootView style={styles.rootView}>
            <DefaultHeader leftComponent={<SmallBackButton />} avatarSource={avatar} style={styles.header}/>

            {isEditing ? (
                <>
                    <ScrollView
                        style={{flex: 1}}
                        contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled"
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={[styles.taskDetailsContainer, styles.containerEdit]}>
                            <View><Text style={styles.title}>Título</Text><Input value={editedTitle} onChangeText={setEditedTitle} containerStyle={styles.zeroedBottomInput} /></View>
                            <View><Text style={styles.title}>Descrição</Text><Input value={editedDescription} multiline={true} height={81} textAlignVertical="top" onChangeText={setEditedDescription} containerStyle={styles.descriptionInput} /></View>
                            <View>
                                <Text style={styles.title}>Tags</Text>
                                <View style={styles.tagsInputContainer}>
                                    <Input placeholder="Adicionar tag" value={newTag} onChangeText={(text) => { setNewTag(text); setTagError(''); }} onSubmitEditing={(event) => handleAddTag(event.nativeEvent.text)} containerStyle={tagError ? styles.tagsInputError : styles.tagsInput} error={tagError} />
                                    <TouchableOpacity style={styles.confirmButtonCircle} onPress={() => handleAddTag(newTag)}><Image source={ArrowConfirmIcon} /></TouchableOpacity>
                                </View>
                                <View style={styles.carousel}>{editedCategories.map((item, index) => (<View key={index.toString()} style={styles.tagItem}><Text style={styles.tagText}>{item}</Text><TouchableOpacity onPress={() => handleRemoveTag(item)}><Image source={XCircle} /></TouchableOpacity></View>))}</View>
                            </View>
                            <View>
                                <Text style={styles.title}>Prioridade</Text>
                                <View style={styles.priorityContainer}>
                                    <TouchableOpacity style={[styles.priorityButton, editedPriority === 2 && styles.priorityButtonActive]} onPress={() => setEditedPriority(2)}><Text style={[styles.priorityText, editedPriority === 2 && styles.priorityTextActive]}>Alta</Text></TouchableOpacity>
                                    <TouchableOpacity style={[styles.priorityButton, editedPriority === 1 && styles.priorityButtonActive]} onPress={() => setEditedPriority(1)}><Text style={[styles.priorityText, editedPriority === 1 && styles.priorityTextActive]}>Média</Text></TouchableOpacity>
                                    <TouchableOpacity style={[styles.priorityButton, editedPriority === 0 && styles.priorityButtonActive]} onPress={() => setEditedPriority(0)}><Text style={[styles.priorityText, editedPriority === 0 && styles.priorityTextActive]}>Baixa</Text></TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Prazo</Text>
                                <DateInput initialDate={editedDeadline} onDateChange={setEditedDeadline} containerStyle={styles.zeroedBottomInput} />
                            </View>
                        </View>
                        <View style={styles.editButtonsContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}><Text style={styles.cancelButtonText}>Cancelar</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmEdit}><Text style={styles.confirmButtonText}>Confirmar</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                </>
            ) : (
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <Swipeable
                        ref={swipeableTaskRef}
                        renderRightActions={renderDeleteAction}
                        friction={2}
                        enabled={!isEditing}
                    >
                        <View style={styles.taskDetailsContainer}>
                            <View style={styles.headerActions}>
                                <TouchableOpacity style={styles.editButton} onPress={handleEditTask} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                                    <Image source={GoldPencilIcon} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.title}>Título</Text><Text style={styles.titleTag}>
                                    {task.title}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.title}>
                                    Descrição
                                </Text>
                                <Text style={styles.description}>
                                    {task.description}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.title}>
                                    Tags
                                </Text>
                                <View style={styles.carousel}>
                                    {task.categories && task.categories.length > 0 ? (task.categories.map((tag, index) => (<CategoryTag key={index} item={tag} />))) : (<Text style={styles.noTag}>Nenhuma Tag Criada</Text>)}
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>
                                    Prioridade
                                </Text>
                                <Text style={styles.priority}>
                                    {mapPriorityToString(task.priority)}
                                </Text>
                            </View>
                            <TouchableOpacity style={task.isCompleted ? styles.reopenButton : styles.resolveButton} onPress={task.isCompleted ? handleReopenTask : handleResolveTask}>
                                <Text style={task.isCompleted ? styles.reopenButtonText : styles.resolveButtonText}>
                                    {task.isCompleted ? 'Reabrir Tarefa' : 'Resolver Tarefa'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Swipeable>
                    <SubtasksSection
                        subtasks={task.subtasks || []}
                        onToggle={handleToggleSubtask}
                        onEdit={handleEditSubtask}
                        onDelete={handleDeleteSubtask}
                        onAdd={handleAddSubtask}
                    />
                </ScrollView>
            )}

        </GestureHandlerRootView>
    );
};


export default TaskDetailsScreen;
