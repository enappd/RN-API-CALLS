import React, { Component, useState } from 'react'
import axios from 'axios';
import { View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './ApiStyles';

export default ApiContainer = () => {
    const [loading, setLoading] = useState(false)
    const [fromFetch, setFromFetch] = useState(false)
    const [fromAxios, setFromAxios] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [axiosData, setAxiosData] = useState(null);

    const goForFetch = () => {
        setFromFetch(true);
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                setTimeout(() => {
                    setLoading(false);
                    setDataSource(responseJson)
                }, 2000)

            })
            .catch(error => console.log(error))
    }
    const goForAxios = () => {
        setFromFetch(false);
        setLoading(true);
        
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    setLoading(false);
                    setAxiosData(response.data);
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
    }
    const FlatListSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    const renderItem = (data) => {
        return (
            <TouchableOpacity style={styles.list}>
                <Text style={styles.lightText}>{data.item.name}</Text>
                <Text style={styles.lightText}>{data.item.email}</Text>
                <Text style={styles.lightText}>{data.item.company.name}</Text></TouchableOpacity>
        )

    }
    return (
        <View style={styles.parentContainer}>
            <View>
                <Text style={styles.textStyle}>In this tutorial, we will implement all the provided methods for API calls into React Native application.</Text>
            </View>
            <View style={{ margin: 18 }}>
                <Button
                    title={'Click using Fetch'}
                    onPress={() => {goForFetch()}}
                    color='green'
                />
            </View>
            <View style={{ margin: 18 }}>
                <Button
                    title={'Click using axios'}
                    onPress={() => {goForAxios()}}
                    color='green'
                />
            </View>


            {fromFetch ?
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                /> : <FlatList
                    data={axiosData}
                    ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            }
            {loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                    <Text style={{fontSize:16,color:'red'}}>Loading Data...</Text>
                </View>
            }
        </View>
    )
}