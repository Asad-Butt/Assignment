import { View, Text } from 'react-native'
import React from 'react'

export default function TailwindTest() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className=" text-orange-300 bg-black p-4">TailwindTest</Text>
        </View >
    )
}