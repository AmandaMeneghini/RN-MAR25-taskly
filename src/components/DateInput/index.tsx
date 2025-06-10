import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Input from '../input';

interface DateInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  initialDate?: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  initialDate,
  onDateChange,
  ...rest
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>(initialDate ?? new Date());

  useEffect(() => {
    if (initialDate && isValid(initialDate)) {
      setDate(initialDate);
    } else if (initialDate !== null && initialDate !== undefined) {
      console.warn('DateInput recebeu initialDate inválido:', initialDate);
      setDate(new Date());
    }
  }, [initialDate]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    hideDatePicker();
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  const formattedDate = date && isValid(date) ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : '';

  return (
    <TouchableOpacity onPress={showDatePicker} activeOpacity={1} accessible={true} accessibilityLabel="Selecione uma data">
      <View>
        <Input
          label={label}
          value={formattedDate}
          editable={false}
          placeholder={formattedDate || 'DD/MM/YYYY'}
          error={error}
          containerStyle={containerStyle}
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          errorStyle={errorStyle}
          {...rest}
        />

        <DatePicker
          modal
          open={isDatePickerVisible}
          date={date && isValid(date) ? date : new Date()}
          mode="date"
          locale="pt-BR"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DateInput;