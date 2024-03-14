import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {categoryItem} from "@/styles/components/category/categoryItem";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/interfaces/RootStackParamList";

export interface CategoryItemProps {
    category: string;
}

const CategoryItem = ({category}: CategoryItemProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const navigateToDetail = () => {
        navigation.navigate('Products', {category: category});
    }

    const src = require("../../assets/images/categories/" + "laptops" + ".jpg");


    return (
        <TouchableOpacity style={categoryItem.category_wrapper} onPress={navigateToDetail}>
            <Text style={categoryItem.text}>{category}</Text>
            <Image style={categoryItem.image} source={src}/>
        </TouchableOpacity>
    );
};


export default CategoryItem;