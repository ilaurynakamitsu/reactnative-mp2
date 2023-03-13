import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Button, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { MovieCell } from "./components/MovieCell";
import { styles } from "./MovieListScreen.styles";

// We can use JSON files by simply requiring them.
const TABLE_DATA = require("../../assets/movies.json");

// Input: navigation & route params, which we recieve through React Navigation
// Output: a screen containing the list of movies
export default function MovieListScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [actors, setActors] = useState([]);

  // TODO: Fill out the methods below.
  // ADDED!!!
  const selectedMovie = (movieItem) => {
    navigation.navigate("About This Movie", { movieItem: movieItem });
  };

  //pass in actors to be filtered by,return the list withjust filtered actors
  //ADDED!!!
  const selectedFilterButton = () => {
    navigation.navigate("Filter", { actor: actors });
  };

  useEffect(
    () => {
      // TODO: Add a "Filter" button to the right bar button.
      // It should lead to the MovieFilterScreen, and pass the "actors" state
      // variable as a parameter.
      //ADDED!!!
      navigation.setOptions({
        headerRight: () => (
          <Button 
            title="Filter" 
            onPress={selectedFilterButton} 
          />
        ),
      });
    },
    [
      /* TODO: Insert dependencies here. */
      //ADDED!
      navigation
    ]
  );

  useEffect(
    () => {
      /* TODO: Recieve the updated list of actors from the filter screen here. 
          See https://reactnavigation.org/docs/params/#passing-params-to-a-previous-screen
          for an example of how to send data BACKWARDS in the navigation stack.

          use setActors
          ADDED!!!
      */
     if (route.params?.actors) {
        setActors(route.params.actors);
     }
      
    },
    [
      /* TODO: Insert dependencies here. What variable changes 
        when we come back from the filter screen? */
      //added actors because the actors list should change after the filter screen
      //ADDED!!!
      route.params?.actors
    ]
  );

  // Renders a row of the FlatList.
  const renderItem = ({ item }) => {
    const overlapFound = (listA, listB) => {
      let foundActor = false;
      listA.forEach((x) => {
        if (listB.includes(x)) {
          foundActor = true;
        }
      });
      return foundActor;
    };

    // TODO: Set up search & filter criteria.
    //ADDED!!!
    let meetsSearchCriteria = true;
    let meetsActorsCriteria = true;

    if(item && search && item.title.includes(search)){
      meetsSearchCriteria = true;
    } else if(item && search && !item.title.includes(search)){
      meetsSearchCriteria = false;
    }
    
    if(actors.length >= 1 && item && overlapFound(item.actors, actors)){
      meetsActorsCriteria = true;
    } else if (actors.length >= 1 && item && !overlapFound(item.actors, actors)) {
        meetsActorsCriteria = false;
    }

    if (meetsSearchCriteria && meetsActorsCriteria) {
      // TODO: Return a MovieCell, wrapped by a TouchableOpacity so we can handle taps.
      //added view with touchable opacity
      //ADDED!!!
      return (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("About This Movie", { item: item })
            }
          >
            <MovieCell movieItem={item} />
          </TouchableOpacity>
        </View>
      );
    } else {
      // If the item doesn't meet search/filter criteria, then we can
      // simply return null and it won't be rendered in the list!
        return null;
    }
  };

  // Our final view consists of a search bar and flat list, wrapped in
  // a SafeAreaView to support iOS.
  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Add a SearchBar: https://reactnativeelements.com/docs/searchbar/.
                The third-party package should already be installed for you. */}
      {/* added search bar */}
      <SearchBar
        platform={"ios"}
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
      />
      {/* TODO: Add a FlatList: https://reactnative.dev/docs/flatlist */}
      <FlatList
        data={TABLE_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
