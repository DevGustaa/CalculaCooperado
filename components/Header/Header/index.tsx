import { View, Text } from 'react-native';

export default function Header() {
 return (
  <View className='w-full h-full'>
    <View className=" w-full items-center justify-center flex-col ">
      <View className="w-11/12 h-1"></View>
      <View className='px-3 flex-row items-center justify-between w-full'>
        <Text className=" p-2 font-semibold text-2xl text-TituloColor">Calcula Cooperado</Text>
        <Text>?</Text>
      </View>
      <View className='w-11/12 h-1 bg-BrancoC'></View>
      <View></View>
    </View>
  </View>
  );
}