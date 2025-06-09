import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { format } from 'date-fns';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask/Index';
import EmptyState from '../../components/EmptyState';
import TaskItem from '../../components/TaskItem';
import Filter from '../../components/Filter';
import FilterModal from '../../components/FilterModal';
import Fonts from '../../Theme/fonts';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BottomTabParamList } from '../../Navigation/types';
import { Task } from '../../interfaces/task';
import DefaultHeader from '../../components/DefaultHeader';
import { getProfile } from '../../services/profileService';
import { getTasksAPI, createTaskAPI, updateTaskAPI } from '../../services/taskService';


type PriorityType = 'lowToHigh' | 'highToLow' | null;
type TagsType = string[];
type DateType = Date | null;

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeRouteProp>();
  const flatListRef = useRef<FlatList<Task>>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(null);
  const [selectedTags, setSelectedTags] = useState<TagsType>([]);
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const styles = useThemedStyles(getStyles);

  const loadAvatar = useCallback(async () => {
    try {
      const userData = await getProfile();
      setAvatar(userData.picture);
    } catch (error) {
      console.error('Erro ao carregar avatar:', error);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    if (!tasks.length) setIsLoading(true);
    setError(null);
    try {
      const apiTasks = await getTasksAPI();
      setTasks(apiTasks);
    } catch (err) {
      setError('Não foi possível carregar suas tarefas.');
    } finally {
      setIsLoading(false);
    }
  }, [tasks.length]);

  useFocusEffect(
    useCallback(() => {
      loadAvatar();
      loadTasks();
    }, [loadAvatar, loadTasks])
  );

  useEffect(() => {
    const uniqueTags = new Set<string>();
    tasks.forEach(task => {
      (task.categories ?? []).forEach(tag => uniqueTags.add(tag));
    });
    setAllTags(Array.from(uniqueTags));
  }, [tasks]);


  useEffect(() => {
    if (route.params?.deletedTaskId) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== route.params?.deletedTaskId));
      navigation.setParams({ deletedTaskId: undefined } as any);
    }

    const scrollToTaskId = route.params?.scrollToTaskId;
    if (scrollToTaskId && filteredTasks.length > 0) {
      const index = filteredTasks.findIndex(task => task.id === scrollToTaskId);
      if (index !== -1 && flatListRef.current) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ index, animated: true });
        }, 500);
      }
    }
  }, [route.params, filteredTasks, navigation]);

  const handleCreateTask = useCallback(
    async (taskData: {
      title: string;
      description: string;
      deadline: string | null;
    }) => {
      setIsCreatingTask(true);
      setIsModalVisible(false);
      try {
        await createTaskAPI(taskData);
        await loadTasks();
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível criar a tarefa.');
      } finally {
        setIsCreatingTask(false);
      }
    },
    [loadTasks],
  );

  const handleOpenCreateTaskModal = () => setIsModalVisible(true);
  const handleCloseCreateTaskModal = () => setIsModalVisible(false);
  const handleOpenFilterModal = () => setIsFilterModalVisible(true);
  const handleCloseFilterModal = () => setIsFilterModalVisible(false);

  const handlePrioritySelect = (priority: PriorityType) => setSelectedPriority(priority);
  const handleTagSelect = (tags: TagsType) => setSelectedTags(tags);
  const handleDateSelect = (date: DateType) => setSelectedDate(date);
  const { theme } = useTheme();

  const handleTaskDetailsNavigation = (taskItem: Task) => {
    navigation.navigate('TaskDetails', { task: taskItem });
  };

  const handleToggleTaskComplete = async (taskId: string) => {
    const originalTasks = [...tasks];
    let taskToUpdate: Task | undefined;

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        taskToUpdate = { ...task, isCompleted: !task.isCompleted };
        return taskToUpdate;
      }
      return task;
    });
    setTasks(updatedTasks);

    if (!taskToUpdate) return;

    try {
      await updateTaskAPI(taskId, taskToUpdate);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível sincronizar a alteração.');
      setTasks(originalTasks);
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity onPress={() => handleTaskDetailsNavigation(item)} activeOpacity={1}>
      <TaskItem
        title={item.title}
        description={item.description ?? ''}
        categories={item.categories ?? []}
        isCompleted={item.isCompleted}
        task={item}
        onToggleComplete={() => handleToggleTaskComplete(item.id)}
      />
    </TouchableOpacity>
  );

  const keyExtractorTask = (item: Task) => item.id;

  useEffect(() => {
    let tempTasks = [...tasks];

    if (selectedTags.length > 0) {
      tempTasks = tempTasks.filter(task =>
        selectedTags.every(tag => (task.categories ?? []).includes(tag)),
      );
    }

    if (selectedDate) {

      const filterDateString = format(selectedDate, 'dd/MM/yyyy');
      tempTasks = tempTasks.filter(task => {
        return task.deadline === filterDateString;
      });
    }

    if (selectedPriority) {
      tempTasks.sort((a, b) => {
        const priorityA = a.priority ?? -1;
        const priorityB = b.priority ?? -1;
        return selectedPriority === 'lowToHigh'
          ? priorityA - priorityB
          : priorityB - priorityA;
      });
    }

    setFilteredTasks(tempTasks);
  }, [tasks, selectedTags, selectedDate, selectedPriority]);

  const renderContent = () => {

    if (isLoading) {
      return (
        <View style={styles.containerNoTask}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.containerNoTask}>
          <EmptyState title="Ops! Ocorreu um erro" message={error} />
          <Button title="Tentar Novamente" onPress={loadTasks} width={200} style={{ marginVertical: 20 }} />
        </View>
      );
    }

    if (tasks.length === 0) {
      return (
        <View style={styles.containerNoTask}>
          <EmptyState />
        </View>
      );
    }

    return (
      <View style={styles.taskListContainer}>
        <Filter onPress={handleOpenFilterModal} />
        <FlatList
          ref={flatListRef}
          data={filteredTasks}
          renderItem={renderTaskItem}
          keyExtractor={keyExtractorTask}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DefaultHeader avatarSource={avatar || undefined} />

      {renderContent()}

      <Button
        title="CRIAR TAREFA"
        fontFamily={Fonts.Roboto60020.fontFamily}
        backgroundColor={theme.primary}
        textColor={theme.background}
        onPress={handleOpenCreateTaskModal}
        width={329}
        disabled={isCreatingTask}
        loading={isCreatingTask}
      />

      <CreateTaskModal
        visible={isModalVisible}
        onClose={handleCloseCreateTaskModal}
        onCreate={handleCreateTask}
        loading={isCreatingTask}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilterModal}
        onPrioritySelect={handlePrioritySelect}
        onTagSelect={handleTagSelect}
        onDateSelect={handleDateSelect}
        availableTags={allTags}
      />
    </View>
  );
};

export default Home;
