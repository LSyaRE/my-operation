import React, { useEffect, useState, useCallback } from 'react';
import { View, Button, ActivityIndicator, Text, StyleSheet } from 'react-native';
import DailyList from './daily-list'; // Asegúrate de que la ruta sea correcta
import { Task } from '../../dto/Task'; // Asegúrate de que la ruta sea correcta

// Definición de las propiedades que acepta el componente
interface DailyListPaginatorProps {
  tasks: Task[]; // Array de tareas
  itemsPerPage?: number; // Número de tareas por página (opcional)
}

const DailyListPaginator: React.FC<DailyListPaginatorProps> = ({
  tasks,
  itemsPerPage = 5,
}) => {
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadTasks = useCallback(() => {
    setLoading(true);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newTasks = tasks.slice(startIndex, endIndex);

    if (newTasks.length === 0) {
      setHasMore(false);
    } else {
      setCurrentTasks((prev) => [...prev, ...newTasks]);
    }

    setLoading(false);
  }, [page, tasks, itemsPerPage]); // Asegúrate de incluir las dependencias necesarias

  useEffect(() => {
    loadTasks();
  }, [page, tasks, loadTasks]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Total de tareas: {tasks.length}</Text>
      <DailyList tasks={currentTasks} />
      {loading && <ActivityIndicator size="large" />}
      {hasMore && !loading && (
        <Button title="Cargar Más" onPress={loadMore} />
      )}
    </View>
  );
};

// Definición de estilos
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
});

export default DailyListPaginator;