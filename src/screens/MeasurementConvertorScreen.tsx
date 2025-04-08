import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function MeasurementConvertorScreen({ navigation }: any) {
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [measurementType, setMeasurementType] = useState('Length');
  const [initialUnit, setInitialUnit] = useState('');
  const [finalUnit, setFinalUnit] = useState('');
  const [unitOptions, setUnitOptions] = useState<string[]>([]);

  const units: any = {
    Length: ['Meter', 'Kilometer', 'Centimeter', 'Inch', 'Foot'],
    Mass: ['Gram', 'Kilogram', 'Pound'],
    Volume: ['Liter', 'Milliliter', 'Gallon']
  };

  const conversionRates: any = {
    // All rates to a base unit for conversion (e.g., Meter, Gram, Liter)
    Length: {
      Meter: 1,
      Kilometer: 1000,
      Centimeter: 0.01,
      Inch: 0.0254,
      Foot: 0.3048
    },
    Mass: {
      Gram: 1,
      Kilogram: 1000,
      Pound: 453.592
    },
    Volume: {
      Liter: 1,
      Milliliter: 0.001,
      Gallon: 3.78541
    }
  };

  // Update unit options when measurement type changes
  useEffect(() => {
    setUnitOptions(units[measurementType]);
    setInitialUnit('');
    setFinalUnit('');
    setFinalValue('');
  }, [measurementType]);

  // Perform conversion
  useEffect(() => {
    if (initialValue && initialUnit && finalUnit) {
      const input = parseFloat(initialValue);
      const baseValue = input * conversionRates[measurementType][initialUnit];
      const converted = baseValue / conversionRates[measurementType][finalUnit];
      setFinalValue(converted.toFixed(4));
    } else {
      setFinalValue('');
    }
  }, [initialValue, initialUnit, finalUnit]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#ccc" />
        </TouchableOpacity>
        <Text style={styles.title}>Convertor</Text>
      </View>

      <Picker
        selectedValue={measurementType}
        style={styles.picker}
        dropdownIconColor="#fff"
        onValueChange={(itemValue) => setMeasurementType(itemValue)}
      >
        <Picker.Item label="Length" value="Length" />
        <Picker.Item label="Mass" value="Mass" />
        <Picker.Item label="Volume" value="Volume" />
      </Picker>

      <Picker
        selectedValue={initialUnit}
        style={styles.picker}
        dropdownIconColor="#fff"
        onValueChange={(itemValue) => setInitialUnit(itemValue)}
      >
        <Picker.Item label="Select Initial Unit" value="" />
        {unitOptions.map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <Picker
        selectedValue={finalUnit}
        style={styles.picker}
        dropdownIconColor="#fff"
        onValueChange={(itemValue) => setFinalUnit(itemValue)}
      >
        <Picker.Item label="Select Final Unit" value="" />
        {unitOptions.map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Initial Value:</Text>
          <TextInput
            style={styles.input}
            value={initialValue}
            onChangeText={setInitialValue}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <Ionicons name="arrow-forward" size={24} color="#fff" style={{ marginTop: 30 }} />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Final Value:</Text>
          <TextInput
            style={styles.input}
            value={finalValue}
            placeholder="0"
            placeholderTextColor="#999"
            editable={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d3d4e',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 12,
  },
  picker: {
    backgroundColor: '#5a5a6e',
    color: '#fff',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    color: '#ccc',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
});
