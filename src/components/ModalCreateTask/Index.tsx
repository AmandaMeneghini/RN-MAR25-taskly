import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import Input from '../input';
import DateInput from '../DateInput';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (task: {
    title: string;
    description: string;
    deadline: string | null;
  }) => void;
  loading?: boolean;
}

type FormData = {
  title: string;
  description: string;
  deadlineDate: Date | null;
};

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  onCreate,
  loading = false,
}) => {
  const { control, handleSubmit, reset, watch, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      deadlineDate: null,
    }
  });

  const deadlineDateValue = watch('deadlineDate');

  useEffect(() => {
    if (!visible) {
      reset({
        title: '',
        description: '',
        deadlineDate: null,
      });
    }
  }, [visible, reset]);

  const onSubmit = (data: FormData) => {
    onCreate({
      title: data.title,
      description: data.description,
      deadline: data.deadlineDate ? format(data.deadlineDate, 'dd/MM/yyyy') : null,
    });
  };

  const formattedDate = deadlineDateValue ? format(deadlineDateValue, 'dd/MM/yyyy', { locale: ptBR }) : '';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar tarefa</Text>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="title"
                rules={{ required: 'Título é obrigatório' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Título"
                    error={errors.title?.message}
                    width={281}
                    placeholder="Ex: bater o ponto"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />

              <View style={styles.textinputArea}>
                <Controller
                  control={control}
                  name="description"
                  rules={{ required: 'Descrição é obrigatória' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Descrição"
                      error={errors.description?.message}
                      width={281}
                      multiline={true}
                      height={81}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      textAlignVertical="top"
                    />
                  )}
                />
              </View>

              <Controller
                control={control}
                name="deadlineDate"
                rules={{ required: 'Prazo é obrigatório' }}
                render={({ field: { onChange, value } }) => (
                  <DateInput
                    label="Prazo"
                    onDateChange={onChange}
                    error={errors.deadlineDate?.message}
                    initialDate={value}
                    value={formattedDate}
                    placeholder={formattedDate || 'DD/MM/YYYY'}
                  />
                )}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={loading}>
                <Text style={styles.cancelText}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.createButton, (!isValid || loading) && styles.disabledButton]}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.createText}>CRIAR</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
