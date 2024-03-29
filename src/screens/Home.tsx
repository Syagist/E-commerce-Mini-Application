import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '@/styles/globalStyles';
import Banner from '@/components/Banner';
import {fetchProductsByCategory} from "@/store/slices/productsSlice";
import {RootState, useAppDispatch, useAppSelector} from "@/store/store";
import {fetchCategories} from "@/store/slices/categoriesSlice";
import ProductList from "@/components/product/ProductList";
import {home} from "@/styles/sreens/home";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/interfaces/RootStackParamList";
import {useLoader} from "@/context/LoaderProvider";


const Home = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state: RootState) => state.categories.categories);
    const [categoriesWithProducts, setCategoriesWithProducts] = useState({});
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {showLoader, hideLoader} = useLoader();

    useEffect(() => {
        showLoader()

        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            for (const category of categories) {
                await dispatch(fetchProductsByCategory({category})).then(res => res.payload)
                    .then(async (res) => {
                        setCategoriesWithProducts((prevState) => ({
                            ...prevState,
                            [category]: res,
                        }));
                    });
                hideLoader()

            }
        };
        fetchData()
    }, [dispatch, categories]);



    return (
        <ScrollView contentContainerStyle={globalStyles.scrollViewContainer}>
            <View style={globalStyles.container}>
                <Banner/>
                {Object.keys(categoriesWithProducts).map((category, index) => (
                    <View style={home.category_wrapper} key={index}>
                        <View style={home.category_title_button}>
                            <Text style={home.category_title}>{category}</Text>
                            <TouchableOpacity  onPress={()=>{
                                navigation.navigate('Products', {category: category});
                            }}>
                                <Text style={home.category_button}>see all</Text>
                            </TouchableOpacity>
                        </View>
                        <ProductList products={categoriesWithProducts[category]} />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Home;