import React from 'react';
import RegisterDaily from './register-daily'; // Asegúrate de que la ruta sea correcta
import { Task } from '../../dto/Task';

interface RegisterDailyScreenProps {
  addTask: (task: Task) => void;
}

const RegisterDailyScreen: React.FC<RegisterDailyScreenProps> = ({ addTask }) => {
  return <RegisterDaily addTask={addTask} />;
};

export default RegisterDailyScreen;