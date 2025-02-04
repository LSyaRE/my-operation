import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DailyListScreen from './app/(tabs)/daily-list-screen'; // Asegúrate de que la ruta sea correcta
import RegisterDailyScreen from './app/(tabs)/register-daily-screen'; // Asegúrate de que la ruta sea correcta
import { Task } from './dto/Task';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DailyList">
        <Stack.Screen name="DailyList">
          {() => <DailyListScreen tasks={tasks} />}
        </Stack.Screen>
        <Stack.Screen name="RegisterDaily">
          {() => <RegisterDailyScreen addTask={addTask} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;